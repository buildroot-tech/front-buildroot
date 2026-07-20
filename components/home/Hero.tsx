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
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const base = "relative inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.12em] font-semibold border-2 transition-all duration-150 select-none cursor-pointer group";
  const styles = variant === "accent"
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
        <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}

/* ──────────────────────────────────────────────
   Interweaving lines rendered as SVG
   Two sets of diagonal lines travelling in
   opposite directions. They cross each other
   naturally at every intersection point.
────────────────────────────────────────────── */
function InterweavingLines() {
  /* Lines going ↘ (top-left → bottom-right) */
  const downLines = [
    { x1: "-20%", y1: "0%",   x2: "60%",  y2: "100%", dur: 28, delay: 0 },
    { x1: "0%",   y1: "0%",   x2: "80%",  y2: "100%", dur: 34, delay: -6 },
    { x1: "20%",  y1: "0%",   x2: "100%", y2: "100%", dur: 30, delay: -12 },
    { x1: "40%",  y1: "0%",   x2: "120%", y2: "100%", dur: 36, delay: -3 },
    { x1: "60%",  y1: "0%",   x2: "140%", y2: "100%", dur: 26, delay: -9 },
    { x1: "-40%", y1: "0%",   x2: "40%",  y2: "100%", dur: 32, delay: -15 },
    { x1: "80%",  y1: "0%",   x2: "160%", y2: "100%", dur: 38, delay: -4 },
  ];

  /* Lines going ↗ (bottom-left → top-right) */
  const upLines = [
    { x1: "-20%", y1: "100%", x2: "60%",  y2: "0%",   dur: 32, delay: -8 },
    { x1: "0%",   y1: "100%", x2: "80%",  y2: "0%",   dur: 26, delay: 0 },
    { x1: "20%",  y1: "100%", x2: "100%", y2: "0%",   dur: 36, delay: -14 },
    { x1: "40%",  y1: "100%", x2: "120%", y2: "0%",   dur: 30, delay: -5 },
    { x1: "60%",  y1: "100%", x2: "140%", y2: "0%",   dur: 28, delay: -11 },
    { x1: "-40%", y1: "100%", x2: "40%",  y2: "0%",   dur: 34, delay: -2 },
    { x1: "80%",  y1: "100%", x2: "160%", y2: "0%",   dur: 40, delay: -7 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ↘ lines */}
      {downLines.map((l, i) => (
        <motion.line
          key={`d-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(248,250,252,0.07)"
          strokeWidth="1"
          animate={{ x: ["-30%", "30%", "-30%"] }}
          transition={{ duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: l.delay }}
        />
      ))}

      {/* ↗ lines */}
      {upLines.map((l, i) => (
        <motion.line
          key={`u-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(248,250,252,0.05)"
          strokeWidth="1"
          animate={{ x: ["30%", "-30%", "30%"] }}
          transition={{ duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: l.delay }}
        />
      ))}

      {/* One thin accent line weaving through */}
      <motion.line
        x1="10%" y1="0%" x2="90%" y2="100%"
        stroke="rgba(37,99,235,0.18)"
        strokeWidth="1"
        animate={{ x: ["-20%", "20%", "-20%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="90%" y1="0%" x2="10%" y2="100%"
        stroke="rgba(37,99,235,0.12)"
        strokeWidth="1"
        animate={{ x: ["20%", "-20%", "20%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DecorativeDetails() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Concentric squares — slow rotation, top right */}
      <motion.div
        className="absolute right-[8%] top-[10%] w-[300px] h-[300px] opacity-[0.045]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border border-[var(--text-inverse)]" />
        <div className="absolute inset-8 border border-[var(--text-inverse)]" />
        <div className="absolute inset-16 border border-[var(--text-inverse)]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--text-inverse)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--text-inverse)]" />
      </motion.div>

      {/* Dot cluster */}
      <motion.div
        className="absolute top-10 right-10 grid grid-cols-5 gap-2.5"
        animate={{ y: [0, -8, 0], x: [0, 4, 0], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[var(--text-inverse)]" />
        ))}
      </motion.div>

      {/* Corner brackets */}
      <motion.div
        className="absolute top-8 left-8 w-10 h-10 border-l-2 border-t-2 border-[var(--accent)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "backOut" }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-10 h-10 border-r-2 border-b-2 border-[var(--accent)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "backOut" }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[480px] h-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)" }}
      />

      {/* Coordinates */}
      <motion.div
        className="absolute bottom-24 left-6 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-inverse)] opacity-[0.18]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div>X: 00.00 N</div>
        <div>Y: 90.00 W</div>
      </motion.div>
    </div>
  );
}

const SERVICES = ["Web Development", "Technical Consulting", "SaaS Products"];
const HEADLINE_LINES = [
  { text: "We build", delay: 0.3 },
  { text: "digital", delay: 0.45 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
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
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      <InterweavingLines />
      <DecorativeDetails />

      {/* Content */}
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
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              buildroot_
            </span>
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
                    className="absolute bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  />
                </span>
                <span className="text-[var(--text-inverse)]">.</span>
              </motion.h1>
            </div>
          </div>

          {/* Bottom row: services + CTAs */}
          <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

            {/* Services — small, subtle, inline */}
            <motion.div
              className="flex items-center gap-6 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {SERVICES.map((s, i) => (
                <span key={s} className="flex items-center gap-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-inverse)] opacity-40">
                    {s}
                  </span>
                  {i < SERVICES.length - 1 && (
                    <span className="h-px w-4 bg-[var(--text-inverse)] opacity-20" />
                  )}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
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
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-inverse)] opacity-25">
            Scroll
          </span>
          <div className="relative h-10 w-px overflow-hidden">
            <motion.div
              className="absolute inset-x-0 bg-[var(--accent)] opacity-60"
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
