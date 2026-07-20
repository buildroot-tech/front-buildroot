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

// Sections that have dark backgrounds (need light text)
const darkSections = ["hero", "cta"];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const isDarkSection = darkSections.includes(activeSection);

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
          isDarkSection
            ? "bg-transparent"
            : "bg-[var(--bg-primary)]",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 overflow-hidden">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-3xl font-bold tracking-tight"
            style={{
              color: isDarkSection ? "var(--text-inverse)" : "var(--text-primary)",
            }}
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
                    color: isDarkSection ? "var(--text-inverse)" : "var(--text-primary)",
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
                      color: isDarkSection ? "var(--text-inverse)" : "var(--text-muted)",
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
              color: isDarkSection ? "var(--text-inverse)" : "var(--text-primary)",
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
                background: isDarkSection
                  ? "var(--text-inverse)"
                  : "var(--text-primary)",
              }}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{
                background: isDarkSection
                  ? "var(--text-inverse)"
                  : "var(--text-primary)",
              }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6"
              style={{
                background: isDarkSection
                  ? "var(--text-inverse)"
                  : "var(--text-primary)",
              }}
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
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
