"use client";

import Image from "next/image";

import { routeThemes } from "@/lib/route-theme";

/* ============================================================
   BUILDROOT — STYLE GUIDE

   Internal reference for the system the site actually uses.
   Excluded from indexing in robots.ts.

   Rule for maintaining this page: read from the real source
   wherever the real source is importable. The route themes below
   come from lib/route-theme.ts, and every type sample is rendered
   with the same .type-* class a shipping page would use — so this
   page cannot drift into documenting a system that no longer
   exists. That drift is exactly what happened to its first
   version, which described a brutalist scale nothing used anymore.
   ============================================================ */

// ── Type scale ───────────────────────────────────────────────
// Defined in globals.css. These classes set size, weight, leading
// and tracking only — never colour. The route theme supplies that.
const typeScale = [
  {
    cls: "type-eyebrow",
    use: "Small section label, in the left 46% column opposite a statement.",
    sample: "Nosotros",
  },
  {
    cls: "type-statement",
    use: "The opening sentence beside the eyebrow. A page's first real line.",
    sample: "Construimos software que la gente usa todos los días.",
  },
  {
    cls: "type-title",
    use: "Centred section headings.",
    sample: "Lo que valoramos",
  },
  {
    cls: "type-manifesto",
    use: "Full-bleed declarations — culture copy, closing CTAs.",
    sample: "Listos para trabajar juntos",
  },
  {
    cls: "type-lead",
    use: "Secondary serif paragraph, one step under the manifesto.",
    sample: "Trabajamos de cerca, sin capas intermedias.",
  },
  {
    cls: "type-body",
    use: "Running copy — value descriptions, service detail, legal prose.",
    sample:
      "Cada proyecto arranca entendiendo el problema antes de escribir una sola línea. Preferimos una conversación larga al principio que un rediseño costoso al final.",
  },
];

// ── Rules that are easy to get wrong ─────────────────────────
// Each of these caused a real bug in this codebase. AGENTS.md
// carries the same list for whoever is editing code rather than
// looking at a page.
const rules = [
  {
    title: "Spanish is the primary language",
    body: "Write Spanish first, keep English at parity. Both dictionaries must have identical key structures. Usted throughout, neutral Colombian — no voseo, no tuteo.",
  },
  {
    title: "Internal links use LocaleLink",
    body: 'Never plain next/link. An un-prefixed href resolves to the default locale, so href="/work" silently drops a Spanish visitor into English. The only exception is the language switcher.',
  },
  {
    title: "Never name technologies",
    body: "No framework or library names in client-facing copy. Describe the outcome instead.",
  },
  {
    title: "Never state the team size",
    body: '"Un estudio deliberadamente pequeño", never a number.',
  },
  {
    title: "Sentence case, not the capitalize utility",
    body: 'Tailwind\'s capitalize forces title case on every word, which renders "Servicio Al Cliente" and "En Otros Lados" in Spanish.',
  },
  {
    title: "Give serif headings line-height room",
    body: "Tailwind's text-5xl and up ship line-height: 1. Inside an overflow-hidden ancestor that clips the descenders of y, j, g and p.",
  },
  {
    title: "ScrambleText is hover-only",
    body: 'Route-entry animation belongs to RouteTextShuffle. Two systems rewriting the same text nodes leave each other\'s half-scrambled output behind — that is what once left the navbar permanently reading "krow".',
  },
  {
    title: "Scroll, then measure, needs behavior: instant",
    body: "scroll-behavior: smooth is set globally, so a scrollTo followed by getBoundingClientRect reads the old offset.",
  },
];

export default function StyleGuidePage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <header className="flex flex-col gap-4 border-b border-[var(--border)] pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Internal reference
        </p>
        <h1 className="type-title">Style guide</h1>
        <p className="type-body max-w-2xl opacity-80">
          The system this site is built on. Everything below is rendered with
          the same classes and tokens the shipping pages use, so what you see
          here is what is live.
        </p>
      </header>

      {/* ── Type scale ─────────────────────────────────────── */}
      <Section
        label="01"
        title="Type scale"
        note="Defined once in globals.css so no component invents its own clamp() values. Size, weight, leading and tracking only — colour comes from the route theme."
      >
        <div className="flex flex-col">
          {typeScale.map((entry) => (
            <div
              key={entry.cls}
              className="border-t border-[var(--border-muted)] py-10 lg:grid lg:grid-cols-[240px_1fr] lg:gap-10"
            >
              <div className="mb-4 flex flex-col gap-2 lg:mb-0">
                <code className="font-mono text-sm text-[var(--accent)]">
                  .{entry.cls}
                </code>
                <p className="font-mono text-xs leading-relaxed text-[var(--text-muted)]">
                  {entry.use}
                </p>
              </div>
              <p className={entry.cls}>{entry.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Route themes ───────────────────────────────────── */}
      <Section
        label="02"
        title="Route themes"
        note="Imported live from lib/route-theme.ts — the single source of truth the header and footer both read, so a section's colour cannot drift between them. Nested routes inherit their parent section."
      >
        <div className="grid gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(routeThemes).map(([path, theme]) => (
            <div
              key={path}
              className="flex min-h-[220px] flex-col justify-between p-6"
              style={{
                backgroundColor: theme.bg,
                color: theme.text,
              }}
            >
              <span className="font-mono text-sm uppercase tracking-widest">
                {path}
              </span>
              <dl className="flex flex-col gap-1 font-mono text-xs opacity-70">
                <div className="flex justify-between gap-4">
                  <dt>bg</dt>
                  <dd>{theme.bg}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>text</dt>
                  <dd>{theme.text}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>border</dt>
                  <dd>{theme.border}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Typefaces ──────────────────────────────────────── */}
      <Section
        label="03"
        title="Typefaces"
        note="Three roles, no more. A fourth face has never earned its download cost here."
      >
        <div className="grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
          {[
            {
              token: "--font-serif",
              role: "Statements, titles, manifesto",
              cls: "font-serif",
            },
            {
              token: "--font-display",
              role: "Eyebrows, body copy, UI",
              cls: "font-display",
            },
            {
              token: "--font-mono",
              role: "Labels, metadata, coordinates",
              cls: "font-mono",
            },
          ].map((face) => (
            <div
              key={face.token}
              className="flex flex-col gap-4 bg-[var(--bg-primary)] p-6"
            >
              <code className="font-mono text-xs text-[var(--accent)]">
                var({face.token})
              </code>
              <p className={`${face.cls} text-4xl leading-[1.15]`}>Ag</p>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {face.role}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Motion ─────────────────────────────────────────── */}
      <Section
        label="04"
        title="Motion"
        note="Four mechanics carry the whole site. Anything continuous runs on the compositor and honours prefers-reduced-motion."
      >
        <div className="flex flex-col">
          {[
            {
              name: "Route shuffle",
              where: "components/ui/RouteTextShuffle.tsx",
              body: "On navigation every visible word rearranges its own characters and resolves into the new page's text. Because a word only ever shows its own letters, its width never changes — CLS stays at 0.0001.",
            },
            {
              name: "Scroll stacking",
              where: "WorkflowSteps, ProjectDetail",
              body: "A tall driver section (N × 100vh) with a sticky, screen-height wrapper and absolutely-positioned panels. Each panel travels from 100% to 0% over 60% of its segment, which leaves a real 40% rest window where the panel sits still and readable.",
            },
            {
              name: "Tracking wordmark",
              where: "components/about/AboutSection.tsx",
              body: "position: sticky, not a scroll-linked transform. The browser handles both the hold and the release, so the mark lands flush at the wrapper's bottom edge on any viewport height.",
            },
            {
              name: "Hover scramble",
              where: "components/ui/TextScrambler.tsx",
              body: 'Hover only. trigger="manual" everywhere it is mounted — an unconditional mount trigger collides with the route shuffle.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="border-t border-[var(--border-muted)] py-8 lg:grid lg:grid-cols-[240px_1fr] lg:gap-10"
            >
              <div className="mb-3 flex flex-col gap-1 lg:mb-0">
                <h3 className="font-display text-lg">{item.name}</h3>
                <code className="font-mono text-xs text-[var(--text-muted)]">
                  {item.where}
                </code>
              </div>
              <p className="type-body max-w-3xl opacity-85">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Brand marks ────────────────────────────────────── */}
      <Section
        label="05"
        title="Brand marks"
        note="Served from /public/brand. The b_ mark is applied as a CSS mask over bg-current so it adopts whatever colour its route theme sets, instead of shipping one file per background."
      >
        <div className="grid gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { file: "buildroot-logo-black.svg", bg: "var(--bg-primary)" },
            { file: "buildroot-logo-white.svg", bg: "#000000" },
            { file: "buildroot-mark-b-black.svg", bg: "var(--bg-primary)" },
            { file: "buildroot-mark-b-white.svg", bg: "#000000" },
          ].map((mark) => (
            <div
              key={mark.file}
              className="flex min-h-[160px] flex-col items-center justify-center gap-4 p-6"
              style={{ backgroundColor: mark.bg }}
            >
              <Image
                src={`/brand/${mark.file}`}
                alt={mark.file}
                width={160}
                height={32}
                className="h-8 w-auto max-w-full"
              />
              <code className="text-center font-mono text-[10px] text-[var(--text-muted)]">
                {mark.file}
              </code>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Rules ──────────────────────────────────────────── */}
      <Section
        label="06"
        title="Rules"
        note="Every item here has already caused a real bug in this codebase. AGENTS.md carries the same list for code review."
      >
        <div className="grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
          {rules.map((rule) => (
            <div
              key={rule.title}
              className="flex flex-col gap-3 bg-[var(--bg-primary)] p-6"
            >
              <h3 className="font-display text-lg leading-[1.3]">
                {rule.title}
              </h3>
              <p className="font-mono text-xs leading-relaxed text-[var(--text-muted)]">
                {rule.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  label,
  title,
  note,
  children,
}: {
  label: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {label}
          </span>
          <h2 className="type-eyebrow">{title}</h2>
        </div>
        <p className="max-w-3xl font-mono text-xs leading-relaxed text-[var(--text-muted)]">
          {note}
        </p>
      </div>
      {children}
    </section>
  );
}
