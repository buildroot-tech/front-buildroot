<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Working on this project

`README.md` explains how the site is built. This file is the short list of
things that are easy to get wrong here — each one has already caused a real
bug in this codebase.

## Language and links

- **Spanish is the primary language.** Write it first, keep English at
  parity. Both dictionaries must always have identical key structures.
- Spanish is **usted** throughout, neutral Colombian — no voseo (`tenés`,
  `contanos`), no tuteo (`tu proyecto`, `tienes`).
- **The default locale is `es`.** An un-prefixed path resolves to Spanish;
  English lives at `/en/...`. Three places must agree: `defaultLocale` in
  `proxy.ts`, `DEFAULT_LOCALE` in `LocaleLink.tsx`, and the `x-default`
  hreflang in `buildAlternates()`. Changing one alone sends visitors into
  the wrong language mid-session.
- **Internal links must use `LocaleLink`**, never plain `next/link`.
  Un-prefixed paths resolve to the default locale, so a plain `href="/work"`
  silently drops an English visitor into Spanish. The one exception is the
  language switcher, which deliberately targets the other locale — and it
  must prefix **both** directions explicitly rather than relying on the
  un-prefixed path to mean "the other language".
- **Compare against `normalizeLocalePathname(pathname)`, not raw
  `pathname`, for anything that checks "is this the active route".** Raw
  `pathname` carries the locale prefix (`/en/work`); an href in this
  codebase never does (`/work`). Header's nav-link underline compared them
  directly for a while and could only ever match on the Spanish site —
  the Contact link two lines below it already normalized and was fine.

## Copy rules

- **Never name technologies** in client-facing content. No framework names,
  no library names. Describe the outcome.
- **Never state the team size.** "A deliberately small studio", not a number.
- Spanish titles use **sentence case**. Do not apply the Tailwind
  `capitalize` utility to content headings — it forces title case on every
  word and renders "Servicio **A**l Cliente" and "En **O**tros **L**ados".
  This bit the Footer's contact-info spans directly (six `capitalize`
  usages, unnoticed because the values happened not to visibly break);
  removed rather than left "harmless."
- **Write dictionary values in natural case, even where the display is
  uppercase.** Visual all-caps belongs in CSS (`uppercase tracking-widest`
  on the label/eyebrow treatment, or a display headline) — never bake it
  into the string itself. `home.process.title` and its five step titles,
  plus all six `preloader.*` strings and both ticker strings, were typed
  in as literal `"NUESTRO PROCESO"` while the component already applied
  `uppercase` — redundant, inconsistent with every other value in the same
  files, and worse for screen readers, which can read literal all-caps
  text letter-by-letter as if it were an acronym.

## Typography

- Use the `.type-*` scale from `globals.css`. Do not invent new `clamp()`
  values per component — that is exactly the drift this scale replaced.
- Those classes set size, weight, leading and tracking only. **Never colour**
  — the route theme supplies that.
- Large serif headings need line-height room. At Tailwind's default
  `line-height: 1`, an `overflow-hidden` ancestor clips the descenders of
  `y`, `j`, `g` and `p`.
- Fonts are defined once in `lib/fonts.ts` and shared by every root layout.
  Never re-declare `next/font` calls in a layout.
- `/style-guide` renders this system live. If you change the scale, the
  tokens or the route themes, look at that page — it imports `routeThemes`
  and uses the real `.type-*` classes, so it will show the change rather
  than describe it. It went stale once by being written as prose about a
  system instead of a rendering of it.

## Colour

- Route colour lives in `lib/route-theme.ts` and nowhere else. Header and
  Footer both read it, which is what keeps a section's colour from drifting
  between them. Nested routes inherit their parent section.
- The codebase addresses tokens as `bg-[var(--bg-primary)]`, not via the
  Tailwind classes `@theme inline` generates. Follow that; mixing both makes
  it impossible to grep where a colour is used.

## Motion

- **`ScrambleText` is hover-only.** Route-entry animation belongs to
  `RouteTextShuffle`. Two systems rewriting the same text nodes leave each
  other's half-scrambled output behind — this is what once left the navbar
  permanently reading "krow".
- A bare `setState(...)` in an effect body trips
  `react-hooks/set-state-in-effect`. Call it from a named handler instead of
  silencing the rule.
- Prefer CSS `transform` animations over per-frame JS for anything
  continuous, and honour `prefers-reduced-motion`.
- `scroll-behavior: smooth` is set globally. Any code that scrolls and then
  measures must use `behavior: "instant"`, or it will read the old offset.
- **Import `m` from `framer-motion`, never `motion`.** The app runs under
  `LazyMotion` with `domAnimation` (`app/providers.tsx`) to keep the bundle
  small; `motion.div` bypasses that silently and ships the full library.
- **Don't allocate inside an animation callback.** `PixelImage`'s reveal
  used to call `document.createElement("canvas")` on every tick of an
  0.8s animation — dozens of DOM node allocations per image. Create
  once (a ref), mutate per frame.

### Scroll stacking

`WorkflowSteps`, `ServicesSection` and `ProjectDetail` all share one
mechanic — a tall driver, a `sticky` wrapper, and panels that slide up over
each other, tracked by `useScroll({ target, offset: ["start start", "end end"] })`.
It's implemented three times, not shared, so a fix to the mechanic has to
be manually ported to all three. Gotchas that hit every one of them:

- **`dvh`, not `vh`, for every height in the system** — the driver, the
  sticky wrapper, the panel heights. `vh` is the layout viewport, which is
  taller than what's actually visible whenever a mobile browser's address
  bar is showing. A toolbar collapsing mid-scroll then desyncs the driver's
  measured height from what's really on screen, and `scrollYProgress` jumps
  to compensate — this is what made the scroll feel "stuck" on mobile.
- **`position: sticky` un-pins the instant its driver's scroll room runs
  out — with no easing.** One frame it's fixed in place, the next it's
  scrolling with the page, and whatever comes after in the DOM gets
  revealed mid-frame instead of the last panel getting a clean exit. Fade
  the whole stack's `opacity` to 0 over the tail of the last panel's rest
  window (see `stackFadeStart` in any of the three components) so the cut
  becomes a dissolve. Skipping this reads as a real bug, not a rough edge
  — on `/services` it looked like the previous slide reappearing, because
  that route's background happens to match that slide's colour.
- **Smooth the scroll progress with `useSpring` before it drives any
  transform**, or a hard/fast scroll snaps the whole transition through in
  one or two frames. Target a damping ratio of exactly 1 —
  `damping = 2 * sqrt(stiffness)` — not higher. An overdamped spring
  (ratio > 1, e.g. the `stiffness:100, damping:30` this project shipped
  with briefly) sounds like the cautious choice but actually settles
  *slower* than critical damping, and reads as elastic/rubbery rather than
  smooth. `stiffness: 400, damping: 40` is the current value.
- On mobile, the driver needs less scroll room than desktop — `100dvh` of
  driver per panel is a couple of mouse-wheel clicks, but 5–10 full touch
  swipes, most of which land in the panel's rest window where nothing
  visibly moves. Shorten it on small viewports (the `--seg` custom-property
  pattern in `ServicesSection`/`ProjectDetail`, or the `md:` breakpoint
  class in `WorkflowSteps`) rather than using the desktop-tuned length
  everywhere.

## Routes outside `app/[lang]`

- Anything at the app root — metadata routes, `/style-guide` — must be added
  to `UNLOCALIZED_ROUTES` in `proxy.ts`, or the proxy rewrites it into
  `/en/...`, a path that does not exist, and it 404s. This has now bitten
  twice: `/apple-icon` and `/style-guide`.
- There is **no `app/layout.tsx`**. A root-level route therefore gets Next's
  default root layout — no `globals.css`, no fonts, unstyled text — unless it
  ships its own. `/style-guide` sat both unreachable and unpainted for a
  while, each bug hiding the other.

## Metadata

- Metadata routes (`/icon`, `/apple-icon`, `/opengraph-image`) have no file
  extension, so the `pathname.includes('.')` check in `proxy.ts` does not
  catch them.
- `ImageResponse` (OG images, app icon) renders in isolation and **cannot
  read `/public`** — geometry has to be inlined in the component.
- Every page exports a `viewport` with a `themeColor` matching the colour at
  the top of that page. Without it, iOS paints a white band above a dark page.

## Before claiming something works

Build it and look at it. This project is verified by driving a real browser
(Playwright) and measuring — screenshots for layout, `getBoundingClientRect`
for position, PerformanceObserver for Web Vitals. Several bugs in this
codebase looked fine in the source and only showed up on screen.
