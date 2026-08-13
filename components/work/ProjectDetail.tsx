"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import {
  ScrambleText,
  type ScrambleTextHandle,
} from "@/components/ui/TextScrambler";
import { PixelImage } from "@/components/ui/PixelImage";
import { projectImageSrc } from "@/lib/projects";
import type { Project } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

interface ProjectDetailProps {
  readonly project: Project;
  readonly dict?: Dictionary["work"]["detail"];
}

// Shared reveal, matching /about — content lifts slightly as it enters, once.
const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  variants: revealUp,
  transition: revealTransition,
} as const;

/** Small uppercase label that opens each block — the page's section rule. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
      {children}
    </p>
  );
}

/**
 * One pinned panel of the case-study stack. The panel above it stays put
 * while this one slides up and covers it.
 *
 * The slide takes 60% of the panel's own segment, leaving 40% as a genuine
 * rest period where it's the only thing on screen. A window as wide as the
 * whole segment means the next panel starts creeping in before this one has
 * finished arriving, so nothing ever sits still to be read — the same
 * timing /services arrived at.
 *
 * It carries an opaque background because the panels physically overlap:
 * without one you'd read two case-study sections through each other.
 */
function ProjectPanel({
  index,
  total,
  scrollYProgress,
  children,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - segment * 0.6), start],
    ["100%", "0%"],
  );

  return (
    <m.div
      className="absolute inset-0 flex flex-col justify-center bg-[var(--bg-primary)] px-6 md:px-12"
      style={{ y: index === 0 ? "0%" : y, zIndex: index }}
    >
      <div className="w-full">{children}</div>
    </m.div>
  );
}

export function ProjectDetail({ project, dict }: ProjectDetailProps) {
  const backRef = useRef<ScrambleTextHandle>(null);
  const demoRef = useRef<ScrambleTextHandle>(null);

  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const numbered = (items: readonly string[]) => (
    <ul className="flex flex-col border-t border-[var(--border)]">
      {items.map((item) => (
        <li key={item} className="border-b border-[var(--border)] py-5">
          <span className="type-lead">{item}</span>
        </li>
      ))}
    </ul>
  );

  const panels = [
    {
      key: "metrics",
      label: dict?.overview || "At a glance",
      content: (
        <ul className="flex flex-col border-t border-[var(--border)]">
          {project.metrics.map((metric) => (
            <li
              key={metric.label}
              className="flex flex-col gap-1 border-b border-[var(--border)] py-5 md:flex-row md:items-baseline md:gap-10"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] md:w-72">
                {metric.label}
              </span>
              <span className="type-lead">{metric.value}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "problem",
      label: dict?.problem || "Problem",
      content: (
        <p className="type-lead max-w-4xl">{project.caseStudy.challenge}</p>
      ),
    },
    {
      key: "solution",
      label: dict?.solution || "Solution",
      content: (
        <p className="type-lead max-w-4xl">{project.caseStudy.solution}</p>
      ),
    },
    {
      key: "results",
      label: dict?.results || "Results & Impact",
      content: numbered(project.caseStudy.results),
    },
  ];

  return (
    <article className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ── HEADER ─────────────────────────────────────────────
          Eyebrow left, statement right — the same opening every other
          section uses, so a case study reads as part of the same
          publication rather than its own template. */}
      <section className="w-full px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
        <LocaleLink
          href="/work"
          onMouseEnter={() => backRef.current?.scramble()}
          onMouseLeave={() => backRef.current?.reset()}
          className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <ScrambleText
            ref={backRef}
            text={dict?.back_to_work || "Back to Work"}
            trigger="manual"
            speed={40}
          />
        </LocaleLink>

        <m.div
          initial="hidden"
          animate="visible"
          variants={revealUp}
          transition={revealTransition}
          className="mt-12 flex flex-col gap-6 md:mt-16 lg:grid lg:grid-cols-[46%_1fr] lg:items-start lg:gap-8"
        >
          <div className="lg:col-start-1">
            <h1 className="type-eyebrow">{project.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              <span>{project.client}</span>
              <span aria-hidden="true">/</span>
              <span>{project.industry}</span>
              <span aria-hidden="true">/</span>
              <span>{project.year}</span>
            </div>
          </div>

          <p className="type-statement max-w-2xl lg:col-start-2">
            {project.description}
          </p>
        </m.div>
      </section>

      {/* ── HERO IMAGE ─────────────────────────────────────────
          Full-bleed and unframed. It used to sit in a 2px rule with a
          hard offset shadow — the one brutalist holdover the rest of
          the site has already dropped. */}
      {project.image && (
        <m.div
          {...inView}
          className="relative aspect-[16/9] w-full overflow-hidden"
        >
          <PixelImage src={projectImageSrc(project.image)} />
        </m.div>
      )}

      {/* ── CASE-STUDY STACK ───────────────────────────────────
          Each panel pins to the viewport and the next one slides up over
          it, so a section holds still while you read it and the rest
          stack on top. Same mechanic as /services' slides — see
          ProjectPanel for the timing. dvh, not vh — see the matching
          comment in WorkflowSteps.tsx: vh is taller than what's actually
          visible whenever a mobile browser's address bar is showing, so it
          visibly desyncs from the sticky panel as the toolbar collapses
          mid-scroll.

          --seg is shorter on mobile than desktop — see the matching
          comment on WorkflowSteps' driver div for why: 100dvh of driver
          per panel is a couple of mouse-wheel clicks, but several full
          touch swipes, most of which land in the panel's rest window
          where nothing visibly moves. */}
      <section
        ref={stackRef}
        className="relative w-full [--seg:65dvh] md:[--seg:100dvh]"
        style={{ height: `calc(var(--seg) * ${panels.length})` }}
      >
        <div className="sticky top-0 h-dvh w-full overflow-hidden">
          {panels.map((panel, i) => (
            <ProjectPanel
              key={panel.key}
              index={i}
              total={panels.length}
              scrollYProgress={stackProgress}
            >
              <SectionLabel>{panel.label}</SectionLabel>
              <div className="mt-8 w-full">{panel.content}</div>
            </ProjectPanel>
          ))}
        </div>
      </section>

      {/* ── LIVE SITE ──────────────────────────────────────────
          No stack list: which frameworks we reached for is our concern,
          not the client's, and naming them turns a case study into a
          CV. What the work achieved is already covered above. */}
      <section className="w-full px-6 pb-24 md:px-12 md:pb-32">
        <div className="flex flex-col lg:grid lg:grid-cols-[46%_1fr] lg:gap-8">
          {project.demoUrl && (
            <m.div
              {...inView}
              className="flex flex-col font-display text-3xl sm:text-4xl lg:col-start-2"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => demoRef.current?.scramble()}
                onMouseLeave={() => demoRef.current?.reset()}
                className="group flex items-center justify-between border-t border-b border-[var(--border)] py-5"
              >
                <ScrambleText
                  ref={demoRef}
                  text={dict?.live_demo || "Live Demo"}
                  trigger="manual"
                  speed={40}
                />
                <ArrowUpRight className="h-7 w-7 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </m.div>
          )}
        </div>
      </section>
    </article>
  );
}
