# buildroot_ — site

Marketing site for buildroot_, a software studio in Ipiales, Colombia.
Next.js 16 (App Router), TypeScript, Tailwind v4, Framer Motion.

Production: <https://buildroot.co>

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the build
npm run lint
npx tsc --noEmit     # type check
```

Node 20+. No environment variables are required — there is no backend, no
database and no third-party form service.

---

## How the site is put together

### Routing and language

Routes live under `app/[lang]/`, with `es` and `en` dictionaries in
`dictionaries/`. **Spanish is the primary language**; English is kept at
parity.

`proxy.ts` rewrites un-prefixed paths to the default locale, which is
**`es`** — so `buildroot.co/work` serves Spanish and `/en/work` serves
English. The bare domain is the URL people link and share, so it points at
the language the local market actually searches in.

Because of that, a plain `href="/work"` means _"work in Spanish"_, not
_"work in the current language"_ — internal links must use **`LocaleLink`**
(`components/ui/LocaleLink.tsx`), which carries the active locale across
navigation. Use plain `next/link` only for the language switcher, which
deliberately targets the other locale and prefixes it explicitly.

Three places must agree on the default: `defaultLocale` in `proxy.ts`,
`DEFAULT_LOCALE` in `LocaleLink.tsx`, and the `x-default` hreflang in
`buildAlternates()`.

Routes that live at the app root instead of under `app/[lang]` — the
metadata routes and `/style-guide` — must be listed in `UNLOCALIZED_ROUTES`
in `proxy.ts`, or that rewrite sends them to a path that does not exist.
There is also no `app/layout.tsx`, so such a route has to ship its own root
layout with `globals.css` and the fonts; otherwise Next hands it a bare
default layout and it renders unstyled.

### Type scale

`app/globals.css` defines the scale once, under `TYPE SCALE`:

| Class             | Role                                       |
| ----------------- | ------------------------------------------ |
| `.type-eyebrow`   | Section label, sits in the left 46% column |
| `.type-statement` | The opening statement opposite it          |
| `.type-title`     | Centred section headings                   |
| `.type-manifesto` | Full-bleed declarations                    |
| `.type-lead`      | Secondary serif paragraph                  |
| `.type-body`      | Running copy                               |

They carry size, weight, leading and tracking only — **never colour** — so
they compose over each route's own theme without per-page overrides. Prefer
these over inventing new `clamp()` values.

The three typefaces are declared once in `lib/fonts.ts` and shared by every
root layout.

**`/style-guide` renders all of this live** — it imports `routeThemes` and
uses the real `.type-*` classes rather than describing them, so it shows the
system as it actually is. Excluded from indexing.

### Route colour

`lib/route-theme.ts` is the single source of truth for each section's
background, text and border. The Header and Footer read from it, and each
page sets the same values as CSS variables on its wrapper. Each page also
exports a `viewport` with a matching `themeColor`, which is what colours the
browser chrome behind the status bar on mobile.

### Motion

- **Page transitions** — `components/ui/RouteTextShuffle.tsx`. On entering a
  route, the text already on screen unscrambles into place: each word shows
  only _its own_ characters rearranged, so every word keeps its final width
  and nothing reflows.
- **Scroll stacking** — `WorkflowSteps` (home), `/services`' slides and the
  case-study panels in `ProjectDetail` share one mechanic: a tall driver
  section sized in `dvh` (shorter on mobile — a touch swipe covers far less
  ground than a mouse-wheel click), a `sticky` wrapper, and panels that
  slide up over each other. The slide takes 60% of a panel's segment,
  leaving 40% as a real rest window. The scroll progress driving it is
  spring-smoothed (critically damped, `stiffness: 400, damping: 40`) so a
  hard scroll eases through the transition instead of snapping it. The
  whole stack fades to transparent over the last panel's rest window,
  rather than getting mechanically clipped the instant `position: sticky`
  releases — see `AGENTS.md`'s "Scroll stacking" section for why that
  matters. The mechanic is implemented three times, not shared; a change to
  it needs porting to all three files.
- **Marquees** — `.marquee-track` in `globals.css`. CSS `transform` only, so
  they run on the compositor with no per-frame JS. They honour
  `prefers-reduced-motion`.
- **`ScrambleText`** owns hover only. Route-entry animation belongs to
  `RouteTextShuffle`; two systems rewriting the same text nodes will leave
  each other's half-scrambled output behind.

### Content

All copy lives in `dictionaries/{en,es}.json`; project case studies live in
`lib/projects.ts`, with Spanish translations merged by `getProjects(locale)`.

Two rules the copy follows:

1. **No technology names in client-facing content.** Clients don't buy
   frameworks — describe what the work achieved.
2. **No team-size numbers.** "A deliberately small studio", not "two people".

Spanish is written in **usted** throughout, in a neutral Colombian register.
Section titles use sentence case, not title case — and note that the CSS
`capitalize` utility breaks Spanish ("Servicio **A**l Cliente"), so it is
deliberately absent from content headings.

### Local SEO

The market is regional and cross-border, so the site is targeted rather
than generic:

- `localizedSeo` in `lib/seo.ts` holds per-locale title, description and
  keywords. Spanish is the primary one and its terms are the ones people
  actually type — "desarrollo web Ipiales", not "SaaS engineering".
- `localBusinessJsonLd()` emits a `ProfessionalService` graph with the
  postal address, coordinates, and `areaServed` covering **Nariño and
  northern Ecuador**: Ipiales, Pasto, Tulcán, Carchi, Ibarra, Imbabura. A
  `GeoCircle` of 150 km around Ipiales says the catchment is continuous
  across the border, which a list of names alone can't.
- `og:locale` is `es_CO`, not `es_ES` — the region half of that tag is a
  targeting signal.

Every page's `description` should mention what it is and where. A page that
never says where it is cannot rank for where it is.

### Brand assets

`public/brand/` holds the full mark set. `buildroot-word-white.svg` and
`buildroot-underscore-white.svg` are the wordmark split in two, sharing the
original `viewBox`, so the underscore can blink independently on `/about`
while stacking back into the exact logo.

---

## Current state

Measured on a production build, desktop (1440×900):

| Page              | LCP    | CLS    | Long tasks | Transfer |
| ----------------- | ------ | ------ | ---------- | -------- |
| `/es`             | 636 ms | 0.0001 | 0          | 109 KB   |
| `/es/work`        | 312 ms | 0.0001 | 1 (66 ms)  | 109 KB   |
| `/es/about`       | 124 ms | 0.0001 | 0          | 109 KB   |
| `/es/services`    | 204 ms | 0.0001 | 0          | 109 KB   |
| `/es/contact`     | 220 ms | 0.0001 | 0          | 109 KB   |
| `/es/work/[slug]` | 228 ms | 0.0001 | 0          | 188 KB   |

Route transitions hold 60fps with zero long tasks.

Every page is within budget. The case-study page was the one outlier at
864 KB until the project images were re-encoded to WebP; it is now 188 KB.

See `PERFORMANCE_REVIEW.md` for the remaining technical debt.

---

## Legal pages

`/privacy` and `/cookies` exist in both locales, driven by the `legal` block
in the dictionaries and rendered by `components/legal/LegalSection.tsx`.

They describe what the site **actually** does, which is very little: Vercel
Analytics and Speed Insights (both cookieless and aggregate), one
`sessionStorage` key for the intro animation, and no forms — the contact page
hands the message to the visitor's own mail client, so nothing is stored or
routed through a third party.

`UPDATED_ON` in each page is the date shown as "last updated". **Bump it by
hand when the wording changes** — deriving it from the build date would make
the page quietly claim a revision that never happened.

> Written to be accurate, not to be legal advice. Have a lawyer read them
> before launch, particularly the Ley 1581 de 2012 wording.

## Newsletter — planned, not built

The footer link was removed rather than left pointing at a 404. Building it
properly means:

1. **Pick a provider.** Buttondown or Resend Audiences fit a studio this size;
   Mailchimp is heavier than this needs.
2. **Add a route to receive sign-ups** — the first server-side code in the
   project. It needs an API key in the environment, which is also the first
   secret this repo would carry.
3. **Update the legal pages.** An email address is personal data: the privacy
   page currently states there are no forms and nothing is stored, and that
   would stop being true. Sign-up needs explicit consent and a working
   unsubscribe.
4. **Decide who writes it.** A subscribe box with nothing behind it is worse
   than no box at all.

Until steps 1–4 are decided, there is nothing to maintain.

## Before going live

- [ ] **Replace the LinkedIn URL.** `lib/seo.ts` still holds a placeholder
      (`linkedin.com/company/buildroot`). It feeds both the footer and the
      Organization JSON-LD, so a wrong value is published twice. GitHub is
      already correct (`github.com/buildroot-tech`); Instagram and Twitter
      have been removed — there are no accounts.
- [ ] **Swap ™ for ® only once the trademark is actually granted.** The
      footer mark currently claims ™, which needs no registration. See
      `components/layout/Footer.tsx`.
- [ ] **Have the legal pages reviewed** by someone qualified.
- [ ] **Verify the production domain.** `lib/seo.ts` sets `buildroot.co`,
      which drives canonical URLs, the sitemap and OG image URLs.
- [ ] **Create the Google Business Profile for Ipiales.** This is the single
      biggest remaining lever for local search: it is what puts the studio in
      the map pack and in "near me" results. The `ProfessionalService` markup
      already on the site supports that listing, but it cannot replace it.
- [ ] **Submit the sitemap** in Google Search Console, and set the
      international targeting there once the profile exists.

### Done

- [x] **Project images optimised.** The four 1024×1024 JPEGs in
      `public/projects/` were re-encoded to WebP: 3.4 MB → 480 KB, taking a
      case-study page from 864 KB to 188 KB.
- [x] **`/style-guide` rewritten against the current system**, and the
      superseded brutalist utilities deleted along with their orphaned
      tokens. The page was also 404ing and rendering unstyled; both are
      fixed. It stays excluded from indexing.
- [x] **`/privacy` and `/cookies` written** in both locales.
