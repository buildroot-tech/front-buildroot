"use client";

import { useState, useEffect } from "react";
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
// text: color for text, bg: navbar background, needsScroll: only on home
const routeColors: Record<string, { text: string; bg: string; needsScroll?: boolean }> = {
  "/": { text: "var(--text-inverse)", bg: "transparent", needsScroll: true },
  "/work": { text: "var(--text-primary)", bg: "white" },
  "/services": { text: "white", bg: "var(--accent)" },
  "/about": { text: "var(--text-inverse)", bg: "#0A0A0A" },
};

const HEADER_H = 80;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Home page: detect when scrolled past hero
  useEffect(() => {
    const config = routeColors[pathname] || routeColors["/"];
    if (!config.needsScroll) {
      setScrolledPastHero(false);
      return;
    }

    const check = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      // Past hero when hero bottom is above navbar
      setScrolledPastHero(rect.bottom <= HEADER_H);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  // Determine colors based on route and scroll position
  const config = routeColors[pathname] || routeColors["/"];
  const isHome = pathname === "/";

  const textColor = isHome
    ? scrolledPastHero
      ? "var(--text-primary)"
      : config.text
    : config.text;

  const bgColor = isHome
    ? scrolledPastHero
      ? "var(--bg-primary)"
      : config.bg
    : config.bg;

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
        style={{ backgroundColor: bgColor } as React.CSSProperties}
      >
        <div className="flex items-center justify-between px-6 py-5 overflow-hidden">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-3xl font-bold tracking-tight"
            style={{ color: textColor } as React.CSSProperties}
          >
            <ScrambleText text="buildroot" speed={80} trigger="mount" key={`logo-${pathname}`} />
            <span className="cursor-blink inline-block scale-y-75 origin-bottom">_</span>
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
                  <ScrambleText text={link.label} speed={55} trigger="mount" key={`${link.label}-${pathname}`} />
                  <span className={`absolute bottom-0 left-0 h-[3px] w-full bg-current transition-opacity duration-150 ${pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
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
            <ScrambleText text="let_s talk" speed={55} trigger="mount" key={`contact-${pathname}`} />
            <span className={`absolute bottom-0 left-0 h-[3px] w-full bg-current transition-opacity duration-150 ${pathname === "/contact" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
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