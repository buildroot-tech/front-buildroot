"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Terminal, CheckSquare, ArrowRight } from "lucide-react";
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f172a]/85 backdrop-blur-md"
          />

          {/* Terminal Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border-4 border-[var(--border)] bg-[var(--bg-primary)] shadow-[12px_12px_0_var(--accent)]"
          >
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between border-b-4 border-[var(--border)] bg-[var(--bg-hero)] px-5 py-3 text-[var(--text-inverse)] font-mono">
              <div className="flex items-center gap-3">
                {/* Terminal Window Controls */}
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 border border-red-500 bg-red-500/80" />
                  <span className="h-3 w-3 border border-yellow-500 bg-yellow-500/80" />
                  <span className="h-3 w-3 border border-emerald-500 bg-emerald-500/80" />
                </div>
                <span className="ml-2 text-xs font-bold tracking-wider text-slate-300">
                  SYS_INSPECTOR // LOG_{project.indexCode} :: {project.id.toUpperCase()}
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 border border-white/30 bg-white/10 px-2.5 py-1 text-xs font-bold uppercase transition-colors hover:bg-red-600 hover:text-white"
                aria-label="Close case study terminal"
              >
                <span>ESC / CLOSE</span>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Scrollable Terminal Content */}
            <div className="overflow-y-auto p-6 md:p-10 font-sans">
              {/* Header Title Block */}
              <div className="border-b-3 border-dashed border-[var(--border-muted)] pb-6">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase text-[var(--accent)] font-bold">
                  <Terminal className="h-4 w-4" />
                  <span>CLIENT :: {project.client}</span>
                  <span className="text-[var(--text-muted)]">//</span>
                  <span>YEAR :: {project.year}</span>
                  <span className="text-[var(--text-muted)]">//</span>
                  <span>CAT :: {project.category}</span>
                </div>
                <h2 id="case-study-title" className="heading text-h1 mt-2 text-[var(--text-primary)]">
                  {project.title}
                </h2>
                <p className="mt-3 text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="mt-8">
                <p className="font-mono text-xs uppercase font-bold tracking-widest text-[var(--text-muted)] mb-3">
                  /// METRIC_TELEMETRY_LOGS
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={metric.label}
                      className="border-3 border-[var(--border)] bg-[var(--bg-secondary)] p-4 shadow-[4px_4px_0_var(--border)]"
                    >
                      <p className="font-mono text-xs uppercase font-bold text-[var(--text-muted)]">
                        [0{i + 1}] {metric.label}
                      </p>
                      <p className="mt-1 font-mono text-3xl font-black text-[var(--accent)]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution Panels */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="border-3 border-[var(--border)] bg-red-50/20 p-6">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-red-600 border-b-2 border-red-600/30 pb-2">
                    /// 01_PROBLEM_DIAGNOSIS
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-primary)]">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                <div className="border-3 border-[var(--border)] bg-blue-50/20 p-6">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)] border-b-2 border-[var(--accent)]/30 pb-2">
                    /// 02_ENGINEERING_SOLUTION
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-primary)]">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Architectural Decisions */}
              <div className="mt-8 border-3 border-[var(--border)] bg-[var(--bg-hero)] text-[var(--text-inverse)] p-6 md:p-8">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)] border-b border-slate-700 pb-3 flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  /// 03_ARCHITECTURAL_DECISIONS
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 font-mono text-xs">
                  {project.caseStudy.architecture.map((arch, idx) => (
                    <li key={arch} className="flex items-start gap-3 border border-slate-700 bg-slate-900/60 p-3 text-slate-200">
                      <span className="text-[var(--accent)] font-bold">[0{idx + 1}]</span>
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Measured Impact */}
              <div className="mt-8 border-3 border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 border-b-2 border-emerald-600/30 pb-2 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  /// 04_MEASURED_IMPACT & DELIVERABLES
                </div>
                <ul className="mt-4 grid gap-2.5 font-mono text-xs text-[var(--text-primary)]">
                  {project.caseStudy.results.map((res) => (
                    <li key={res} className="flex items-center gap-3 border border-[var(--border)] bg-[var(--bg-primary)] p-2.5">
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span className="font-semibold">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Modules */}
              <div className="mt-8 font-mono">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  MODULES_DEPLOYED:
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
            </div>

            {/* Terminal Footer */}
            <div className="flex flex-wrap items-center justify-between border-t-4 border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-4 font-mono text-xs">
              <span className="text-[var(--text-muted)]">
                BUILDROOT_ENGINEERING // END_OF_LOG
              </span>
              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button brutalist-button-accent text-xs"
                  >
                    <span>LAUNCH PROD</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button onClick={onClose} className="brutalist-button text-xs">
                  CLOSE INSPECTOR
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
