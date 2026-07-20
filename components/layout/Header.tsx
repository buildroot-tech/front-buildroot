"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/TextScrambler";

const navLinks = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          scrolled
            ? "border-b-2 border-[var(--border)] bg-[var(--bg-primary)]"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-3xl font-bold tracking-tight"
            style={{ color: scrolled ? "var(--text-primary)" : "var(--text-inverse)" }}
          >
            <ScrambleText text="buildroot_" speed={80} />
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-0 md:flex md:ml-40">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="font-mono text-3xl font-medium tracking-tight transition-colors hover:text-[var(--accent)]"
                  style={{ color: scrolled ? "var(--text-primary)" : "var(--text-inverse)" }}
                >
                  <ScrambleText text={link.label} speed={55} />
                </Link>
                {i < navLinks.length - 1 && (
                  <span
                    className="text-3xl"
                    style={{ color: scrolled ? "var(--text-muted)" : "var(--text-inverse)", opacity: 0.4 }}
                  >
                    ,
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Contact button */}
          <a
            href="mailto:hello@buildroot.dev"
            className="brutalist-button text-lg"
            style={{
                borderColor: scrolled ? "var(--border)" : "var(--text-inverse)",
                color: scrolled ? "var(--text-primary)" : "var(--text-inverse)",
                boxShadow: scrolled
                  ? "4px 4px 0 var(--border)"
                  : "4px 4px 0 var(--text-inverse)",
              }}
            >
              Contact
            </a>

          {/* Mobile Burger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: scrolled ? "var(--text-primary)" : "var(--text-inverse)" }}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: scrolled ? "var(--text-primary)" : "var(--text-inverse)" }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{ background: scrolled ? "var(--text-primary)" : "var(--text-inverse)" }}
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--bg-hero)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="headline text-h1 text-[var(--text-inverse)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <a
                  href="mailto:hello@buildroot.dev"
                  className="brutalist-button brutalist-button-accent mt-4 text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
