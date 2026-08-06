"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrambleText, type ScrambleTextHandle } from "@/components/ui/TextScrambler";
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

// Three facets of studio culture — deliberately distinct from the process
// principles above (which are about *how the work gets made*). These are
// about the studio itself: why it's small, what a day looks like, what
// changes for the client. One full-viewport slide each, stacking over one
// another as you scroll — the same mechanic as Services'
// ServiceSlide/stackRef (components/services/ServicesSection.tsx), which
// is itself the same idea as Home's WorkflowSteps, just simplified to 3
// beats. Colors reused verbatim from SERVICE_COLORS so a visitor moving
// between /services and /about reads the same color language twice.
const CULTURE_KEYS = ["small", "dayToDay", "experience"] as const;
type CultureKey = (typeof CULTURE_KEYS)[number];

const CULTURE_COLORS: Record<CultureKey, { bg: string; text: string }> = {
  small: { bg: "#0A0A0A", text: "#ffffff" },
  dayToDay: { bg: "var(--accent)", text: "#ffffff" },
  experience: { bg: "#e2e8f0", text: "#000000" },
};

const FALLBACK_CULTURE: Record<
  CultureKey,
  { title: string; description: string }
> = {
  small: {
    title: "Small On Purpose",
    description:
      "We could hire. We haven't. Every developer we'd add is a decision between you and the person actually writing your code — and we've watched that trade play out badly at studios twenty times our size. Staying at two means every project gets both of us, not whoever's free that sprint.",
  },
  dayToDay: {
    title: "How We Actually Work",
    description:
      "No ticket queue, no status-update theater. We work out of the same thread you're in — usually WhatsApp or email, sometimes a call when something's worth talking through out loud. If it's broken, you'll know within the hour. If it's done, you'll see it running, not a slide about it.",
  },
  experience: {
    title: "What It's Like To Work With Us",
    description:
      "Short, straight answers — including the ones you don't want, like \"that'll take longer than you think\" or \"you don't need that yet.\" We'd rather lose the sale than build something we don't believe in. The studios that last are the ones honest enough to say no.",
  },
};

const FALLBACK_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
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

// Per-word scroll-linked opacity reveal — same idiom as Home's CTA
// manifesto (components/home/CTA.tsx Word), recreated locally here since
// /components/home is out of scope to touch this session.
function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-2 mt-1 inline-block md:mr-4">
      <m.span style={{ opacity }} className="inline-block">
        {children}
      </m.span>
    </span>
  );
}

interface CultureSlideProps {
  cultureKey: CultureKey;
  index: number;
  total: number;
  item: { title: string; description: string };
  scrollYProgress: MotionValue<number>;
}

// One full-screen panel per culture facet — slides up over the previous
// one and settles. Structurally identical to ServiceSlide
// (components/services/ServicesSection.tsx), the closest existing analog
// for this exact mechanic.
function CultureSlide({ cultureKey, index, total, item, scrollYProgress }: CultureSlideProps) {
  const segment = 1 / total;
  const start = index * segment;
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - segment * 0.6), start],
    ["100%", "0%"]
  );
  const colors = CULTURE_COLORS[cultureKey];

  return (
    <m.div
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-12"
      style={{
        y: index === 0 ? "0%" : y,
        backgroundColor: colors.bg,
        color: colors.text,
        zIndex: index,
      }}
    >
      <span
        className="pointer-events-none absolute right-6 top-28 font-display text-[8rem] font-light leading-none tracking-tighter sm:text-[10rem] md:right-12 md:top-32 md:text-[13rem]"
        style={{ opacity: 0.15 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="font-display text-6xl font-light capitalize tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
        {item.title}
      </h3>
      <p className="mt-6 max-w-4xl font-display font-normal leading-snug text-2xl md:text-3xl" style={{ opacity: 0.85 }}>
        {item.description}
      </p>
    </m.div>
  );
}

export function AboutSection({ dict }: AboutSectionProps) {
  const stack = dict?.stack?.items?.length ? dict.stack.items : FALLBACK_STACK;
  // Imperative scramble refs — same idiom as the work page's link rows: the
  // hover area is the whole <Link>/<a>, not just the inner text span.
  const ctaButtonRef = useRef<ScrambleTextHandle>(null);
  const ctaEmailRef = useRef<ScrambleTextHandle>(null);

  // Manifesto word reveal — tracks scroll across the statement itself,
  // finishing once it's centered in view (same offsets as CTA.tsx).
  const manifestoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: manifestoProgress } = useScroll({
    target: manifestoRef,
    offset: ["start 80%", "center center"],
  });
  const manifestoText =
    dict?.culture?.manifesto ||
    "We didn't build Buildroot to get big. We built it to do work we're proud of, for people who'd rather talk to the person building their product than the person managing the person building it.";
  const manifestoWords = manifestoText.split(" ");

  // Culture stack — 3 viewport-heights of scroll room; the sticky child
  // pins in place while that room scrolls underneath, same mechanic as
  // Services' #services-stack.
  const cultureStackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cultureStackProgress } = useScroll({
    target: cultureStackRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Header */}
      <section className="w-full px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-white">
            {dict?.badge || "Who We Are"}
          </h2>
          <h1 className="mt-4 font-serif font-light uppercase leading-[0.85] tracking-tight text-white text-[clamp(3.5rem,12vw,10rem)]">
            <ScrambleText
              text={dict?.title || "About"}
              speed={55}
              trigger="mount"
            />
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white font-display">
            {dict?.subtitle ||
              "Two developers. One mission. Build software that actually works."}
          </p>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-white/80 font-display">
            {dict?.intro ||
              "Buildroot is a two-person studio, not an agency. No account managers, no bloated process — just the people writing your code, talking to you directly, from kickoff to launch."}
          </p>
        </m.div>
      </section>

      {/* Culture manifesto — giant serif statement, revealed word by word
          as it scrolls into view. Same mechanic as Home's CTA. */}
      <section ref={manifestoRef} className="w-full border-t border-white/15 px-6 py-20 md:px-12 md:py-32">
        <m.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl md:text-3xl tracking-tight text-white"
        >
          {dict?.culture?.eyebrow || "Culture"}
        </m.h2>

        <p className="mt-6 flex flex-wrap font-serif font-light leading-[1.1] tracking-tight text-white text-[clamp(2rem,5.5vw,5.5rem)]">
          {manifestoWords.map((word, i) => (
            <Word
              key={i}
              progress={manifestoProgress}
              range={[i / manifestoWords.length, (i + 1) / manifestoWords.length]}
            >
              {word}
            </Word>
          ))}
        </p>
      </section>

      {/* Culture stack — three full-screen facets of what it's actually
          like to work with/at Buildroot, each its own beat with a
          distinct background. */}
      <section
        id="culture-stack"
        ref={cultureStackRef}
        className="relative w-full"
        style={{ height: `${CULTURE_KEYS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {CULTURE_KEYS.map((key, i) => (
            <CultureSlide
              key={key}
              cultureKey={key}
              index={i}
              total={CULTURE_KEYS.length}
              item={dict?.culture?.items?.[key] || FALLBACK_CULTURE[key]}
              scrollYProgress={cultureStackProgress}
            />
          ))}
        </div>
      </section>

      {/* Principles — stacked full-width rows on a top border, matching
          the pattern used across /work and Services' engagement models:
          big title, description alongside, no boxed cards, no numbering. */}
      <section className="w-full px-6 py-16 md:px-12 md:py-24">
        <m.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl md:text-3xl tracking-tight text-white"
        >
          {dict?.principles?.title || "How We Work"}
        </m.h2>

        <div className="mt-8 border-b border-white/15">
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
                className="flex flex-col gap-3 border-t border-white/15 py-8 md:flex-row md:items-baseline md:gap-10 md:py-10"
              >
                <h3 className="font-display text-3xl font-light tracking-tight text-white md:w-1/3 md:shrink-0 md:text-4xl">
                  {principle.title}
                </h3>
                <p className="max-w-2xl font-display text-base leading-relaxed text-white/80 md:text-lg">
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
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-white">
            {dict?.stack?.title || "What We Build With"}
          </h2>
          <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-white/90">
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
            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/90">
              {dict?.cta?.subtitle ||
                "If you've read this far, you already know whether we're a fit. Let's talk about what you're building."}
            </p>
          </div>

          <div className="flex w-full flex-col shrink-0 font-display text-xl sm:text-2xl md:text-3xl lg:w-[380px]">
            {/* Stacked link rows, not buttons — plain text on a top
                border, matching the pattern used across /work. */}
            <Link
              href="/contact"
              onMouseEnter={() => ctaButtonRef.current?.scramble()}
              onMouseLeave={() => ctaButtonRef.current?.reset()}
              className="group flex items-center justify-between border-t border-white py-5 text-white"
            >
              <ScrambleText
                ref={ctaButtonRef}
                text={dict?.cta?.button || "Get In Touch"}
                trigger="mount"
                speed={40}
              />
              <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="mailto:info@buildroot.co"
              onMouseEnter={() => ctaEmailRef.current?.scramble()}
              onMouseLeave={() => ctaEmailRef.current?.reset()}
              className="group flex items-center justify-between border-t border-b border-white py-5 text-white"
            >
              <ScrambleText
                ref={ctaEmailRef}
                text={dict?.cta?.email_label || "or email us directly"}
                trigger="mount"
                speed={40}
              />
              <ArrowUpRight className="h-7 w-7 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
