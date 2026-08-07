# Performance & technical debt — buildroot_ site

Verified against the current source and a production build. Anything listed
here was checked, not inferred.

---

## Measured today

Production build, desktop 1440×900:

| Page | LCP | CLS | Long tasks | Transfer |
| --- | --- | --- | --- | --- |
| `/es` | 256 ms | 0.0001 | 1 (59 ms) | 108 KB |
| `/es/work` | 236 ms | 0.0001 | 0 | 108 KB |
| `/es/about` | 160 ms | 0.0001 | 0 | 108 KB |
| `/es/contact` | 216 ms | 0.0001 | 0 | 108 KB |
| `/es/work/[slug]` | 208 ms | 0.0001 | 0 | **864 KB** |

Route transitions: 60 fps, 0 dropped frames of 134, no long tasks.

The numbers are good everywhere except the transfer size of a case-study
page, which is finding #1.

---

## Open

### 1. Project images are 3.5 MB, served unoptimised — highest impact

`public/projects/` holds four 1024×1024 JPEGs:

| File | Size |
| --- | --- |
| `salesforce-ai.jpg` | 1.00 MB |
| `aca-diario.jpg` | 989 KB |
| `polo-pantoja.jpg` | 756 KB |
| `edusur.jpg` | 708 KB |

This is the entire difference between a case-study page (864 KB) and every
other page (108 KB). They are loaded through `PixelImage`, which uses
`new Image()` directly, so `next/image` is bypassed completely: no resizing,
no WebP/AVIF, no lazy loading, no responsive `srcset`.

**Fix:** re-encode at the sizes actually rendered and serve modern formats.
The largest box any of these fills is the case-study hero (16:9, full width);
the `/work` rows render them at 300×188. A 1600 px-wide WebP would cover
every use at a fraction of the weight.

This one is deliberately left as a decision rather than done, because it
changes source assets.

### 2. `PixelImage` allocates a canvas per animation frame

`components/ui/PixelImage.tsx` — `draw()` (L63) calls
`document.createElement("canvas")` on every tick of the 0.8 s reveal, and
L33 sizes the visible canvas to `img.naturalWidth/naturalHeight` (1024×1024)
regardless of the box it renders into.

At ~60 fps that is up to ~48 offscreen canvas allocations plus full-
resolution `drawImage` calls per reveal, and `/work` can have two or three
instances mounted at once during a hover.

It does not currently show up in the measurements — long tasks are zero on
`/work` — because the reveals are short and staggered by hover. It is real
waste, but it is not hurting anyone today, so it sits below #1.

**Fix:** one offscreen canvas per instance held in a ref, sized to the
rendered CSS box × `devicePixelRatio` rather than the source file.

### 3. Two type systems still coexist

`globals.css` carries both the current `.type-*` scale and the older
brutalist utilities (`.headline`, `.heading`, `.text-h1`–`.text-h3`,
`.text-display`, `.brutalist-card`, `.brutalist-button`). The legacy set is
now referenced **only** by `app/style-guide/page.tsx` — no shipping page uses
it.

`/style-guide` is also an internal reference that documents the *superseded*
system. It is now excluded from indexing in `robots.ts`, but it remains
reachable and will drift further from the real site over time.

**Decision needed:** delete `app/style-guide/` and the legacy utilities with
it, or rewrite the page against the current scale. Left in place because
removing a page is the owner's call.

### 4. Footer links point nowhere

- Social links in `components/layout/Footer.tsx` are placeholders
  (`instagram.com/buildroot`, `twitter.com/buildroot_dev`,
  `linkedin.com/company/buildroot`).
- `/privacy`, `/cookies` and `/newsletter` are linked from the footer and
  **all three return 404** — verified against the running build.

Both are content decisions, not code problems, but they are visible to every
visitor.

---

## Closed since the last review

- **LCP was pinned to a decoration.** The hero's ghost echo — the largest
  painted element on the page — faded in a second after the headline, so
  Largest Contentful Paint sat at whenever that decoration finished. Tying it
  to the headline's own reveal took LCP from 2284 ms to ~250 ms.
- **Long tasks on load: 3 (237 ms) → 0.**
- **Route transitions are layout-stable.** The letter shuffle rearranges only
  a word's own characters, so every word keeps its final width: CLS 0.0001.
- **Marquees run on the compositor** — CSS `transform` only, no per-frame JS,
  and they honour `prefers-reduced-motion`.
- **Dead weight removed:** `create-next-app`'s leftover SVGs, an unused
  `lenis` reference in the About stack list, a dead commented block in the
  Footer, the unused `.section-generous` utility, and the last
  `eslint-disable` in the codebase.
- **`/apple-icon` 404'd in production** — metadata routes have no file
  extension, so `proxy.ts` was rewriting them into `/en/...`. Now skipped
  explicitly.
- **iOS painted a white band above dark pages** — no `theme-color` or
  `color-scheme` was declared anywhere. Each route now ships both, matching
  the colour at the top of that page.

---

## Health

- `npx tsc --noEmit` — clean
- `npm run lint` — clean, no suppressions anywhere in the codebase
- `npm run build` — clean
- No `console.log`, `TODO`, `any`, `@ts-ignore` or orphaned modules
- Dictionaries structurally identical across `es` and `en`
- No horizontal overflow at 360, 390, 414, 1366, 1440 or 1920
