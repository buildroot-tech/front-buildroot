"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    slug: "polo-pantoja",
    title: "Polo & Pantoja",
    category: "E-Commerce",
    description: "Full-stack platform for a fashion brand.",
    tech: ["Next.js", "Java", "PostgreSQL"],
  },
  {
    slug: "edusur",
    title: "Edusur",
    category: "Education",
    description: "Educational platform for course management.",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "SaaS",
    description: "Analytics dashboard for a fintech startup.",
    tech: ["Next.js", "Tailwind", "Chart.js"],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Highlights() {
  return (
    <section className="section-generous bg-[var(--bg-secondary)]">
      <div className="container-padded">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Featured Work
            </p>
            <h2 className="heading text-h2 mt-4">Selected Projects</h2>
          </div>
          <Link
            href="/work"
            className="hidden items-center gap-2 font-mono text-sm text-[var(--accent)] hover:underline sm:flex"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="brutalist-card overflow-hidden">
                  {/* Image placeholder */}
                  <div className="flex h-48 items-center justify-center bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--text-inverse)]">
                    {project.category}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="heading text-h3">{project.title}</h3>
                      <ArrowUpRight className="h-5 w-5 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--accent)]" />
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="border border-[var(--border)] px-2 py-1 font-mono text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/work"
            className="brutalist-button brutalist-button-accent text-xs"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
