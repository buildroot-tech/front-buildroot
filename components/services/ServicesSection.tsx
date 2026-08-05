"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrambleText, type ScrambleTextHandle } from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface ServicesSectionProps {
  dict?: Dictionary["services"];
}

const SERVICE_KEYS = ["web", "consulting", "saas"] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

// A distinct color per slide — same idea as Home's process steps
// (components/home/WorkflowSteps.tsx), so each one reads as its own beat
// instead of three identical blue screens. Hex values here are explicit
// (not var(--bg-primary)) because that variable is already repointed to
// this page's accent blue by the route theme.
const SERVICE_COLORS: Record<ServiceKey, { bg: string; text: string }> = {
  web: { bg: "#0A0A0A", text: "#ffffff" },
  consulting: { bg: "var(--accent)", text: "#ffffff" },
  saas: { bg: "#e2e8f0", text: "#000000" },
};

const FALLBACK_SERVICES: Record<
  ServiceKey,
  { title: string; description: string; points: readonly string[] }
> = {
  web: {
    title: "Web Development",
    description:
      "A website or web app your customers actually enjoy using — fast, clear, and built to grow with your business instead of becoming next year's rebuild.",
    points: [
      "Marketing sites & product landing pages",
      "Web apps & internal tools",
      "API design & integrations",
      "Performance & Core Web Vitals",
    ],
  },
  consulting: {
    title: "Technical Consulting",
    description:
      "An honest, outside look at what you've already built — what's working, what's quietly costing you money, and exactly what to fix first. No jargon, no upsell.",
    points: [
      "Architecture & system design reviews",
      "Legacy migrations — framework, cloud, database",
      "Codebase & security audits",
      "CTO-as-a-service for early teams",
    ],
  },
  saas: {
    title: "SaaS Products",
    description:
      "From first sketch to paying customers. We handle everything behind the scenes so you can focus on the part of your product that actually sells.",
    points: [
      "MVP to production in weeks, not quarters",
      "Auth, billing & multi-tenant architecture",
      "Cloud infrastructure & CI/CD",
      "Ongoing iteration after launch",
    ],
  },
};

const ENGAGE_KEYS = ["project", "retainer", "audit"] as const;
type EngageKey = (typeof ENGAGE_KEYS)[number];

const FALLBACK_ENGAGE: Record<EngageKey, { title: string; description: string }> = {
  project: {
    title: "Project-Based",
    description:
      "Fixed scope, fixed price. You know exactly what you're getting before we write a line of code.",
  },
  retainer: {
    title: "Retainer",
    description:
      "Ongoing partnership for teams that ship continuously. We plug into your sprint, not the other way around.",
  },
  audit: {
    title: "Audit & Advise",
    description:
      "A one-time deep dive into your codebase or architecture. A clear report, not a sales pitch.",
  },
};

interface ServiceSlideProps {
  serviceKey: ServiceKey;
  index: number;
  total: number;
  item: { title: string; description: string };
  scrollYProgress: MotionValue<number>;
}

// One full-screen panel per service — slides up over the previous one and
// settles, the same stacking mechanic as Home's process steps
// (components/home/WorkflowSteps.tsx StepCard), just with 3 beats instead
// of 5 and no scale-down on the outgoing slide (the color change already
// makes the handoff read clearly).
function ServiceSlide({ serviceKey, index, total, item, scrollYProgress }: ServiceSlideProps) {
  const segment = 1 / total;
  const start = index * segment;
  // Transition takes 60% of this slide's own segment, leaving the other
  // 40% as a true rest period where it's the only thing on screen — a
  // window as wide as the full segment (or wider) meant the next slide
  // started creeping in before this one had even finished arriving, so it
  // never actually got to sit at rest covering the full viewport.
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - segment * 0.6), start],
    ["100%", "0%"]
  );
  const colors = SERVICE_COLORS[serviceKey];

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
      {/* Giant letter, top-right corner — A/B/C instead of 01/02/03, a
          much bigger echo of the small index label the rest of the site
          uses. Sits below the fixed navbar's height (it reappears on
          scroll-up, see Header.tsx's hide/show logic) so it never gets
          clipped under it. */}
      <span
        className="pointer-events-none absolute right-6 top-28 font-display text-[8rem] font-bold leading-none tracking-tighter sm:text-[10rem] md:right-12 md:top-32 md:text-[10rem] 2xl:text-[13rem]"
        style={{ opacity: 0.15 }}
      >
        {String.fromCharCode(65 + index)}
      </span>

      <h3 className="font-display text-5xl font-light capitalize tracking-tight sm:text-6xl md:text-8xl 2xl:text-9xl">
        {item.title}
      </h3>
      <p className="mt-6 max-w-4xl font-display font-normal leading-snug text-2xl md:text-3xl" style={{ opacity: 0.85 }}>
        {item.description}
      </p>
    </m.div>
  );
}

export function ServicesSection({ dict }: ServicesSectionProps) {
  // Imperative scramble refs — same idiom as the work page's link rows: the
  // hover area is the whole <Link>/<a>, not just the inner text span.
  const ctaButtonRef = useRef<ScrambleTextHandle>(null);
  const ctaEmailRef = useRef<ScrambleTextHandle>(null);

  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const ENGAGE_INTERVAL = 5000;
  const [engageIndex, setEngageIndex] = useState(0);
  const goNextEngage = () => setEngageIndex((i) => (i + 1) % ENGAGE_KEYS.length);

  // Auto-advances on its own — restarts the countdown every time the
  // index changes, whether from the timer itself or a manual Prev/Next
  // click, so it never fights the visitor's own navigation.
  useEffect(() => {
    const timer = setTimeout(goNextEngage, ENGAGE_INTERVAL);
    return () => clearTimeout(timer);
  }, [engageIndex]);

  return (
    <>
      {/* Header — full viewport height, so the cards below stay off-screen
          until the visitor actually scrolls. */}
      <section className="flex min-h-screen w-full flex-col justify-center px-6 pt-20 md:px-12">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="mb-4 font-display text-2xl text-white md:float-left md:mb-0 md:mr-10 md:mt-6 md:text-3xl">
              <ScrambleText
                text={dict?.title || "Services"}
                speed={55}
                trigger="mount"
              />
            </h1>
            <p className="w-full font-serif font-light leading-[0.95] tracking-tight text-white text-[clamp(2.2rem,7vw,5rem)] 2xl:text-[clamp(2.5rem,8vw,7rem)]">
              {dict?.subtitle ||
                "Three ways we work with you: we build your product, we fix what's broken, or we ship the whole thing end to end — always straight to the people writing the code."}
            </p>
          </div>
        </m.div>
      </section>

      {/* Services — each one is its own full-screen slide that stacks over
          the previous one as you scroll, same mechanic as Home's process
          steps. stackRef spans 3 viewport-heights of scroll room; the
          sticky child pins in place while that room scrolls underneath. */}
      <section id="services-stack" ref={stackRef} className="relative w-full" style={{ height: `${SERVICE_KEYS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {SERVICE_KEYS.map((key, i) => (
            <ServiceSlide
              key={key}
              serviceKey={key}
              index={i}
              total={SERVICE_KEYS.length}
              item={dict?.items?.[key] || FALLBACK_SERVICES[key]}
              scrollYProgress={stackProgress}
            />
          ))}
        </div>
      </section>

      {/* Engagement models — one giant statement heading, then a slider
          showing one model at a time instead of a stacked list, navigated
          with the same arrow/ScrambleText link language used everywhere
          else on the site (no dots, no rounded pill controls). */}
      <section className="relative flex min-h-screen w-full flex-col justify-center px-6 py-16 md:px-12">
        <m.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl md:text-3xl text-white"
        >
          {dict?.engage?.title || "How We Engage"}
        </m.h2>

        {/* Two columns — title flush left, description starting at 46%,
            the same anchor "work" sits at in the navbar and every /work
            row uses, so this lines up with that system too. */}
        <div className="relative mt-24 md:mt-32 lg:grid lg:grid-cols-[46%_1fr] lg:items-start lg:gap-8">
          {(() => {
            const key = ENGAGE_KEYS[engageIndex];
            const model = dict?.engage?.models?.[key] || FALLBACK_ENGAGE[key];
            return (
              <>
                {/* Fixed-height wrappers, with the animated text
                    absolutely filling them — old and new copy overlap in
                    place during the crossfade instead of the exiting
                    element's box collapsing before the entering one
                    mounts, which was shifting everything below it up for
                    a frame. */}
                <div className="relative min-h-[90px] sm:min-h-[110px] md:min-h-[150px] lg:col-start-1">
                  <AnimatePresence mode="wait">
                    <m.h3
                      key={key}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-0 w-full font-display text-6xl font-light capitalize tracking-tight text-white sm:text-7xl md:text-8xl"
                    >
                      {model.title}
                    </m.h3>
                  </AnimatePresence>
                </div>

                <div className="relative mt-6 min-h-[110px] md:mt-0 md:min-h-[140px] lg:col-start-2">
                  <AnimatePresence mode="wait">
                    <m.p
                      key={key}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-0 w-full font-display text-2xl font-normal leading-snug text-white/90 md:text-3xl"
                    >
                      {model.description}
                    </m.p>
                  </AnimatePresence>
                </div>
              </>
            );
          })()}
        </div>

      </section>

      {/* CTA — brought up to the same giant scale as the rest of the
          page (was still on the old small .headline/text-h2 utility).
          Link rows now run full-width instead of being capped to a
          narrow 380px column, so they carry real weight on the page. */}
      <section className="w-full border-t border-white/15 px-6 py-16 md:px-12 md:py-16 2xl:py-24">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-end lg:gap-24 2xl:gap-10">
          <div>
            <h3 className="font-display text-5xl font-light tracking-tight text-white sm:text-6xl md:text-6xl 2xl:text-7xl">
              {dict?.cta?.title || "Have a project in mind?"}
            </h3>
            <p className="mt-4 max-w-2xl font-display text-xl leading-relaxed text-white/90 md:text-2xl">
              {dict?.cta?.subtitle ||
                "Tell us what you're building. We'll tell you honestly whether we're the right fit — and if we are, how fast we can start."}
            </p>
          </div>

          <div className="flex w-full flex-col font-display text-3xl sm:text-4xl md:text-4xl 2xl:text-5xl">
            {/* Stacked link rows, not buttons — plain text on a top
                border, matching the pattern used across /work. */}
            <Link
              href="/contact"
              onMouseEnter={() => ctaButtonRef.current?.scramble()}
              onMouseLeave={() => ctaButtonRef.current?.reset()}
              className="group flex items-center justify-between border-t border-white py-4 2xl:py-6 text-white"
            >
              <ScrambleText
                ref={ctaButtonRef}
                text={dict?.cta?.button || "Start a Project"}
                trigger="mount"
                speed={40}
              />
              <ArrowRight className="h-9 w-9 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="mailto:info@buildroot.co"
              onMouseEnter={() => ctaEmailRef.current?.scramble()}
              onMouseLeave={() => ctaEmailRef.current?.reset()}
              className="group flex items-center justify-between border-t border-b border-white py-4 2xl:py-6 text-white"
            >
              <ScrambleText
                ref={ctaEmailRef}
                text={dict?.cta?.email_label || "or email us directly"}
                trigger="mount"
                speed={40}
              />
              <ArrowUpRight className="h-9 w-9 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
