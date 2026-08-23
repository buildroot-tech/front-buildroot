"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  m,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  ScrambleText,
  ScrambleTextHandle,
} from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";
import { getRouteTheme, normalizeLocalePathname } from "@/lib/route-theme";
import { SERVICE_COLORS, SERVICE_KEYS } from "@/lib/service-colors";

interface HeaderProps {
  dict?: Dictionary["header"];
  lang?: string;
}

// Home floats transparent over the dark hero until the user scrolls past
// it — a transient state no other route needs, so it stays local here
// instead of living in the shared route theme.
const HOME_HEADER_THEME = { text: "var(--text-inverse)", bg: "transparent" };

const HEADER_H = 80;

// Read from lib/service-colors.ts, the single source of truth ServicesSection
// itself renders from — the header has no other way to know that page's
// per-slide colors (it's a scroll-stacking effect local to that page, not
// part of the shared route-theme system), so it borrows whichever slide is
// currently in view via this ordered array.
const SERVICES_SLIDE_THEMES = SERVICE_KEYS.map((key) => ({
  text: SERVICE_COLORS[key].text,
  bg: SERVICE_COLORS[key].bg,
}));

export function Header({ dict, lang = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [servicesSlideTheme, setServicesSlideTheme] = useState<
    (typeof SERVICES_SLIDE_THEMES)[number] | null
  >(null);
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

  // Services: the header borrows whichever slide's color is currently
  // covering the screen in the scroll-stacking section (id="services-stack"
  // in ServicesSection.tsx), same "read the DOM on scroll" idiom as the
  // home hero check above — falls back to the static route theme outside
  // that section (its own 100vh header, and "How We Engage"/CTA below it).
  useEffect(() => {
    if (normalizedPathname !== "/services") return;

    const check = () => {
      const stack = document.getElementById("services-stack");
      if (!stack) return;
      const rect = stack.getBoundingClientRect();
      const isInStack = rect.top <= 0 && rect.bottom > 0;

      if (!isInStack) {
        setServicesSlideTheme(null);
        return;
      }

      const scrollableHeight = rect.height - window.innerHeight;
      const progress =
        scrollableHeight > 0
          ? Math.min(Math.max(-rect.top / scrollableHeight, 0), 1)
          : 0;
      const index = Math.min(
        SERVICES_SLIDE_THEMES.length - 1,
        Math.floor(progress * SERVICES_SLIDE_THEMES.length),
      );
      setServicesSlideTheme(SERVICES_SLIDE_THEMES[index]);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [normalizedPathname]);

  const isHome = normalizedPathname === "/";
  const effectiveScrolledPastHero = isHome ? scrolledPastHero : false;

  // Determine colors based on route and scroll position. Every route but
  // home reads straight from the shared theme (also used by the Footer),
  // so a section's assigned color never drifts between the two — except
  // /services while inside its scroll-stacking section, which overrides
  // with whichever slide is currently in view.
  const theme = isHome
    ? HOME_HEADER_THEME
    : normalizedPathname === "/services" && servicesSlideTheme
      ? servicesSlideTheme
      : getRouteTheme(normalizedPathname);

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
          <LocaleLink
            href="/"
            className="group relative font-display text-xl font-bold tracking-tight lg:col-start-1"
            style={{ color: textColor } as React.CSSProperties}
            onMouseEnter={() => logoRef.current?.scramble()}
            onMouseLeave={() => logoRef.current?.reset()}
          >
            <ScrambleText
              ref={logoRef}
              text="buildroot"
              speed={40}
              trigger="manual"
            />
            <span className="cursor-blink inline-block scale-y-75 origin-bottom">
              _
            </span>
          </LocaleLink>

          <div className="hidden items-center md:flex flex-1 justify-between lg:col-start-2 lg:flex-none overflow-hidden">
            <nav className="flex items-center gap-3 justify-center md:pl-8 lg:pl-0 lg:justify-start overflow-hidden">
              {navLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  <LocaleLink
                    href={link.href}
                    className="group relative font-display text-2xl sm:text-3xl md:text-3xl 2xl:text-4xl tracking-[0.1em] font-normal transition-colors hover:text-[var(--accent)]"
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
                      speed={40}
                      trigger="manual"
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] w-full bg-current transition-opacity duration-150 ${normalizedPathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    />
                  </LocaleLink>
                  {i < navLinks.length - 1 && (
                    <span
                      className="font-display text-2xl sm:text-3xl md:text-3xl 2xl:text-4xl font-normal"
                      style={{ color: textColor }}
                    >
                      ,
                    </span>
                  )}
                </span>
              ))}
            </nav>

            {/* Contact link */}
            <LocaleLink
              href="/contact"
              className="group relative font-display text-2xl sm:text-3xl md:text-3xl 2xl:text-4xl tracking-[0.1em] font-normal transition-colors hover:text-[var(--accent)]"
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
                speed={40}
                trigger="manual"
              />
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-full bg-current transition-opacity duration-150 ${normalizedPathname === "/contact" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />
            </LocaleLink>
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
                <LocaleLink
                  key={link.href}
                  href={link.href}
                  className="font-display text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </LocaleLink>
              ))}
              <LocaleLink
                href="/contact"
                className="font-display text-4xl font-medium tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                onClick={() => setMobileOpen(false)}
              >
                {dict?.contact || "let's talk"}
              </LocaleLink>
              {/* Plain Link on purpose — this one deliberately targets the
               *other* locale, so it must not be re-prefixed. */}
              <Link
                href={`/${lang === "en" ? "es" : "en"}${
                  normalizedPathname === "/" ? "" : normalizedPathname
                }`}
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
