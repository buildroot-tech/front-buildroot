"use client";

import Link from "next/link";
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
  address: "Av Panamericana",
  city: "Ipiales, Nariño",
  phone: "+57 310 0000000",
  email: "hello@buildroot.tech",
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

  return (
    <footer
      id="footer"
      className="bg-[var(--bg-primary)]"
      aria-label="Site footer"
    >
      <div className="flex flex-col">

        {/* ── UPPER HALF ── */}
        <div className="px-4 md:px-12 py-6 md:py-8">
          <div className="w-[95%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

              {/* Navigation & Legal (2 columns inside Pages) */}
              <div className="flex flex-col">
                <div className="border-b-2 border-[var(--border)] w-full pb-2 mb-3">
                  <p className="font-mono text-[clamp(1.35rem,1.6vw,1.8rem)] capitalize tracking-tight text-[var(--text-primary)]">
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
                            "font-mono text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight",
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
                            "font-mono text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight text-[var(--text-primary)]"
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
                  <p className="font-mono text-[clamp(1.35rem,1.6vw,1.8rem)] capitalize tracking-tight text-[var(--text-primary)]">
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
                          "font-mono text-[clamp(1.35rem,1.6vw,1.8rem)] tracking-tight",
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
        <div className="pt-12 md:pt-8 pb-4 md:pb-6 relative w-full overflow-hidden">
          {/* Main Info Box */}
          <div className="mx-auto w-[95%] max-w-6xl md:ml-auto md:mr-8 xl:mr-[5%] bg-[var(--bg-primary)]">
            <div className="flex flex-col gap-2">
              
              {/* Row 1: Location */}
              <div className="flex flex-col xl:flex-row items-center justify-between px-2 py-1 gap-4 xl:gap-0">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full xl:w-auto">
                  <span className="headline text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                    {contactInfo.address}
                  </span>
                  <div className="flex flex-col font-mono text-[clamp(1rem,1.5vw,1.5rem)] uppercase font-bold leading-[0.8] tracking-tighter scale-y-[1.8] origin-left">
                    <span>0°49'39"N</span>
                    <span>77°38'24"W</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
                  <span className="headline text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap">
                    {contactInfo.city}
                  </span>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-primary)] shrink-0">
                    <path d="M3 20h18L15 8l-3 4-2-2-6 10z"/>
                    <path d="M12 3v3" />
                    <path d="M10 5l-1.5-1.5" />
                    <path d="M14 5l1.5-1.5" />
                  </svg>
                </div>
              </div>

              {/* Row 2: Phone */}
              <div className="flex flex-col md:flex-row h-auto px-2 py-1 items-center">
                <div className="flex-1 flex items-center justify-center md:justify-start overflow-hidden">
                  <span className="headline text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] capitalize tracking-tighter">
                    Teléfono
                  </span>
                </div>
                <div className="flex-1 flex flex-col w-full border-2 border-[var(--border)] divide-y-2 divide-[var(--border)]">
                  <div className="flex items-center justify-center font-mono text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter font-bold bg-[var(--text-primary)] text-[var(--bg-primary)] py-1">
                    {contactInfo.phone.split(" ")[0]}
                  </div>
                  <div className="flex divide-x-2 divide-[var(--border)]">
                    <div className="flex-1 flex items-center justify-center font-mono text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter font-bold bg-[var(--bg-primary)] text-[var(--text-primary)] py-1">
                      {contactInfo.phone.split(" ")[1]}
                    </div>
                    <div className="flex-1 flex items-center justify-center font-mono text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter font-bold bg-[var(--bg-primary)] text-[var(--text-primary)] py-1">
                      {contactInfo.phone.split(" ")[2]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Email */}
              <div className="group flex items-center justify-center overflow-hidden py-1 px-2 bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] transition-colors duration-300">
                <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-between w-full">
                  <span className="headline text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter group-hover:text-[var(--bg-primary)] transition-colors duration-300 lowercase">
                    {contactInfo.email.split("@")[0]}
                  </span>
                  <span className="font-mono text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] text-[var(--accent)] font-bold mx-[-1vw] z-10 scale-125 md:scale-100 group-hover:scale-110 transition-transform duration-300">
                    @
                  </span>
                  <span className="headline text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter group-hover:text-[var(--bg-primary)] transition-colors duration-300 lowercase">
                    {contactInfo.email.split("@")[1]}
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
