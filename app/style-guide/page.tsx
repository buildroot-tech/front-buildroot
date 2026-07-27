"use client";

import { m } from "framer-motion";
import { ScrambleText } from "@/components/ui/TextScrambler";

/* ============================================================
   BUILDROOT — STYLE GUIDE
   Visual reference for all design tokens and components.
   ============================================================ */

// ── Color Data ───────────────────────────────────────────────
const colors = [
  {
    name: "Hero",
    token: "--bg-hero",
    value: "#0F172A",
    text: "var(--text-inverse)",
  },
  {
    name: "Primary",
    token: "--bg-primary",
    value: "#F8FAFC",
    text: "var(--text-primary)",
  },
  {
    name: "Secondary",
    token: "--bg-secondary",
    value: "#E2E8F0",
    text: "var(--text-primary)",
  },
  { name: "Accent", token: "--accent", value: "#2563EB", text: "#FFFFFF" },
  {
    name: "Accent Hover",
    token: "--accent-hover",
    value: "#1D4ED8",
    text: "#FFFFFF",
  },
  {
    name: "Text Primary",
    token: "--text-primary",
    value: "#0F172A",
    text: "#FFFFFF",
  },
  {
    name: "Text Muted",
    token: "--text-muted",
    value: "#64748B",
    text: "#FFFFFF",
  },
  {
    name: "Text Inverse",
    token: "--text-inverse",
    value: "#F8FAFC",
    text: "#0F172A",
  },
  { name: "Border", token: "--border", value: "#0F172A", text: "#FFFFFF" },
  {
    name: "Border Muted",
    token: "--border-muted",
    value: "#CBD5E1",
    text: "#0F172A",
  },
];

// ── Spacing Data ─────────────────────────────────────────────
const spacingTight = [
  { name: "tight-sm", value: "8px", px: 8 },
  { name: "tight-md", value: "16px", px: 16 },
  { name: "tight-lg", value: "32px", px: 32 },
];

const spacingNormal = [
  { name: "normal-sm", value: "48px", px: 48 },
  { name: "normal-md", value: "64px", px: 64 },
  { name: "normal-lg", value: "96px", px: 96 },
];

const spacingGenerous = [
  { name: "generous-sm", value: "128px", px: 128 },
  { name: "generous-md", value: "192px", px: 192 },
  { name: "generous-lg", value: "256px", px: 256 },
];

// ── Tags Data ────────────────────────────────────────────────
const tags = [
  "React",
  "Next.js",
  "Tailwind",
  "Framer Motion",
  "TypeScript",
  "Vercel",
];

export default function StyleGuidePage() {
  return (
    <div className="space-y-24">
      {/* ── Header ──────────────────────────────────────────── */}
      <section>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Design System
        </p>
        <h1 className="headline text-display mt-2 text-[var(--text-primary)]">
          buildroot_
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--text-muted)]">
          Visual reference for all design tokens, typography, components, and
          patterns used across the buildroot_ website.
        </p>
      </section>

      {/* ── 1. Colors ───────────────────────────────────────── */}
      <section>
        <SectionTitle number="01" title="Colors" />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {colors.map((c) => (
            <div key={c.token} className="brutalist-card overflow-hidden">
              <div
                className="flex h-24 items-end p-3"
                style={{ backgroundColor: c.value }}
              >
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: c.text }}
                >
                  {c.value}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {c.token}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Typography ───────────────────────────────────── */}
      <section>
        <SectionTitle number="02" title="Typography" />

        <div className="mt-8 space-y-8">
          <TypeRow
            label="Display"
            size="clamp(72px, 10vw, 180px)"
            token="--text-display"
          >
            <span className="headline text-display">BUILDROOT</span>
          </TypeRow>

          <TypeRow label="H1" size="clamp(48px, 6vw, 72px)" token="--text-h1">
            <span className="headline text-h1">Heading Level 1</span>
          </TypeRow>

          <TypeRow label="H2" size="clamp(32px, 4vw, 48px)" token="--text-h2">
            <span className="heading text-h2">Heading Level 2</span>
          </TypeRow>

          <TypeRow label="H3" size="clamp(24px, 3vw, 32px)" token="--text-h3">
            <span className="heading text-h3">Heading Level 3</span>
          </TypeRow>

          <TypeRow label="Body" size="18px" token="--text-body">
            <span className="text-lg">
              The quick brown fox jumps over the lazy dog. Pack my box with five
              dozen liquor jugs.
            </span>
          </TypeRow>

          <TypeRow label="Small" size="14px" token="--text-small">
            <span className="text-sm">
              Small text for secondary information and metadata.
            </span>
          </TypeRow>

          <TypeRow label="Caption" size="12px" token="--text-caption">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              LABEL · METADATA · DATE
            </span>
          </TypeRow>

          <TypeRow label="Mono" size="16px" token="--font-mono">
            <code className="font-mono text-base">
              const solution = &quot;code&quot;;
            </code>
          </TypeRow>
        </div>
      </section>

      {/* ── 3. Components ───────────────────────────────────── */}
      <section>
        <SectionTitle number="03" title="Components" />

        {/* Buttons */}
        <SubHeading>Buttons</SubHeading>
        <div className="mt-4 flex flex-wrap gap-4">
          <button className="brutalist-button">Default</button>
          <button className="brutalist-button brutalist-button-accent">
            Accent
          </button>
          <button className="brutalist-button opacity-50" disabled>
            Disabled
          </button>
        </div>

        {/* Card */}
        <SubHeading>Card</SubHeading>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="brutalist-card p-6">
              <div className="mb-4 flex h-32 items-center justify-center bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)]">
                Image Placeholder
              </div>
              <h3 className="heading text-h3">Project Title {i}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Brief description of the project and the technologies used.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="border border-[var(--border)] px-2 py-1 font-mono text-xs">
                  React
                </span>
                <span className="border border-[var(--border)] px-2 py-1 font-mono text-xs">
                  Next.js
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <SubHeading>Tags</SubHeading>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-[var(--border)] px-3 py-1 font-mono text-xs uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <SubHeading>Links</SubHeading>
        <div className="mt-4 space-y-2">
          <a
            href="#"
            className="inline-block border-b-2 border-[var(--border)] font-semibold transition-colors hover:text-[var(--accent)]"
          >
            Inline Link →
          </a>
          <br />
          <a
            href="#"
            className="inline-block border-b-2 border-[var(--accent)] font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            Accent Link →
          </a>
        </div>
      </section>

      {/* ── 4. Spacing ──────────────────────────────────────── */}
      <section>
        <SectionTitle number="04" title="Spacing" />

        <SpacingGroup label="Tight" items={spacingTight} />
        <SpacingGroup label="Normal" items={spacingNormal} />
        <SpacingGroup label="Generous" items={spacingGenerous} />
      </section>

      {/* ── 5. Borders & Shadows ────────────────────────────── */}
      <section>
        <SectionTitle number="05" title="Borders & Shadows" />

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {/* Border */}
          <div>
            <SubHeading>Border</SubHeading>
            <div className="mt-4 border-2 border-[var(--border)] p-6">
              <p className="font-mono text-sm">2px solid var(--border)</p>
            </div>
          </div>

          {/* Offset Shadow */}
          <div>
            <SubHeading>Offset Shadow</SubHeading>
            <div className="mt-4 border-2 border-[var(--border)] p-6 shadow-[4px_4px_0_var(--border)]">
              <p className="font-mono text-sm">4px 4px 0</p>
            </div>
          </div>

          {/* Hover Shadow */}
          <div>
            <SubHeading>Hover Effect</SubHeading>
            <m.div
              className="mt-4 cursor-pointer border-2 border-[var(--border)] p-6"
              whileHover={{
                boxShadow: "2px 2px 0 var(--border)",
                x: 2,
                y: 2,
              }}
              transition={{ duration: 0.15 }}
            >
              <p className="font-mono text-sm">Hover me →</p>
            </m.div>
          </div>
        </div>
      </section>

      {/* ── 6. Animations ───────────────────────────────────── */}
      <section>
        <SectionTitle number="06" title="Animations" />

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {/* Hover */}
          <div>
            <SubHeading>Hover (150ms ease)</SubHeading>
            <m.button
              className="brutalist-button mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Hover / Click Me
            </m.button>
          </div>

          {/* Spring */}
          <div>
            <SubHeading>Spring Physics</SubHeading>
            <m.button
              className="brutalist-button mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Spring Button
            </m.button>
          </div>

          {/* Scroll Reveal */}
          <div>
            <SubHeading>Scroll Reveal</SubHeading>
            <m.div
              className="mt-4 border-2 border-[var(--border)] p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono text-sm">
                Scroll down to reveal this element
              </p>
            </m.div>
          </div>

          {/* Stagger */}
          <div>
            <SubHeading>Stagger Children</SubHeading>
            <m.div
              className="mt-4 flex gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <m.div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] font-mono text-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {i}
                </m.div>
              ))}
            </m.div>
          </div>

          {/* Text Scrambler */}
          <div>
            <SubHeading>Text Scrambler (Hover)</SubHeading>
            <div className="mt-4 border-2 border-[var(--border)] p-6">
              <div className="flex flex-wrap gap-6">
                <ScrambleText
                  text="work"
                  className="font-mono text-3xl font-medium cursor-pointer hover:text-[var(--accent)] transition-colors"
                  speed={55}
                />
                <ScrambleText
                  text="services"
                  className="font-mono text-3xl font-medium cursor-pointer hover:text-[var(--accent)] transition-colors"
                  speed={55}
                />
                <ScrambleText
                  text="about"
                  className="font-mono text-3xl font-medium cursor-pointer hover:text-[var(--accent)] transition-colors"
                  speed={55}
                />
              </div>
              <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                Hover over the text to see the scramble effect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Layout Components ─────────────────────────────── */}
      <section>
        <SectionTitle number="07" title="Layout Components" />

        {/* Header */}
        <SubHeading>Header</SubHeading>
        <div className="mt-4 border-2 border-[var(--border)] bg-[var(--bg-hero)] p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-[var(--text-inverse)]">
              buildroot_
            </span>
            <div className="hidden items-center gap-6 md:flex">
              {["Home", "Work", "About", "Process"].map((label) => (
                <span
                  key={label}
                  className="font-mono text-xs uppercase tracking-widest text-[var(--text-inverse)]"
                >
                  {label}
                </span>
              ))}
              <span className="brutalist-button border-[var(--text-inverse)] text-xs text-[var(--text-inverse)]">
                Contact
              </span>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
            Sticky nav · Transparent on hero · Solid on scroll
          </p>
        </div>

        {/* Footer */}
        <SubHeading>Footer</SubHeading>
        <div className="mt-4 border-2 border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <span className="font-mono text-sm font-bold uppercase tracking-widest">
                buildroot_
              </span>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Digital products & consulting.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Navigation
              </p>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <span>Home</span>
                <span>Work</span>
                <span>About</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Connect
              </p>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <span>GitHub</span>
                <span>Twitter</span>
                <span>LinkedIn</span>
              </div>
            </div>
          </div>
        </div>

        {/* ScrollProgress */}
        <SubHeading>Scroll Progress</SubHeading>
        <div className="mt-4 border-2 border-[var(--border)] p-6">
          <div className="relative h-2 w-full bg-[var(--bg-secondary)]">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-[var(--accent)]" />
          </div>
          <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
            Fixed top bar · Spring physics · Accent color
          </p>
        </div>

        {/* PageTransition */}
        <SubHeading>Page Transition</SubHeading>
        <div className="mt-4 border-2 border-[var(--border)] p-6">
          <p className="text-sm">
            Pages fade in with subtle Y-axis movement on navigation.
          </p>
          <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
            AnimatePresence · 300ms · cubic-bezier(0.25, 0.1, 0.25, 1)
          </p>
        </div>
      </section>

      {/* ── 8. Home Components ──────────────────────────────── */}
      <section>
        <SectionTitle number="08" title="Home Components" />

        {/* Hero mockup */}
        <SubHeading>Hero</SubHeading>
        <div className="mt-4 overflow-hidden border-2 border-[var(--border)]">
          <div className="flex min-h-[300px] items-center bg-[var(--bg-hero)] p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                Digital Products & Consulting
              </p>
              <h3 className="headline text-h1 mt-4 text-[var(--text-inverse)]">
                We build
              </h3>
              <h3 className="headline text-h1 text-[var(--text-inverse)]">
                digital <span className="text-[var(--accent)]">products</span>
              </h3>
              <p className="mt-4 max-w-sm text-sm text-[var(--text-inverse)] opacity-70">
                Web development, technical consulting, and SaaS products.
              </p>
              <div className="mt-6 flex gap-3">
                <span className="brutalist-button border-[var(--text-inverse)] text-xs text-[var(--text-inverse)]">
                  View Our Work →
                </span>
                <span className="brutalist-button border-[var(--accent)] text-xs text-[var(--accent)]">
                  How We Work
                </span>
              </div>
            </div>
          </div>
          <p className="bg-[var(--bg-primary)] p-3 font-mono text-xs text-[var(--text-muted)]">
            Dark hero · Text reveal animation · Scroll-linked opacity
          </p>
        </div>

        {/* Services mockup */}
        <SubHeading>Services</SubHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {["Web Development", "Technical Consulting", "SaaS Products"].map(
            (title) => (
              <div key={title} className="brutalist-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-primary)]">
                  <div className="h-4 w-4 bg-[var(--accent)]" />
                </div>
                <h4 className="heading text-h3">{title}</h4>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Description of the service offering.
                </p>
              </div>
            ),
          )}
        </div>

        {/* Highlights mockup */}
        <SubHeading>Highlights</SubHeading>
        <div className="mt-4 border-2 border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Featured Work
          </p>
          <h4 className="heading text-h2 mt-2">Selected Projects</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="brutalist-card">
                <div className="flex h-24 items-center justify-center bg-[var(--bg-primary)] font-mono text-xs text-[var(--text-muted)]">
                  Project {i}
                </div>
                <div className="p-4">
                  <h5 className="font-semibold">Project Title</h5>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Brief description
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA mockup */}
        <SubHeading>CTA</SubHeading>
        <div className="mt-4 border-2 border-[var(--border)] bg-[var(--bg-primary)] p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Get In Touch
          </p>
          <h4 className="headline text-h1 mt-4">
            Let&apos;s build something{" "}
            <span className="text-[var(--accent)]">together</span>
          </h4>
          <div className="mt-6 flex justify-center gap-3">
            <span className="brutalist-button brutalist-button-accent text-xs">
              hello@buildroot.dev →
            </span>
            <span className="brutalist-button text-xs">See How We Work</span>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <section className="border-t-2 border-[var(--border)] pt-8">
        <p className="font-mono text-xs text-[var(--text-muted)]">
          buildroot_ Style Guide · Last updated {new Date().getFullYear()}
        </p>
      </section>
    </div>
  );
}

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm text-[var(--text-muted)]">
        {number}
      </span>
      <h2 className="heading text-h2">{title}</h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
      {children}
    </h3>
  );
}

function TypeRow({
  label,
  size,
  token,
  children,
}: {
  label: string;
  size: string;
  token: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--border-muted)] pb-6">
      <div className="mb-2 flex items-baseline gap-3">
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {label}
        </span>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {size}
        </span>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {token}
        </span>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function SpacingGroup({
  label,
  items,
}: {
  label: string;
  items: { name: string; value: string; px: number }[];
}) {
  return (
    <div className="mt-6">
      <SubHeading>{label}</SubHeading>
      <div className="mt-4 space-y-3">
        {items.map((s) => (
          <div key={s.name} className="flex items-center gap-4">
            <span className="w-24 font-mono text-xs text-[var(--text-muted)]">
              {s.name}
            </span>
            <span className="w-16 font-mono text-xs text-[var(--text-muted)]">
              {s.value}
            </span>
            <div
              className="h-4 bg-[var(--accent)]"
              style={{ width: `${Math.min(s.px, 256)}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
