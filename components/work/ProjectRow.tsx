"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Terminal, ExternalLink } from "lucide-react";
import { type Project } from "@/lib/projects";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { ProjectVisualPreview } from "@/components/work/ProjectVisualPreview";

interface ProjectRowProps {
  readonly project: Project;
  readonly onSelectCaseStudy: (project: Project) => void;
}

export function ProjectRow({ project, onSelectCaseStudy }: ProjectRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const primaryMetric = project.metrics[0];

  return (
    <div className="w-full bg-[var(--bg-primary)] my-3">
      {/* Locomotive-Style Horizontal Row Header with Generous Vertical & Horizontal Padding */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex cursor-pointer items-center justify-between gap-8 py-10 px-6 sm:px-10 md:px-14"
      >
        {/* Title & Client Metadata Container */}
        <div className="flex flex-1 items-baseline justify-between gap-8 min-w-0 pr-6 sm:pr-10">
          {/* Left: Title */}
          <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight shrink-0">
            <ScrambleText text={project.title} trigger="hover" speed={45} />
          </h3>

          {/* Right Metadata Info (Only Client Name - CLIENT :: Removed) */}
          <div className="hidden lg:flex items-center font-mono text-xs shrink-0">
            <span className="uppercase font-semibold text-[var(--text-muted)] tracking-wider">
              {project.client}
            </span>
          </div>
        </div>

        {/* Far Right: Interactive Swap (Category Badge in Normal State -> (+) Icon on Hover) */}
        <div className="relative flex items-center justify-end font-mono text-xs shrink-0 min-w-[120px] h-11">
          {/* Category Badge (Visible by default, vanishes on hover) */}
          <span
            className={`bg-[var(--bg-secondary)] px-4 py-2 font-semibold uppercase text-[var(--accent)] text-xs tracking-wider transition-all duration-200 ${
              isExpanded
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 group-hover:opacity-0 group-hover:scale-95"
            }`}
          >
            {project.category}
          </span>

          {/* (+) / (-) Icon Button (Hidden by default, appears on hover) */}
          <button
            type="button"
            className={`absolute right-0 flex h-11 w-11 shrink-0 items-center justify-center font-mono text-sm font-bold transition-all duration-200 ${
              isExpanded
                ? "opacity-100 scale-100 bg-[var(--accent)] text-white shadow-sm"
                : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            }`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse project" : "Expand project"}
          >
            {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>

        {/* UNIFORM FULL-WIDTH CONTINUOUS UNDERLINE ON HOVER - Same length & margin for all rows */}
        <span className="absolute bottom-2 left-6 right-6 sm:left-10 sm:right-10 md:left-14 md:right-14 h-[2.5px] bg-transparent group-hover:bg-[var(--text-primary)] transition-colors pointer-events-none" />
      </div>

      {/* Expandable Accordion Drawer Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden bg-[var(--bg-secondary)]/50"
          >
            <div className="p-8 sm:p-12 md:p-16">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Visual Preview Frame (Left 5 Cols) */}
                <div className="lg:col-span-5 overflow-hidden">
                  <ProjectVisualPreview project={project} />
                </div>

                {/* Details & Specs (Right 7 Cols) */}
                <div className="flex flex-col justify-between lg:col-span-7 space-y-8">
                  <div>
                    <div className="font-mono text-xs uppercase text-[var(--accent)] font-bold tracking-widest">
                      /// PROJECT_OVERVIEW
                    </div>
                    <p className="mt-4 text-base text-[var(--text-primary)] leading-relaxed font-sans max-w-2xl">
                      {project.description}
                    </p>

                    {/* Metric Box */}
                    {primaryMetric && (
                      <div className="mt-8 flex items-center justify-between bg-[var(--bg-primary)] p-5 font-mono text-xs">
                        <span className="uppercase tracking-wider font-bold text-[var(--text-muted)]">
                          /// KEY_IMPACT: {primaryMetric.label}
                        </span>
                        <span className="text-lg font-black text-[var(--accent)]">
                          {primaryMetric.value}
                        </span>
                      </div>
                    )}

                    {/* Tech Stack Badges */}
                    <div className="mt-8 font-mono">
                      <p className="text-[11px] uppercase font-bold text-[var(--text-muted)] mb-3 tracking-wider">
                        MODULES_LOADED:
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[var(--bg-primary)] px-3 py-1 font-semibold text-[var(--text-primary)]"
                          >
                            [{tag}]
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-8 flex flex-wrap items-center gap-4 font-mono text-xs">
                    <button
                      onClick={() => onSelectCaseStudy(project)}
                      className="brutalist-button brutalist-button-accent text-xs py-3 px-6"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>INSPECT CASE STUDY</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutalist-button text-xs py-3 px-6"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
