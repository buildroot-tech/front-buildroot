"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { type Project } from "@/lib/projects";

interface CaseStudyModalProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-primary)] shadow-[8px_8px_0_var(--border)]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[var(--border)] bg-[var(--bg-hero)] px-6 py-4 text-[var(--text-inverse)]">
              <div className="flex items-center gap-3">
                <span className="border border-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-xs font-semibold uppercase text-[var(--accent)]">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[var(--border-muted)]">
                  // {project.client} ({project.year})
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center border border-white/20 bg-transparent text-white transition-colors hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 md:p-8">
              {/* Title & Description */}
              <div>
                <h2 id="case-study-title" className="heading text-h2 text-[var(--text-primary)]">
                  {project.title}
                </h2>
                <p className="mt-3 text-lg text-[var(--text-muted)]">
                  {project.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-2 border-[var(--border)] bg-[var(--bg-secondary)] p-4 shadow-[4px_4px_0_var(--border)]"
                  >
                    <p className="font-mono text-2xl font-bold text-[var(--accent)]">
                      {metric.value}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div className="border-2 border-[var(--border)] p-6">
                  <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-3 font-mono text-sm font-bold uppercase tracking-wider">
                    <span className="h-2 w-2 bg-red-500" />
                    The Challenge
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                <div className="border-2 border-[var(--border)] p-6">
                  <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-3 font-mono text-sm font-bold uppercase tracking-wider">
                    <span className="h-2 w-2 bg-[var(--accent)]" />
                    Our Solution
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Architecture & Deliverables */}
              <div className="mt-8 border-2 border-[var(--border)] p-6">
                <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-3 font-mono text-sm font-bold uppercase tracking-wider">
                  <Cpu className="h-4 w-4 text-[var(--accent)]" />
                  Key Architectural Decisions
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.caseStudy.architecture.map((arch) => (
                    <li key={arch} className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Measurable Results */}
              <div className="mt-8 border-2 border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                <div className="flex items-center gap-2 border-b-2 border-[var(--border)] pb-3 font-mono text-sm font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Measurable Impact
                </div>
                <ul className="mt-4 grid gap-3">
                  {project.caseStudy.results.map((res) => (
                    <li key={res} className="flex items-start gap-2.5 text-sm font-medium text-[var(--text-primary)]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-emerald-600" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Technologies Used
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1 font-mono text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between border-t-2 border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-4">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                buildroot_ // Case Study
              </div>
              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button brutalist-button-accent text-xs"
                  >
                    <span>View Project</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button onClick={onClose} className="brutalist-button text-xs">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
