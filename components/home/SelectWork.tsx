"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const featured = [
  {
    slug: "polo-pantoja",
    title: "Polo & Pantoja",
    category: "E-Commerce",
    description: "Full-stack platform for a fashion brand. Next.js, Java, PostgreSQL.",
    year: "2024",
  },
  {
    slug: "edusur",
    title: "Edusur",
    category: "Education",
    description: "Educational platform for course management. React, Node.js, MongoDB.",
    year: "2024",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export function SelectWork() {
  return (
    <section className="section-generous bg-[var(--bg-primary)]">
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
              Selected Work
            </p>
            <h2 className="heading text-h2 mt-4">Featured Projects</h2>
          </div>
          <Link
            href="/work"
            className="hidden items-center gap-2 font-mono text-sm text-[var(--accent)] hover:underline sm:flex"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Projects — large horizontal cards */}
        <motion.div
          className="mt-12 flex flex-col gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featured.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="flex flex-col sm:flex-row border-2 border-[var(--border)] bg-[var(--bg-primary)] transition-colors hover:bg-[var(--bg-secondary)]">
                  {/* Visual placeholder */}
                  <div className="flex h-48 sm:h-auto sm:w-80 shrink-0 items-center justify-center bg-[var(--bg-hero)] font-mono text-sm text-[var(--text-inverse)]">
                    {project.category}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-mono text-xl font-bold uppercase tracking-wider">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--accent)]" />
                      </div>
                      <p className="mt-3 text-sm text-[var(--text-muted)] max-w-lg">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                      {project.year}
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
