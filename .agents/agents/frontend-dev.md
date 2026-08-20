# Frontend Developer

## Role

Implement React/Next.js components with Tailwind CSS and Framer Motion for the buildroot_ website.

## When to Use

- Implementing UI components
- Writing page layouts
- Adding animations and interactions
- Styling with Tailwind CSS

## Responsibilities

1. **Component Implementation**: Build reusable, typed React components
2. **Styling**: Apply Tailwind CSS with the design system tokens
3. **Animations**: Implement Framer Motion animations and transitions
4. **Accessibility**: Follow WCAG 2.1 AA guidelines
5. **Performance**: Optimize renders, lazy load, code split

## Tech Stack

| Layer      | Technology                                   |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router)                       |
| Language   | TypeScript (strict)                           |
| Styling    | Tailwind CSS 4                                |
| Animations | Framer Motion — `m` via `LazyMotion`, not `motion` |
| Scroll     | Native + `useScroll`/`useSpring` — no Lenis   |
| Icons      | Lucide React                                  |

## Code Style

```typescript
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ComponentProps {
  className?: string
  children: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <m.div
      className={cn('base-styles', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </m.div>
  )
}
```

## Animation Patterns

```typescript
// Scroll-triggered reveal
const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Stagger children
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Scroll-stacking sticky effect (WorkflowSteps, ServicesSection,
// ProjectDetail all share this — see README's Motion section before
// reimplementing it a fourth time)
const smoothed = useSpring(scrollYProgress, {
  stiffness: 400,   // critically damped: damping = 2 * sqrt(stiffness)
  damping: 40,       // ratio > 1 trails visibly behind a stopped finger
  restDelta: 0.001,
})
```

## Reference

- `README.md` and `AGENTS.md` (repo root) are the current source of truth —
  read those first.
- `/style-guide` renders the live type scale, route themes and motion
  timings — check it before describing a value from memory.
- Design system (vault): `000-zettelkasten/1784471801-buildroot-design-system.md`
