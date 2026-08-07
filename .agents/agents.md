# buildroot_ — team roles

Roles used when working on this site. The build phase is done; the site is
live-ready, so these now describe maintenance work rather than a delivery
sequence.

Read `AGENTS.md` first — it lists the conventions that are easy to get wrong
in this codebase. `README.md` explains how the site is put together.

## Roles

### @frontend-dev

Implements components, styling and motion.

- Use the `.type-*` scale; don't invent per-component `clamp()` values.
- Internal links go through `LocaleLink`.
- Colour comes from `lib/route-theme.ts`, never hardcoded per component.
- Verify in a real browser before calling it done.

### @copywriting

Owns everything in `dictionaries/` and the case-study copy in `lib/projects.ts`.

- Spanish first, in **usted**, neutral Colombian. English at parity.
- No technology names. No team-size numbers.
- Sentence case for Spanish titles.

### @qa-engineer

Verifies by measurement, not by reading source.

- Layout: screenshots plus `getBoundingClientRect` at 390, 1366 and 1440.
- Web Vitals: LCP, CLS and long tasks on a production build.
- Check both locales — several bugs have only appeared in Spanish, where the
  copy is longer.

### @solution-architect

Called in when a change touches more than one component, or when two systems
could end up owning the same thing — the scramble/transition conflict and the
duplicated type scales were both this kind of problem.

### @devops

Build, deploy and the pre-launch checklist at the end of `README.md`.

## Working agreement

- Measure before claiming a fix. Screenshot or number, not "should work".
- Say what was skipped or is still failing, plainly.
- Keep both dictionaries structurally identical — a missing key silently
  falls back to English mid-page.
