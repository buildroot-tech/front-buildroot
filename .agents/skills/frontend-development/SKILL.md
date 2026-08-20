---
name: frontend-development
description: Implement React/Next.js components with Tailwind CSS and Framer Motion for buildroot_ website. Use during coding phases, UI implementation, and animations.
---

# Frontend Development Skill

## Goal

Build high-quality React components following buildroot_'s design system.

## Instructions

1. **Review the design system**
   - Check `/style-guide` (renders the live type scale, route themes and
     motion timings) and `lib/route-theme.ts` before writing a colour or
     size value — never invent one.
   - Vault reference: `000-zettelkasten/1784471801-buildroot-design-system.md`

2. **Implement components**
   - Use TypeScript strict mode
   - Follow code style rules in `.agents/rules/code-style.md`
   - Use `cn()` utility for conditional classes

3. **Add animations**
   - Import `m` from `framer-motion`, not `motion` — the app runs under
     `LazyMotion` with `domAnimation` (`app/providers.tsx`) for a smaller
     bundle, and `motion.div` opts a component out of that silently.
   - Keep animations performant (GPU-accelerated transforms/opacity)
   - Scroll-linked effects (`WorkflowSteps`, `ServicesSection`,
     `ProjectDetail`) share one mechanic — read the "Scroll stacking"
     section of `README.md` before adding a fourth implementation of it.

4. **Ensure accessibility**
   - Proper ARIA attributes, keyboard navigation, screen reader support

## Tech Stack

| Layer      | Technology                                    |
| ---------- | ---------------------------------------------- |
| Framework  | Next.js 16 (App Router)                        |
| Language   | TypeScript (strict)                            |
| Styling    | Tailwind CSS 4                                 |
| Animations | Framer Motion — `m` via `LazyMotion`, not `motion` |
| Scroll     | Native + `useScroll`/`useSpring` — no Lenis    |
| Icons      | Lucide React                                   |

## Code Pattern

```tsx
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function Component({ className, children }: ComponentProps) {
  return (
    <m.div
      className={cn("base-styles", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </m.div>
  );
}
```

## Constraints

- Do NOT use `any` type
- Do NOT add a comment unless it carries a non-obvious *why* — a hidden
  constraint, a workaround, a reversed decision. Don't explain *what* the
  code does.
- Do NOT skip responsive design
- Do NOT ignore accessibility
- Do NOT hardcode a colour or type size that already exists in
  `lib/route-theme.ts` or the `.type-*` scale
