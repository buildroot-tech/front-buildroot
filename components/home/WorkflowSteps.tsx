"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We map the problem, define scope, and align on goals.",
  },
  {
    number: "02",
    title: "Architecture",
    description: "System design, tech stack decisions, and technical blueprint.",
  },
  {
    number: "03",
    title: "Build",
    description: "Iterative development with continuous feedback loops.",
  },
  {
    number: "04",
    title: "Ship",
    description: "Deploy, monitor, and scale with confidence.",
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

export function WorkflowSteps() {
  return (
    <section className="section-generous bg-[var(--bg-secondary)]">
      <div className="container-padded">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            How We Work
          </p>
          <h2 className="heading text-h2 mt-4">Our Process</h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="mt-12 grid gap-0 border-2 border-[var(--border)]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={`flex flex-col sm:flex-row ${
                i < steps.length - 1 ? "border-b-2 border-[var(--border)]" : ""
              }`}
              variants={item}
            >
              {/* Number */}
              <div className="flex w-full sm:w-32 items-center justify-center border-b-2 border-[var(--border)] bg-[var(--bg-hero)] py-6 sm:border-b-0 sm:border-r-2 sm:py-12">
                <span className="font-mono text-4xl font-bold text-[var(--text-inverse)]">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8">
                <h3 className="font-mono text-xl font-bold uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)] max-w-md">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
