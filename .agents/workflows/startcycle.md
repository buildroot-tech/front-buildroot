---
description: Start the buildroot_ development cycle for a new phase
---

When the user types `/startcycle <phase>`, orchestrate the development process using the buildroot_ team.

## Execution Sequence

1. **@requirements-engineer**: Analyze the phase requirements
   - Clarify scope and acceptance criteria
   - Document in structured format
   - Get user confirmation before proceeding

2. **@solution-architect**: Design the technical approach
   - Evaluate implementation options
   - Recommend architecture pattern
   - Document decision and rationale

3. **@frontend-dev**: Implement the code
   - Build components following design system
   - Apply animations and interactions
   - Ensure accessibility

4. **@qa-engineer**: Validate quality
   - Run linting and type checks
   - Test responsiveness
   - Run Lighthouse audit
   - Review code (5-axis)

5. **@copywriting**: Add content and SEO
   - Write UX copy
   - Add metadata
   - Optimize for search

6. **@devops**: Finalize deployment
   - Verify build
   - Check environment variables
   - Prepare for Vercel

## Phase List

| Phase | Name | Description |
|-------|------|-------------|
| 0 | Setup | Project initialization (DONE) |
| 1 | Design System | CSS tokens, typography, palette |
| 2 | Layout | Header, Footer, Page Transitions |
| 3 | Home | Hero, Services, Highlights, CTA |
| 4 | Work | Project grid, Case studies |
| 5 | About | Team, Philosophy, Stack |
| 6 | Process | Methodology timeline |
| 7 | Contact | Formspree form |
| 8 | Easter Egg | Click pattern |
| 9 | SEO | Sitemap, robots, OG images |
| 10 | Polish | Responsive, testing, a11y |
| 11 | Deploy | Vercel + domain |

## Example

```
/startcycle 1
```

This will:
1. Have @requirements-engineer clarify Phase 1 scope
2. Have @solution-architect design the approach
3. Have @frontend-dev implement the design system
4. Have @qa-engineer validate
5. Have @copywriting add any needed content
6. Have @devops verify build
