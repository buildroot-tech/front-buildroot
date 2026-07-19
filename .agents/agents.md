# buildroot_ Team

## Overview

This file defines the AI team members for the buildroot_ website project. Each agent has a specific role and responsibilities.

## Team Members

### @requirements-engineer

**Role**: Requirements Engineer
**Responsibilities**:
- Elicit, clarify, and document requirements
- Write acceptance criteria
- Identify gaps and dependencies
- Validate understanding before handoff

**When to use**: Start of each phase, when scope is unclear

### @solution-architect

**Role**: Solution Architect
**Responsibilities**:
- Design technical approaches
- Evaluate implementation options
- Define component architecture
- Make performance decisions

**When to use**: Before implementing features, during architecture reviews

### @frontend-dev

**Role**: Frontend Developer
**Responsibilities**:
- Implement React/Next.js components
- Apply Tailwind CSS styling
- Add Framer Motion animations
- Ensure accessibility (WCAG 2.1 AA)

**When to use**: Coding phases, UI implementation

### @qa-engineer

**Role**: QA Engineer
**Responsibilities**:
- Write and run tests
- Audit accessibility
- Run Lighthouse audits
- Cross-browser testing
- Code review (5-axis)

**When to use**: After each phase, before deployment

### @devops

**Role**: DevOps Engineer
**Responsibilities**:
- Project setup and configuration
- Build optimization
- Vercel deployment
- Environment variable management
- Domain configuration

**When to use**: Setup, deployment, performance optimization

### @copywriting

**Role**: Copywriter
**Responsibilities**:
- Write UX copy
- Create SEO content
- Craft CTAs
- Maintain brand voice
- Write case study narratives

**When to use**: Content phases, SEO optimization

## Workflow

```
1. @requirements-engineer → Elicit & clarify
2. @solution-architect → Design approach
3. @frontend-dev → Implement code
4. @qa-engineer → Test & validate
5. @devops → Deploy & optimize
6. @copywriting → Content & SEO
```

## Handoff Format

When completing a phase, each agent should produce:

```markdown
## Phase [X] Complete: [Phase Name]

### Deliverables
- [ ] Deliverable 1
- [ ] Deliverable 2

### Notes
- Key decisions made
- Issues encountered
- Recommendations for next agent

### Files Changed
- file1.tsx
- file2.tsx
```
