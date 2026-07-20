"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/TextScrambler";

const navLinks = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
];

// Color definitions
const COLORS = {
  dark: { r: 15, g: 23, b: 42 },    // #0F172A (hero)
  light: { r: 248, g: 250, b: 252 }, // #F8FAFC (body)
};

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * Math.min(Math.max(t, 0), 1));
}

function lerpColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number
): string {
  const r = lerp(c1.r, c2.r, t);
  const g = lerp(c1.g, c2.g, t);
  const b = lerp(c1.b, c2.b, t);
  return `rgb(${r}, ${g}, ${b})`;
}

// Section config: id, whether it's dark, and approximate height ratio
const sectionConfig = [
  { id: "hero", dark: true },
  { id: "services", dark: false },
  { id: "work", dark: false },
  { id: "highlights", dark: false },
  { id: "cta", dark: true },
];

export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Normalize: 0 = top, increases as you scroll
      setScrollProgress(scrollY / vh);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Calculate text color based on scroll position
  const textColor = useMemo(() => {
    if (!mounted) return COLORS.dark; // Default to light text (hero is dark)

    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return COLORS.dark;

    const headerHeight = 80; // approximate header height
    const viewCenter = window.scrollY + headerHeight;

    // Find which section the header center is over
    let currentSectionIdx = 0;
    let nextSectionIdx = 1;
    let progress = 0;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;

      if (viewCenter >= sectionTop && viewCenter < sectionBottom) {
        currentSectionIdx = i;
        nextSectionIdx = Math.min(i + 1, sections.length - 1);

        // Calculate progress within this section (0 = top, 1 = bottom)
        const sectionHeight = sectionBottom - sectionTop;
        const relativeY = viewCenter - sectionTop;
        progress = relativeY / sectionHeight;
        break;
      }
    }

    const currentConfig = sectionConfig[currentSectionIdx] || sectionConfig[0];
    const nextConfig = sectionConfig[nextSectionIdx] || currentConfig;

    const currentColor = currentConfig.dark ? COLORS.dark : COLORS.light;
    const nextColor = nextConfig.dark ? COLORS.dark : COLORS.light;

    // Start blending in the last 30% of the section
    const blendStart = 0.7;
    const blendProgress = progress > blendStart
      ? (progress - blendStart) / (1 - blendStart)
      : 0;

    return lerpColor(currentColor, nextColor, blendProgress);
  }, [scrollProgress, mounted]);

  // Determine if text should be light or dark for background
  const isLightText = scrollProgress < 0.5; // Rough heuristic for bg color
  const headerBg = scrollProgress > 0.5 ? "var(--bg-primary)" : "transparent";

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: headerBg }}
      >
        <div className="flex items-center justify-between px-6 py-5 overflow-hidden">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-3xl font-bold tracking-tight"
            style={{ color: textColor } as React.CSSProperties}
          >
            <ScrambleText text="buildroot_" speed={80} />
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-0 md:flex md:ml-40 overflow-hidden">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="group relative font-mono text-3xl font-medium transition-colors hover:text-[var(--accent)]"
                  style={{
                    color: textColor,
                    minWidth: `${link.label.length}ch`,
                  } as React.CSSProperties}
                >
                  <ScrambleText text={link.label} speed={55} />
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                </Link>
                {i < navLinks.length - 1 && (
                  <span
                    className="text-3xl"
                    style={{
                      color: textColor,
                      opacity: 0.4,
                    } as React.CSSProperties}
                  >
                    ,
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Contact link */}
          <Link
            href="/contact"
            className="group relative font-mono text-3xl font-medium transition-colors hover:text-[var(--accent)] ml-8"
            style={{
              color: textColor,
              minWidth: "9ch",
            } as React.CSSProperties}
          >
            <ScrambleText text="let_s talk" speed={55} />
            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </Link>

          {/* Mobile Burger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: textColor } as React.CSSProperties}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: textColor } as React.CSSProperties}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: textColor } as React.CSSProperties}
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] md:hidden"
          >
            <nav className="flex flex-col items-center justify-center gap-8 pt-32">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="font-mono text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                onClick={() => setMobileOpen(false)}
              >
                let_s talk
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
