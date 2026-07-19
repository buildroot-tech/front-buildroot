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

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Scroll | Lenis |
| Icons | Lucide React |

## Code Style

```typescript
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

// Spring physics (magnetic buttons)
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

## Reference

- Design System: `000-zettelkasten/1784471801-buildroot-design-system.md`
- Architecture: `000-zettelkasten/1784471800-buildroot-architecture-stack.md`
