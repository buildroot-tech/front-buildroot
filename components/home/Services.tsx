"use client";

import { m } from "framer-motion";
import { Code2, Lightbulb, Rocket } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Full-stack applications with modern frameworks. React, Next.js, Node.js, and cloud infrastructure.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    icon: Lightbulb,
    title: "Technical Consulting",
    description:
      "Architecture review, performance optimization, and technical strategy for your team.",
    tags: ["Architecture", "Performance", "Strategy"],
  },
  {
    icon: Rocket,
    title: "SaaS Products",
    description:
      "From MVP to production. We build and launch SaaS products that scale.",
    tags: ["MVP", "SaaS", "Scalable", "Launch"],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Services() {
  return (
    <section className="section-generous bg-[var(--bg-primary)]">
      <div className="container-padded">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            What We Do
          </p>
          <h2 className="heading text-h2 mt-4">Services</h2>
        </m.div>

        {/* Grid */}
        <m.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <m.div
                key={service.title}
                className="brutalist-card p-8"
                variants={item}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="heading text-h3">{service.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--border)] px-2 py-1 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
