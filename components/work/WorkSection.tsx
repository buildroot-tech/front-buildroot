"use client";

import { motion } from "framer-motion";
import { ProjectsGrid } from "@/components/work/ProjectsGrid";
import { Terminal } from "lucide-react";

export function WorkSection() {
  return (
    <section id="work" className="relative w-full bg-[var(--bg-primary)] pt-4 md:pt-6 pb-16 md:pb-24 overflow-hidden">
      {/* Brutalist Marquee Ticker Strip */}
      <div className="w-full bg-[var(--bg-hero)] py-2.5 text-[var(--text-inverse)] font-mono text-xs font-bold overflow-hidden select-none mb-8 md:mb-10">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          <span className="text-[var(--accent)]">/// SYSTEM_LOGS: PHASE_WORK</span>
          <span>● PRODUCTION_DEPLOYED</span>
          <span className="text-slate-400">ARCH: NEXTJS_16_TURBOPACK</span>
          <span className="text-[var(--accent)]">PERF_TARGET: 95+ LIGHTHOUSE</span>
          <span>WCAG_2.1_AA_COMPLIANT</span>
          <span className="text-slate-400">STRICT_TYPESCRIPT</span>
          <span className="text-[var(--accent)]">/// SYSTEM_LOGS: PHASE_WORK</span>
          <span>● PRODUCTION_DEPLOYED</span>
          <span className="text-slate-400">ARCH: NEXTJS_16_TURBOPACK</span>
        </div>
      </div>

      {/* Spacious Edge-to-Edge Container */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--bg-secondary)] px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-[var(--accent)] tracking-widest">
              <Terminal className="h-3.5 w-3.5" />
              <span>// Selected Works</span>
            </div>
            <h2 className="headline text-h1 mt-4 text-[var(--text-primary)] tracking-tight">
              Featured Projects & Architecture
            </h2>
            <p className="mt-3 text-base md:text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed font-sans">
              Engineering high-performance SaaS applications, custom web platforms, and modern cloud architectures built with technical precision, scalability, and design craftsmanship.
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-4">
          <ProjectsGrid />
        </div>
      </div>
    </section>
  );
}
