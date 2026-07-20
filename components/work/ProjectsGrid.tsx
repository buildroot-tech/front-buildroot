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
    <div className="w-full font-mono select-none space-y-3">
      {/* Locomotive-Style Expandable List Rows */}
      {PROJECTS.map((project) => (
        <ProjectRow
          key={project.id}
          project={project}
          onSelectCaseStudy={(proj) => setSelectedProject(proj)}
        />
      ))}

      {/* Interactive "START YOUR PROJECT" Spacious Callout Row */}
      <div className="w-full bg-[var(--bg-secondary)]/60 py-16 px-6 sm:px-10 md:px-14 mt-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 max-w-7xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--accent)] tracking-widest">
              <Plus className="h-4 w-4" />
              <span>NEXT_PROJECT_SLOT</span>
            </div>
            <h3 className="heading text-h2 mt-3 text-[var(--text-primary)]">
              Ready to build your digital product?
            </h3>
            <p className="mt-2 text-base text-[var(--text-muted)] font-sans max-w-2xl leading-relaxed">
              We engineer scalable SaaS platforms, high-performance web applications, and custom cloud architecture in 2-4 week sprints.
            </p>
          </div>

          <div>
            <Link
              href="/#contact"
              className="brutalist-button brutalist-button-accent text-xs font-bold tracking-wider py-4 px-8"
            >
              <span>START A BUILD →</span>
              <ArrowUpRight className="h-4 w-4" />
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
