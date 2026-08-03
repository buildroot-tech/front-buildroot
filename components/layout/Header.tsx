"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ScrambleText,
  ScrambleTextHandle,
} from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";
import { getRouteTheme, normalizeLocalePathname } from "@/lib/route-theme";

interface HeaderProps {
  dict?: Dictionary["header"];
  lang?: string;
}

// Home floats transparent over the dark hero until the user scrolls past
// it — a transient state no other route needs, so it stays local here
// instead of living in the shared route theme.
const HOME_HEADER_THEME = { text: "var(--text-inverse)", bg: "transparent" };

const HEADER_H = 80;

export function Header({ dict, lang = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Don't hide if menu is open
    if (mobileOpen) return;
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const normalizedPathname = normalizeLocalePathname(pathname);

  const navLinks = [
    { href: "/work", label: dict?.nav?.work || "work" },
    { href: "/services", label: dict?.nav?.services || "services" },
    { href: "/about", label: dict?.nav?.about || "about" },
  ];

  // Imperative refs — hover is detected at the <Link> level so the entire
  // clickable area triggers the scramble, not just the inner text span.
  const logoRef = useRef<ScrambleTextHandle>(null);
  const navRefs = useRef<Map<string, ScrambleTextHandle>>(new Map());
  const contactRef = useRef<ScrambleTextHandle>(null);

  // Home page: detect when scrolled past hero
  useEffect(() => {
    if (normalizedPathname !== "/") return;

    const check = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setScrolledPastHero(rect.bottom <= HEADER_H);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [normalizedPathname]);

  const isHome = normalizedPathname === "/";
  const effectiveScrolledPastHero = isHome ? scrolledPastHero : false;

  // Determine colors based on route and scroll position. Every route but
  // home reads straight from the shared theme (also used by the Footer),
  // so a section's assigned color never drifts between the two.
  const theme = isHome ? HOME_HEADER_THEME : getRouteTheme(normalizedPathname);

  const textColor = effectiveScrolledPastHero
    ? "var(--text-primary)"
    : theme.text;

  const bgColor = effectiveScrolledPastHero ? "var(--bg-primary)" : theme.bg;

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
      <m.header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: bgColor } as React.CSSProperties}
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 overflow-hidden lg:grid lg:grid-cols-[46%_1fr] lg:gap-4 lg:justify-normal">
          {/* Logo — hover detected on the <Link>, not the inner span */}
          <Link
            href="/"
            className="group relative font-display text-xl font-bold tracking-tight lg:col-start-1"
            style={{ color: textColor } as React.CSSProperties}
            onMouseEnter={() => logoRef.current?.scramble()}
            onMouseLeave={() => logoRef.current?.reset()}
          >
            <ScrambleText
              ref={logoRef}
              text="buildroot"
              speed={95}
              trigger="mount"
              key={`logo-${pathname}`}
            />
            <span className="cursor-blink inline-block scale-y-75 origin-bottom">
              _
            </span>
          </Link>

          <div className="hidden items-center md:flex flex-1 justify-between lg:col-start-2 lg:flex-none overflow-hidden">
            <nav className="flex items-center gap-3 justify-center md:pl-[15vw] lg:pl-0 lg:justify-start overflow-hidden">
              {navLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="group relative font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.1em] font-normal transition-colors hover:text-[var(--accent)]"
                    style={
                      {
                        color: textColor,
                      } as React.CSSProperties
                    }
                    onMouseEnter={() =>
                      navRefs.current.get(link.href)?.scramble()
                    }
                    onMouseLeave={() => navRefs.current.get(link.href)?.reset()}
                  >
                    <ScrambleText
                      ref={(el) => {
                        if (el) navRefs.current.set(link.href, el);
                        else navRefs.current.delete(link.href);
                      }}
                      text={link.label}
                      speed={68}
                      trigger="mount"
                      key={`${link.label}-${pathname}`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] w-full bg-current transition-opacity duration-150 ${pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    />
                  </Link>
                  {i < navLinks.length - 1 && (
                    <span
                      className="font-display text-2xl sm:text-3xl md:text-4xl font-normal"
                      style={{ color: textColor }}
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
              className="group relative font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.1em] font-normal transition-colors hover:text-[var(--accent)]"
              style={
                {
                  color: textColor,
                  textAlign: "center",
                } as React.CSSProperties
              }
              onMouseEnter={() => contactRef.current?.scramble()}
              onMouseLeave={() => contactRef.current?.reset()}
            >
              <ScrambleText
                ref={contactRef}
                text={dict?.contact || "let's talk"}
                speed={68}
                trigger="mount"
                key={`contact-${pathname}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-full bg-current transition-opacity duration-150 ${normalizedPathname === "/contact" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <m.span
              className="block h-0.5 w-6"
              style={{ background: textColor } as React.CSSProperties}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className="block h-0.5 w-6"
              style={{ background: textColor } as React.CSSProperties}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className="block h-0.5 w-6"
              style={{ background: textColor } as React.CSSProperties}
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </m.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
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
                  className="font-display text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="font-display text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                onClick={() => setMobileOpen(false)}
              >
                {dict?.contact || "let's talk"}
              </Link>
              <Link
                href={lang === "en" ? `/es${normalizedPathname === "/" ? "" : normalizedPathname}` : normalizedPathname}
                className="font-display text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] mt-8"
                onClick={() => setMobileOpen(false)}
              >
                {lang === "en" ? "ES" : "EN"}
              </Link>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
