---
name: requirements-engineering
description: Elicit, clarify, and document requirements for buildroot_ website features. Use when starting a new phase, scope is unclear, or before implementing features.
---

# Requirements Engineering Skill

## Goal

Elicit clear, actionable requirements for buildroot_ website features and phases.

## Instructions

1. **Review the task/phase description**
   - Read the tracker file at `050-tracker/1784471803-buildroot-website-tracker.md`
   - Understand what needs to be built

2. **Ask clarifying questions**
   - UI: What should it look like? Any references?
   - Behavior: What happens on interaction? Edge cases?
   - Content: What text/images/data is needed?
   - Priority: Essential vs. nice-to-have?

3. **Document requirements**
   - Write in structured format (see template below)
   - Identify dependencies and blockers
   - List edge cases

4. **Get confirmation**
   - Present requirements to user
   - Wait for explicit approval before proceeding
   - Hand off to @solution-architect

## Output Template

```markdown
## Requirement: [Feature Name]

### User Story
As a [user type], I want [goal] so that [benefit].

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Edge Cases
- Case 1: Expected behavior
- Case 2: Expected behavior

### Dependencies
- Depends on: [component/feature]
- Blocks: [component/feature]
```

## Constraints

- Do NOT start implementation without user approval
- Do NOT skip edge cases
- Do NOT assume — ask when unsure
