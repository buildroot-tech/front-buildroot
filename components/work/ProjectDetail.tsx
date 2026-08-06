"use client";

import { LocaleLink } from "@/components/ui/LocaleLink";
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  ExternalLink,
} from "lucide-react";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { PixelImage } from "@/components/ui/PixelImage";
import type { Project } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

interface ProjectDetailProps {
  readonly project: Project;
  readonly dict?: Dictionary["work"]["detail"];
}

export function ProjectDetail({ project, dict }: ProjectDetailProps) {
  return (
    <article className="w-full bg-[var(--bg-primary)]">
      <div className="w-full px-6 md:px-12 section-generous">
        {/* Back link */}
        <LocaleLink
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>{dict?.back_to_work || "Back to Work"}</span>
        </LocaleLink>

        {/* Header */}
        <header className="mt-8 md:mt-12">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase text-[var(--accent)] font-bold tracking-widest">
            <span>{project.client}</span>
            <span className="text-[var(--text-muted)]">{"//"}</span>
            <span>{project.category}</span>
            <span className="text-[var(--text-muted)]">{"//"}</span>
            <span>{project.year}</span>
          </div>
          <h1 className="headline text-display mt-4 text-[var(--text-primary)] tracking-tight">
            <ScrambleText text={project.title} speed={55} trigger="manual" />
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-[var(--text-primary)] max-w-3xl leading-relaxed font-display">
            {project.description}
          </p>
        </header>

        {/* Hero Image */}
        {project.image && (
          <div className="relative mt-10 md:mt-14 aspect-[16/9] w-full overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)]">
            <PixelImage src={`/projects/${project.image}.jpg`} />
          </div>
        )}

        {/* Metrics */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="brutalist-card p-5">
              <p className="font-mono text-xs uppercase font-bold text-[var(--text-muted)]">
                {metric.label}
              </p>
              <p className="mt-1 font-mono text-2xl md:text-3xl font-black text-[var(--accent)]">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Challenge & Solution */}
        <div className="mt-10 md:mt-14 grid gap-6 md:grid-cols-2">
          <div className="brutalist-card p-6 md:p-8">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] border-b-2 border-[var(--border-muted)] pb-3">
              {dict?.problem || "Problem"}
            </div>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-[var(--text-primary)]">
              {project.caseStudy.challenge}
            </p>
          </div>

          <div className="brutalist-card p-6 md:p-8">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)] border-b-2 border-[var(--accent)]/30 pb-3">
              {dict?.solution || "Solution"}
            </div>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-[var(--text-primary)]">
              {project.caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10 md:mt-14 border-2 border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-10">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] border-b-2 border-[var(--border-muted)] pb-3 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            {dict?.results || "Results & Impact"}
          </div>
          <ul className="mt-4 grid gap-2.5 font-mono text-xs text-[var(--text-primary)]">
            {project.caseStudy.results.map((res) => (
              <li
                key={res}
                className="flex items-center gap-3 border border-[var(--border)] bg-[var(--bg-primary)] p-2.5"
              >
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                <span className="font-semibold">{res}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stack + Actions */}
        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="font-mono">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
              {dict?.stack || "Stack"}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1 text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutalist-button brutalist-button-accent text-xs"
            >
              <span>{dict?.live_demo || "Live Demo"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
