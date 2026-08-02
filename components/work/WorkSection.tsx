"use client";

import { m } from "framer-motion";
import { ProjectsGrid } from "@/components/work/ProjectsGrid";
import { ScrambleText } from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface WorkSectionProps {
  dict?: Dictionary["work"];
}

export function WorkSection({ dict }: WorkSectionProps) {
  return (
    <section
      id="work"
      className="relative w-full bg-[var(--bg-primary)] pt-4 md:pt-6 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10"
        >
          <div>
            <h2 className="font-mono text-lg md:text-xl capitalize tracking-tight text-[var(--text-muted)]">
              {dict?.badge || "Selected Works"}
            </h2>
            <h1 className="headline text-h1 mt-4 text-[var(--text-primary)] tracking-tight">
              <ScrambleText
                text={dict?.title || "Featured Projects & Architecture"}
                speed={55}
                trigger="mount"
              />
            </h1>
            <p className="mt-3 text-base md:text-lg text-[var(--text-primary)] max-w-3xl leading-relaxed font-sans">
              {dict?.subtitle ||
                "Engineering high-performance digital products, custom web platforms, and modern cloud architectures built with technical precision, scalability, and design craftsmanship."}
            </p>
          </div>
        </m.div>

        {/* Projects List */}
        <div className="mt-4">
          <ProjectsGrid dict={dict} />
        </div>
      </div>
    </section>
  );
}
