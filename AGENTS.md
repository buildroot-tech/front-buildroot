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
- **Internal links must use `LocaleLink`**, never plain `next/link`.
  Un-prefixed paths resolve to the default locale, so a plain `href="/work"`
  silently drops a Spanish visitor into English. The one exception is the
  language switcher, which deliberately targets the other locale.

## Copy rules

- **Never name technologies** in client-facing content. No framework names,
  no library names. Describe the outcome.
- **Never state the team size.** "A deliberately small studio", not a number.
- Spanish titles use **sentence case**. Do not apply the Tailwind
  `capitalize` utility to content headings — it forces title case on every
  word and renders "Servicio **A**l Cliente" and "En **O**tros **L**ados".

## Typography

- Use the `.type-*` scale from `globals.css`. Do not invent new `clamp()`
  values per component — that is exactly the drift this scale replaced.
- Those classes set size, weight, leading and tracking only. **Never colour**
  — the route theme supplies that.
- Large serif headings need line-height room. At Tailwind's default
  `line-height: 1`, an `overflow-hidden` ancestor clips the descenders of
  `y`, `j`, `g` and `p`.

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

## Metadata

- Metadata routes (`/icon`, `/apple-icon`, `/opengraph-image`) have no file
  extension, so `proxy.ts` has to skip them explicitly or they get rewritten
  into `/en/...` and 404.
- `ImageResponse` (OG images, app icon) renders in isolation and **cannot
  read `/public`** — geometry has to be inlined in the component.
- Every page exports a `viewport` with a `themeColor` matching the colour at
  the top of that page. Without it, iOS paints a white band above a dark page.

## Before claiming something works

Build it and look at it. This project is verified by driving a real browser
(Playwright) and measuring — screenshots for layout, `getBoundingClientRect`
for position, PerformanceObserver for Web Vitals. Several bugs in this
codebase looked fine in the source and only showed up on screen.
