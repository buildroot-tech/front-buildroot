---
name: quality-assurance
description: Ensure quality through testing, accessibility audits, and performance validation for buildroot_ website. Use after each phase, before deployment, or when bugs are reported.
---

# Quality Assurance Skill

## Goal

Validate that all code meets buildroot_'s quality standards.

## Instructions

1. **Run linting and type checks**

   ```bash
   npm run lint
   npx tsc --noEmit
   ```
   - Zero warnings allowed
   - Zero type errors

2. **Test responsiveness**
   - Mobile (320px+)
   - Tablet (768px+)
   - Desktop (1024px+)
   - Wide (1440px+)

3. **Run Lighthouse audit**
   - Performance: 95+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

4. **Code review (5-axis)**
   - Correctness: Does it work as expected?
   - Readability: Is it easy to understand?
   - Architecture: Is it well-structured?
   - Security: Are there vulnerabilities?
   - Performance: Is it optimized?

5. **Document findings**
   - List issues found
   - Provide fix recommendations
   - Hand off to @devops

## Quality Gates

| Gate       | Criteria      | Tool            |
| ---------- | ------------- | --------------- |
| Lint       | Zero warnings | ESLint          |
| Type Check | Zero errors   | TypeScript      |
| Lighthouse | 95+ all       | Chrome DevTools |
| A11y       | WCAG 2.1 AA   | axe-core        |

## Constraints

- Do NOT skip any quality gate
- Do NOT approve code with warnings
- Do NOT ignore accessibility issues
