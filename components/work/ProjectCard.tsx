"use client";

import { m } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { type Project } from "@/types";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { ProjectVisualPreview } from "@/components/work/ProjectVisualPreview";

interface ProjectCardProps {
  readonly project: Project;
  readonly onSelectCaseStudy: (project: Project) => void;
  readonly isWide?: boolean;
}

export function ProjectCard({
  project,
  onSelectCaseStudy,
  isWide = false,
}: ProjectCardProps) {
  const primaryMetric = project.metrics[0];

  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative flex flex-col justify-between border-b-2 border-r-2 border-[var(--border)] bg-[var(--bg-primary)] transition-colors duration-150 hover:bg-[var(--bg-secondary)] ${
        isWide ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Structural Visual Preview Block */}
      <ProjectVisualPreview project={project} />

      {/* Structural Header Cell */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="bg-[var(--border)] text-white px-2 py-0.5 font-bold">
            PRJ_{project.indexCode}
          </span>
          <span className="font-extrabold uppercase text-[var(--accent)]">
            {"// "}
            {project.category}
          </span>
        </div>
        <span className="border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-0.5 font-bold text-[var(--text-muted)]">
          {project.year}
        </span>
      </div>

      {/* Main Content Cell */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          {/* Client Tag */}
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            CLIENT ::{" "}
            <span className="font-bold text-[var(--text-primary)]">
              {project.client}
            </span>
          </div>

          {/* Title */}
          <h3 className="heading text-h3 mt-2 text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            <ScrambleText text={project.title} trigger="hover" speed={50} />
          </h3>

          <p className="mt-2.5 font-sans text-sm leading-relaxed text-[var(--text-muted)]">
            {project.summary}
          </p>

          {/* Metric Bar */}
          {primaryMetric && (
            <div className="mt-5 flex items-center justify-between border border-[var(--border)] bg-[var(--bg-primary)] p-2.5 font-mono text-xs">
              <span className="uppercase tracking-wider font-bold text-[var(--text-muted)]">
                {"/// METRIC: "}
                {primaryMetric.label}
              </span>
              <span className="text-sm font-black text-[var(--accent)]">
                {primaryMetric.value}
              </span>
            </div>
          )}

          {/* Modules List */}
          <div className="mt-5">
            <div className="flex flex-wrap gap-1 font-mono text-[11px]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-0.5 font-bold text-[var(--text-primary)] group-hover:border-[var(--accent)]"
                >
                  [{tag}]
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Seamless Action Link */}
        <div className="mt-6 pt-3 border-t border-dashed border-[var(--border-muted)]">
          <button
            onClick={() => onSelectCaseStudy(project)}
            className="group/btn flex w-full items-center justify-between border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
            aria-label={`Inspect case study for ${project.title}`}
          >
            <span className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5" />[ READ_CASE_STUDY // ]
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </button>
        </div>
      </div>
    </m.article>
  );
}
