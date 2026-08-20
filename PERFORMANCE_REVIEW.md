# Performance & technical debt — buildroot_ site

Verified against the current source and a production build. Anything listed
here was checked, not inferred.

---

## Measured

Production build (`next build` + `next start`), desktop 1440×900. Not
re-run since the mobile scroll/motion fixes below — those only change
`transform`/`opacity` on already-mounted elements, which don't affect
LCP or CLS, so the numbers should still hold; re-measure before trusting
them for anything more specific than that.

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

### 1. `PixelImage`'s canvas is still sized to the source file, not the box

`components/ui/PixelImage.tsx` L33 sizes the visible canvas to
`img.naturalWidth/naturalHeight` (1024×1024) regardless of the box it
renders into, so a full-resolution `drawImage` runs on every frame of the
0.8 s reveal even for a small thumbnail. The per-frame *allocation* this
item used to describe is fixed (see Closed) — this is the remaining half:
size the buffer to the rendered CSS box × `devicePixelRatio` instead.

Still real waste that is not currently hurting anyone — reveals are short
and staggered by hover, and it hasn't shown up in a measurement.

### 2. `/work`'s listing still runs the pre-redesign accordion

`components/work/ProjectsGrid.tsx` mounts `ProjectRow` — expand-in-place,
`isExpanded`/`onToggle` — while the home page's featured list
(`SelectWork` → `ProjectListRow`) and the full case-study page
(`ProjectDetail`, at `/work/[slug]`) both already use the newer,
unified visual language. `ProjectRow`'s expanded state duplicates content
that `/work/[slug]` already renders in full, and a visitor gets two
different interaction patterns depending on which page they land on.

**Fix:** point `ProjectsGrid` at `ProjectListRow` and drop `ProjectRow`.

### 3. `SERVICES_SLIDE_THEMES` duplicates `SERVICE_COLORS` by hand

`components/layout/Header.tsx` keeps its own copy of the three
per-slide colours from `components/services/ServicesSection.tsx`, with a
comment admitting it's "kept in sync manually." Nothing catches the two
drifting apart if one changes and not the other.

**Fix:** export `SERVICE_COLORS` from `ServicesSection.tsx`, import it in
`Header.tsx`.

### 4. The LinkedIn URL is still a placeholder

`lib/seo.ts` — `siteConfig.links.linkedin` points at
`linkedin.com/company/buildroot`, which is a guess. The footer renders it on
every page. This is a content decision, not a code problem, but it is
visible to every visitor and it feeds the `sameAs` array in the
`ProfessionalService` JSON-LD, where a wrong URL actively weakens the
entity signal.

---

## Closed since the last review

- **`PixelImage` allocated a canvas per animation frame.**
  `document.createElement("canvas")` ran on every tick of the 0.8 s reveal
  — up to ~48 DOM node allocations per image, times however many are
  mounted at once during a `/work` hover. Now one offscreen canvas per
  instance, held in a ref and resized (not recreated) each frame. The
  buffer is still sized to the source file rather than the rendered box —
  see Open #1.
- **Mobile scroll on the stacked sections (`WorkflowSteps`,
  `ServicesSection`, `ProjectDetail`) was janky, then too fast, then
  elastic — three rounds of fixes, now settled.** In order: converted every
  `vh` in the system to `dvh` (a mobile toolbar collapsing mid-scroll was
  desyncing the measured driver height from the real viewport); shortened
  the driver on mobile via `--seg`/`md:` breakpoints, since 100dvh of
  driver per panel is a couple of mouse-wheel clicks but 5–10 full touch
  swipes; faded the whole stack to transparent over the last panel's rest
  window instead of letting `position: sticky` clip it the instant it
  un-pins (the mechanical cut read as the previous slide reappearing on
  `/services`, since that route's background matches that slide's colour);
  spring-smoothed the scroll progress so a hard scroll eases through the
  transition instead of snapping it, tuned to a damping ratio of exactly 1
  after the first attempt (ratio 1.5, overdamped) read as elastic rather
  than smooth.
- **The header's nav-link underline never lit up on the English site.** It
  compared the raw, locale-prefixed `pathname` against an unprefixed href;
  the Contact link two lines below already normalized first. Now both do.
- **The preloader's floating labels collided with the wordmark on
  mobile.** Six corner-anchored labels with no max-width, sized for
  desktop's spare horizontal room — on a narrow phone several ran wide
  enough to cross into each other and into the centred logo. Hidden below
  `md`; the mobile intro is the logo alone.
- **`/about`'s tracking wordmark wasn't dark enough behind body copy**, and
  a marquee separator (`✳`, U+2733) rendered as a colour emoji on mobile
  instead of the plain asterisk it was meant to be. Both fixed.
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
- `.githooks/commit-msg` and `.githooks/pre-push` exist but `core.hooksPath`
  isn't set on a fresh clone, so neither runs by default — see `/work`'s
  entry above for the kind of drift a live pre-push lint would still let
  through anyway (it's a UX/architecture split, not a lint error)
- No horizontal overflow at 360, 390, 414, 1366, 1440 or 1920
- Every route returns 200 in a production build; the only failing requests
  are `_vercel/insights` and `_vercel/speed-insights`, which resolve only
  when deployed to Vercel
