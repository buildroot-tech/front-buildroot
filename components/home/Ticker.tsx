"use client";

import { useRef } from "react";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface TickerProps {
  baseVelocity?: number;
  text: string;
}

export function Ticker({ baseVelocity = -1, text }: TickerProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // wrap between -20% and -45% to keep it seamless.
  // With 4 duplicated spans, this keeps the animation visually infinite.
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    // Delta is in milliseconds. delta / 1000 gives seconds.
    // Base velocity of 1 means 1% per second.
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Scroll linked effects for fading and scaling
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="w-full overflow-hidden flex flex-nowrap pt-12 md:pt-20 pb-24 md:pb-32 bg-[var(--bg-primary)] perspective-1000">
      <m.div 
        className="w-full flex"
        style={{
          scale,
          opacity,
          // Creates a fade effect on left/right and top/bottom
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <m.div
          className="font-display font-medium uppercase text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter flex whitespace-nowrap flex-nowrap text-[var(--text-primary)]"
          style={{ x }}
        >
          <span className="block mr-8">{text}</span>
          <span className="block mr-8">{text}</span>
          <span className="block mr-8">{text}</span>
          <span className="block mr-8">{text}</span>
        </m.div>
      </m.div>
    </div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
