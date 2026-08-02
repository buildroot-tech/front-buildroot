"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, ExternalLink, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { type Project } from "@/types";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { PixelImage } from "@/components/ui/PixelImage";

interface ProjectRowProps {
  readonly project: Project;
  readonly viewCaseStudyLabel?: string;
}

export function ProjectRow({ project, viewCaseStudyLabel }: ProjectRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Once the hover preview has resolved once, the docked copy in the
  // drawer should just appear sharp — replaying the pixelation there
  // would look like the image broke, not like it moved.
  const [hasPreviewedImage, setHasPreviewedImage] = useState(false);
  const primaryMetric = project.metrics[0];
  const isActive = isHovered || isExpanded;
  const previewLayoutId = `project-preview-${project.id}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => {
          setIsHovered(true);
          setHasPreviewedImage(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer py-6 sm:py-8"
      >
        {/* Fixed grid columns (not flex) — the title's width used to push
            everything after it, so "industry" landed at a different X on
            every row depending on how long the title was. A grid gives
            each piece its own fixed track, so industry always starts at
            the same column ("work"'s column) and category always ends at
            the same column ("about"'s), regardless of title length. */}
        <div className="relative flex items-center justify-between gap-4 pb-2 lg:grid lg:grid-cols-[46%_22%_1fr_auto_16%] lg:justify-normal">
          {/* Title */}
          <div className="min-w-0 shrink overflow-hidden lg:col-start-1">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[var(--text-primary)] capitalize truncate">
              <ScrambleText text={project.title} trigger="mount" active={isActive} speed={40} />
            </h3>
          </div>

          {/* Industry — one or two words, same font/size/color as the
              title. Column 2 always starts exactly where column 1 ends
              (47%), which is where "work" sits in the navbar above. */}
          <div className="hidden lg:col-start-2 lg:block truncate font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[var(--text-primary)] capitalize">
            {project.industry}
          </div>

          {/* Category label / expand toggle — matched to the title too.
              Column 4, with column 3 (1fr) and column 5 (16%) as blank
              space around it. justify-start (not -end) so every category
              word — "SaaS", "Web Apps", "Consulting", "Labs" — starts from
              the same left edge of this column instead of hugging the
              +/- button on the right. */}
          <div className="relative flex items-center justify-start shrink-0 min-w-[160px] h-12 lg:col-start-4">
            <span
              className={`font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[var(--text-primary)] capitalize transition-all duration-200 ${
                isExpanded
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 group-hover:opacity-0 group-hover:scale-95"
              }`}
            >
              {project.category}
            </span>

            <button
              type="button"
              className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 text-[var(--text-primary)] transition-all duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse project" : "Expand project"}
            >
              {isExpanded ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </button>
          </div>

          {/* Underline — only visible on hover, hugging the text like a
              real underline. No permanent divider between rows. */}
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[var(--text-primary)] transition-colors pointer-events-none" />

          {/* Floating preview, sitting on the underline (half above the
              text, half below). The shadow-[...] is a solid ring the same
              color as the page background — it doesn't touch the image
              itself, just makes sure the underline (which sits right
              behind, same z-level as the row) never visibly runs into the
              image's edge. On lg+ its right edge lands just before the
              industry column (46%, a small gap short of it) instead of
              centering on the whole row — below lg, industry is hidden,
              so it stays centered. Only while hovered and collapsed: once
              expanded, this same image (shared layoutId) glides down into
              the drawer. No scale/opacity animation of its own — that
              would fight the layout FLIP and read as a fade instead of a
              move. */}
          <AnimatePresence>
            {isHovered && !isExpanded && project.image && (
              <m.div
                layoutId={previewLayoutId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-1/2 bottom-0 z-20 hidden w-[260px] h-[160px] -translate-x-1/2 translate-y-1/2 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)] shadow-[0_0_0_10px_var(--bg-work)] sm:block lg:left-[46%] lg:-translate-x-[calc(100%+16px)]"
              >
                <PixelImage src={`/projects/${project.image}.jpg`} />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Expandable drawer — no height animation (it would keep moving the
          image's landing spot every frame) and no fade-in either: fading
          the drawer in would fade its children too, including the docked
          image mid-flight, hiding the very glide we want to see. It only
          fades on the way OUT, for a soft collapse. */}
      <AnimatePresence>
        {isExpanded && (
          <m.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="pb-10 md:pb-14">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-4">
                {/* Small image, docked here from the hover position — same
                    fixed size in both spots, so the shared layoutId only
                    moves it, never resizes it. Facts stack downward. */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  {project.image && (
                    <m.div
                      layoutId={previewLayoutId}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-[260px] h-[160px] overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)]"
                    >
                      <PixelImage src={`/projects/${project.image}.jpg`} instant={hasPreviewedImage} />
                      <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
                    </m.div>
                  )}

                  {/* Three business-facing highlights — what the project
                      is and does, never framework/library names, which
                      mean nothing to a prospective client. */}
                  <div className="flex w-full flex-col gap-2 font-mono text-xs capitalize">
                    {project.highlights.map((highlight) => (
                      <span key={highlight} className="w-full text-[var(--text-primary)]">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big image, year in the bottom-left corner */}
                <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)]">
                  {project.image && <PixelImage src={`/projects/${project.image}.jpg`} />}
                  <span className="absolute bottom-3 left-3 font-mono text-xs font-bold text-white bg-black/50 px-2 py-1 backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                {/* Description + links — blank space above, bottom-aligned
                    with the big image, one level below the description. */}
                <div className="lg:col-span-4 flex flex-col justify-end">
                  <p className="text-base text-[var(--text-primary)] leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {primaryMetric && (
                    <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                      <span className="text-base font-black text-[var(--accent)]">
                        {primaryMetric.value}
                      </span>{" "}
                      {primaryMetric.label}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs">
                    <Link
                      href={`/work/${project.id}`}
                      className="brutalist-button brutalist-button-accent text-xs py-3 px-6"
                    >
                      <span>{viewCaseStudyLabel || "View Case Study"}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutalist-button text-xs py-3 px-6"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
