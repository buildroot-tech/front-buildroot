"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/TextScrambler";

const navLinks = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "lets talk" },
];

const socialLinks = [
  { href: "https://instagram.com/buildroot", label: "instagram" },
  { href: "https://twitter.com/buildroot_dev", label: "twitter" },
  { href: "https://linkedin.com/company/buildroot", label: "linkedin" },
];

const legalLinks = [
  { href: "/privacy", label: "privacidad" },
  { href: "/cookies", label: "cookies" },
  { href: "/newsletter", label: "newsletter" },
];

const contactInfo = {
  address: "Cl.7 Este",
  city: "Ipiales",
  country: ", Colombia",
  zip: "524060",
  phone: "310 425 2781",
  email: "hello@buildroot.tech",
};

const routeColors: Record<string, { bg: string; text: string; border: string }> = {
  "/": { bg: "var(--bg-primary)", text: "var(--text-primary)", border: "var(--border)" },
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

export function Footer(): React.ReactElement {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const config = routeColors[pathname] || routeColors["/"];
  const isHome = pathname === "/";

  return (
    <footer
      id="footer"
      className="bg-[var(--bg-primary)] transition-colors duration-300"
      aria-label="Site footer"
      style={isHome ? undefined : {
        "--bg-primary": config.bg,
        "--text-primary": config.text,
        "--border": config.border,
      } as React.CSSProperties}
    >
      <div className="flex flex-col">

        {/* ── UPPER HALF ── */}
        <div className="px-4 md:px-12 py-6 md:py-8">
          <div className="w-[95%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

              {/* Navigation & Legal (2 columns inside Pages) */}
              <div className="flex flex-col">
                <div className="border-b-2 border-[var(--border)] w-full pb-2 mb-3">
                  <p className="font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] capitalize tracking-tight text-[var(--text-primary)]">
                    Menu
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {/* Sub-column 1: Nav */}
                  <nav className="flex flex-col gap-0" aria-label="Footer navigation">
                    {navLinks.map((link, i) => (
                      <motion.div
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
                            "text-[var(--text-primary)]"
                          )}
                          style={{ minWidth: `${link.label.length}ch` }}
                        >
                          <ScrambleText text={link.label} speed={55} />
                          <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Sub-column 2: Legal & Extras */}
                  <nav className="flex flex-col gap-0" aria-label="Legal navigation">
                    {legalLinks.map((link, i) => (
                      <motion.div
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
                            "font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight text-[var(--text-primary)]"
                          )}
                          style={{ minWidth: `${link.label.length}ch` }}
                        >
                          <ScrambleText text={link.label} speed={55} />
                          <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Social */}
              <div className="flex flex-col">
                <div className="border-b-2 border-[var(--border)] w-full pb-2 mb-3">
                  <p className="font-mono font-medium text-[clamp(1.35rem,1.6vw,1.8rem)] capitalize tracking-tight text-[var(--text-primary)]">
                    Elsewhere
                  </p>
                </div>
                <div className="flex flex-col gap-0">
                  {socialLinks.map((link, i) => (
                    <motion.div
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
                          "text-[var(--text-primary)]"
                        )}
                        style={{ minWidth: `${link.label.length}ch` }}
                        aria-label={`Visita buildroot en ${link.label}`}
                      >
                        <ScrambleText text={link.label} speed={55} />
                        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-current opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── LOWER HALF (Contact Info) ── */}
        <div className="pt-12 md:pt-8 pb-4 md:pb-6 w-full overflow-hidden flex items-end justify-between pl-4 md:pl-12">
          
          {/* Bottom Left: Copyright/Year */}
          <div className="font-mono text-[clamp(1.2rem,1.6vw,1.8rem)] font-medium tracking-tight text-[var(--text-primary)] pointer-events-none mb-[clamp(0.1rem,0.3vw,0.4rem)] flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M14.83 14.83a4 4 0 1 1 0-5.66"></path>
            </svg>
            <span>{year}</span>
          </div>

          {/* Main Info Box */}
          <div className="w-fit bg-[var(--bg-primary)] pr-2 xl:pr-[2%] shrink-0">
            <div className="flex flex-col gap-0">
              
              {/* Row 1: Location */}
              <div className="flex items-end justify-start w-full px-2 py-[clamp(0.1rem,0.3vw,0.4rem)] gap-2 md:gap-4">
                <span className="font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                  {contactInfo.address}
                </span>
                
                <div className="flex items-center gap-1 md:gap-2 font-display text-[clamp(1.1rem,1.8vw,1.8rem)] uppercase font-normal tracking-tighter text-[var(--text-primary)]">
                  {/* ↗ arrow */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)] shrink-0 w-[1.6em] h-[1.6em]">
                    <path d="M7 17 L17 7" />
                    <path d="M7 7 h10 v10" />
                  </svg>
                  <div className="flex flex-col leading-[0.85]">
                    <span>00.827782</span>
                    <span>77.615538</span>
                  </div>
                  {/* ↘ arrow */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)] shrink-0 w-[1.6em] h-[1.6em]">
                    <path d="M7 7 L17 17" />
                    <path d="M17 7 v10 h-10" />
                  </svg>
                </div>

                <span className="font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                  {contactInfo.zip}
                </span>
              </div>

              {/* Rows 2, 3 & 4: shared w-fit so all rows align as a rectangle */}
              <div className="w-fit flex flex-col gap-0">

                {/* Row 2: City */}
                <div className="flex items-end justify-start gap-1 md:gap-2 w-full px-2 py-[clamp(0.1rem,0.3vw,0.4rem)]">
                  <span className="font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                    {contactInfo.city}
                  </span>
                  
                  <div className="flex items-end gap-1 md:gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-primary)] shrink-0 w-[clamp(2.5rem,4.5vw,6rem)] h-[clamp(2.5rem,4.5vw,6rem)]">
                      <path d="M3 20h18L15 8l-3 4-2-2-6 10z"/>
                      <path d="M12 3v3" />
                      <path d="M10 5l-1.5-1.5" />
                      <path d="M14 5l1.5-1.5" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)] shrink-0 w-[clamp(2.5rem,4.5vw,6rem)] h-[clamp(2.5rem,4.5vw,6rem)] ml-[-1vw]">
                      <path d="M20 17C20 13 17 10 15 10C15 7 13 7 13 10C9 10 4 13 4 17V20H18C20 20 20 18 20 17Z" />
                      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0 w-[clamp(2.5rem,4.5vw,6rem)] h-[clamp(2.5rem,4.5vw,6rem)] ml-[-1vw]">
                      <path d="M17.5 20H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                    </svg>
                  </div>

                  <span className="font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                    {contactInfo.country}
                  </span>
                </div>

                {/* Row 3: Telephone and Grid */}
                <div className="flex items-center justify-start w-full px-2 py-[clamp(0.1rem,0.3vw,0.4rem)] gap-2 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <span className="font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] leading-[0.85] capitalize tracking-tighter">
                      Telephone
                    </span>
                    <span className="font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] leading-[0.85] tracking-tighter">
                      +57
                    </span>
                  </div>

                  {/* Phone Grid */}
                  <div className="flex-1 flex border-[4px] border-[var(--border)] min-w-0">
                    {/* Left Column — narrower */}
                    <div className="flex-[0.6] flex items-center justify-center font-display text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-normal text-[var(--text-primary)] py-1 md:py-2 px-2 md:px-4">
                      {contactInfo.phone.split(" ")[0]}
                    </div>
                    
                    {/* Informal Vertical Divider */}
                    <div className="w-[4px] bg-[var(--border)] my-1 md:my-2 shrink-0 rounded-full"></div>
                    
                    {/* Right Column */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1 flex items-center justify-center font-display text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-normal text-[var(--text-primary)] py-1 md:py-2 px-2 md:px-4">
                        {contactInfo.phone.split(" ")[1]}
                      </div>
                      
                      {/* Informal Horizontal Divider */}
                      <div className="h-[4px] bg-[var(--border)] mx-1 md:mx-2 shrink-0 rounded-full"></div>
                      
                      <div className="flex-1 flex items-center justify-center font-display text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-normal text-[var(--text-primary)] py-1 md:py-2 px-2 md:px-4">
                        {contactInfo.phone.split(" ")[2]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Email — inside w-fit so it matches Row 2/3 width */}
                <div className="group flex items-center w-full px-2 py-[clamp(0.1rem,0.3vw,0.4rem)] bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] transition-colors duration-300">
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center w-full gap-0">
                    <span className="shrink-0 font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] leading-[0.85] tracking-tighter group-hover:text-[var(--bg-primary)] transition-colors duration-300 lowercase">
                      {contactInfo.email.split("@")[0]}
                    </span>
                    {/* Rounded-rect horseshoe: starts bottom-left, wraps around, arrow at center-bottom pointing ← */}
                    <svg
                      className="flex-1 text-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300"
                      style={{ height: "clamp(2.2rem,3.8vw,5rem)" }}
                      viewBox="0 0 200 100"
                      preserveAspectRatio="none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {/* 3 sides of rounded rect: bottom-left → up → top → down → center-bottom */}
                      <path d="M 20 85 A 12 12 0 0 1 8 73 L 8 27 A 12 12 0 0 1 20 15 L 180 15 A 12 12 0 0 1 192 27 L 192 73 A 12 12 0 0 1 180 85 L 112 85" />
                      {/* Arrowhead pointing ← at center-bottom */}
                      <path d="M 120 77 L 112 85 L 120 93" />
                    </svg>
                    <span className="shrink-0 font-display font-normal text-[var(--text-primary)] text-[clamp(2.2rem,3.8vw,5rem)] leading-[0.85] tracking-tighter group-hover:text-[var(--bg-primary)] transition-colors duration-300 lowercase">
                      {contactInfo.email.split("@")[1]}
                    </span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
