"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

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
    "relative inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.12em] font-semibold border-2 transition-all duration-150 select-none cursor-pointer group";
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

function DriftingLines() {
  const horizontalLines = [15, 32, 50, 68, 85];
  const verticalLines = [18, 35, 52, 70, 87];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal drifting lines */}
      {horizontalLines.map((pct, i) => (
        <motion.div
          key={`h-${pct}`}
          className="absolute left-0 right-0 h-px bg-[var(--text-inverse)]"
          style={{ top: `${pct}%`, opacity: 0.06 }}
          animate={{ x: ["-8%", "8%", "-8%"] }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Vertical drifting lines */}
      {verticalLines.map((pct, i) => (
        <motion.div
          key={`v-${pct}`}
          className="absolute top-0 bottom-0 w-px bg-[var(--text-inverse)]"
          style={{ left: `${pct}%`, opacity: 0.06 }}
          animate={{ y: ["-6%", "6%", "-6%"] }}
          transition={{
            duration: 22 + i * 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.9,
          }}
        />
      ))}

      {/* Concentric squares — slow rotation */}
      <motion.div
        className="absolute right-[8%] top-[12%] w-[340px] h-[340px] opacity-[0.055]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border border-[var(--text-inverse)]" />
        <div className="absolute inset-8 border border-[var(--text-inverse)]" />
        <div className="absolute inset-16 border border-[var(--text-inverse)]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--text-inverse)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--text-inverse)]" />
      </motion.div>

      {/* Dot cluster — slow drift */}
      <motion.div
        className="absolute top-10 right-10 grid grid-cols-5 gap-2.5"
        animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
      >
        <motion.div
          className="contents"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[var(--text-inverse)]" />
          ))}
        </motion.div>
      </motion.div>

      {/* Coordinates label */}
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

      {/* Corner brackets */}
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

      {/* Glow blob */}
      <div
        className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

const SERVICES = [
  { label: "Web Development", index: "01" },
  { label: "Technical Consulting", index: "02" },
  { label: "SaaS Products", index: "03" },
];

const HEADLINE_LINES = [
  { text: "We build", delay: 0.3 },
  { text: "digital", delay: 0.45 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-hero)]"
      aria-label="Hero section"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <DriftingLines />

      {/* Main content */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-16 py-32">
        <motion.div style={{ y, opacity, scale }}>

          {/* Eyebrow */}
          <motion.div
            className="mb-10 inline-flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
              buildroot_
            </span>
            <span className="h-px w-8 bg-[var(--accent)] opacity-40" />
          </motion.div>

          {/* Headline */}
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
            <div className="overflow-hidden">
              <motion.h1
                className="headline text-display leading-[0.92]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative inline-block text-[var(--accent)]">
                  products
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

          {/* Services list + CTAs */}
          <div className="mt-14 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">

            {/* Services */}
            <div className="flex flex-col gap-0">
              {SERVICES.map(({ label, index }, i) => (
                <motion.div
                  key={index}
                  className="flex items-baseline gap-4 py-3 border-b border-[var(--text-inverse)] border-opacity-[0.12] group cursor-default"
                  style={{ borderColor: "rgba(248,250,252,0.1)" }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ x: 6 }}
                >
                  <span className="font-mono text-[10px] text-[var(--accent)] opacity-60 tabular-nums">
                    {index}
                  </span>
                  <span className="heading text-h3 text-[var(--text-inverse)]">
                    {label}
                  </span>
                  <motion.span
                    className="ml-auto font-mono text-[10px] text-[var(--accent)] opacity-0 group-hover:opacity-60"
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <MagneticButton href="/work" variant="accent" id="hero-cta-work">
                View Our Work
              </MagneticButton>
              <MagneticButton href="/contact" id="hero-cta-contact">
                Start a Project
              </MagneticButton>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Diagonal cut */}
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
