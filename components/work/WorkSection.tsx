"use client";

import { motion } from "framer-motion";
import { ProjectsGrid } from "@/components/work/ProjectsGrid";
import { Terminal } from "lucide-react";

export function WorkSection() {
  return (
    <section id="work" className="relative w-full bg-white pt-4 md:pt-6 pb-16 md:pb-24 overflow-hidden">
      {/* Terminal Telemetry Marquee Ticker Strip — Light Mode */}
      <div className="w-full border-y border-[var(--text-primary)]/10 py-2.5 font-mono text-xs font-bold overflow-hidden select-none mb-8 md:mb-10">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          <span className="text-[var(--accent)]">/// SYSTEM_LOGS: WORK_MODULE_ACTIVE</span>
          <span className="text-[var(--text-primary)]">● PRODUCTION_DEPLOYED</span>
          <span className="text-[var(--text-muted)]">STATUS: 200_OK</span>
          <span className="text-[var(--accent)]">LATENCY: &lt;15MS_EDGE</span>
          <span className="text-[var(--text-primary)]">PIPELINE: CI_CD_VERIFIED</span>
          <span className="text-[var(--text-muted)]">MEMORY: OPTIMIZED_ALLOC</span>
          <span className="text-[var(--accent)]">SECURITY: HARDENED_SHIELD</span>
          <span className="text-[var(--text-primary)]">BUILD: STABLE_RELEASE</span>
          <span className="text-[var(--text-muted)]">ROUTING: DISTRIBUTED_NODES</span>
          <span className="text-[var(--accent)]">/// SYSTEM_LOGS: WORK_MODULE_ACTIVE</span>
          <span className="text-[var(--text-primary)]">● PRODUCTION_DEPLOYED</span>
          <span className="text-[var(--text-muted)]">STATUS: 200_OK</span>
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
