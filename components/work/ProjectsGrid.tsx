"use client";

import { useRef } from "react";
import { ProjectListRow } from "@/components/work/ProjectListRow";
import { ArrowRight } from "lucide-react";
import {
  ScrambleText,
  type ScrambleTextHandle,
} from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project, ProjectCategory } from "@/types";

interface ProjectsGridProps {
  dict?: Dictionary["work"];
  category?: ProjectCategory;
  projects: readonly Project[];
}

export function ProjectsGrid({
  dict,
  category = "All",
  projects,
}: ProjectsGridProps) {
  const visibleProjects =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  // Same imperative scramble idiom as the row's own hover: the trigger
  // area is the whole <a>, not just the span.
  const startBuildRef = useRef<ScrambleTextHandle>(null);

  return (
    <div className="w-full">
      {/* Same list — same component — the home page's Selected Works
          uses. A visitor clicks straight through to /work/[slug]; there's
          no in-place expansion to keep in sync with it. */}
      {visibleProjects.map((project) => (
        <ProjectListRow key={project.id} project={project} />
      ))}

      {/* Marketing CTA — invite visitors to start a project with us. The
          actions are plain link rows (border + arrow, no fill) matching
          Case Study / Visit Site instead of a solid button, for one
          consistent link language across the whole page. */}
      <div className="w-full py-40 md:py-48 mt-8">
        <div className="flex flex-col gap-10">
          <div className="w-full">
            <h3 className="type-eyebrow text-[var(--text-primary)]">
              {dict?.cta_title || "Ready to build your next digital product?"}
            </h3>
            <p className="type-manifesto mt-4 w-full text-[var(--text-primary)]">
              {dict?.cta_subtitle ||
                "We partner with founders and product teams to design, engineer, and ship high-performance web platforms — from the first architecture decision to production launch. If you have a project worth building well, let's talk."}
            </p>
          </div>

          <div className="flex flex-col font-display text-2xl md:text-3xl">
            <a
              href="mailto:info@buildroot.co"
              onMouseEnter={() => startBuildRef.current?.scramble()}
              onMouseLeave={() => startBuildRef.current?.reset()}
              className="group flex items-center justify-between border-t border-b border-[var(--text-primary)] py-5 text-[var(--text-primary)]"
            >
              <ScrambleText
                ref={startBuildRef}
                text={dict?.cta_button || "Start a Build"}
                trigger="manual"
                speed={40}
              />
              <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
