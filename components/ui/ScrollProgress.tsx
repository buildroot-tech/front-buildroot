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
      // Framer Motion can't serialize the dynamic scaleX transform into the
      // server-rendered HTML, so the bar would briefly paint at full width
      // (solid accent color) before hydration applies it. initial/animate
      // are static values Framer Motion *can* apply on first paint, so we
      // use them to keep the bar hidden until the real transform lands.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}
