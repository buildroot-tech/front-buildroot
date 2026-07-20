"use client";

import { motion } from "framer-motion";
import { ProjectsGrid } from "@/components/work/ProjectsGrid";
import { ShieldCheck, Zap, Layers } from "lucide-react";

export function WorkSection() {
  return (
    <section id="work" className="section-generous bg-[var(--bg-primary)] border-t-2 border-[var(--border)]">
      <div className="container-padded">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-xs font-semibold uppercase text-[var(--accent)]">
            <span className="h-1.5 w-1.5 bg-[var(--accent)]" />
            // 04 — Selected Work
          </div>
          <h2 className="heading text-h2 mt-4 text-[var(--text-primary)]">
            Engineering Excellence in Production
          </h2>
          <p className="mt-4 text-body text-[var(--text-muted)]">
            A curated showcase of scalable SaaS applications, high-performance web experiences, and cloud architecture built by buildroot_.
          </p>
        </motion.div>

        {/* Stats / Guarantees Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="my-10 grid grid-cols-1 gap-4 border-2 border-[var(--border)] bg-[var(--bg-secondary)] p-4 sm:grid-cols-3"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)]">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[var(--text-primary)]">95+ Lighthouse Score</p>
              <p className="font-mono text-[11px] text-[var(--text-muted)]">Strict performance targets</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:border-l-2 sm:border-[var(--border)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[var(--text-primary)]">WCAG 2.1 AA Compliant</p>
              <p className="font-mono text-[11px] text-[var(--text-muted)]">Accessible for all users</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:border-l-2 sm:border-[var(--border)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)]">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[var(--text-primary)]">Strict TypeScript</p>
              <p className="font-mono text-[11px] text-[var(--text-muted)]">Zero any, zero guesswork</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-8">
          <ProjectsGrid />
        </div>
      </div>
    </section>
  );
}
