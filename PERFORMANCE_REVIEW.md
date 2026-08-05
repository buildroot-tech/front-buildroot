# Performance Review — buildroot front-end

Punch list of concrete, verified findings from reading the actual source. Grouped by impact.

---

## High Impact

### 1. `PixelImage` allocates a brand-new canvas on every animation frame
`components/ui/PixelImage.tsx` (`draw()`, ~L45-77)

Every `onUpdate` tick of the 0.8s reveal tween calls `document.createElement("canvas")`, sets its width/height, and draws the **full natural-resolution** source image into it — then draws that into the visible canvas, then draws the sharp image again for the crossfade. At ~60fps that's up to ~48 offscreen canvas allocations + full-res `drawImage` calls per single image reveal, and every project row on `/work` can have 2-3 `PixelImage` instances mounted concurrently (hover preview + drawer image + big image), each running its own independent loop. This is real GC pressure and main-thread work exactly during a hover interaction, where jank is most visible.

Fix:
- Allocate one offscreen canvas per `PixelImage` instance (`useRef`), resize it once when `pixelSize` changes materially instead of recreating it every frame.
- Downscale the *source* used for the offscreen draw — you don't need `img.naturalWidth/Height` (1024×1024 for every project photo) when the rendered box is 300×188px. Draw into an offscreen canvas sized to the CSS display size (times `devicePixelRatio`, capped), not the raw file dimensions.

### 2. `PixelImage` always sets the canvas backing store to the image's raw dimensions, not the display size
Same file, `img.onload` (~L27-34): `canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;`

All 4 project photos in `public/projects/` are 1024×1024 JPEGs (700KB–1.1MB — see finding #4). They're rendered as small thumbnails (`IMAGE_WIDTH = 360` in `ProjectListRow.tsx` L14, `300×188` boxes in `ProjectRow.tsx` L176/L204) but the canvas buffer and every `drawImage` call still work at full 1024×1024 resolution. This multiplies the cost of finding #1 for no visual benefit — you're pixel-pushing ~4x more data than what's ever displayed.

Fix: size the canvas backing store to the element's actual rendered CSS box (`getBoundingClientRect()` × `devicePixelRatio`, capped at e.g. 2x), not `naturalWidth/naturalHeight`.

### 3. No image optimization pipeline is used anywhere — `next/image` is completely bypassed
Verified: `grep -rn '<img'` and `grep -rln 'next/image'` across `components/` and `app/` both return **nothing**. Every image in the app (all 4 project photos) is loaded through `PixelImage`'s `new window.Image()` (L26 in `PixelImage.tsx`), which:
- Fetches the raw file directly from `/public` with no resizing, no `srcset`/responsive variants, and no format negotiation.
- Has no `loading="lazy"` or intersection-observer gating — the `useEffect` fires and starts the network fetch the instant the component mounts (mitigated somewhat in `ProjectListRow`/`ProjectRow` since the image only mounts on hover/expand, but the full-page detail view (`ProjectDetail.tsx`) and the grid's "big image" mount eagerly with the row).
- Never benefits from the AVIF/WebP conversion already configured in `next.config.ts` (`images.formats: ["image/avif", "image/webp"]`) — that config is dead weight since no `next/image` component exists to use it.

Fix: this is the single biggest lever available. Either (a) route `PixelImage`'s underlying `<img>`/prefetch through `next/image` (e.g. use `next/image` with `fill` + `unoptimized={false}` for the crisp final frame, keeping the canvas only for the transient pixelation effect, or preload via `next/image`'s loader to get an AVIF/WebP + correctly-sized asset URL before feeding it to the canvas `Image()`), or (b) at minimum pre-generate AVIF/WebP + multiple sizes of the 4 project images at build time and pass the right size to `PixelImage` based on where it's used (thumbnail vs. detail).

### 4. Source project images are raw, oversized JPEGs
`public/projects/*.jpg`:
```
salesforce-ai.jpg   1.1M   1024x1024
aca-diario.jpg       992K  1024x1024
polo-pantoja.jpg     756K  1024x1024
edusur.jpg           708K  1024x1024
```
~3.5MB total, all JPEG (no WebP/AVIF), all fixed at 1024×1024 (a print-oriented 300 DPI export per `file`), and none of these ever need to render larger than ~360px wide anywhere in the UI (checked every `PixelImage` call site). Every one of these is 3-6x larger than it needs to be for its largest actual on-screen use.

Fix: re-export at the actual max display size needed (≈720px wide covers 2x pixel density for the biggest use case) as WebP/AVIF, targeting <100KB each. Combine with finding #3 for proper responsive delivery.

---

## Medium Impact

### 5. `next/font/google` loads 5 weights of Crimson Pro; only 1 is ever used
`app/[lang]/layout.tsx` L23-29:
```ts
const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  ...
});
```
Verified via `grep -rn "font-serif"` across `app/` and `components/`: every single usage (`Hero.tsx`, `CTA.tsx`, `SelectWork.tsx`, `ProjectListRow.tsx`, `ProjectsGrid.tsx`, `Footer.tsx`) pairs `font-serif` with `font-light` (weight 300) and nothing else — including the style guide page, which never demonstrates `font-serif` at all. Weights 400/500/600/700 are downloaded for zero payoff.

Fix: `weight: ["300"]` only (or `["300", "400"]` if you want a fallback safety margin). This alone removes 4 of 5 font files for this family from the critical path.

### 6. Geist Mono loads a weight that's never used
Same file, L31-35: `weight: ["300", "400", "500", "600", "700"]`. Cross-checking every `font-mono` usage (70 call sites) against applied `font-*` weight utilities: 300/400 (default)/500/700 are all in active use, but 600 (`font-semibold`) never appears on any element under a `font-mono` ancestor.

Fix: drop `"600"` from Geist Mono's `weight` array.

### 7. Full-page route transition blocks on exit-then-enter (`AnimatePresence mode="wait"`)
`components/ui/PageTransition.tsx` L10: `<AnimatePresence mode="wait">` keyed on `pathname`. Every client-side navigation waits for the outgoing page's 0.3s exit animation to fully finish before the incoming page's 0.3s enter animation starts — up to ~0.6s of mandatory animated delay stacked on top of the actual navigation/data-fetch time, on every single route change.

Fix: if the crossfade is a must-have, switch to `mode="popLayout"` or drop `mode="wait"` entirely so enter/exit overlap (halves perceived nav latency). If it's purely decorative, consider a shorter duration or CSS-only fade instead of Framer Motion for this specific transition.

### 8. `useMousePosition` hook does an unthrottled `setState` on every `mousemove`
`hooks/useMousePosition.ts` L9-11: calls `setMousePosition` on raw `window.mousemove` with no throttling/rAF batching — would force a React re-render at native mouse-event frequency (can be 100+/sec) if it were mounted anywhere.
Verified: `grep -rln "useMousePosition"` across `app/` and `components/` returns **no results** — this hook is currently dead code, not wired into any component, so it costs nothing today. Flagging it because it's a live landmine: if/when someone wires it in for a cursor-follow effect, it'll cause visible jank as-is.

Fix: if/when used, throttle via `requestAnimationFrame` or update a Framer Motion `useMotionValue` directly (no React re-render) instead of `useState`. Until then, consider removing the dead file.

---

## Low Impact / Cleanup

### 9. Duplicate, unused `ScrambleText` implementation
`components/ui/ScrambleText.tsx` is a second, `setInterval`-based scramble-text component (different API: `isHovered` prop) that is entirely separate from `components/ui/TextScrambler.tsx` (the `setTimeout`-chain version actually used everywhere — `Header.tsx`, `Preloader.tsx`, `Footer.tsx`, `ProjectRow.tsx`, etc., which also exports a component literally named `ScrambleText`). Verified via `grep -rn "ScrambleText"`: every real call site imports from `@/components/ui/TextScrambler`; `components/ui/ScrambleText.tsx` has zero importers.

Fix: delete `components/ui/ScrambleText.tsx` (dead code, and the naming collision with `TextScrambler.tsx`'s own `ScrambleText` export is confusing for future edits).

### 10. `lenis` is a declared dependency but never imported
`package.json` lists `"lenis": "^1.3.25"` as a dependency; the only occurrence of "Lenis" in the entire codebase is a literal string in `AboutSection.tsx`'s tech-stack list (marketing copy, not a call site). It costs nothing at runtime since it's never imported (nothing to tree-shake around), but it's unused install/audit surface.

Fix: remove from `package.json` unless smooth-scroll is planned imminently.

### 11. `public/og.jpg` referenced but not present
`lib/seo.ts` sets `ogImage: "https://buildroot.dev/og.jpg"` for Open Graph metadata, but `public/` contains no `og.jpg`. Not a runtime perf issue, but link previews (Slack/Twitter/etc.) will show a broken image. Worth a quick fix since you're already touching this area.

---

## Notes on things that are already in good shape (no action needed)
- `LazyMotion` + `domAnimation` is correctly set up in `app/providers.tsx`, and every animated component consistently imports the lighter `m` from `"framer-motion"` rather than the full `motion` object — confirmed across all 18 files that import from `framer-motion`. (`PixelImage.tsx`'s import of the imperative `animate()` helper is a separate, appropriately lightweight API, not the heavy `motion` component.)
- No raw `<img>` tags anywhere — good instinct to centralize on one image component, even though that component itself needs the fixes above.
- `next.config.ts` already sets `poweredByHeader: false` and reasonable security headers; Turbopack (Next 16 default) build has no unusual overrides.
- Client/server component boundaries are largely justified — most `"use client"` files use `useScroll`/`useTransform`/`m` components that genuinely require the client runtime, not accidental over-marking.
