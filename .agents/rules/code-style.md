---
trigger:
  glob: { ts, tsx, js, jsx }
description: Code style rules for TypeScript and React files
---

# Code Style Rules

## TypeScript

- Use `interface` for object types (not `type` unless union/intersection)
- Prefer `const` over `let`
- No `any` — use `unknown` or proper types
- Use explicit return types for exported functions
- Use `readonly` for immutable arrays/objects

## React Components

```tsx
// Good: Named export, explicit props interface
interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({
  className,
  children,
  variant = "primary",
}: ButtonProps) {
  return <button className={cn("base", variant, className)}>{children}</button>;
}
```

## Styling

- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Prefer Tailwind utilities over custom CSS
- Use design tokens from `globals.css` (CSS custom properties)
- Mobile-first responsive design (`sm:`, `md:`, `lg:`)

## File Naming

| Type       | Convention | Example        |
| ---------- | ---------- | -------------- |
| Components | PascalCase | `Hero.tsx`     |
| Utilities  | camelCase  | `utils.ts`     |
| Constants  | camelCase  | `constants.ts` |
| Pages      | lowercase  | `page.tsx`     |
| CSS        | kebab-case | `globals.css`  |

## Imports

```tsx
// Order: React, Next.js, External libs, Internal
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
```

## Comments

- NO comments unless explicitly requested
- Code should be self-documenting
- Use descriptive variable/function names
