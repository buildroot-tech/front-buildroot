"use client";

import { AnimatePresence, m } from "framer-motion";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useState } from "react";
import { ScrambleText } from "@/components/ui/TextScrambler";
import { PixelImage } from "@/components/ui/PixelImage";
import type { Project } from "@/types";

interface ProjectListRowProps {
  readonly project: Project;
}

const IMAGE_WIDTH = 360;

export function ProjectListRow({ project }: ProjectListRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const words = project.title.split(" ");
  const insertIndex = words.length === 1 ? 0 : Math.floor((words.length - 1) / 2);

  return (
    <LocaleLink
      href={`/work/${project.id}`}
      className="group flex flex-col justify-center min-h-[150px] md:min-h-[180px] transition-colors duration-500 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View project: ${project.title}`}
    >
      <div className="flex flex-row items-center justify-center w-full">
        {/* Left Line */}
        <div className="h-[1px] bg-[var(--text-primary)] flex-1" />

        {/* Title with Inline Image */}
        <div className="px-6 md:px-12 shrink-0 overflow-hidden">
          <h3 className="flex items-center justify-center font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light capitalize leading-[1.15] tracking-tighter text-[var(--text-primary)] text-center whitespace-nowrap">
            {words.map((word, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="w-[0.25em] inline-block"></span>}

                <ScrambleText text={word} trigger="mount" active={isHovered} speed={40} />

                <AnimatePresence>
                  {isHovered && i === insertIndex && project.image && (
                    <m.div
                      initial={{ width: 0, opacity: 0, margin: "0px 0px" }}
                      animate={{ width: IMAGE_WIDTH, opacity: 1, margin: "0px 16px" }}
                      exit={{ width: 0, opacity: 0, margin: "0px 0px" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-hero)] hidden md:block"
                      style={{ height: "1.5em" }}
                    >
                      <PixelImage src={`/projects/${project.image}.jpg`} />

                      {/* Black overlay for contrast */}
                      <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
                    </m.div>
                  )}
                </AnimatePresence>
              </span>
            ))}
          </h3>
        </div>

        {/* Right Line */}
        <div className="h-[1px] bg-[var(--text-primary)] flex-1" />
      </div>
    </LocaleLink>
  );
}
