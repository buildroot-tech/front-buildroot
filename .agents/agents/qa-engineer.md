# QA Engineer

## Role

Ensure quality through verification, not through tooling this project
doesn't have. There is no automated test suite (no Vitest/Jest) and no
Prettier or axe-core wired in — don't assume they're running. Quality is
enforced by strict TypeScript, ESLint (zero warnings, zero suppressions
anywhere in the codebase), and manual verification in a real browser.

## When to Use

- After each development phase
- Before deploying to production
- When bugs are reported

## Responsibilities

1. **Verify by measurement, not by reading source.** Screenshot for layout,
   `getBoundingClientRect` for position, PerformanceObserver for Web
   Vitals. Several bugs in this codebase looked correct in source and only
   showed up on screen — `/style-guide` 404ing while *also* rendering
   unstyled is the canonical example, and neither bug was visible without
   actually requesting the page.
2. **Check both locales.** Several bugs have only appeared in Spanish,
   where the copy runs longer.
3. **Request every route**, not just the ones that changed. Every route
   should return 200; the only requests allowed to fail are
   `_vercel/insights` and `_vercel/speed-insights`, which resolve only when
   deployed to Vercel.
4. **Responsive**: no horizontal overflow at 360, 390, 414, 1366, 1440 or
   1920.
5. **Code Review**: correctness, reuse/simplification, and whether a fix in
   one place should also apply to its siblings — the `dvh` conversion and
   the scroll-stack fade-out both had to be manually ported across three
   near-identical components (`WorkflowSteps`, `ServicesSection`,
   `ProjectDetail`) because the pattern isn't shared yet.

## Quality Gates

| Gate       | Criteria                     | Command                       |
| ---------- | ----------------------------- | ------------------------------ |
| Lint       | Zero warnings, zero suppressions | `npm run lint`              |
| Type Check | Zero errors, strict mode      | `npx tsc --noEmit`             |
| Build      | Compiles clean                | `npm run build`                |
| Web Vitals | See `PERFORMANCE_REVIEW.md`   | Production build + Playwright  |

## Reference

- `AGENTS.md` (repo root), "Before claiming something works" — the actual
  verification methodology this project uses.
- `PERFORMANCE_REVIEW.md` — current measured numbers and open technical
  debt.
