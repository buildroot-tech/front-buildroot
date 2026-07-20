"use client";

import { motion } from "framer-motion";
import { ProjectsGrid } from "@/components/work/ProjectsGrid";
import { Cpu, Terminal, Zap, Gauge } from "lucide-react";

export function WorkSection() {
  return (
    <section id="work" className="relative w-full bg-[var(--bg-primary)] border-t-2 border-[var(--border)] overflow-hidden py-12">
      {/* Brutalist Top Ticker Strip */}
      <div className="w-full border-b-2 border-[var(--border)] bg-[var(--bg-hero)] py-2.5 text-[var(--text-inverse)] font-mono text-xs font-bold overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          <span className="text-[var(--accent)]">/// SYSTEM_LOGS: PHASE_04</span>
          <span>● PRODUCTION_DEPLOYED</span>
          <span className="text-slate-400">ARCH: NEXTJS_16_TURBOPACK</span>
          <span className="text-[var(--accent)]">PERF_TARGET: 95+ LIGHTHOUSE</span>
          <span>WCAG_2.1_AA_COMPLIANT</span>
          <span className="text-slate-400">STRICT_TYPESCRIPT</span>
          <span className="text-[var(--accent)]">/// SYSTEM_LOGS: PHASE_04</span>
          <span>● PRODUCTION_DEPLOYED</span>
          <span className="text-slate-400">ARCH: NEXTJS_16_TURBOPACK</span>
        </div>
      </div>

      {/* Edge-to-Edge Expansive Container */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 pt-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[var(--border)] pb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-hero)] px-3 py-1 font-mono text-xs font-bold uppercase text-white shadow-[2px_2px_0_var(--accent)]">
              <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>[ 04 ] // SELECTED_WORKS</span>
            </div>
            <h2 className="headline text-h1 mt-3 text-[var(--text-primary)]">
              PRODUCTION_SHIPPED // LOGS
            </h2>
            <p className="mt-2 font-mono text-sm text-[var(--text-muted)] max-w-3xl leading-relaxed">
              [ REAL_WORLD_ENGINEERING ]: High-throughput SaaS applications, brutalist web platforms, and edge cloud architectures shipped with zero bloat.
            </p>
          </div>

          {/* Big Index Badge */}
          <div className="hidden lg:flex items-center gap-3 border-2 border-[var(--border)] bg-[var(--bg-secondary)] p-3.5 font-mono">
            <span className="text-4xl font-black text-[var(--border)]">04</span>
            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
              <div>PROJECTS</div>
              <div className="text-[var(--accent)]">INDEX_LOG</div>
            </div>
          </div>
        </motion.div>

        {/* Structural Blueprint Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-8 grid grid-cols-1 gap-px border-2 border-[var(--border)] bg-[var(--border)] sm:grid-cols-3 font-mono"
        >
          <div className="flex items-center gap-3 bg-[var(--bg-secondary)] p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--accent)] text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[var(--text-primary)]">95+ LIGHTHOUSE</p>
              <p className="text-[11px] text-[var(--text-muted)]">Sub-second LCP & TBT &lt;100ms</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[var(--bg-secondary)] p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--bg-hero)] text-white">
              <Gauge className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[var(--text-primary)]">SUB-50MS LATENCY</p>
              <p className="text-[11px] text-[var(--text-muted)]">Streaming SSR + Edge cache</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[var(--bg-secondary)] p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)]">
              <Cpu className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-[var(--text-primary)]">STRICT TYPE-SAFE</p>
              <p className="text-[11px] text-[var(--text-muted)]">Zero any / full runtime checks</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Structural Grid */}
        <div className="mt-6">
          <ProjectsGrid />
        </div>
      </div>
    </section>
  );
}
