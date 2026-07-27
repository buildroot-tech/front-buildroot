"use client";

import { useScroll, useSpring, m } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-[var(--accent)]"
      style={{ scaleX }}
    />
  );
}
