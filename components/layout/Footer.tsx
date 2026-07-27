"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/TextScrambler";

interface FooterProps {
  dict?: any;
}

const socialLinks = [
  { href: "https://instagram.com/buildroot", label: "instagram" },
  { href: "https://twitter.com/buildroot_dev", label: "twitter" },
  { href: "https://linkedin.com/company/buildroot", label: "linkedin" },
];

const legalLinks = [
  { href: "/privacy", label: "privacy" },
  { href: "/cookies", label: "cookies" },
  { href: "/newsletter", label: "newsletter" },
];

const contactInfo = {
  address: "Cl.7 Este",
  city: "Ipiales",
  country: "Colombia",
  zip: "524060",
  phone: "310 425 2781",
  email: "info@buildroot.co",
};

const routeColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "/": {
    bg: "var(--bg-primary)",
    text: "var(--text-primary)",
    border: "var(--border)",
  },
  "/work": { bg: "#ffffff", text: "#000000", border: "#000000" },
  "/services": { bg: "var(--accent)", text: "#ffffff", border: "#ffffff" },
  "/about": { bg: "#000000", text: "#ffffff", border: "#ffffff" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" as const },
  }),
};

export function Footer({ dict }: FooterProps): React.ReactElement {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const normalizedPathname = pathname === "/es" ? "/" : pathname.replace("/es/", "/");
  const config = routeColors[normalizedPathname] || routeColors["/"];
  const isHome = normalizedPathname === "/";

  const navLinks = [
    { href: "/work", label: dict?.header?.nav?.work || "work" },
    { href: "/services", label: dict?.header?.nav?.services || "services" },
    { href: "/about", label: dict?.header?.nav?.about || "about" },
    { href: "/contact", label: dict?.header?.contact || "lets talk" },
    { 
      href: pathname.startsWith("/es") ? normalizedPathname : `/es${normalizedPathname === "/" ? "" : normalizedPathname}`, 
      label: pathname.startsWith("/es") ? "english" : "spanish" 
    },
  ];

  const legalLinks = [
    { href: "/privacy", label: dict?.footer?.legal?.privacy || "privacy" },
    { href: "/cookies", label: dict?.footer?.legal?.cookies || "cookies" },
    { href: "/newsletter", label: dict?.footer?.legal?.newsletter || "newsletter" },
  ];

  return (
    <footer
      id="footer"
      className="bg-[var(--bg-primary)] transition-colors duration-300"
      aria-label="Site footer"
      style={
        isHome
          ? undefined
          : ({
              "--bg-primary": config.bg,
              "--text-primary": config.text,
              "--border": config.border,
            } as React.CSSProperties)
      }
    >
      <div className="flex flex-col">
        {/* ── UPPER HALF ── */}
        <div className="px-6 md:px-12 pt-12 md:pt-20 pb-6 md:pb-8">
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              {/* Navigation & Legal (2 columns inside Pages) */}
              <div className="flex flex-col">
                <div className="border-b-[1px] border-[var(--border)] w-full pb-2 mb-3">
                  <p className="font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] capitalize tracking-tight text-[var(--text-primary)]">
                    {dict?.footer?.menu || "Menu"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {/* Sub-column 1: Nav */}
                  <nav
                    className="flex flex-col gap-0"
                    aria-label="Footer navigation"
                  >
                    {navLinks.map((link, i) => (
                      <m.div
                        key={link.href}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "group relative inline-flex items-center gap-2 leading-[0.8]",
                            "font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight",
                            "text-[var(--text-primary)]",
                          )}
                          style={{ minWidth: `${link.label.length}ch` }}
                        >
                          <ScrambleText text={link.label} speed={55} />
                          <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                        </Link>
                      </m.div>
                    ))}
                  </nav>

                  {/* Sub-column 2: Legal & Extras */}
                  <nav
                    className="flex flex-col gap-0"
                    aria-label="Legal navigation"
                  >
                    {legalLinks.map((link, i) => (
                      <m.div
                        key={link.href}
                        custom={i + navLinks.length}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "group relative inline-flex items-center gap-2 leading-[0.8]",
                            "font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight text-[var(--text-primary)]",
                          )}
                          style={{ minWidth: `${link.label.length}ch` }}
                        >
                          <ScrambleText text={link.label} speed={55} />
                          <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                        </Link>
                      </m.div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Social */}
              <div className="flex flex-col">
                <div className="border-b-[1px] border-[var(--border)] w-full pb-2 mb-3">
                  <p className="font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] capitalize tracking-tight text-[var(--text-primary)]">
                    {dict?.footer?.elsewhere || "Elsewhere"}
                  </p>
                </div>
                <div className="flex flex-col gap-0">
                  {socialLinks.map((link, i) => (
                    <m.div
                      key={link.href}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group relative inline-flex items-center gap-2 leading-[0.8]",
                          "font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight",
                          "text-[var(--text-primary)]",
                        )}
                        style={{ minWidth: `${link.label.length}ch` }}
                        aria-label={`Visita buildroot en ${link.label}`}
                      >
                        <ScrambleText text={link.label} speed={55} />
                        <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                      </a>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LOWER HALF (Contact Info) ── */}
        <div className="pt-12 md:pt-8 pb-4 md:pb-6 w-full overflow-hidden flex flex-row items-end justify-between px-6 md:px-12 gap-8">
          {/* Bottom Left: Copyright/Year */}
          <div className="font-mono text-[clamp(1.2rem,1.6vw,1.8rem)] font-medium tracking-tight text-[var(--text-primary)] pointer-events-none mb-[clamp(0.1rem,0.3vw,0.4rem)] flex items-center gap-1 shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[1em] h-[1em]"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M14.83 14.83a4 4 0 1 1 0-5.66"></path>
            </svg>
            <span>{year}</span>
          </div>

          {/* Main Info Box - Right aligned */}
          <div className="w-full bg-[var(--bg-primary)] flex-1 overflow-hidden">
            <div className="w-full flex flex-col gap-0 items-end">
              {/* Row 1: Address, Street, Zip */}
              <div className="flex items-end justify-end w-full py-[clamp(0.1rem,0.3vw,0.4rem)] gap-2 md:gap-3">
                <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap shrink-0">
                  {dict?.footer?.address || contactInfo.address}
                </span>

                <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap shrink-0">
                  Av. Panamericana
                </span>

                <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap shrink-0">
                  524060
                </span>
              </div>

              {/* Row 2: Icons, City, Coordinates, Country */}
              <div className="flex items-end justify-end w-full py-[clamp(0.1rem,0.3vw,0.4rem)] gap-2 md:gap-3">
                <div className="flex items-end gap-0.5 md:gap-1 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-[var(--text-primary)] shrink-0 w-[clamp(2.2rem,3.8vw,5rem)] h-[clamp(2.2rem,3.8vw,5rem)]"
                  >
                    <path d="M3 20h18L15 8l-3 4-2-2-6 10z" />
                    <path d="M12 3v3" />
                    <path d="M10 5l-1.5-1.5" />
                    <path d="M14 5l1.5-1.5" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--text-primary)] shrink-0 w-[clamp(2.2rem,3.8vw,5rem)] h-[clamp(2.2rem,3.8vw,5rem)]"
                  >
                    <path d="M20 17C20 13 17 10 15 10C15 7 13 7 13 10C9 10 4 13 4 17V20H18C20 20 20 18 20 17Z" />
                    <circle
                      cx="16"
                      cy="14"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1 md:gap-2 shrink-0">
                  <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                    {contactInfo.city}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-500 shrink-0 w-[clamp(2.2rem,3.8vw,5rem)] h-[clamp(2.2rem,3.8vw,5rem)]"
                  >
                    <path d="M17.5 20H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  </svg>
                </div>

                <div className="flex items-center gap-1 font-display text-[clamp(1.1rem,1.8vw,1.8rem)] uppercase font-semibold tracking-tighter text-[var(--text-primary)] shrink-0">
                  {/* ↗ arrow */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--text-primary)] shrink-0 w-[1.6em] h-[1.6em]"
                  >
                    <path d="M7 17 L17 7" />
                    <path d="M7 7 h10 v10" />
                  </svg>
                  <div className="flex flex-col leading-[0.85]">
                    <span>00.827782</span>
                    <span>77.615538</span>
                  </div>
                  {/* ↘ arrow */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--text-primary)] shrink-0 w-[1.6em] h-[1.6em]"
                  >
                    <path d="M7 7 L17 17" />
                    <path d="M17 7 v10 h-10" />
                  </svg>
                </div>

                <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap shrink-0">
                  {contactInfo.country}
                </span>
              </div>

              {/* Row 3: Phone, Grid */}
              <div className="flex items-center justify-end w-full py-[clamp(0.1rem,0.3vw,0.4rem)] gap-2 md:gap-3">
                <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] leading-[0.85] capitalize tracking-tighter shrink-0">
                  {dict?.footer?.phone || "Phone"}
                </span>

                {/* Phone Grid */}
                <div className="flex w-fit border-[2px] border-[var(--border)] min-w-0 shrink-0">
                  {/* Left Column — narrower */}
                  <div className="flex items-center justify-center text-center font-display text-[clamp(0.9rem,1.3vw,1.7rem)] leading-none tracking-tighter font-medium text-[var(--text-primary)] py-0 md:py-0.5 px-2 md:px-3 whitespace-nowrap">
                    <span className="font-bold">+57</span>{" "}
                    <span className="ml-1">
                      {contactInfo.phone.split(" ")[0]}
                    </span>
                  </div>

                  {/* Informal Vertical Divider */}
                  <div className="w-[2px] bg-[var(--border)] my-0.5 md:my-1 shrink-0 rounded-full"></div>

                  {/* Right Column */}
                  <div className="flex flex-col w-fit">
                    <div className="w-full flex items-center justify-center text-center font-display text-[clamp(0.9rem,1.3vw,1.7rem)] leading-none tracking-tighter font-medium text-[var(--text-primary)] py-0 md:py-0.5 px-2 md:px-3">
                      {contactInfo.phone.split(" ")[1]}
                    </div>

                    {/* Informal Horizontal Divider */}
                    <div className="h-[2px] bg-[var(--border)] mx-0.5 md:mx-1 shrink-0 rounded-full my-[1px]"></div>

                    <div className="w-full flex items-center justify-center text-center font-display text-[clamp(0.9rem,1.3vw,1.7rem)] leading-none tracking-tighter font-medium text-[var(--text-primary)] py-0 md:py-0.5 px-2 md:px-3">
                      {contactInfo.phone.split(" ")[2]}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-center shrink-0 ml-4 md:ml-6"
                >
                  <span className="font-display font-light text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] leading-[0.85] tracking-tighter group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300 py-1 lowercase">
                    {contactInfo.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
