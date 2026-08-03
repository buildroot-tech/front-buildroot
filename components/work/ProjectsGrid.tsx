"use client";

import { useRef, useState } from "react";
import { PROJECTS } from "@/lib/projects";
import { ProjectRow } from "@/components/work/ProjectRow";
import { ArrowRight } from "lucide-react";
import { ScrambleText, type ScrambleTextHandle } from "@/components/ui/TextScrambler";
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
  // Same imperative scramble idiom as the row's own Case Study / Visit
  // Site links: the hover area is the whole <a>, not just the span.
  const startBuildRef = useRef<ScrambleTextHandle>(null);

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

      {/* Marketing CTA — invite visitors to start a project with us. Same
          46%/1fr split as the section header above, and the actions are
          plain link rows (border + arrow, no fill) matching Case Study /
          Visit Site instead of a solid button, for one consistent link
          language across the whole page. */}
      <div className="w-full py-40 md:py-48 mt-8">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[60%_1fr] lg:items-end">
          <div className="lg:col-start-1">
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight">
              {dict?.cta_title || "Ready to build your next digital product?"}
            </h3>
            <p className="mt-4 text-3xl md:text-4xl text-[var(--text-primary)] font-sans leading-snug">
              {dict?.cta_subtitle ||
                "We partner with founders and product teams to design, engineer, and ship high-performance web platforms — from the first architecture decision to production launch. If you have a project worth building well, let's talk."}
            </p>
          </div>

          <div className="lg:col-start-2 flex flex-col font-sans text-2xl md:text-3xl">
            <a
              href="mailto:info@buildroot.co"
              onMouseEnter={() => startBuildRef.current?.scramble()}
              onMouseLeave={() => startBuildRef.current?.reset()}
              className="group flex items-center justify-between border-t border-[var(--text-primary)] pt-5 text-[var(--text-primary)]"
            >
              <ScrambleText
                ref={startBuildRef}
                text={dict?.cta_button || "Start a Build"}
                trigger="mount"
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
