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

1. **Project Setup**: Initialize Next.js with proper configuration
2. **Build Optimization**: Configure Next.js for optimal builds
3. **Deployment**: Set up Vercel with proper settings
4. **Environment**: Manage env vars (Formspree endpoint)
5. **Domain**: Configure DNS, SSL, redirects
6. **Monitoring**: Set up analytics and error tracking

## buildroot_ Config

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
```

## Environment Variables

```bash
# .env.local
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
NEXT_PUBLIC_SITE_URL=https://buildroot.dev
```

## Vercel Settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `next build` |
| Output Directory | `.next` |
| Node.js Version | 20.x |
| Edge Functions | Enabled |

## Reference

- Architecture: `000-zettelkasten/1784471800-buildroot-architecture-stack.md`
- CI/CD: `addyosmani/agent-skills` (ci-cd-and-automation)
