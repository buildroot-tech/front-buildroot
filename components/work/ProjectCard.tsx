"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { type Project } from "@/lib/projects";

interface ProjectCardProps {
  readonly project: Project;
  readonly onSelectCaseStudy: (project: Project) => void;
}

export function ProjectCard({ project, onSelectCaseStudy }: ProjectCardProps) {
  const primaryMetric = project.metrics[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="brutalist-card flex flex-col justify-between p-6 md:p-8"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-[var(--border)] pb-4">
          <span className="border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono text-xs font-semibold uppercase text-[var(--text-primary)]">
            {project.category}
          </span>
          <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
            {project.year}
          </span>
        </div>

        {/* Title & Client */}
        <div className="mt-5">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
            {project.client}
          </p>
          <h3 className="heading text-h3 mt-1 text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {project.summary}
          </p>
        </div>

        {/* Highlight Metric Pill */}
        {primaryMetric && (
          <div className="mt-6 flex items-center justify-between border-2 border-[var(--border)] bg-[var(--bg-primary)] p-3 shadow-[2px_2px_0_var(--border)]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>{primaryMetric.label}</span>
            </div>
            <span className="font-mono text-base font-bold text-[var(--accent)]">
              {primaryMetric.value}
            </span>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-primary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-8 pt-4">
        <button
          onClick={() => onSelectCaseStudy(project)}
          className="brutalist-button w-full justify-between"
          aria-label={`View case study for ${project.title}`}
        >
          <span>Read Case Study</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}
