---
trigger: always_on
description: Core project instructions for buildroot_ website
---

# Core Rules — buildroot_

## Project Identity

- **Company**: buildroot_ (tech venture, 2-3 people)
- **Services**: Web development, technical consulting, SaaS products
- **Style**: Brutalist hybrid (raw + elegant)
- **Mode**: Light mode, dark hero

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
- **Hero Dark**: `#0A0A0A`
- **Body Light**: `#F5F5F0`
- **Accent**: `#FF4500` (orange, used sparingly)
- **Border**: Hard brutalist borders (2-3px solid black)

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

## Constraints

- NO runtime chat agents on the site
- NO heavy JS libraries (keep bundle small)
- ALL content in English
- EVERY page must be accessible (WCAG 2.1 AA)
- EVERY component must be responsive
