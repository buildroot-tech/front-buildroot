"use client";

import { LocaleLink } from "@/components/ui/LocaleLink";
import { useRef } from "react";
import { m } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrambleText, type ScrambleTextHandle } from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface AboutSectionProps {
  dict?: Dictionary["about"];
}

// Every string the page renders, in English, so the component still reads
// correctly if a dictionary key is ever missing.
const FALLBACK = {
  label: "About",
  intro:
    "Buildroot is a deliberately small studio. We take on few clients at a time so we can stand behind every project end to end. You deal directly with the people writing the code, from the first meeting to the final deploy.",
  culture: {
    eyebrow: "Culture",
    manifesto:
      "We didn't build Buildroot to get big — we built it to be accountable for what we deliver. Growing would mean putting intermediaries between you and the work, which is precisely the problem we set out to avoid.",
  },
  values: {
    title: "What We Value",
    intro:
      "Culture isn't demonstrated on a web page. It shows in the hard calls: when a deadline gets tight, when something goes wrong, or when the honest answer costs us the contract. These four commitments define how we respond in those moments.",
    items: {
      access: {
        marquee: "Direct",
        title: "Direct contact with who builds it",
        description:
          "There are no intermediaries between you and the technical team. Whoever answers your message wrote that part of the system, so you get precise answers without delay. It also means we take responsibility head-on: when something breaks, you're speaking directly to the person who can fix it.",
      },
      honesty: {
        marquee: "Judgement",
        title: "Judgement before convenience",
        description:
          "We'll warn you when a feature doesn't justify its cost, when your budget goes further elsewhere, and when we aren't the right team for the project. We have turned down work for this reason. Recommending something you don't need would be the fastest way to lose your trust.",
      },
      pace: {
        marquee: "Commitment",
        title: "Commitments we keep",
        description:
          "We plan with real margin and hold a pace we can sustain for the length of the project, because rushed work is paid for later in defects and rework. That's why we don't accept deadlines we can't meet: we'd rather have an uncomfortable conversation up front than miss one halfway through.",
      },
      staying: {
        marquee: "Continuity",
        title: "Accountable long term",
        description:
          "Much of our work comes from clients we started with years ago and who are still with us. We write code for whoever has to maintain it later, with documentation and decisions that can be explained. We don't ship anything we aren't prepared to support over time.",
      },
    },
  },
  cta: {
    title: "Ready to work together?",
    subtitle:
      "If you've read this far, you have a sense of how we work. Tell us what you have in mind and we'll be straight with you about whether we can help.",
    button: "Get In Touch",
    emailLabel: "or email us directly",
  },
} as const;

const VALUE_KEYS = ["access", "honesty", "pace", "staying"] as const;
type ValueKey = (typeof VALUE_KEYS)[number];

const EMAIL = "info@buildroot.co";

// Shared reveal — content rises a little as it enters, once.
const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Edge-to-edge band of one phrase repeated forever. The phrase is rendered
 * twice inside the track (see `.marquee-track` in globals.css) — the second
 * copy is what's on screen by the time the first has slid out, which is why
 * the loop has no visible seam.
 */
function Marquee({
  text,
  durationSeconds = 40,
  reverse = false,
  className = "",
}: {
  text: string;
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
}) {
  const run = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center whitespace-nowrap">
      <span>{text}</span>
      <span aria-hidden="true" className="mx-8 opacity-40 md:mx-14">
        ✳
      </span>
    </span>
  ));

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="marquee-track"
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        {/* Two identical halves — the animation shifts exactly -50%. */}
        <div className="flex shrink-0">{run}</div>
        <div className="flex shrink-0">{run}</div>
      </div>
    </div>
  );
}

export function AboutSection({ dict }: AboutSectionProps) {
  const ctaButtonRef = useRef<ScrambleTextHandle>(null);
  const ctaEmailRef = useRef<ScrambleTextHandle>(null);

  const dictValues = dict?.values;

  const values = VALUE_KEYS.map((key, index) => {
    const fromDict = dictValues?.items?.[key];
    const fallback = FALLBACK.values.items[key as ValueKey];
    return {
      key,
      index: index + 1,
      marquee: fromDict?.marquee || fallback.marquee,
      title: fromDict?.title || fallback.title,
      description: fromDict?.description || fallback.description,
    };
  });

  return (
    <div className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ── HERO ───────────────────────────────────────────────
          Label left, statement right — the same two-column opening
          /work uses, so arriving here feels like the same site. */}
      <section className="flex w-full flex-col justify-center px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
        <div className="lg:grid lg:grid-cols-[46%_1fr] lg:gap-8">
          <m.h1
            initial="hidden"
            animate="visible"
            variants={revealUp}
            transition={revealTransition}
            className="type-eyebrow"
          >
            {dict?.label || FALLBACK.label}
          </m.h1>

          <m.p
            initial="hidden"
            animate="visible"
            variants={revealUp}
            transition={{ ...revealTransition, delay: 0.12 }}
            className="type-statement mt-8 lg:mt-0"
          >
            {dict?.intro || FALLBACK.intro}
          </m.p>
        </div>

      </section>

      {/* ── TRACKING WORDMARK ──────────────────────────────────
          A giant buildroot_ that rides the scroll behind everything
          from here down. It's `sticky`, so it holds its place in the
          viewport while the culture, values and CTA scroll over the top
          of it — and when this wrapper runs out, it unsticks and comes
          to rest flush against the wrapper's bottom edge, which is
          exactly the gap between the closing CTA and the footer.

          Kept as a background image rather than an <img> because it's
          pure decoration: nothing here should reach the accessibility
          tree or be selectable.

          It renders at full strength, which only works because the text
          blocks that cross it carry their own opaque backdrop — solid
          white behind white body copy would otherwise swallow it. The
          backdrop is on each block rather than on the whole section: a
          section-wide cover tiles into one unbroken sheet and the mark
          never gets to show, whereas per-block covers leave the spacing
          between them transparent, so the mark stays on screen and you
          watch the content slide over it. */}
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="sticky top-[32vh] w-full px-6 md:px-12">
            <div
              className="w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url(/brand/buildroot-logo-white.svg)",
                aspectRatio: "6335 / 1067",
                opacity: 1,
              }}
            />
          </div>
        </div>

        <div className="relative z-10">


      {/* ── CULTURE MANIFESTO ──────────────────────────────────
          The eyebrow floats into the giant paragraph's first line
          rather than sitting above it — below md it stacks, since at
          phone width the paragraph wraps too many times for the float
          to clear its second line. */}
      <section className="w-full px-6 py-24 md:px-12 md:py-40">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealUp}
          transition={revealTransition}
          className="type-manifesto w-full bg-[var(--bg-primary)] py-6"
        >
          <span className="mb-4 block font-display text-2xl md:float-left md:mb-0 md:mr-8 md:mt-[0.9em] md:text-3xl">
            {dict?.culture?.eyebrow || FALLBACK.culture.eyebrow}
          </span>
          {dict?.culture?.manifesto || FALLBACK.culture.manifesto}
        </m.p>
      </section>

      {/* ── VALUES: title, index, statement ────────────────────── */}
      <section className="w-full px-6 pb-16 md:px-12 md:pb-24">
        <m.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealUp}
          transition={revealTransition}
          className="type-title text-center bg-[var(--bg-primary)] py-6"
        >
          {dictValues?.title || FALLBACK.values.title}
        </m.h2>

        <div className="mt-14 flex flex-col gap-14 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Index — numbered rows on rules, a contents page for what follows */}
          <m.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            transition={revealTransition}
            className="flex flex-col border-t border-[var(--border)] bg-[var(--bg-primary)]"
          >
            {values.map((value) => (
              <li
                key={value.key}
                className="flex items-baseline gap-6 border-b border-[var(--border)] py-4 md:gap-10"
              >
                <span className="font-mono text-sm opacity-60">
                  {String(value.index).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-2xl">{value.title}</span>
              </li>
            ))}
          </m.ul>

          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            transition={{ ...revealTransition, delay: 0.1 }}
            className="type-lead bg-[var(--bg-primary)] py-4"
          >
            {dictValues?.intro || FALLBACK.values.intro}
          </m.p>
        </div>
      </section>

      {/* ── VALUES: one full band each ─────────────────────────── */}
      {values.map((value, i) => (
        <section key={value.key} className="w-full py-16 md:py-24">
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealUp}
            transition={revealTransition}
            className="mb-8 text-center font-serif text-3xl font-light md:mb-12 md:text-5xl bg-[var(--bg-primary)] py-4"
          >
            ({value.index})
          </m.p>

          {/* Alternating direction so consecutive bands don't read as one
              continuous strip sliding the same way down the whole page. */}
          <Marquee
            text={value.marquee}
            durationSeconds={34 + i * 4}
            reverse={i % 2 === 1}
            className="bg-[var(--bg-primary)] py-4 font-serif text-[clamp(3.5rem,11vw,11rem)] font-light leading-none tracking-tight"
          />

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={revealUp}
            transition={revealTransition}
            className="mt-10 bg-[var(--bg-primary)] px-6 py-8 md:mt-16 md:px-12 lg:grid lg:grid-cols-[46%_1fr] lg:gap-8"
          >
            {/* No small index here — the big centred "(n)" above the band
                already numbers this value, and repeating it a second time
                read as clutter. */}
            <h3 className="font-display text-2xl leading-tight md:text-3xl">
              {value.title}
            </h3>
            <p className="type-body mt-5 max-w-3xl opacity-90 lg:mt-0">
              {value.description}
            </p>
          </m.div>
        </section>
      ))}

      {/* ── CTA ─────────────────────────────────────────────────
          Two-column grid matching the Footer's own, so the action
          column lines up with the one directly beneath it. */}
      <section className="w-full border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-end lg:gap-24">
          <div>
            <h2 className="type-title text-[clamp(2.2rem,5vw,4.5rem)]">
              {dict?.cta?.title || FALLBACK.cta.title}
            </h2>
            <p className="type-body mt-6 max-w-xl opacity-85">
              {dict?.cta?.subtitle || FALLBACK.cta.subtitle}
            </p>
          </div>

          <div className="flex flex-col font-display text-3xl sm:text-4xl">
            <LocaleLink
              href="/contact"
              onMouseEnter={() => ctaButtonRef.current?.scramble()}
              onMouseLeave={() => ctaButtonRef.current?.reset()}
              className="group flex items-center justify-between border-t border-[var(--border)] py-5"
            >
              <ScrambleText
                ref={ctaButtonRef}
                text={dict?.cta?.button || FALLBACK.cta.button}
                trigger="manual"
                speed={40}
              />
              <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
            </LocaleLink>

            <a
              href={`mailto:${EMAIL}`}
              onMouseEnter={() => ctaEmailRef.current?.scramble()}
              onMouseLeave={() => ctaEmailRef.current?.reset()}
              className="group flex items-center justify-between border-t border-b border-[var(--border)] py-5"
            >
              <ScrambleText ref={ctaEmailRef} text={EMAIL} trigger="manual" speed={40} />
              <ArrowUpRight className="h-7 w-7 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="mt-3 font-mono text-xs uppercase tracking-widest opacity-60">
              {dict?.cta?.email_label || FALLBACK.cta.emailLabel}
            </span>
          </div>
        </div>
      </section>

          {/* Landing strip. Every section above is opaque so it can cover
              the wordmark on the way down; without this the CTA — the last
              of them — would still be sitting on top of it exactly where
              it comes to rest. Reserving the mark's own height here leaves
              it uncovered at the end, sitting between the CTA and the
              footer's menu. */}
          <div
            aria-hidden="true"
            className="w-full px-6 md:px-12"
            style={{ aspectRatio: "6335 / 1067" }}
          />
        </div>
      </div>

    </div>
  );
}
