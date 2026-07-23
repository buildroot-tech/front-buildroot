"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We map the problem, define the exact scope, and align perfectly on your goals. No guessing, just extreme clarity.",
    color: "var(--bg-primary)",
    textColor: "var(--text-primary)",
  },
  {
    number: "02",
    title: "Architecture",
    description:
      "System design, strict tech stack decisions, and a technical blueprint built for brutal efficiency and scale.",
    color: "var(--accent)", // The vibrant blue
    textColor: "white",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Iterative, high-velocity development with continuous feedback loops. We build it fast, we build it right.",
    color: "var(--bg-hero)", // Dark blue/navy
    textColor: "var(--text-inverse)",
  },
  {
    number: "04",
    title: "Ship",
    description:
      "Deploy, monitor, and scale with absolute confidence. Your product hits the market like a sledgehammer.",
    color: "var(--border)", // Very dark
    textColor: "var(--text-inverse)",
  },
];

export function WorkflowSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--bg-primary)]">
      {/* 
        We create a long scrollable area.
        4 steps, we can give it around 400vh so there's plenty of scroll duration.
      */}
      <div className="relative h-[400vh] w-full">
        <div className="sticky top-0 flex h-screen w-full flex-col md:flex-row overflow-hidden">
          
          {/* Left Side: Sticky Title */}
          <div className="flex h-[30vh] w-full flex-col justify-center px-6 md:h-full md:w-1/3 md:pl-10 lg:pl-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                How We Work
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,8rem)] font-bold uppercase leading-none tracking-tighter">
                Our<br />Process
              </h2>
            </motion.div>
          </div>

          {/* Right Side: Stacking Cards */}
          <div className="relative flex h-[70vh] w-full items-center justify-center md:h-full md:w-2/3">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, scrollYProgress }: any) {
  const start = index * 0.25;
  const end = start + 0.25;

  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.1), start],
    ["100%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.95]
  );

  return (
    <motion.div
      className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        y: index === 0 ? "0%" : y,
        scale,
        zIndex: index,
      }}
    >
      <div
        className="flex h-[90vh] md:h-[85vh] w-full max-w-5xl flex-col justify-between border-4 border-[var(--border)] p-6 sm:p-8 md:p-12 shadow-[8px_8px_0px_0px_var(--border)] md:shadow-[12px_12px_0px_0px_var(--border)]"
        style={{
          backgroundColor: step.color,
          color: step.textColor,
        }}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-6xl font-bold tracking-tighter md:text-8xl">
            {step.number}
          </span>
        </div>
        <div>
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            {step.title}
          </h3>
          <p className="font-mono text-base md:text-xl lg:text-2xl leading-relaxed opacity-90">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
