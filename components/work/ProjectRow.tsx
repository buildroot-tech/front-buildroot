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
    <div className="w-full border-b-2 border-[var(--border)] bg-[var(--bg-primary)] transition-colors duration-200">
      {/* Locomotive-Style Horizontal Row Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex cursor-pointer flex-col justify-between gap-4 px-4 py-6 sm:px-6 md:px-10 lg:flex-row lg:items-center hover:bg-[var(--bg-secondary)]"
      >
        {/* Left: Index & Title */}
        <div className="flex items-center gap-4 md:gap-8">
          <span className="font-mono text-sm font-bold text-[var(--accent)]">
            [{project.indexCode}]
          </span>

          <div>
            <h3 className="heading text-h2 text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
              <ScrambleText text={project.title} trigger="hover" speed={50} />
            </h3>
            <p className="font-mono text-xs text-[var(--text-muted)] lg:hidden mt-1">
              {project.client} // {project.category}
            </p>
          </div>
        </div>

        {/* Right: Client, Category, Year & Expand Toggle */}
        <div className="flex items-center justify-between gap-6 font-mono text-xs sm:gap-12">
          <div className="hidden lg:flex items-center gap-8">
            <span className="uppercase text-[var(--text-muted)]">
              CLIENT :: <strong className="text-[var(--text-primary)]">{project.client}</strong>
            </span>
            <span className="border border-[var(--border)] px-2 py-0.5 font-bold uppercase text-[var(--accent)]">
              {project.category}
            </span>
            <span className="text-[var(--text-muted)]">
              {project.year}
            </span>
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 border-2 border-[var(--border)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              isExpanded
                ? "bg-[var(--accent)] text-white shadow-[2px_2px_0_var(--border)]"
                : "bg-[var(--bg-primary)] text-[var(--text-primary)] group-hover:bg-[var(--bg-hero)] group-hover:text-white"
            }`}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "CLOSE" : "EXPLORE"}</span>
            {isExpanded ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
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
            className="overflow-hidden border-t-2 border-dashed border-[var(--border-muted)] bg-[var(--bg-secondary)]"
          >
            <div className="p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Visual Preview Frame (Left 5 Cols) */}
                <div className="lg:col-span-5 border-2 border-[var(--border)] overflow-hidden shadow-[4px_4px_0_var(--border)]">
                  <ProjectVisualPreview project={project} />
                </div>

                {/* Details & Specs (Right 7 Cols) */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="font-mono text-xs uppercase text-[var(--accent)] font-bold">
                      /// PROJECT_OVERVIEW
                    </div>
                    <p className="mt-2 text-base text-[var(--text-primary)] leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Metric Box */}
                    {primaryMetric && (
                      <div className="mt-6 flex items-center justify-between border-2 border-[var(--border)] bg-[var(--bg-primary)] p-3.5 font-mono text-xs shadow-[3px_3px_0_var(--border)]">
                        <span className="uppercase tracking-wider font-bold text-[var(--text-muted)]">
                          /// KEY_IMPACT: {primaryMetric.label}
                        </span>
                        <span className="text-base font-black text-[var(--accent)]">
                          {primaryMetric.value}
                        </span>
                      </div>
                    )}

                    {/* Tech Stack Badges */}
                    <div className="mt-6 font-mono">
                      <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-2">
                        MODULES_LOADED:
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-0.5 font-bold text-[var(--text-primary)]"
                          >
                            [{tag}]
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-dashed border-[var(--border-muted)] font-mono text-xs">
                    <button
                      onClick={() => onSelectCaseStudy(project)}
                      className="brutalist-button brutalist-button-accent text-xs"
                    >
                      <Terminal className="h-3.5 w-3.5" />
                      <span>INSPECT CASE STUDY</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutalist-button text-xs"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="h-3.5 w-3.5" />
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
