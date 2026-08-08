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

`proxy.ts` rewrites un-prefixed paths to the default locale, so `/work`
serves English and `/es/work` serves Spanish. Because of that, a plain
`href="/work"` means *"work in English"*, not *"work in the current
language"* — internal links must therefore use **`LocaleLink`**
(`components/ui/LocaleLink.tsx`), which carries the active locale across
navigation. Use plain `next/link` only for the language switcher itself,
which deliberately targets the other locale.

### Type scale

`app/globals.css` defines the scale once, under `TYPE SCALE`:

| Class | Role |
| --- | --- |
| `.type-eyebrow` | Section label, sits in the left 46% column |
| `.type-statement` | The opening statement opposite it |
| `.type-title` | Centred section headings |
| `.type-manifesto` | Full-bleed declarations |
| `.type-lead` | Secondary serif paragraph |
| `.type-body` | Running copy |

They carry size, weight, leading and tracking only — **never colour** — so
they compose over each route's own theme without per-page overrides. Prefer
these over inventing new `clamp()` values.

### Route colour

`lib/route-theme.ts` is the single source of truth for each section's
background, text and border. The Header and Footer read from it, and each
page sets the same values as CSS variables on its wrapper. Each page also
exports a `viewport` with a matching `themeColor`, which is what colours the
browser chrome behind the status bar on mobile.

### Motion

- **Page transitions** — `components/ui/RouteTextShuffle.tsx`. On entering a
  route, the text already on screen unscrambles into place: each word shows
  only *its own* characters rearranged, so every word keeps its final width
  and nothing reflows.
- **Scroll stacking** — `/services` slides and the case-study panels in
  `ProjectDetail` share one mechanic: a tall driver section, a `sticky`
  wrapper, and panels that slide up over each other. The slide takes 60% of
  a panel's segment, leaving 40% as a real rest window.
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

### Brand assets

`public/brand/` holds the full mark set. `buildroot-word-white.svg` and
`buildroot-underscore-white.svg` are the wordmark split in two, sharing the
original `viewBox`, so the underscore can blink independently on `/about`
while stacking back into the exact logo.

---

## Current state

Measured on a production build, desktop (1440×900):

| Page | LCP | CLS | Long tasks | Transfer |
| --- | --- | --- | --- | --- |
| `/es` | 256 ms | 0.0001 | 1 | 108 KB |
| `/es/work` | 236 ms | 0.0001 | 0 | 108 KB |
| `/es/about` | 160 ms | 0.0001 | 0 | 108 KB |
| `/es/contact` | 216 ms | 0.0001 | 0 | 108 KB |
| `/es/work/[slug]` | 208 ms | 0.0001 | 0 | 864 KB |

Route transitions hold 60fps with zero long tasks.

See `PERFORMANCE_REVIEW.md` for the open items behind that 864 KB and the
rest of the outstanding technical debt.

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

- [ ] **Optimise the project images.** `public/projects/` is 3.5 MB of
      1024×1024 JPEGs served unoptimised — the single largest thing on the
      site. This is why a case-study page transfers 864 KB against 108 KB
      everywhere else. See `PERFORMANCE_REVIEW.md` §1.
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
- [ ] **Decide what happens to `/style-guide`** — it documents the superseded
      brutalist system and is the only thing still using those CSS utilities.
      Currently excluded from indexing. See `PERFORMANCE_REVIEW.md` §3.
