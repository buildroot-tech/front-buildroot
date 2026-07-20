"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type ProjectCategory, type Project } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";

const CATEGORIES: readonly ProjectCategory[] = ["All", "SaaS", "Web Apps", "Consulting"];

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-[var(--border)] pb-6">
        <span className="mr-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Filter by:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count =
            cat === "All"
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex items-center gap-2 border-2 border-[var(--border)] px-4 py-2 font-mono text-xs uppercase font-semibold transition-all ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--text-inverse)] shadow-[3px_3px_0_var(--border)]"
                  : "bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-none font-mono text-[10px] ${
                  isActive
                    ? "bg-white text-[var(--accent)] font-bold"
                    : "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectCaseStudy={(proj) => setSelectedProject(proj)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
