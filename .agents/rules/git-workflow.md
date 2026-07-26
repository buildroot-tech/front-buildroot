---
trigger: always_on
description: Git workflow rules for buildroot_ project
---

# Git Workflow Rules — buildroot_

## Branch Strategy

### Primary Branches

| Branch    | Purpose               | Protection                   |
| --------- | --------------------- | ---------------------------- |
| `main`    | Production-ready code | Protected, no direct commits |
| `develop` | Integration branch    | Protected, merge via PR      |

### Supporting Branches

| Branch Pattern   | Purpose                 | Example                 |
| ---------------- | ----------------------- | ----------------------- |
| `feature/<name>` | New features            | `feature/work-page`     |
| `fix/<name>`     | Bug fixes               | `fix/header-scroll`     |
| `hotfix/<name>`  | Urgent production fixes | `hotfix/security-patch` |
| `chore/<name>`   | Maintenance tasks       | `chore/update-deps`     |

## Branch Flow

```
main (production)
  ↑
  │  merge (via PR, approved)
  │
develop (integration)
  ↑
  │  merge (via PR)
  │
feature/* ──── fix/* ──── chore/*
```

## Commit Convention (Conventional Commits)

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | When to Use                  | Example                                |
| ---------- | ---------------------------- | -------------------------------------- |
| `feat`     | New feature                  | `feat(work): add project grid`         |
| `fix`      | Bug fix                      | `fix(header): resolve scroll issue`    |
| `chore`    | Maintenance                  | `chore(deps): update framer-motion`    |
| `docs`     | Documentation                | `docs(readme): add setup instructions` |
| `style`    | Formatting (no logic change) | `style(css): fix spacing`              |
| `refactor` | Code restructuring           | `refactor(hooks): extract useScroll`   |
| `test`     | Adding tests                 | `test(utils): add cn() tests`          |
| `perf`     | Performance improvement      | `perf(images): add lazy loading`       |
| `ci`       | CI/CD changes                | `ci(vercel): add preview deployments`  |

### Rules

1. **Subject line**: Max 72 characters, imperative mood ("add" not "added")
2. **Body**: Wrap at 80 characters, explain WHAT and WHY (not HOW)
3. **Footer**: Reference issues: `Closes #123`
4. **Scope**: Lowercase, matches directory: `home`, `layout`, `ui`, `agents`

### Examples

```bash
feat(home): add hero section with text reveal

- Implement scroll-linked parallax
- Add clip-path transition to body
- Include responsive breakpoints

Closes #42

fix(header): resolve mobile menu overflow

The mobile menu was causing horizontal scroll on iOS devices.
Added overflow-hidden to body when menu is open.

chore: update framer-motion to v11.2.0
```

## Workflow Steps

### 1. Start New Work

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<name>
```

### 2. During Development

```bash
git add <files>
git commit -m "feat(scope): description"
# Keep commits small and focused
```

### 3. Finish Feature

```bash
git checkout develop
git merge --no-ff feature/<name>
git branch -d feature/<name>
git push origin develop
```

### 4. Release to Production

```bash
git checkout main
git merge --no-ff develop
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

## Pull Request Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Manual testing done
- [ ] Responsive tested

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] No console.log statements
- [ ] No commented-out code
```

## Rules

1. **No direct commits to `main`** — Always go through `develop`
2. **One feature per branch** — Keep branches focused
3. **Squash merge for features** — Clean history
4. **Tag releases** — Semantic versioning (v1.0.0)
5. **Delete merged branches** — Keep repo clean
