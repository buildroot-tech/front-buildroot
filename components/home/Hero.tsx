"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

function useCountUp(target: number, duration: number = 1.5, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ value, label, suffix = "", delay = 0, trigger }: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
  trigger: boolean;
}) {
  const count = useCountUp(value, 1.8, trigger);
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <span className="font-display text-4xl font-bold tabular-nums text-[var(--text-inverse)] leading-none">
        {count}{suffix}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-inverse)] opacity-40 mt-1">
        {label}
      </span>
    </motion.div>
  );
}

function MagneticButton({ href, children, variant = "default", id }: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "accent";
  id: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const base =
    "relative inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.12em] font-semibold border-2 transition-all duration-150 select-none cursor-pointer group overflow-hidden";
  const styles =
    variant === "accent"
      ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-[4px_4px_0_#fff] hover:shadow-[2px_2px_0_#fff] hover:translate-x-[2px] hover:translate-y-[2px]"
      : "bg-transparent border-[var(--text-inverse)] text-[var(--text-inverse)] shadow-[4px_4px_0_var(--text-inverse)] hover:shadow-[2px_2px_0_var(--text-inverse)] hover:translate-x-[2px] hover:translate-y-[2px]";

  return (
    <motion.a
      id={id}
      ref={ref}
      href={href}
      className={`${base} ${styles}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowUpRight
          size={14}
          className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </motion.a>
  );
}

function DecorativeGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal lines */}
      {[20, 40, 60, 80].map((pct) => (
        <motion.div
          key={`h-${pct}`}
          className="absolute left-0 right-0 h-px bg-[var(--text-inverse)]"
          style={{ top: `${pct}%`, opacity: 0.04 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.1 * (pct / 20), ease: "easeOut" }}
        />
      ))}
      {/* Vertical lines */}
      {[20, 40, 60, 80].map((pct) => (
        <motion.div
          key={`v-${pct}`}
          className="absolute top-0 bottom-0 w-px bg-[var(--text-inverse)]"
          style={{ left: `${pct}%`, opacity: 0.04 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.1 * (pct / 20), ease: "easeOut" }}
        />
      ))}

      {/* Large accent cross */}
      <motion.div
        className="absolute right-[8%] top-[15%] w-[380px] h-[380px] opacity-[0.06]"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.06, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <div className="absolute inset-0 border border-[var(--text-inverse)]" />
        <div className="absolute inset-6 border border-[var(--text-inverse)]" />
        <div className="absolute inset-12 border border-[var(--text-inverse)]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--text-inverse)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--text-inverse)]" />
      </motion.div>

      {/* Dot cluster top-right */}
      <motion.div
        className="absolute top-10 right-10 grid grid-cols-5 gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-[var(--text-inverse)] opacity-20"
          />
        ))}
      </motion.div>

      {/* Bottom-left coordinates label */}
      <motion.div
        className="absolute bottom-24 left-6 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-inverse)] opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div>X: 00.00 N</div>
        <div>Y: 90.00 W</div>
        <div className="mt-1 text-[var(--accent)] opacity-70">// HERO v2.0</div>
      </motion.div>

      {/* Accent corner bracket top-left */}
      <motion.div
        className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[var(--accent)] opacity-60"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "backOut" }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[var(--accent)] opacity-60"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "backOut" }}
      />

      {/* Glowing accent blob */}
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

const HEADLINE_LINES = [
  { text: "We build", delay: 0.3 },
  { text: "digital", delay: 0.45 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-hero)]"
      aria-label="Hero section"
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <DecorativeGrid />

      {/* Main content */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-16 py-32">
        <motion.div style={{ y, opacity, scale }}>

          {/* Eyebrow tag */}
          <motion.div
            className="mb-10 inline-flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
              Digital Products &amp; Consulting
            </span>
            <span className="h-px w-8 bg-[var(--accent)] opacity-40" />
          </motion.div>

          {/* Headline lines */}
          <div className="mb-4">
            {HEADLINE_LINES.map(({ text, delay }) => (
              <div key={text} className="overflow-hidden">
                <motion.h1
                  className="headline text-display text-[var(--text-inverse)] leading-[0.92]"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {text}
                </motion.h1>
              </div>
            ))}
            {/* Third line with accent word */}
            <div className="overflow-hidden">
              <motion.h1
                className="headline text-display leading-[0.92]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative inline-block text-[var(--accent)]">
                  products
                  {/* Underline accent */}
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-1 bg-[var(--accent)] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  />
                </span>
                <span className="text-[var(--text-inverse)]">.</span>
              </motion.h1>
            </div>
          </div>

          {/* Sub-grid: description + stats */}
          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            {/* Description + CTAs */}
            <div className="max-w-md">
              <motion.p
                className="text-base text-[var(--text-inverse)] opacity-55 leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ duration: 0.7, delay: 0.95 }}
              >
                Web development, technical consulting, and SaaS products for
                startups and enterprises that demand precision.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <MagneticButton href="/work" variant="accent" id="hero-cta-work">
                  View Our Work
                </MagneticButton>
                <MagneticButton href="/contact" id="hero-cta-contact">
                  Start a Project
                </MagneticButton>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-10 md:gap-14 border-l-2 border-[var(--text-inverse)] border-opacity-10 pl-10 md:pl-14"
              style={{ borderColor: "rgba(248,250,252,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <AnimatedStat value={30} suffix="+" label="Projects" delay={1.3} trigger={statsVisible} />
              <AnimatedStat value={4} suffix="+" label="Years" delay={1.45} trigger={statsVisible} />
              <AnimatedStat value={100} suffix="%" label="Remote" delay={1.6} trigger={statsVisible} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating tech badge */}
      <motion.div
        className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:flex flex-col items-end gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        aria-hidden="true"
      >
        {["Next.js", "TypeScript", "Tailwind", "Framer"].map((tech, i) => (
          <motion.div
            key={tech}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-inverse)] opacity-30"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 1.6 + i * 0.08, duration: 0.4 }}
          >
            <span className="h-px w-4 bg-[var(--accent)]" />
            {tech}
          </motion.div>
        ))}
      </motion.div>

      {/* Diagonal cut bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--bg-primary)] pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-inverse)] opacity-30">
            Scroll
          </span>
          <div className="relative h-10 w-px overflow-hidden">
            <motion.div
              className="absolute inset-x-0 bg-[var(--accent)] opacity-70"
              animate={{ top: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "50%" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
