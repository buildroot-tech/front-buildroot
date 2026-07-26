---
name: devops-deployment
description: Handle deployment, CI/CD, performance optimization, and infrastructure for buildroot_ website. Use during setup, deployment, and optimization phases.
---

# DevOps Deployment Skill

## Goal

Ensure smooth deployment and optimal performance on Vercel.

## Instructions

1. **Verify build**

   ```bash
   npm run build
   ```
   - Check for errors
   - Review bundle size
   - Verify output

2. **Configure environment**

   ```bash
   # .env.local
   FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
   NEXT_PUBLIC_SITE_URL=https://buildroot.dev
   ```

3. **Optimize Next.js**
   - Enable React strict mode
   - Configure image optimization
   - Set security headers

4. **Deploy to Vercel**
   - Connect GitHub repo
   - Configure build settings
   - Set up custom domain

5. **Configure domain**
   - Purchase via Cloudflare
   - Add Vercel DNS records
   - Enable SSL (automatic)

## Vercel Settings

| Setting          | Value        |
| ---------------- | ------------ |
| Framework        | Next.js      |
| Build Command    | `next build` |
| Output Directory | `.next`      |
| Node.js Version  | 20.x         |

## Constraints

- Do NOT commit secrets to git
- Do NOT skip build verification
- Do NOT deploy without user approval
