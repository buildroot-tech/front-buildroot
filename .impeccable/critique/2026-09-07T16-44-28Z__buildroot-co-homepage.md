---
target: buildroot.co homepage
total_score: 17
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 1
target_identity: "file:/home/clouder/Documents/projects/buildroot/front-buildroot/buildroot.co homepage"
timestamp: 2026-09-07T16-44-28Z
slug: buildroot-co-homepage
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading states; scroll-stacking has no progress indicator |
| 2 | Match System / Real World | 3 | Spanish fluent; jargon leaks on /services ("SaaS", "CI/CD") |
| 3 | User Control and Freedom | 2 | No Escape on mobile menu; engagement slider auto-advances |
| 4 | Consistency and Standards | 4 | Route-theme system rigorously enforced; component patterns consistent |
| 5 | Error Prevention | n/a | Persuade mode |
| 6 | Recognition Rather Than Recall | 3 | Nav underlines on hover/active; language switch visible but subtle |
| 7 | Flexibility and Efficiency | n/a | Persuade mode |
| 8 | Aesthetic and Minimalist Design | 3 | Strong hierarchy; hero is dense but each element is lightweight |
| 9 | Error Recovery | n/a | Persuade mode |
| 10 | Help and Documentation | n/a | Persuade mode |

**Total: 17/24 (71%) — Good**

## Design Specificity Verdict

**Authored.** Not category-interchangeable. The interweaving diagonal SVGs, wireframe volcanoes (Cumbal & Chiles), LAT/LON coordinates, blinking underscore cursor, per-route colour-field system, and scroll-stacking are structurally tied to this product's identity. The WorkflowSteps section (5 numbered cards) is the one area that drifts toward agency template.

## Overall Impression

The hero is cinematic and the per-route theming creates a genuine journey through distinct spaces. The copy quality on the homepage is excellent — human, specific, no jargon. The emotional momentum stalls at WorkflowSteps where the visual craft outpaces the content. The footer's real address, coordinates, and phone number are the strongest trust signal on the site.

## What's Working

1. **Per-route colour-field system** — architecturally elegant, each section owns a background, components stay transparent. Header and Footer read from the same source.
2. **Scroll-stacking mechanics** — 60/40 travel/rest split, spring smoothing, fade-out on un-pin. The `dvh` vs `vh` comment shows deep attention to mobile.
3. **Branded interaction vocabulary** — ScrambleText hover, blinking `*`/`_` CTA, cursor-blink logo, word-by-word manifesto reveal. Consistent system, not mechanical.

## Priority Issues

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | **P1** | WorkflowSteps copy is generic agency filler ("unbreakable", "ready to dominate") — doesn't earn the premium visual treatment | Rewrite to reference buildroot-specific context (cross-border, direct-developer, regional) |
| 2 | **P1** | Hero visual density competes with headline — volcanoes at 25% opacity, dot grid, coordinates, 7 diagonal lines all compete for attention | Reduce volcanoes to 10-12% opacity; remove dot grid OR coordinates |
| 3 | **P2** | Mobile menu has no Escape key handler — keyboard users are trapped | Add `keydown` listener for Escape |
| 4 | **P2** | Services engagement slider auto-advances with no permanent pause — violates user control | Add pause/play toggle or stop auto-advance entirely |
| 5 | **P3** | Footer contact block may overflow on 320px viewports | Test and add mobile stacking override |

## Persona Red Flags

**Jordan (First-Timer):**
- "Veamos su proyecto" CTA ambiguity — implies showing YOUR project to buildroot, not viewing portfolio
- /services page jargon ("SaaS", "CI/CD", "multi-tenant") — target audience (PyMEs) may not know these
- No pricing signal on homepage — PyMEs need cost context early

**Casey (Distracted Mobile):**
- Scroll-stacking needs 5 sustained swipes — no hint scrolling works on initial paint
- Mobile menu covers full screen, loses scroll context
- Footer contact dense on short phones

**Riley (Stress Tester):**
- Empty projects array → broken visual state (header + CTA with no items)
- Language switch on nonexistent slug → 404
- Engagement slider index fragile if ENGAGE_KEYS emptied

## Minor Observations

- Ghost echoes performance fix (moved to `h-0` for LCP) is well-documented
- `line-clamp-2` on short viewports for process descriptions — smart guard
- `cursor-blink` uses `step-end` — correct terminal feel
- ScrambleText never triggered on mount in header — good restraint
- Footer `™` legal-awareness detail builds trust

## Questions to Consider

1. Does WorkflowSteps earn its 5 viewports of scroll? If replaced with a single sentence + 3 icons, would the homepage lose anything the visitor cares about?
2. What if the hero had 50% fewer decorative elements? Do the volcanoes, dot grid, coordinates, and diagonal lines collectively dilute "We build / Digital / Products."?
3. Is the Spanish copy too safe? "Creamos Productos Digitales" is clean but forgettable. What's the line a business owner in Ipiales would quote?
4. Should the engagement slider exist at all? Three items shown one at a time — what if all three were visible simultaneously in a grid?
5. Is the footer doing too much? Could it be stripped to just the mark, email, and phone?
