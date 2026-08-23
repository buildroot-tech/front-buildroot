"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface UseScrollStackResult {
  /** Attach to the tall driver element that owns the scroll room. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Spring-smoothed 0-1 progress through the driver — feed this into each panel's transform, not the raw useScroll value. */
  scrollYProgress: MotionValue<number>;
  /** Fades to 0 over the tail of the last panel's rest window — apply to the sticky wrapper's opacity. */
  stackOpacity: MotionValue<number>;
  /** `--seg`, shorter on mobile than desktop — spread onto the driver div alongside driverStyle. */
  driverClassName: string;
  /** Driver height as `total` panel-segments — spread onto the driver div alongside driverClassName. */
  driverStyle: { height: string };
}

/**
 * The stacking mechanic shared by WorkflowSteps, ServicesSection and
 * ProjectDetail: a tall driver, a `sticky` wrapper, and panels that slide
 * up over each other as the driver's scroll room passes underneath.
 *
 * Values (stiffness/damping, the 60/40 travel/rest split via `--seg`, the
 * fade-start offset) are the ones AGENTS.md's "Scroll stacking" section
 * documents as tuned — don't retune here without updating that doc too.
 */
export function useScrollStack(total: number): UseScrollStackResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Critically damped (damping = 2*sqrt(stiffness), ratio exactly 1) so a
  // hard/fast scroll eases through the transition in a couple of frames
  // instead of snapping the whole thing through in one.
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  // `position: sticky` un-pins the instant the driver's scroll room runs
  // out, with no easing of its own — fading the stack out over the tail of
  // the last panel's rest window turns that hard cut into a dissolve.
  const stackFadeStart = (total - 1) / total + 0.05;
  const stackOpacity = useTransform(
    scrollYProgress,
    [stackFadeStart, 1],
    [1, 0],
  );

  return {
    containerRef,
    scrollYProgress,
    stackOpacity,
    driverClassName: "relative w-full [--seg:65dvh] md:[--seg:100dvh]",
    driverStyle: { height: `calc(var(--seg) * ${total})` },
  };
}
