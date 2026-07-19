"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-hero)]"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <motion.div style={{ y, opacity }}>
          {/* Eyebrow */}
          <motion.p
            className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Digital Products & Consulting
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="headline text-display text-[var(--text-inverse)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              We build
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="headline text-display text-[var(--text-inverse)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              digital{" "}
              <span className="text-[var(--accent)]">products</span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            className="mt-8 max-w-lg text-lg text-[var(--text-inverse)] opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Web development, technical consulting, and SaaS products for startups
            and enterprises.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href="/work"
              className="brutalist-button border-[var(--text-inverse)] text-[var(--text-inverse)]"
              style={{ boxShadow: "4px 4px 0 var(--text-inverse)" }}
            >
              View Our Work →
            </a>
            <a
              href="/process"
              className="brutalist-button border-[var(--accent)] text-[var(--accent)]"
              style={{ boxShadow: "4px 4px 0 var(--accent)" }}
            >
              How We Work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-inverse)] opacity-50">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-[var(--text-inverse)] opacity-30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
