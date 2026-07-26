---
name: solution-architecture
description: Design technical approaches and architecture decisions for buildroot_ website. Use before implementing features, when multiple approaches exist, or during architecture reviews.
---

# Solution Architecture Skill

## Goal

Design optimal technical approaches for buildroot_ website features.

## Instructions

1. **Understand the requirement**
   - Read the approved requirements from @requirements-engineer
   - Review the architecture at `000-zettelkasten/1784471800-buildroot-architecture-stack.md`

2. **List possible approaches**
   - Consider 2-3 implementation options
   - Evaluate: complexity, performance, maintainability, bundle size

3. **Recommend the best approach**
   - Provide clear rationale
   - Document trade-offs
   - Get user approval

4. **Document the decision**
   - Use the output template below
   - Hand off to @frontend-dev

## Architecture Patterns

| Pattern             | When to Use                        |
| ------------------- | ---------------------------------- |
| Server Components   | Static content, SEO-critical pages |
| Client Components   | Interactive UI, animations, state  |
| Compound Components | Complex UI (menus, tabs)           |
| Custom Hooks        | Reusable stateful logic            |

## Output Template

```markdown
## Architecture Decision: [Feature]

### Context

What problem are we solving?

### Options

#### Option A: [Name]

- Pros: ...
- Cons: ...
- Complexity: Low/Medium/High

### Recommendation

Option [X] because [rationale].

### Implementation Notes

- Key files to create/modify
- Performance considerations
```

## Constraints

- Do NOT implement — only design and recommend
- Do NOT ignore performance impact
- Do NOT skip bundle size analysis
