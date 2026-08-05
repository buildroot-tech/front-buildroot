"use client";

import { useRef } from "react";
import { useScroll, useTransform, m, MotionValue } from "framer-motion";

// Colors alternate so no two ADJACENT steps ever share one — two
// neighboring cards with the same background made the scroll-stacking
// transition unreadable (the incoming card's edge disappears into the
// outgoing one, and their giant ghost numbers end up visually
// overlapping instead of one cleanly covering the other). Steps 1/2 and
// 4/5 used to be near-identical pairs; now every handoff has contrast.
const steps = [
  {
    number: "01",
    dictKey: "requirements",
    title: "Requirements",
    description: "We map the problem, define the exact scope, and align perfectly on your goals. No guessing, just extreme clarity.",
    color: "var(--bg-primary)",
    textColor: "var(--text-primary)",
  },
  {
    number: "02",
    dictKey: "design",
    title: "Design",
    description: "Crafting intuitive interfaces and aesthetics that communicate your brand's unique edge, backed by strict system design.",
    color: "#0A0A0A",
    textColor: "var(--text-inverse)",
  },
  {
    number: "03",
    dictKey: "build",
    title: "Build",
    description: "Iterative, high-velocity development. We build robust, scalable architectures for maximum performance.",
    color: "var(--accent)",
    textColor: "white",
  },
  {
    number: "04",
    dictKey: "testing",
    title: "Testing",
    description: "Rigorous quality, performance, and security validation to ensure the product is unbreakable.",
    color: "var(--bg-primary)",
    textColor: "var(--text-primary)",
  },
  {
    number: "05",
    dictKey: "production",
    title: "Go Live",
    description: "Deploy and scale with absolute confidence. Your product hits the market flawlessly and ready to dominate.",
    color: "#000000",
    textColor: "var(--text-inverse)",
  },
];

import type { Dictionary } from "@/lib/dictionaries";

interface WorkflowStepsProps {
  dict?: Dictionary["home"]["process"];
}

export function WorkflowSteps({ dict }: WorkflowStepsProps) {
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
      <div className="relative h-[500vh] w-full">
        <div className="sticky top-0 flex h-screen w-full flex-col md:flex-row overflow-hidden">
          
          {/* Left Side: Sticky Title */}
          <div className="flex h-[30vh] w-full flex-col justify-center px-6 md:h-full md:w-1/3 md:pl-10 lg:pl-16">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                {dict?.subtitle || "How We Work"}
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,8rem)] font-light uppercase leading-none tracking-tighter">
                {dict?.title || "Our Process"}
              </h2>
            </m.div>
          </div>

          {/* Right Side: Stacking Cards */}
          <div className="relative flex h-[70vh] w-full items-center justify-center md:h-full md:w-2/3">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                dict={dict}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  dict?: Dictionary["home"]["process"];
}

function StepCard({ step, index, scrollYProgress, dict }: StepCardProps) {
  const start = index * 0.20;
  const end = start + 0.20;

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
    <m.div
      className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        y: index === 0 ? "0%" : y,
        scale,
        zIndex: index,
      }}
    >
      <div
        className="relative flex h-[85vh] md:h-[72vh] lg:h-[78vh] w-full max-w-6xl flex-col justify-end p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden"
        style={{
          backgroundColor: step.color,
          color: step.textColor,
        }}
      >
        <div className="absolute top-8 left-8 md:top-12 md:left-16 pointer-events-none">
          <span className="font-display text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-light leading-none tracking-tighter opacity-20 [@media(max-height:820px)]:text-7xl [@media(max-height:820px)]:md:text-8xl [@media(max-height:820px)]:lg:text-9xl">
            {step.number}
          </span>
        </div>
        <div className="relative z-10 max-w-3xl">
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            {step.dictKey && dict?.steps?.[step.dictKey as keyof typeof dict.steps]?.title ? dict.steps[step.dictKey as keyof typeof dict.steps].title : step.title}
          </h3>
          {/* line-clamp keeps every step's text block the same height —
              without it, longer descriptions (Requirements/Design) wrap to
              an extra line and, since this container is bottom-anchored
              (justify-end), push their title up into the ghost number on
              short viewports while shorter descriptions never do. */}
          <p className="font-mono text-base md:text-lg lg:text-xl leading-relaxed opacity-90 [@media(max-height:820px)]:line-clamp-2">
            {step.dictKey && dict?.steps?.[step.dictKey as keyof typeof dict.steps]?.description ? dict.steps[step.dictKey as keyof typeof dict.steps].description : step.description}
          </p>
        </div>
      </div>
    </m.div>
  );
}
