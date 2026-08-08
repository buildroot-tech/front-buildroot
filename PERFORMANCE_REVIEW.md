# Performance & technical debt — buildroot_ site

Verified against the current source and a production build. Anything listed
here was checked, not inferred.

---

## Measured today

Production build (`next build` + `next start`), desktop 1440×900:

| Page              | LCP    | CLS    | Long tasks | Transfer |
| ----------------- | ------ | ------ | ---------- | -------- |
| `/es`             | 636 ms | 0.0001 | 0          | 109 KB   |
| `/es/work`        | 312 ms | 0.0001 | 1 (66 ms)  | 109 KB   |
| `/es/about`       | 124 ms | 0.0001 | 0          | 109 KB   |
| `/es/services`    | 204 ms | 0.0001 | 0          | 109 KB   |
| `/es/contact`     | 220 ms | 0.0001 | 0          | 109 KB   |
| `/es/work/[slug]` | 228 ms | 0.0001 | 0          | 188 KB   |

Route transitions: 60 fps, 0 dropped frames of 134, no long tasks.

Every page is now within budget. The case-study page — previously the one
outlier at 864 KB — is down to 188 KB.

---

## Open

### 1. `PixelImage` allocates a canvas per animation frame

`components/ui/PixelImage.tsx` — `draw()` (L63) calls
`document.createElement("canvas")` on every tick of the 0.8 s reveal, and
L33 sizes the visible canvas to `img.naturalWidth/naturalHeight` (1024×1024)
regardless of the box it renders into.

At ~60 fps that is up to ~48 offscreen canvas allocations plus full-
resolution `drawImage` calls per reveal, and `/work` can have two or three
instances mounted at once during a hover.

It does not show up in the measurements — the one long task recorded on
`/work` is 66 ms and is not attributable to this — because the reveals are
short and staggered by hover. It is real waste that is not currently hurting
anyone.

**Fix:** one offscreen canvas per instance held in a ref, sized to the
rendered CSS box × `devicePixelRatio` rather than the source file.

### 2. The LinkedIn URL is still a placeholder

`lib/seo.ts` — `siteConfig.links.linkedin` points at
`linkedin.com/company/buildroot`, which is a guess. The footer renders it on
every page. This is a content decision, not a code problem, but it is
visible to every visitor and it feeds the `sameAs` array in the
`ProfessionalService` JSON-LD, where a wrong URL actively weakens the
entity signal.

---

## Closed since the last review

- **Project images were 3.5 MB served unoptimised.** The four 1024×1024
  JPEGs in `public/projects/` were re-encoded to WebP (quality 78) at the
  same dimensions: **3.4 MB → 480 KB**, a 82–94% reduction per file. The
  format is now centralised in `projectImageSrc()` in `lib/projects.ts`
  rather than repeated at five call sites. Case-study page transfer:
  **864 KB → 188 KB**.
- **Two type systems no longer coexist.** `globals.css` carried both the
  current `.type-*` scale and the superseded brutalist utilities
  (`.headline`, `.heading`, `.text-h1`–`.text-h3`, `.text-display`,
  `.brutalist-card`, `.brutalist-button`). Nothing shipping referenced the
  legacy set; it and its nine orphaned tokens (`--shadow-brutalist*`,
  `--duration-hover`, `--text-display/h1/h2/h3/small/caption`) are gone.
  `globals.css` went from 431 to 236 lines.
- **`/style-guide` 404'd in production.** It lives at the app root rather
  than under `app/[lang]`, so `proxy.ts` was rewriting it to
  `/en/style-guide` — a path that does not exist. Same class of bug as the
  `/apple-icon` 404. The skip list is now named `UNLOCALIZED_ROUTES` and
  covers both.
- **`/style-guide` also rendered completely unstyled.** There is no
  `app/layout.tsx`, so Next supplied a default root layout with no
  `globals.css` and no fonts. It now has its own root layout. The two bugs
  masked each other: the route was unreachable, so nobody saw that it was
  also unpainted.
- **The style guide documented a system that no longer existed.** It has
  been rewritten against the current scale, and now imports `routeThemes`
  from `lib/route-theme.ts` and renders every type sample with the real
  `.type-*` class, so it cannot silently drift again.
- **The three typefaces are defined once**, in `lib/fonts.ts`, shared by the
  localized layout and the style guide. A style guide rendering different
  fonts from the pages it documents is worse than no style guide.
- **`/privacy` and `/cookies` 404'd.** Both pages now exist in both
  locales, with the copy in the dictionaries.
- **LCP was pinned to a decoration.** The hero's ghost echo — the largest
  painted element on the page — faded in a second after the headline, so
  Largest Contentful Paint sat at whenever that decoration finished. Tying it
  to the headline's own reveal took LCP from 2284 ms to a few hundred ms.
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
  extension, so `proxy.ts` was rewriting them into `/en/...`.
- **iOS painted a white band above dark pages** — no `theme-color` or
  `color-scheme` was declared anywhere. Each route now ships both, matching
  the colour at the top of that page.

---

## Health

- `npx tsc --noEmit` — clean
- `npm run lint` — clean, no suppressions anywhere in the codebase
- `npm run build` — clean
- No `console.log`, `any`, `@ts-ignore` or orphaned modules
- One `TODO` in the codebase, `lib/seo.ts:44` — the LinkedIn URL above
- No orphaned CSS custom properties
- Dictionaries structurally identical across `es` and `en`
- No horizontal overflow at 360, 390, 414, 1366, 1440 or 1920
- Every route returns 200 in a production build; the only failing requests
  are `_vercel/insights` and `_vercel/speed-insights`, which resolve only
  when deployed to Vercel
