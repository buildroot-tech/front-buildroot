---
trigger: always_on
description: Core project instructions for buildroot_ website
---

# Core Rules — buildroot_

The build is done and the site is live at buildroot.co. This file used to
describe the pre-build plan; it now describes what actually shipped. Where
this file and `AGENTS.md` / `README.md` (repo root) disagree, those two win —
they're the ones kept current session to session. This file should not.

## Project Identity

- **Company**: buildroot_, a software studio in Ipiales, Nariño, Colombia.
- **Services**: Web development, technical consulting, SaaS products.
- **Market**: Local and cross-border — Ipiales, Pasto, all of Nariño, and
  northern Ecuador (Tulcán, Carchi, Ibarra, Imbabura).
- **Style**: Editorial — serif statements over a per-route colour field, mono
  reserved for labels and metadata. Not the brutalist system this file used
  to describe; that was tried and dropped before launch (see the design
  system's "Decisions that were reversed" section).

## Tech Stack

| Layer      | Technology                              |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router)                  |
| Language   | TypeScript (strict)                      |
| Styling    | Tailwind CSS 4                           |
| Animations | Framer Motion — `m` via `LazyMotion`, not `motion` |
| Scroll     | Native + Framer Motion `useScroll`/`useSpring` — no Lenis |
| Icons      | Lucide React                             |
| Forms      | None — the contact page composes a `mailto:` link, nothing is posted anywhere |
| Deploy     | Vercel                                   |

No backend, no database, no environment variables required.

## Design Tokens

Read from `lib/route-theme.ts` and `app/globals.css` — do not copy values
here, they will drift. As of this writing: accent `#2563eb`, hero
`#000000`, body `#e2e8f0`, work `#f5f5f0`. Fonts: Poppins (`--font-display`),
Crimson Pro (`--font-serif`), Geist Mono (`--font-mono`), declared once in
`lib/fonts.ts`. `/style-guide` renders the live system — check it instead of
trusting a written description, including this one.

## Performance Targets

| Metric     | Target | Measured (see `PERFORMANCE_REVIEW.md`) |
| ---------- | ------ | --------------------------------------- |
| LCP        | <2.5s  | 124–636 ms across routes                |
| CLS        | <0.1   | 0.0001                                  |
| Long tasks | 0      | 0 on load                               |

## File Structure

```
front-buildroot/
├── app/[lang]/       # Localized routes — es (default) and en
├── app/style-guide/  # Lives at the app root, its own root layout
├── components/       # ui/, layout/, home/, work/, services/, about/, contact/, legal/
├── lib/               # projects.ts, seo.ts, route-theme.ts, dictionaries.ts, fonts.ts, utils.ts
├── dictionaries/      # es.json, en.json — structurally identical
├── public/brand/      # Wordmark split into word + underscore SVGs
└── .agents/           # This directory
```

## Git Workflow

See `.agents/rules/git-workflow.md`.

- **Branches**: `develop` (integration) → `main` (production), merged with
  `--no-ff` so `main`'s history stays a readable list of merges.
- **Commits**: Conventional commits. `.githooks/commit-msg` enforces the
  format and `.githooks/pre-push` runs lint — but only if `core.hooksPath`
  is set to `.githooks` locally; it is not set by default.

## Constraints

- **Spanish is the primary language**, `usted`, neutral Colombian, no
  voseo. English kept at parity. Not "all content in English" — that was
  the old plan and it inverted before launch.
- No technology names and no team-size numbers in client-facing copy.
- No `any`. No unrequested comments unless they carry a non-obvious *why*
  — a hidden constraint, a workaround, a reversed decision. This codebase
  leans on that kind of comment heavily; "no comments unless requested"
  undersells how much of it explains a real bug or trade-off.
- Every page responsive and reachable in both locales.
