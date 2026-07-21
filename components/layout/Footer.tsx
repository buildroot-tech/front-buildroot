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
  address: "Cl.7 Este",
  city: "Ipiales",
  country: ", Colombia",
  zip: "524060",
  phone: "+57 310 425 2781",
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
              <div className="flex flex-col xl:flex-row items-baseline justify-between px-2 py-1 gap-2 xl:gap-0">
                <div className="flex flex-col md:flex-row items-baseline gap-1 md:gap-2 w-full xl:w-auto">
                  <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap translate-y-1 md:translate-y-2">
                    {contactInfo.address}
                  </span>
                  
                  <div className="flex items-center gap-1 md:gap-2 headline text-[clamp(1.1rem,1.8vw,1.8rem)] uppercase font-light tracking-tighter text-[var(--text-primary)]">
                    <span className="text-[1.6em] leading-none font-light">↗</span>
                    <div className="flex flex-col leading-[0.85]">
                      <span>00.827782</span>
                      <span>77.615538</span>
                    </div>
                    <span className="text-[1.6em] leading-none font-light">↘</span>
                  </div>

                  <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap translate-y-1 md:translate-y-2">
                    {contactInfo.zip}
                  </span>
                </div>
              </div>

              {/* Row 2: City */}
              <div className="flex px-2 py-1 items-end gap-1 md:gap-2">
                <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap translate-y-1 md:translate-y-2">
                  {contactInfo.city}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-primary)] shrink-0 w-[clamp(2.5rem,4.5vw,6rem)] h-[clamp(2.5rem,4.5vw,6rem)] translate-y-1 md:translate-y-2">
                  <path d="M3 20h18L15 8l-3 4-2-2-6 10z"/>
                  <path d="M12 3v3" />
                  <path d="M10 5l-1.5-1.5" />
                  <path d="M14 5l1.5-1.5" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)] shrink-0 w-[clamp(2.5rem,4.5vw,6rem)] h-[clamp(2.5rem,4.5vw,6rem)] translate-y-1 md:translate-y-2 ml-[-1vw]">
                  {/* Single continuous elegant line for the silhouette and ear */}
                  <path d="M20 17C20 13 17 10 15 10C15 7 13 7 13 10C9 10 4 13 4 17V20H18C20 20 20 18 20 17Z" />
                  {/* Minimalist eye */}
                  <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0 w-[clamp(2.5rem,4.5vw,6rem)] h-[clamp(2.5rem,4.5vw,6rem)] translate-y-1 md:translate-y-2 ml-[-1vw]">
                  <path d="M17.5 20H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
                <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] capitalize leading-[0.85] tracking-tighter whitespace-nowrap translate-y-1 md:translate-y-2">
                  {contactInfo.country}
                </span>
              </div>

              {/* Row 3: Phone */}
              <div className="flex flex-col md:flex-row h-auto px-2 py-1 items-center gap-1 md:gap-2">
                <div className="flex items-center justify-center md:justify-start overflow-hidden shrink-0">
                  <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] capitalize tracking-tighter">
                    Teléfono
                  </span>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 border-2 border-[var(--border)] gap-[2px] bg-[var(--border)]">
                  <div className="flex items-center justify-center headline text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-light bg-[var(--text-primary)] text-[var(--bg-primary)] py-1 md:py-2 px-2 md:px-4">
                    {contactInfo.phone.split(" ")[0]}
                  </div>
                  <div className="flex items-center justify-center headline text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-light bg-[var(--bg-primary)] text-[var(--text-primary)] py-1 md:py-2 px-2 md:px-4">
                    {contactInfo.phone.split(" ")[1]}
                  </div>
                  <div className="flex items-center justify-center headline text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-light bg-[var(--bg-primary)] text-[var(--text-primary)] py-1 md:py-2 px-2 md:px-4">
                    {contactInfo.phone.split(" ")[2]}
                  </div>
                  <div className="flex items-center justify-center headline text-[clamp(1rem,1.5vw,2rem)] leading-[0.85] tracking-tighter font-light bg-[var(--bg-primary)] text-[var(--text-primary)] py-1 md:py-2 px-2 md:px-4">
                    {contactInfo.phone.split(" ")[3]}
                  </div>
                </div>
              </div>

              {/* Row 4: Email */}
              <div className="group flex items-center justify-center overflow-hidden py-1 px-2 bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] transition-colors duration-300">
                <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-between w-full">
                  <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter group-hover:text-[var(--bg-primary)] transition-colors duration-300 lowercase">
                    {contactInfo.email.split("@")[0]}
                  </span>
                  <span className="headline text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] text-[var(--accent)] font-light z-10 group-hover:scale-110 transition-transform duration-300">
                    @
                  </span>
                  <span className="headline font-light text-[var(--text-primary)] text-[clamp(2.5rem,4.5vw,6rem)] leading-[0.85] tracking-tighter group-hover:text-[var(--bg-primary)] transition-colors duration-300 lowercase">
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
