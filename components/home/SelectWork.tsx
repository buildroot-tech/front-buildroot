"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { ProjectListRow } from "@/components/work/ProjectListRow";
import { PROJECTS } from "@/lib/projects";

// We dynamically pull featured projects from our central data source
const featured = PROJECTS.filter((project) => project.featured);

import type { Dictionary } from "@/lib/dictionaries";

interface SelectWorkProps {
  dict?: Dictionary["home"]["work"];
}

export function SelectWork({ dict }: SelectWorkProps) {
  const [hoveredCTA, setHoveredCTA] = useState(false);
  const [ctaSymbol, setCtaSymbol] = useState("*");

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaSymbol((prev) => (prev === "*" ? "_" : "*"));
    }, 800); // Blink every 800ms
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-[var(--bg-primary)] py-24 md:py-40 overflow-hidden">
      <div className="w-full px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-mono text-lg md:text-xl capitalize tracking-tight text-[var(--text-muted)]">{dict?.title || "Featured Projects"}</h2>
        </div>
      </div>

      {/* The List (Locomotive Style) */}
      <div className="flex flex-col relative z-10 w-full mt-2 px-6 md:px-12">
          {featured.map((project) => (
            <ProjectListRow key={project.id} project={project} />
          ))}

          {/* View All Projects Row */}
          <Link
            href="/work"
            className="group flex flex-col justify-center min-h-[150px] md:min-h-[180px] transition-colors duration-500 w-full"
            onMouseEnter={() => setHoveredCTA(true)}
            onMouseLeave={() => setHoveredCTA(false)}
          >
            <div className="flex flex-row items-center justify-center w-full">
              <div className="h-[1px] bg-[var(--text-primary)] flex-1" />

              <div className="px-6 md:px-12 shrink-0 overflow-hidden">
                <h3 className="flex items-center justify-center font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light capitalize tracking-tighter transition-colors duration-500 text-center whitespace-nowrap text-[var(--text-primary)]">
                  <span className="w-[1ch] text-center inline-block">{ctaSymbol}</span>
                  <span className="mx-2 md:mx-4 flex items-center gap-[0.25em]">
                    {(dict?.all_works || "All Works").split(" ").map((w, idx) => (
                      <ScrambleText key={idx} text={w} trigger="mount" active={hoveredCTA} speed={40} />
                    ))}
                  </span>
                  <span className="w-[1ch] text-center inline-block">{ctaSymbol}</span>
                </h3>
              </div>

              <div className="h-[1px] bg-[var(--text-primary)] flex-1" />
            </div>
          </Link>
        </div>
    </section>
  );
}
