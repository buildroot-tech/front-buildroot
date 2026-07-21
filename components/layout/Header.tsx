"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/TextScrambler";

const navLinks = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
];

// Route → background color config
const routeColors: Record<string, { text: string; bg: string; needsScroll?: boolean }> = {
  "/": { text: "var(--text-inverse)", bg: "var(--bg-hero)", needsScroll: true },
  "/work": { text: "var(--text-primary)", bg: "white" },
  "/services": { text: "white", bg: "var(--accent)" },
  "/about": { text: "var(--text-inverse)", bg: "#0A0A0A" },
};

const HEADER_H = 80;
const DIAGONAL_H = 96; // h-24 = 96px

// Color values for interpolation
const COLORS = {
  light: { r: 248, g: 250, b: 252 },  // --bg-primary
  dark: { r: 15, g: 23, b: 42 },      // --bg-hero
};

const TEXT_COLORS = {
  light: { r: 15, g: 23, b: 42 },     // --text-primary (dark, for light bg)
  dark: { r: 248, g: 250, b: 252 },   // --text-inverse (light, for dark bg)
};

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * Math.min(Math.max(t, 0), 1));
}

function lerpColor(t: number): string {
  const r = lerp(TEXT_COLORS.dark.r, TEXT_COLORS.light.r, t);
  const g = lerp(TEXT_COLORS.dark.g, TEXT_COLORS.light.g, t);
  const b = lerp(TEXT_COLORS.dark.b, TEXT_COLORS.light.b, t);
  return `rgb(${r}, ${g}, ${b})`;
}

function lerpBgColor(t: number): string {
  const r = lerp(COLORS.dark.r, COLORS.light.r, t);
  const g = lerp(COLORS.dark.g, COLORS.light.g, t);
  const b = lerp(COLORS.dark.b, COLORS.light.b, t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [diagonalProgress, setDiagonalProgress] = useState(0);

  // Home page: smooth scroll-based transition matching diagonal
  useEffect(() => {
    const config = routeColors[pathname] || routeColors["/"];
    if (!config.needsScroll) {
      setDiagonalProgress(0);
      return;
    }

    const check = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroBottom = rect.bottom;

      // Diagonal spans from heroBottom to heroBottom + DIAGONAL_H
      // Navbar is at 0 to HEADER_H
      // Progress 0 = diagonal hasn't entered navbar (all dark)
      // Progress 1 = diagonal fully past navbar (all light)
      const rawProgress = (HEADER_H - heroBottom) / HEADER_H;
      setDiagonalProgress(Math.min(Math.max(rawProgress, 0), 1));
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  // Determine colors based on route and diagonal progress
  const config = routeColors[pathname] || routeColors["/"];
  const isHome = pathname === "/";

  // For home: bg interpolates from dark to light; text uses gradient matching diagonal
  // For other routes: solid bg, solid text
  const bgColor = useMemo(() => {
    if (!isHome) return config.bg;
    return lerpBgColor(diagonalProgress);
  }, [isHome, config.bg, diagonalProgress]);

  // For home: text gradient boundary = diagonalProgress * 100%
  // 0% = all white (diagonal hasn't reached), 100% = all dark (diagonal past)
  const textGradient = useMemo(() => {
    if (!isHome) return null;
    // diagonalProgress 0 = boundary at 0% (all white)
    // diagonalProgress 1 = boundary at 100% (all dark)
    const boundary = Math.round(diagonalProgress * 100);
    return `linear-gradient(to bottom, rgb(${TEXT_COLORS.dark.r}, ${TEXT_COLORS.dark.g}, ${TEXT_COLORS.dark.b}) ${boundary}%, rgb(${TEXT_COLORS.light.r}, ${TEXT_COLORS.light.g}, ${TEXT_COLORS.light.b}) ${boundary}%)`;
  }, [isHome, diagonalProgress]);

  const solidTextColor = useMemo(() => {
    if (isHome) return lerpColor(diagonalProgress);
    return config.text;
  }, [isHome, config.text, diagonalProgress]);

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

  // Style for text with gradient
  const gradientTextStyle = useMemo(() => {
    if (!textGradient) return {};
    return {
      background: textGradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    } as React.CSSProperties;
  }, [textGradient]);

  // Style for solid color text (non-home or elements that don't use gradient)
  const solidTextStyle = useMemo(() => {
    return { color: solidTextColor } as React.CSSProperties;
  }, [solidTextColor]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-150"
        style={{ backgroundColor: bgColor } as React.CSSProperties}
      >
        <div className="flex items-center justify-between px-6 py-5 overflow-hidden">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-3xl font-bold tracking-tight"
            style={textGradient ? gradientTextStyle : solidTextStyle}
          >
            <ScrambleText text="buildroot" speed={80} />
            <span className="cursor-blink inline-block scale-y-75 origin-bottom">_</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-0 md:flex md:ml-40 overflow-hidden">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="group relative font-mono text-3xl font-medium transition-colors hover:text-[var(--accent)]"
                  style={{ minWidth: `${link.label.length}ch` } as React.CSSProperties}
                >
                  <span style={textGradient ? gradientTextStyle : solidTextStyle}>
                    <ScrambleText text={link.label} speed={55} />
                  </span>
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                </Link>
                {i < navLinks.length - 1 && (
                  <span
                    className="text-3xl"
                    style={textGradient ? gradientTextStyle : { ...solidTextStyle, opacity: 0.4 } as React.CSSProperties}
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
            style={{ minWidth: "9ch" } as React.CSSProperties}
          >
            <span style={textGradient ? gradientTextStyle : solidTextStyle}>
              <ScrambleText text="let_s talk" speed={55} />
            </span>
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
              style={{ background: solidTextColor } as React.CSSProperties}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: solidTextColor } as React.CSSProperties}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: solidTextColor } as React.CSSProperties}
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