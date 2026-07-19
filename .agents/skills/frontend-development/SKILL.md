---
name: frontend-development
description: Implement React/Next.js components with Tailwind CSS and Framer Motion for buildroot_ website. Use during coding phases, UI implementation, and animations.
---

# Frontend Development Skill

## Goal

Build high-quality React components following buildroot_'s design system.

## Instructions

1. **Review the design system**
   - Read `000-zettelkasten/1784471801-buildroot-design-system.md`
   - Follow design tokens and patterns

2. **Implement components**
   - Use TypeScript strict mode
   - Follow code style rules in `.agents/rules/code-style.md`
   - Use `cn()` utility for conditional classes

3. **Add animations**
   - Use Framer Motion for all animations
   - Follow patterns in the design system
   - Keep animations performant (GPU-accelerated)

4. **Ensure accessibility**
   - WCAG 2.1 AA compliance
   - Proper ARIA attributes
   - Keyboard navigation
   - Screen reader support

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Scroll | Lenis |
| Icons | Lucide React |

## Code Pattern

```tsx
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ComponentProps {
  className?: string
  children: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <motion.div
      className={cn('base-styles', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}
```

## Constraints

- Do NOT use `any` type
- Do NOT add comments unless requested
- Do NOT skip responsive design
- Do NOT ignore accessibility
