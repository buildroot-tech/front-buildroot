"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { PixelImage } from "@/components/ui/PixelImage";
import { PROJECTS } from "@/lib/projects";

// We dynamically pull featured projects from our central data source
const featured = PROJECTS.filter((project) => project.featured);

const getImageName = (id: string) => {
  if (id.includes("polo")) return "polo-pantoja";
  if (id.includes("edusur")) return "edusur";
  if (id.includes("salesforce")) return "salesforce-ai";
  if (id.includes("aca")) return "aca-diario";
  return "polo-pantoja";
};

import type { Dictionary } from "@/lib/dictionaries";

interface SelectWorkProps {
  dict?: Dictionary["home"]["work"];
}

export function SelectWork({ dict }: SelectWorkProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState(false);
  const [ctaSymbol, setCtaSymbol] = useState("*");

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaSymbol((prev) => (prev === "*" ? "_" : "*"));
    }, 800); // Blink every 800ms
    return () => clearInterval(interval);
  }, []);

  // Dimensions for the inline image
  const imageWidth = 240;

  return (
    <section className="relative w-full bg-[var(--bg-primary)] py-24 md:py-40 overflow-hidden">
      <div className="w-full px-6 md:px-12">
        {/* Header */}
        <div className="mb-2 md:mb-4">
          <h2 className="heading text-h3 capitalize">{dict?.title || "Featured Projects"}</h2>
        </div>
      </div>

      {/* The List (Locomotive Style) */}
      <div className="flex flex-col relative z-10 w-full mt-2 px-6 md:px-12">
          {featured.map((project) => (
            <Link
              href={`/work/${project.id}`}
              key={project.id}
              className="group flex flex-col justify-center min-h-[90px] md:min-h-[110px] transition-colors duration-500 w-full"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              aria-label={`View project: ${project.title}`}
            >
              <div className="flex flex-row items-center justify-center w-full">
                
                {/* Left Line */}
                <div className="h-[1px] bg-[var(--text-primary)] flex-1" />
                
                {/* Title with Inline Image */}
                <div className="px-6 md:px-12 shrink-0 overflow-hidden">
                  <h3 className="flex items-center justify-center font-display text-4xl sm:text-5xl md:text-5xl lg:text-[4rem] font-light capitalize tracking-tighter text-[var(--text-primary)] text-center whitespace-nowrap">
                    {project.title.split(" ").map((word, i, arr) => {
                      const isSingleWord = arr.length === 1;
                      // If 1 word, insert at the end (index 0). If >1, insert in the middle.
                      const insertIndex = isSingleWord ? 0 : Math.floor((arr.length - 1) / 2);
                      
                      return (
                        <span key={i} className="flex items-center">
                          {i > 0 && <span className="w-[0.25em] inline-block"></span>}
                          
                            <ScrambleText text={word} trigger="mount" active={hoveredProject === project.id} speed={40} />
                          
                          <AnimatePresence>
                            {hoveredProject === project.id && i === insertIndex && (
                              <m.div
                                initial={{ width: 0, opacity: 0, margin: "0px 0px" }}
                                animate={{ width: imageWidth, opacity: 1, margin: "0px 16px" }}
                                exit={{ width: 0, opacity: 0, margin: "0px 0px" }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="relative overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)] hidden md:block"
                                style={{ height: "1.5em" }}
                              >
                                <PixelImage src={`/projects/${getImageName(project.id)}.jpg`} />
                                
                                {/* Black overlay for contrast */}
                                <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
                              </m.div>
                            )}
                          </AnimatePresence>
                        </span>
                      );
                    })}
                  </h3>
                </div>

                {/* Right Line */}
                <div className="h-[1px] bg-[var(--text-primary)] flex-1" />
                
              </div>
            </Link>
          ))}

          {/* View All Projects Row */}
          <Link
            href="/work"
            className="group flex flex-col justify-center min-h-[90px] md:min-h-[110px] transition-colors duration-500 w-full"
            onMouseEnter={() => setHoveredCTA(true)}
            onMouseLeave={() => setHoveredCTA(false)}
          >
            <div className="flex flex-row items-center justify-center w-full">
              <div className="h-[1px] bg-[var(--text-primary)] flex-1" />
              
              <div className="px-6 md:px-12 shrink-0 overflow-hidden">
                <h3 className="flex items-center justify-center font-display text-4xl sm:text-5xl md:text-5xl lg:text-[4rem] font-light capitalize tracking-tighter transition-colors duration-500 text-center whitespace-nowrap text-[var(--text-primary)]">
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
