"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";
import { ArrowUpRight, Plus, Terminal } from "lucide-react";
import Link from "next/link";

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="w-full font-mono select-none">
      {/* Continuous Architectural Grid Container */}
      <div className="border-t-2 border-l-2 border-[var(--border)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {PROJECTS.map((project, idx) => {
            const isWide = idx === 0;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                isWide={isWide}
                onSelectCaseStudy={(proj) => setSelectedProject(proj)}
              />
            );
          })}

          {/* Interactive "YOUR BUILD HERE" Structural Cell */}
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group relative flex flex-col justify-between border-b-2 border-r-2 border-[var(--border)] bg-[#0f172a] p-6 text-white transition-colors hover:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="bg-[var(--accent)] px-2.5 py-0.5 text-xs font-black uppercase text-white">
                  [07] NEXT_BUILD
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" /> AVAILABLE FOR Q3/Q4
                </span>
              </div>

              <div className="mt-5">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  BUILDROOT_ STUDIO // INQUIRY
                </p>
                <h3 className="heading text-h3 mt-2 text-white">
                  Your Project Engineered Here
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300 font-sans">
                  Have an ambitious SaaS product, web application, or architecture refactor? We design, engineer, and ship in fast 2-4 week sprints.
                </p>
              </div>

              <div className="mt-5 border border-slate-700 bg-slate-950 p-2.5">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Terminal className="h-4 w-4 text-[var(--accent)]" />
                  <span>GUARANTEED 95+ LIGHTHOUSE & ZERO BLOAT</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-dashed border-slate-700">
              <Link
                href="/#contact"
                className="group/btn flex w-full items-center justify-between border border-white bg-[var(--accent)] px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[var(--border)]"
              >
                <span>[ INITIATE_BUILD_REQ → ]</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
