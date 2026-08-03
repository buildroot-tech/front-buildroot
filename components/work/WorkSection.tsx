"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { X } from "lucide-react";
import { ProjectsGrid } from "@/components/work/ProjectsGrid";
import { PROJECTS } from "@/lib/projects";
import type { ProjectCategory } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

interface WorkSectionProps {
  dict?: Dictionary["work"];
}

const CATEGORIES: ProjectCategory[] = ["All", "SaaS", "Web Apps", "Consulting", "Labs"];

export function WorkSection({ dict }: WorkSectionProps) {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const count =
    category === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === category).length;

  // Picking a category while scrolled down, filter open, should feel like
  // a fresh start: back to the top of the page, filter closed, and any
  // project row left expanded from before the filter reset too (handled
  // by keying the rows on category in ProjectsGrid).
  const selectCategory = (cat: ProjectCategory) => {
    setCategory(cat);
    setIsFilterOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="relative w-full bg-[var(--bg-primary)] py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12">
        {isFilterOpen ? (
          /* Filter takeover — replaces the header entirely (the trigger
             becomes "Close", the subtitle is gone, covered by the
             category list) rather than sitting alongside it. */
          <div className="pb-24 md:pb-32">
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="inline-flex cursor-pointer items-center gap-1.5 font-sans text-2xl md:text-3xl text-[var(--text-primary)]"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
              <span>Close</span>
            </button>

            <div className="mt-8 flex flex-wrap items-baseline font-display text-5xl font-light tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-8xl">
              {CATEGORIES.map((cat, i) => {
                const catCount =
                  cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;

                return (
                  <span key={cat} className="inline-flex items-baseline">
                    <button
                      type="button"
                      onClick={() => selectCategory(cat)}
                      className={`inline-flex cursor-pointer items-baseline gap-1 ${
                        category === cat ? "text-[var(--accent)]" : ""
                      }`}
                    >
                      <span>{cat}</span>
                      <sup className="text-base text-[var(--text-muted)] sm:text-lg">{catCount}</sup>
                    </button>
                    {i < CATEGORIES.length - 1 && <span className="mr-[0.3em]">,</span>}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          /* Section Header — same fixed-column trick as the project rows
              below: col 1 (0%→46%) is the trigger, at the row's own left
              edge; col 2 starts exactly at 46%, the same column "work"
              sits in in the navbar and "industry" sits in on every
              project row, so the subtitle lines up with both. */
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 pb-24 md:pb-32 lg:grid lg:grid-cols-[46%_1fr] lg:items-start"
          >
            <div className="shrink-0 lg:col-start-1">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex cursor-pointer items-baseline gap-1.5 font-sans text-2xl md:text-3xl text-[var(--text-primary)]"
                aria-expanded={isFilterOpen}
              >
                <span>{dict?.badge || "Selected Works"}</span>
                <sup className="text-sm text-[var(--text-muted)]">{count}</sup>
              </button>
            </div>

            <p className="max-w-xl text-2xl md:text-3xl text-[var(--text-primary)] leading-snug font-sans lg:col-start-2">
              {dict?.subtitle ||
                "A few of the products we've designed and built end-to-end — each one solving a real problem for a real business, not just filling out a portfolio."}
            </p>
          </m.div>
        )}

        {/* Projects List — keyed on category so a filter change remounts
            it fresh, resetting which row (if any) is expanded. */}
        <div>
          <ProjectsGrid key={category} dict={dict} category={category} />
        </div>
      </div>
    </section>
  );
}
