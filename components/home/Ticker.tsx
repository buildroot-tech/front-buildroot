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
  secondaryText?: string;
}

export function Ticker({ baseVelocity = -0.3, text, secondaryText }: TickerProps) {
  const baseX = useMotionValue(0);
  const baseXReverse = useMotionValue(0);
  
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
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const xReverse = useTransform(baseXReverse, (v) => `${wrap(-50, -25, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    baseX.set(baseX.get() + moveBy);
    // Reverse moves in the opposite direction
    baseXReverse.set(baseXReverse.get() - moveBy);
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const RepeatedText = () => (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="block mr-8">{text}</span>
      ))}
    </>
  );

  const RepeatedSecondaryText = () => {
    const t = secondaryText || text;
    return (
      <>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block mr-8">{t}</span>
        ))}
      </>
    );
  };

  return (
    <div ref={ref} className="relative w-full overflow-hidden flex flex-nowrap pt-[clamp(6rem,12vw,16rem)] pb-[clamp(6rem,12vw,16rem)] bg-[var(--bg-primary)]">
      {/* 3D Lighting/Shading overlay to simulate cylinder curvature on the X axis */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 25%, transparent 75%, var(--bg-primary) 100%)"
        }}
      />
      
      <m.div 
        className="w-full flex flex-col items-center justify-center gap-4 md:gap-8 relative z-0"
        style={{
          scale,
          opacity,
          perspective: "1200px",
          transformStyle: "preserve-3d",
          // Aggressive radial mask to create the optical illusion of wrapping away at the edges
          maskImage: "radial-gradient(60% 120% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(60% 120% at 50% 50%, black 40%, transparent 100%)",
        }}
      >
        {/* Top 2 Ribbon (Smallest, Furthest, Forward) */}
        <m.div
          className="font-display font-medium uppercase text-[clamp(1rem,3vw,2.5rem)] leading-[0.8] tracking-tighter flex whitespace-nowrap flex-nowrap text-[var(--text-primary)] opacity-10 origin-bottom"
          style={{ x, rotateX: 45, z: -100 }}
        >
          <RepeatedText />
        </m.div>

        {/* Top 1 Ribbon (Smaller, Reversed, Tilted Back) */}
        <m.div
          className="font-display font-medium uppercase text-[clamp(2rem,5vw,4.5rem)] leading-[0.8] tracking-tighter flex whitespace-nowrap flex-nowrap text-[var(--text-primary)] opacity-30 origin-bottom"
          style={{ x: xReverse, rotateX: 20, z: -50 }}
        >
          <RepeatedSecondaryText />
        </m.div>

        {/* Middle Ribbon (Main, Forward) */}
        <m.div
          className="font-display font-medium uppercase text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter flex whitespace-nowrap flex-nowrap text-[var(--text-primary)] origin-center"
          style={{ x, translateZ: 50 }}
        >
          <RepeatedText />
        </m.div>

        {/* Bottom 1 Ribbon (Smaller, Reversed, Tilted Back) */}
        <m.div
          className="font-display font-medium uppercase text-[clamp(2rem,5vw,4.5rem)] leading-[0.8] tracking-tighter flex whitespace-nowrap flex-nowrap text-[var(--text-primary)] opacity-30 origin-top"
          style={{ x: xReverse, rotateX: -20, z: -50 }}
        >
          <RepeatedSecondaryText />
        </m.div>

        {/* Bottom 2 Ribbon (Smallest, Furthest, Forward) */}
        <m.div
          className="font-display font-medium uppercase text-[clamp(1rem,3vw,2.5rem)] leading-[0.8] tracking-tighter flex whitespace-nowrap flex-nowrap text-[var(--text-primary)] opacity-10 origin-top"
          style={{ x, rotateX: -45, z: -100 }}
        >
          <RepeatedText />
        </m.div>
      </m.div>
    </div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
