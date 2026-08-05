"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { type Project } from "@/types";
import { ScrambleText, type ScrambleTextHandle } from "@/components/ui/TextScrambler";
import { PixelImage } from "@/components/ui/PixelImage";

interface ProjectRowProps {
  readonly project: Project;
  readonly viewCaseStudyLabel?: string;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
}

// Fixed header height (see HEADER_H in Header.tsx) plus a little
// breathing room, so a row scrolled into view doesn't land tucked
// under the sticky nav.
const SCROLL_OFFSET = 96;

export function ProjectRow({ project, viewCaseStudyLabel, isExpanded, onToggle }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Once the hover preview has resolved once, the docked copy in the
  // drawer should just appear sharp — replaying the pixelation there
  // would look like the image broke, not like it moved.
  const [hasPreviewedImage, setHasPreviewedImage] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  // Imperative scramble refs — same idiom as Header.tsx's nav links: the
  // hover area is the whole link, not just the text span, so the scramble
  // is triggered from the wider container's onMouseEnter rather than
  // relying on ScrambleText's own built-in "hover" trigger.
  const caseStudyRef = useRef<ScrambleTextHandle>(null);
  const visitSiteRef = useRef<ScrambleTextHandle>(null);
  const isActive = isHovered || isExpanded;
  const previewLayoutId = `project-preview-${project.id}`;

  // Expanding scrolls the row to the top of the viewport — but only once
  // the layout it's scrolling to is actually final. Only one row can be
  // expanded at a time: opening this one also collapses whichever was
  // open before. That row's isExpanded flips to false immediately, but
  // AnimatePresence keeps its drawer mounted (and taking up its full
  // height) for the whole 300ms of its own exit transition — it doesn't
  // actually leave the document until that finishes. A couple of
  // animation frames (~33ms) is nowhere near that, so we were measuring
  // this row's position while the previous drawer was still sitting
  // above it, landing the scroll partway into this row's own detail
  // instead of at its header. Waiting slightly past that 300ms (see the
  // drawer's own exit transition below) before measuring fixes it.
  useEffect(() => {
    if (!isExpanded) return;

    const timeout = setTimeout(() => {
      if (!rowRef.current) return;
      const top = window.scrollY + rowRef.current.getBoundingClientRect().top - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }, 320);

    return () => clearTimeout(timeout);
  }, [isExpanded]);

  return (
    <div className="w-full" ref={rowRef}>
      {/* Header */}
      <div
        onClick={onToggle}
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
        <div className="relative flex flex-col items-start gap-2 pb-2 lg:grid lg:grid-cols-[46%_22%_1fr_200px_16%] lg:items-center lg:gap-4 lg:justify-normal">
          {/* Title */}
          <div className="min-w-0 shrink overflow-hidden lg:col-start-1">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-3xl 2xl:text-4xl font-light tracking-tight text-[var(--text-primary)] capitalize truncate">
              <ScrambleText text={project.title} trigger="mount" active={isActive} speed={40} />
            </h3>
          </div>

          {/* Industry — one or two words, same font/size/color as the
              title. Column 2 always starts exactly where column 1 ends
              (47%), which is where "work" sits in the navbar above.
              Dialed back to text-3xl for the lg range (1024–1535px):
              at md:text-4xl, the longest industry label ("Customer
              Service") needed ~304px but the 22%-wide column only had
              260–296px at laptop widths — it fit at the 1600px this was
              designed at (331px available) but truncated to "Customer
              Servi…" narrower than that. Back to text-4xl at 2xl
              (1536px+) where there's room again. */}
          <div className="hidden lg:col-start-2 lg:block truncate font-display text-2xl sm:text-3xl md:text-4xl lg:text-3xl 2xl:text-4xl font-light tracking-tight text-[var(--text-primary)] capitalize">
            <ScrambleText text={project.industry} trigger="mount" active={isActive} speed={40} />
          </div>

          {/* Category label / expand toggle — matched to the title too.
              Column 4, with column 3 (1fr) and column 5 (16%) as blank
              space around it. justify-start (not -end) so every category
              word — "SaaS", "Web Apps", "Consulting", "Labs" — starts from
              the same left edge of this column instead of hugging the
              +/- button on the right. */}
          <div className="relative flex items-center justify-start shrink-0 min-w-[200px] h-12 lg:col-start-4">
            <span
              className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-3xl 2xl:text-4xl font-light tracking-tight text-[var(--text-primary)] capitalize transition-opacity duration-200 ${
                isExpanded
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 group-hover:opacity-0"
              }`}
            >
              <ScrambleText text={project.category} trigger="mount" active={isActive} speed={40} />
            </span>

            <button
              type="button"
              className={`absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 text-[var(--text-primary)] transition-all duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse project" : "Expand project"}
            >
              {isExpanded ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </button>
          </div>

          {/* Line — hugs the text at the bottom on hover (collapsed state).
              Once expanded, it moves to sit above the title instead: a
              persistent top rule marking where the open project starts,
              rather than an underline that would run into the drawer
              content opening right below it. */}
          <span
            className={`absolute left-0 right-0 h-[2px] pointer-events-none transition-colors ${
              isExpanded
                ? "top-0 bg-[var(--text-primary)]"
                : "bottom-0 bg-transparent group-hover:bg-[var(--text-primary)]"
            }`}
          />

          {/* Mask — a rectangle the same color as the page, sized a bit
              larger than the preview below, that stays fully opaque for
              as long as the preview is mounted (including its fade-out).
              The image itself fades its own opacity in/out over 0.4s, so
              a mask tied to that same fade would be semi-transparent too
              and let the line bleed through mid-fade — this one animates
              nothing (opacity pinned at 1 the whole time), it only uses
              AnimatePresence to stay mounted exactly as long as the image
              does, so it blocks the line through the entire hover, enter
              and exit alike. */}
          <AnimatePresence>
            {isHovered && !isExpanded && project.image && (
              <m.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute left-1/2 bottom-0 z-10 hidden w-[320px] h-[208px] -translate-x-1/2 translate-y-1/2 bg-[var(--bg-work)] sm:block lg:left-[46%] lg:-translate-x-[calc(100%+6px)]"
              />
            )}
          </AnimatePresence>

          {/* Floating preview, sitting on the underline (half above the
              text, half below). On lg+ its right edge lands just before
              the industry column (46%, a small gap short of it) instead
              of centering on the whole row — below lg, industry is
              hidden, so it stays centered. Only while hovered and
              collapsed: once expanded, this same image (shared layoutId)
              glides down into the drawer. No scale/opacity animation of
              its own — that would fight the layout FLIP and read as a
              fade instead of a move. */}
          <AnimatePresence>
            {isHovered && !isExpanded && project.image && (
              <m.div
                layoutId={previewLayoutId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-1/2 bottom-0 z-20 hidden w-[300px] h-[188px] -translate-x-1/2 translate-y-1/2 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)] sm:block lg:left-[46%] lg:-translate-x-[calc(100%+16px)]"
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
            <div className="pb-20 md:pb-28">
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-2">
                {/* Small image, docked here from the hover position — same
                    fixed size in both spots, so the shared layoutId only
                    moves it, never resizes it. Facts stack downward. */}
                <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-3">
                  {project.image && (
                    <m.div
                      layoutId={previewLayoutId}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full max-w-[300px] aspect-[16/10] overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)]"
                    >
                      <PixelImage src={`/projects/${project.image}.jpg`} instant={hasPreviewedImage} />
                      <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
                    </m.div>
                  )}

                  {/* Three business-facing highlights — what the project
                      is and does, never framework/library names, which
                      mean nothing to a prospective client. */}
                  <div className="flex w-full flex-col gap-0 font-mono text-base capitalize leading-tight">
                    {project.highlights.map((highlight) => (
                      <span key={highlight} className="w-full text-[var(--text-primary)]">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big image, year in the bottom-left corner — back to
                    close to its original size, just trimmed one column
                    narrower at xl than before. */}
                <div className="lg:col-span-5 xl:col-span-6 lg:ml-6 relative aspect-[16/10] overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)]">
                  {project.image && <PixelImage src={`/projects/${project.image}.jpg`} />}
                  <span className="absolute bottom-3 left-3 font-mono text-xs font-bold text-white bg-black/50 px-2 py-1 backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                {/* Description + links — blank space above, bottom-aligned
                    with the big image. Small (3 or 2 cols) + big (5 or 6)
                    always add up to 8 of 12 columns, so starting this at
                    column 10 instead of the implicit 9 leaves column 9
                    blank on purpose — that's what lines its left edge up
                    with the header's "−" toggle, without touching the
                    small or big image's own size or the gap between
                    them. */}
                <div className="lg:col-start-10 lg:col-span-3 flex flex-col justify-end lg:-ml-16">
                  <p className="text-base text-[var(--text-primary)] leading-relaxed font-display">
                    {project.description}
                  </p>

                  {/* Stacked link rows, not buttons — plain text on a
                      top border, blending with the page instead of a
                      filled block sitting on top of it. */}
                  <div className="mt-6 flex flex-col font-display text-2xl md:text-3xl">
                    <Link
                      href={`/work/${project.id}`}
                      onMouseEnter={() => caseStudyRef.current?.scramble()}
                      onMouseLeave={() => caseStudyRef.current?.reset()}
                      className="group flex items-center justify-between border-t border-[var(--text-primary)] py-5 text-[var(--text-primary)]"
                    >
                      <ScrambleText
                        ref={caseStudyRef}
                        text={viewCaseStudyLabel || "Case Study"}
                        trigger="mount"
                        speed={40}
                      />
                      <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => visitSiteRef.current?.scramble()}
                        onMouseLeave={() => visitSiteRef.current?.reset()}
                        className="group flex items-center justify-between border-t border-b border-[var(--text-primary)] py-5 text-[var(--text-primary)]"
                      >
                        <ScrambleText ref={visitSiteRef} text="Visit Site" trigger="mount" speed={40} />
                        <ArrowUpRight className="h-7 w-7 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
