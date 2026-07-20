"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { ProjectRow } from "@/components/work/ProjectRow";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";
import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="w-full font-mono select-none space-y-2">
      {/* Locomotive-Style Expandable List Rows */}
      {PROJECTS.map((project) => (
        <ProjectRow
          key={project.id}
          project={project}
          onSelectCaseStudy={(proj) => setSelectedProject(proj)}
        />
      ))}

      {/* Interactive "START YOUR PROJECT" Subtle Callout Row */}
      <div className="w-full bg-[var(--bg-secondary)]/60 py-12 px-6 sm:px-8 md:px-12 mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 max-w-7xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--accent)] tracking-widest">
              <Plus className="h-3.5 w-3.5" />
              <span>NEXT_PROJECT_SLOT</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold mt-2 text-[var(--text-primary)]">
              Ready to build your digital product?
            </h3>
            <p className="mt-1.5 text-sm text-[var(--text-muted)] font-sans max-w-2xl leading-relaxed">
              We engineer scalable SaaS platforms, high-performance web applications, and custom cloud architecture in 2-4 week sprints.
            </p>
          </div>

          <div>
            <Link
              href="/#contact"
              className="brutalist-button brutalist-button-accent text-xs font-bold tracking-wider py-3 px-6"
            >
              <span>START A BUILD →</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
