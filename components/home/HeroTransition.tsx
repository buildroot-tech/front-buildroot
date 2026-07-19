"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ]
  );

  return (
    <div ref={ref} className="relative h-0">
      <motion.div
        className="absolute -top-px left-0 right-0 h-24 bg-[var(--bg-primary)]"
        style={{
          clipPath,
        }}
      />
    </div>
  );
}
