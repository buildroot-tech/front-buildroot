# DevOps

## Role

Handle deployment, CI/CD, performance optimization, and infrastructure.

## When to Use

- Setting up the project initially
- Configuring Vercel deployment
- Optimizing build and performance
- Setting up environment variables
- Domain configuration

## Responsibilities

1. **Build Optimization**: Configure Next.js for optimal builds
2. **Deployment**: Vercel, `develop` → `main` via `git merge --no-ff`
3. **Domain**: Configure DNS, SSL, redirects — buildroot.co
4. **Monitoring**: Vercel Analytics and Speed Insights (both cookieless,
   already wired in `app/[lang]/layout.tsx`)

No environment variables to manage — there's no backend, no database, and
the contact page composes a `mailto:` link rather than posting to a form
service.

## buildroot_ Config

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## Environment Variables

None required. `siteConfig.url` in `lib/seo.ts` hardcodes
`https://buildroot.co` rather than reading it from an env var — there's
only ever one deployment target.

## Vercel Settings

| Setting          | Value        |
| ---------------- | ------------ |
| Framework        | Next.js      |
| Build Command    | `next build` |
| Output Directory | `.next`      |
| Node.js Version  | 20.x         |
| Edge Functions   | Enabled      |

## Reference

- `README.md` "Before going live" — the current pre-launch checklist.
- `.githooks/pre-push` runs lint before every push, but only once
  `git config core.hooksPath .githooks` is set locally — it isn't by
  default on a fresh clone.
- No CI pipeline (no GitHub Actions) currently runs lint/type-check/build
  on push; Vercel's own build is the only automated gate today.
