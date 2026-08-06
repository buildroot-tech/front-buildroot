"use client";

import { useScroll, useTransform, MotionValue, m } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Ticker } from "./Ticker";

import type { Dictionary } from "@/lib/dictionaries";

interface CTAProps {
  dict?: Dictionary["home"]["cta"];
}

export function CTA({ dict }: CTAProps) {
  const container = useRef<HTMLElement>(null);
  const text = dict?.manifesto || "We build high-performance technology and design unconventional solutions. We exist to help bold brands break out of the ordinary. Every line of code and every pixel is crafted to elevate your digital presence.";
  const words = text.split(" ");

  // Track scroll progress across this specific component
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "center center"], // Finishes exactly when the text block is centered in the viewport
  });

  return (
    <section
      ref={container}
      className="relative w-full bg-[var(--bg-primary)] pt-12 md:pt-20 overflow-hidden"
    >
      {/*
        Manifesto Text
        Massive font, ultra-thin, edge-to-edge typography
      */}
      <div className="px-6 md:px-12 mb-12 md:mb-20">
        <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,7rem)] leading-[1.1] tracking-tighter text-[var(--text-primary)] flex flex-wrap">
          {words.map((word: string, i: number) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>

      {/* CTA Bottom Row (Matching 'All Works' structural style) */}
      <BottomCTA dict={dict} />

      {/* Marquee Ticker */}
      <Ticker
        text={dict?.ticker_text || "HIGH-END EXPERIENCES * UNCONVENTIONAL DESIGNS *"}
        secondaryText={dict?.ticker_secondary || "SYSTEMS * PRODUCT * INFRASTRUCTURE *"}
      />
    </section>
  );
}

// Subcomponent to animate each word individually based on scroll
const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  // Map the scroll progress range for this specific word to an opacity value (0.2 -> 1)
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <span className="relative mr-3 md:mr-6 lg:mr-8 mt-1 inline-block">
      <m.span style={{ opacity }} className="inline-block">
        {children}
      </m.span>
    </span>
  );
};

// Bottom Contact Link with the blink mechanic
const BottomCTA = ({ dict }: { dict?: Dictionary["home"]["cta"] }) => {
  const [hovered, setHovered] = useState(false);
  const [ctaSymbol, setCtaSymbol] = useState("*");

  useEffect(() => {
    if (!hovered) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCtaSymbol("*");
    const interval = setInterval(() => {
      setCtaSymbol((prev) => (prev === "*" ? "_" : "*"));
    }, 800); // 800ms to match the project list CTA
    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <div className="flex flex-col relative w-full px-6 md:px-12 pb-0">
      <Link
        href="mailto:info@buildroot.co"
        className="group flex flex-col justify-center min-h-[150px] md:min-h-[180px] transition-colors duration-500 w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-row items-center justify-center w-full">
          <div className="h-[1px] bg-[var(--text-primary)] flex-1" />

          <div className="px-6 md:px-12 shrink-0 overflow-hidden">
            <h3 className="flex items-center justify-center font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light capitalize tracking-tighter transition-colors duration-500 text-center whitespace-nowrap text-[var(--text-primary)]">
              <span className="w-[1ch] text-center inline-block">
                {hovered ? ctaSymbol : ""}
              </span>
              <span className="mx-2 md:mx-4">{dict?.lets_build || "Let's Build Together"}</span>
              <span className="w-[1ch] text-center inline-block">
                {hovered ? ctaSymbol : ""}
              </span>
            </h3>
          </div>

          <div className="h-[1px] bg-[var(--text-primary)] flex-1" />
        </div>
      </Link>
    </div>
  );
};
