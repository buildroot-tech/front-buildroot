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
  address: "Calle Principal 42",
  city: "Bogotá, Colombia",
  phone: "+57 300 000 0000",
  email: "hello@buildroot.dev",
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
          <div className="mx-auto w-[95%] max-w-6xl md:ml-auto md:mr-8 xl:mr-[5%] border-2 border-[var(--border)] bg-[var(--bg-primary)]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[var(--border)]">
              
              {/* Left Column */}
              <div className="flex flex-col gap-0 divide-y-2 divide-[var(--border)]">
                
                {/* Address Box */}
                <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col justify-between relative overflow-hidden group h-full">
                  <div className="flex justify-between items-start mb-8 z-10 relative">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)]">
                      Dirección
                    </p>
                    <div className="font-mono text-[9px] text-[var(--bg-primary)] bg-[var(--text-primary)] border border-[var(--border)] px-3 py-1.5 rounded-full flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      4°35'56"N 74°04'51"W
                    </div>
                  </div>
                  <p className="headline text-[var(--text-primary)] text-[clamp(1.5rem,2.5vw,3rem)] leading-[0.95] z-10 relative">
                    {contactInfo.address}
                  </p>
                  {/* Abstract Grid background */}
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-32 h-32">
                     <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                       <defs>
                         <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                           <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1"/>
                         </pattern>
                       </defs>
                       <rect width="100" height="100" fill="url(#grid)" />
                     </svg>
                  </div>
                </div>

                {/* City Box with Volcano */}
                <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col justify-between relative overflow-hidden group h-full">
                  <div className="flex justify-between items-start mb-8 z-10 relative">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)]">
                      Locación
                    </p>
                    <div className="p-2 border-2 border-[var(--border)] rounded-sm bg-transparent group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M3 20h18L15 8l-3 4-2-2-6 10z"/>
                        <path d="M12 3v3" className="animate-pulse" />
                        <path d="M10 5l-1.5-1.5" />
                        <path d="M14 5l1.5-1.5" />
                      </svg>
                    </div>
                  </div>
                  <p className="headline text-[var(--text-primary)] text-[clamp(1.5rem,2.5vw,3rem)] leading-[0.95] z-10 relative">
                    {contactInfo.city}
                  </p>
                </div>

              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-0 divide-y-2 divide-[var(--border)]">
                
                {/* Phone Box */}
                <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col justify-between h-full">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)] mb-8">
                    Teléfono
                  </p>
                  <div className="grid grid-cols-3 border-2 border-[var(--border)] divide-x-2 divide-[var(--border)] text-center h-20 md:h-24">
                    <div className="flex items-center justify-center font-mono text-[clamp(1rem,2vw,1.5rem)] font-bold bg-[var(--text-primary)] text-[var(--bg-primary)]">
                      {contactInfo.phone.split(" ")[0]}
                    </div>
                    <div className="flex items-center justify-center font-mono text-[clamp(1rem,2vw,1.5rem)] font-bold bg-transparent">
                      {contactInfo.phone.split(" ")[1]}
                    </div>
                    <div className="flex items-center justify-center font-mono text-[clamp(1rem,1.5vw,1.5rem)] font-bold bg-transparent px-2">
                      {contactInfo.phone.split(" ").slice(2).join("")}
                    </div>
                  </div>
                </div>

                {/* Email & System Status */}
                <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col justify-between h-full">
                  <div className="mb-8">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)] mb-4">
                      Correo
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="inline-block font-mono text-[clamp(1.2rem,2vw,2.5rem)] text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] break-all border-b-2 border-transparent hover:border-[var(--text-primary)] py-1 px-2 -ml-2"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end border-t-2 border-[var(--border)] pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)]">
                        SYS_ONLINE
                      </p>
                    </div>
                    <p className="font-mono text-[9px] text-[var(--text-primary)]">
                      © {year} buildroot_
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
