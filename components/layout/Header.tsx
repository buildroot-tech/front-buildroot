"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/TextScrambler";

const navLinks = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
];

const darkSections = ["hero", "cta"];

export function Header() {
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const HEADER_H = 80;

    const check = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let found = false;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (HEADER_H >= rect.top && HEADER_H < rect.bottom) {
          setIsDark(darkSections.includes(section.id));
          found = true;
          break;
        }
      }
      if (!found) setIsDark(true);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isDark ? "bg-transparent" : "bg-[var(--bg-primary)]",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 overflow-hidden">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-3xl font-bold tracking-tight"
            style={{
              color: isDark ? "var(--text-inverse)" : "var(--text-primary)",
            }}
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
                  style={{
                    color: isDark ? "var(--text-inverse)" : "var(--text-primary)",
                    minWidth: `${link.label.length}ch`,
                  }}
                >
                  <ScrambleText text={link.label} speed={55} />
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                </Link>
                {i < navLinks.length - 1 && (
                  <span
                    className="text-3xl"
                    style={{
                      color: isDark ? "var(--text-inverse)" : "var(--text-muted)",
                      opacity: 0.4,
                    }}
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
              color: isDark ? "var(--text-inverse)" : "var(--text-primary)",
              minWidth: "9ch",
            }}
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
              style={{
                background: isDark ? "var(--text-inverse)" : "var(--text-primary)",
              }}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{
                background: isDark ? "var(--text-inverse)" : "var(--text-primary)",
              }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{
                background: isDark ? "var(--text-inverse)" : "var(--text-primary)",
              }}
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
