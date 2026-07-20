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
    <div className="w-full bg-[var(--bg-primary)] transition-colors duration-200 my-1">
      {/* Balanced Locomotive-Style Horizontal Row Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex cursor-pointer flex-col justify-between gap-4 py-7 px-6 sm:px-8 md:px-12 lg:flex-row lg:items-center hover:bg-[var(--bg-secondary)]/70 transition-colors"
      >
        {/* Left: Balanced Title (text-xl md:text-2xl lg:text-3xl) */}
        <div className="flex items-center gap-4 md:gap-8">
          <div>
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] tracking-tight">
              <ScrambleText text={project.title} trigger="hover" speed={45} />
            </h3>
            <p className="font-mono text-xs text-[var(--text-muted)] lg:hidden mt-1.5">
              {project.client} // {project.category}
            </p>
          </div>
        </div>

        {/* Right: Client, Category & Expand Toggle */}
        <div className="flex items-center justify-between gap-8 font-mono text-xs sm:gap-12">
          <div className="hidden lg:flex items-center gap-10">
            <span className="uppercase text-[var(--text-muted)] tracking-wider">
              CLIENT :: <strong className="text-[var(--text-primary)]">{project.client}</strong>
            </span>
            <span className="bg-[var(--bg-secondary)] px-3.5 py-1 font-semibold uppercase text-[var(--accent)] text-xs">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              isExpanded
                ? "bg-[var(--accent)] text-white shadow-sm"
                : "bg-[var(--bg-secondary)] text-[var(--text-primary)] group-hover:bg-[var(--accent)] group-hover:text-white"
            }`}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "CLOSE" : "EXPLORE"}</span>
            {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
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
            <div className="p-8 sm:p-10 md:p-14">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Visual Preview Frame (Left 5 Cols) */}
                <div className="lg:col-span-5 overflow-hidden">
                  <ProjectVisualPreview project={project} />
                </div>

                {/* Details & Specs (Right 7 Cols) */}
                <div className="flex flex-col justify-between lg:col-span-7 space-y-6">
                  <div>
                    <div className="font-mono text-xs uppercase text-[var(--accent)] font-bold tracking-widest">
                      /// PROJECT_OVERVIEW
                    </div>
                    <p className="mt-3 text-base text-[var(--text-primary)] leading-relaxed font-sans max-w-2xl">
                      {project.description}
                    </p>

                    {/* Metric Box */}
                    {primaryMetric && (
                      <div className="mt-8 flex items-center justify-between bg-[var(--bg-primary)] p-4 font-mono text-xs">
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
                  <div className="pt-6 flex flex-wrap items-center gap-4 font-mono text-xs">
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
