"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Magnetic button
───────────────────────────────────────────────────────── */
function MagneticButton({
  href,
  children,
  variant = "default",
  id,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "accent";
  id: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    },
    [x, y]
  );
  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const base =
    "inline-flex items-center gap-2 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] font-semibold border-2 transition-all duration-150 select-none cursor-pointer group";
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
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <ArrowUpRight
        size={13}
        className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────
   Interweaving diagonal lines
───────────────────────────────────────────────────────── */
function InterweavingLines() {
  const down = [
    { x1: "-20%", y1: "0%",  x2: "60%",  y2: "100%", d: 28, dl: 0   },
    { x1: "0%",   y1: "0%",  x2: "80%",  y2: "100%", d: 34, dl: -6  },
    { x1: "20%",  y1: "0%",  x2: "100%", y2: "100%", d: 30, dl: -12 },
    { x1: "40%",  y1: "0%",  x2: "120%", y2: "100%", d: 36, dl: -3  },
    { x1: "60%",  y1: "0%",  x2: "140%", y2: "100%", d: 26, dl: -9  },
    { x1: "-40%", y1: "0%",  x2: "40%",  y2: "100%", d: 32, dl: -15 },
    { x1: "80%",  y1: "0%",  x2: "160%", y2: "100%", d: 38, dl: -4  },
  ];
  const up = [
    { x1: "-20%", y1: "100%", x2: "60%",  y2: "0%", d: 32, dl: -8  },
    { x1: "0%",   y1: "100%", x2: "80%",  y2: "0%", d: 26, dl: 0   },
    { x1: "20%",  y1: "100%", x2: "100%", y2: "0%", d: 36, dl: -14 },
    { x1: "40%",  y1: "100%", x2: "120%", y2: "0%", d: 30, dl: -5  },
    { x1: "60%",  y1: "100%", x2: "140%", y2: "0%", d: 28, dl: -11 },
    { x1: "-40%", y1: "100%", x2: "40%",  y2: "0%", d: 34, dl: -2  },
    { x1: "80%",  y1: "100%", x2: "160%", y2: "0%", d: 40, dl: -7  },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {down.map((l, i) => (
        <motion.line
          key={`d${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(248,250,252,0.06)" strokeWidth="1"
          animate={{ x: ["-30%", "30%", "-30%"] }}
          transition={{ duration: l.d, repeat: Infinity, ease: "easeInOut", delay: l.dl }}
        />
      ))}
      {up.map((l, i) => (
        <motion.line
          key={`u${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(248,250,252,0.04)" strokeWidth="1"
          animate={{ x: ["30%", "-30%", "30%"] }}
          transition={{ duration: l.d, repeat: Infinity, ease: "easeInOut", delay: l.dl }}
        />
      ))}
      <motion.line x1="8%" y1="0%" x2="92%" y2="100%"
        stroke="rgba(37,99,235,0.13)" strokeWidth="1"
        animate={{ x: ["-18%", "18%", "-18%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
      <motion.line x1="92%" y1="0%" x2="8%" y2="100%"
        stroke="rgba(37,99,235,0.08)" strokeWidth="1"
        animate={{ x: ["18%", "-18%", "18%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Decorative details
───────────────────────────────────────────────────────── */
function Decorative() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-8 right-8 grid grid-cols-5 gap-2.5"
        animate={{ y: [0, -7, 0], opacity: [0.12, 0.19, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[var(--text-inverse)]" />
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-[var(--accent)]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: "backOut" }}
      />

      <div
        className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
      />

      <motion.div
        className="absolute bottom-16 left-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-inverse)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.16 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div>LAT: 00.83 N</div>
        <div>LON: 77.64 W</div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────────────────
   Header is fixed, height = 80px (py-5 × 2 + logo line).
   Hero fills the remaining 100vh - 80px with:
     · 3 headline lines
     · ghost echoes peeling below PRODUCTS.
     · services + CTAs pinned to bottom
───────────────────────────────────────────────────────── */
const HEADER_H = 80;

/*
  Font-size: at 1280px → 13vw ≈ 166px
  3 main lines at lh 0.88 → ~440px height
  Ghost lines follow immediately below (lh 0.70)
  Total content fills the available viewport.
*/
const FS = "clamp(64px, 13vw, 220px)";

/*
  Main headline line-height.
  0.88 = tight, brutalist, no air between lines.
*/
const LH_MAIN = 0.88;

/*
  Ghost line-height.
  0.70 ≈ cap-height ratio of Space Grotesk Bold.
  This places each ghost line so its TOP aligns
  exactly with the BOTTOM of the uppercase letters
  in the line above — zero visible gap → "pegado".
*/
const LH_GHOST = 0.50;

const SERVICES = ["System", "Product", "Infrastructure"];

/* ─────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────── */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const textBase: React.CSSProperties = {
    fontSize: FS,
    letterSpacing: "-0.03em",
    fontWeight: 700,
  };

  return (
    <section
      ref={ref}
      /*
        h-[100vh] — fills the full viewport (navbar is fixed on top,
        so section starts at y=0 and spans the whole screen height).
        overflow-hidden clips the deepest ghost lines naturally.
      */
      className="relative flex min-h-[calc(100vh+80px)] flex-col overflow-hidden bg-[var(--bg-hero)]"
      aria-label="Hero section"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <InterweavingLines />
      <Decorative />

      {/* ── Content — flex-col fills the full 100vh ── */}
      <motion.div
        className="relative flex flex-1 flex-col justify-between px-6 md:px-12"
        /*
          pt accounts for the fixed navbar (80px) + 16px breathing room.
          pb gives room for the bottom bar and the diagonal cut.
        */
        style={{
          paddingTop:    `${HEADER_H + 16}px`,
          paddingBottom: "56px",
          y,
          opacity,
        }}
      >
        {/* ── Headline ── */}
        <div className="flex-1 flex flex-col justify-end pb-8">

          {/* We build */}
          <div className="overflow-hidden">
            <motion.h1
              className="block font-display text-[var(--text-inverse)] uppercase"
              style={{ ...textBase, lineHeight: LH_MAIN }}
              initial={{ y: "106%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              We build
            </motion.h1>
          </div>

          {/* Digital */}
          <div className="overflow-hidden">
            <motion.h1
              className="block font-display text-[var(--text-inverse)] uppercase"
              style={{ ...textBase, lineHeight: LH_MAIN }}
              initial={{ y: "106%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              Digital
            </motion.h1>
          </div>

          {/* Products. — solid accent */}
          {/* Products. — solid accent, z-10 so ghosts can go behind */}
          <div className="overflow-hidden relative z-10">
            <motion.h1
              className="block font-display text-[var(--accent)] uppercase"
              style={{ ...textBase, lineHeight: LH_MAIN }}
              initial={{ y: "106%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              Products.
            </motion.h1>
          </div>

          {/*
            Ghost echoes — LH_GHOST=0.64 so each echo sits
            virtually touching the bottom of the caps above.
            No overflow-hidden: they bleed downward and the section
            clips the deepest one → peeling / detaching effect.
          */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.45 }}
          >
            {/* Echo 1 — high overlap (lh 0.35), behind the solid word */}
            <span
              className="relative block font-display uppercase"
              style={{
                ...textBase,
                lineHeight: 0.35,
                zIndex: -1,
                WebkitTextStroke: "2px rgba(248,250,252,0.16)",
                color: "transparent",
              }}
            >
              Products.
            </span>

            {/* Echo 2 */}
            <span
              className="block font-display uppercase"
              style={{
                ...textBase,
                lineHeight: LH_GHOST,
                WebkitTextStroke: "1.5px rgba(248,250,252,0.08)",
                color: "transparent",
              }}
            >
              Products.
            </span>

            {/* Echo 3 */}
            <span
              className="block font-display uppercase"
              style={{
                ...textBase,
                lineHeight: LH_GHOST,
                WebkitTextStroke: "1px rgba(248,250,252,0.04)",
                color: "transparent",
              }}
            >
              Products.
            </span>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <div className="flex items-center gap-5 flex-wrap">
            {SERVICES.map((s, i) => (
              <span key={s} className="flex items-center gap-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-inverse)] opacity-35">
                  {s}
                </span>
                {i < SERVICES.length - 1 && (
                  <span className="h-px w-3 bg-[var(--text-inverse)] opacity-20" />
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <MagneticButton href="/work" variant="accent" id="hero-cta-work">
              View Our Work
            </MagneticButton>
            <MagneticButton href="/contact" id="hero-cta-contact">
              Start a Project
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>


      {/* Diagonal cut — sits 80px below viewport fold, visible only on scroll */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--bg-primary)] pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />

      {/* Scroll line */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="relative h-8 w-px overflow-hidden">
          <motion.div
            className="absolute inset-x-0 bg-[var(--accent)] opacity-60"
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "50%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
