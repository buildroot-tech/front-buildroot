"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { ScrambleText } from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface AboutSectionProps {
  dict?: Dictionary["about"];
}

const PRINCIPLE_KEYS = ["quality", "clean", "iterative", "direct"] as const;
type PrincipleKey = (typeof PRINCIPLE_KEYS)[number];

const FALLBACK_PRINCIPLES: Record<
  PrincipleKey,
  { title: string; description: string }
> = {
  quality: {
    title: "Quality Over Quantity",
    description:
      "We take on fewer projects so each one gets our full attention. If we don't have the bandwidth to do it right, we'll say so instead of squeezing you into a sprint.",
  },
  clean: {
    title: "Clean Code, No Shortcuts",
    description:
      "Code we'd be comfortable maintaining in three years, not just shipping today. Readable, typed, documented where it matters.",
  },
  iterative: {
    title: "Iterative, Not Waterfall",
    description:
      "We ship early, gather feedback, and adjust. You see progress every week, not a reveal at the end.",
  },
  direct: {
    title: "Direct Communication",
    description:
      "You talk to the engineers building your product. No handoffs, no telephone game.",
  },
};

const FALLBACK_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Lenis",
  "Vercel",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function AboutSection({ dict }: AboutSectionProps) {
  const stack = dict?.stack?.items?.length ? dict.stack.items : FALLBACK_STACK;

  return (
    <>
      {/* Header */}
      <section className="w-full px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-lg md:text-xl capitalize tracking-tight text-white/60">
            {dict?.badge || "Who We Are"}
          </h2>
          <h1 className="headline text-h1 mt-4 text-white tracking-tight">
            <ScrambleText
              text={dict?.title || "About"}
              speed={55}
              trigger="mount"
            />
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg leading-relaxed text-white/80 font-sans">
            {dict?.subtitle ||
              "Two developers. One mission. Build software that actually works."}
          </p>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-white/60 font-sans">
            {dict?.intro ||
              "Buildroot is a two-person studio, not an agency. No account managers, no bloated process — just the people writing your code, talking to you directly, from kickoff to launch."}
          </p>
        </m.div>
      </section>

      {/* Principles */}
      <section className="w-full px-6 pb-16 md:px-12 md:pb-24">
        <m.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-lg md:text-xl capitalize tracking-tight text-white/60"
        >
          {dict?.principles?.title || "How We Work"}
        </m.h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {PRINCIPLE_KEYS.map((key, i) => {
            const principle =
              dict?.principles?.items?.[key] || FALLBACK_PRINCIPLES[key];

            return (
              <m.div
                key={key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="brutalist-card p-6 md:p-8"
              >
                <span className="font-mono text-xs font-bold text-[var(--accent)]">
                  0{i + 1}
                </span>
                <h3 className="heading text-h3 mt-2 text-[var(--text-primary)]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
                  {principle.description}
                </p>
              </m.div>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      <section className="w-full border-t border-white/15 px-6 py-16 md:px-12 md:py-24">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-lg md:text-xl capitalize tracking-tight text-white/60">
            {dict?.stack?.title || "What We Build With"}
          </h2>
          <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-white/70">
            {dict?.stack?.subtitle ||
              "The tools we trust, chosen for speed and staying power."}
          </p>
        </m.div>

        <div className="mt-8 flex flex-wrap gap-3">
          {stack.map((tech, i) => (
            <m.span
              key={tech}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="border border-white/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-white"
            >
              {tech}
            </m.span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t border-white/15 px-6 py-16 md:px-12 md:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="headline text-h2 text-white tracking-tight">
              {dict?.cta?.title || "Ready to work together?"}
            </h3>
            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/70">
              {dict?.cta?.subtitle ||
                "If you've read this far, you already know whether we're a fit. Let's talk about what you're building."}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 shrink-0">
            <Link
              href="/#cta"
              className="brutalist-button brutalist-button-accent text-xs font-bold tracking-wider py-4 px-8"
            >
              <span>{dict?.cta?.button || "Get In Touch"} →</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href="mailto:hello@buildroot.dev"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{dict?.cta?.email_label || "or email us directly"}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
