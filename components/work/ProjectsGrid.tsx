"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/projects";
import { ProjectRow } from "@/components/work/ProjectRow";
import { Plus, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { ProjectCategory } from "@/types";

interface ProjectsGridProps {
  dict?: Dictionary["work"];
  category?: ProjectCategory;
}

export function ProjectsGrid({ dict, category = "All" }: ProjectsGridProps) {
  const visibleProjects =
    category === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  // Only one row open at a time — expanding a new one closes whichever
  // was open before. WorkSection keys this whole component on `category`,
  // so a filter change remounts it fresh and resets this to null too,
  // no effect needed.
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Accordion Project List */}
      {visibleProjects.map((project) => (
        <ProjectRow
          key={project.id}
          project={project}
          viewCaseStudyLabel={dict?.view_case_study}
          isExpanded={expandedId === project.id}
          onToggle={() =>
            setExpandedId((current) => (current === project.id ? null : project.id))
          }
        />
      ))}

      {/* Marketing CTA — invite visitors to start a project with us */}
      <div className="w-full border-t border-[var(--text-primary)]/10 py-16 mt-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--accent)] tracking-widest">
              <Plus className="h-4 w-4" />
              <span>Next Project Slot</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mt-3 text-[var(--text-primary)] tracking-tight">
              {dict?.cta_title || "Ready to build your next digital product?"}
            </h3>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-primary)] font-sans max-w-4xl leading-relaxed">
              {dict?.cta_subtitle ||
                "We partner with founders and product teams to design, engineer, and ship high-performance web platforms — from the first architecture decision to production launch. If you have a project worth building well, let's talk."}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
            <Link
              href="/#cta"
              className="brutalist-button brutalist-button-accent text-xs font-bold tracking-wider py-4 px-8"
            >
              <span>{dict?.cta_button || "Start a Build"} →</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href="mailto:hello@buildroot.dev"
              className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{dict?.cta_email_label || "or email us directly"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
