---
trigger: always_on
description: Core project instructions for buildroot_ website
---

# Core Rules — buildroot_

## Project Identity

- **Company**: buildroot_ (tech venture, 2-3 people)
- **Services**: Web development, technical consulting, SaaS products
- **Style**: Brutalist hybrid (raw + elegant)
- **Mode**: Light mode, dark hero (blue)

## Tech Stack (Non-negotiable)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Scroll | Lenis |
| Icons | Lucide React |
| Forms | Formspree |
| Deploy | Vercel (free tier) |

## Design Tokens

- **Font Display**: Space Grotesk
- **Font Mono**: JetBrains Mono
- **Hero**: `#0F172A` (azul marino)
- **Body**: `#F8FAFC` (off-white frío)
- **Secondary**: `#E2E8F0` (gris azulado)
- **Accent**: `#2563EB` (azul vibrante)
- **Border**: `#0F172A` (azul oscuro)
- **Text Primary**: `#0F172A`
- **Text Muted**: `#64748B`
- **Text Inverse**: `#F8FAFC`

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 100 |
| FCP | <1.5s |
| LCP | <2.5s |
| TBT | <200ms |
| CLS | <0.1 |

## File Structure

```
buildroot/
├── app/              # Next.js App Router pages
├── components/       # React components (ui/, layout/, home/, work/, about/, process/)
├── lib/              # Utilities, data, constants
├── public/           # Static assets
└── .agents/          # AI configuration
```

## Git Workflow

See: `.agents/rules/git-workflow.md`

- **Main branches**: `main` (production), `develop` (integration)
- **Feature branches**: `feature/<name>`, `fix/<name>`, `chore/<name>`
- **Commits**: Conventional commits format
- **PRs**: Required for all changes to `main` and `develop`

## Constraints

- NO runtime chat agents on the site
- NO heavy JS libraries (keep bundle small)
- ALL content in English
- EVERY page must be accessible (WCAG 2.1 AA)
- EVERY component must be responsive
- ALWAYS use conventional commits
- ALWAYS create feature branches for new work
