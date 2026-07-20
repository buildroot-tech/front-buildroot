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
    <div className="w-full font-mono select-none border-t-2 border-[var(--border)]">
      {/* Locomotive-Style Expandable List Rows */}
      {PROJECTS.map((project) => (
        <ProjectRow
          key={project.id}
          project={project}
          onSelectCaseStudy={(proj) => setSelectedProject(proj)}
        />
      ))}

      {/* Interactive "START YOUR PROJECT" Final Row */}
      <div className="w-full border-b-2 border-[var(--border)] bg-[#0f172a] text-white p-6 sm:p-8 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--accent)]">
              <Plus className="h-4 w-4" />
              <span>[07] NEXT_PROJECT_SLOT</span>
            </div>
            <h3 className="heading text-h2 mt-2 text-white">
              Ready to build your digital product?
            </h3>
            <p className="mt-1 text-sm text-slate-300 font-sans max-w-xl">
              We engineer scalable SaaS platforms, high-performance web applications, and custom cloud architecture in 2-4 week sprints.
            </p>
          </div>

          <div>
            <Link
              href="/#contact"
              className="brutalist-button brutalist-button-accent text-xs font-bold tracking-wider"
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
