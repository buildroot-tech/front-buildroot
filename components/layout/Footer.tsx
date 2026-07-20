"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

const socialLinks = [
  { href: "https://github.com/buildroot-tech", label: "gh/buildroot-tech" },
  { href: "https://twitter.com/buildroot_dev", label: "tw/buildroot_dev" },
  { href: "https://linkedin.com/company/buildroot", label: "li/buildroot" },
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
                <div className="border-b-2 border-[var(--border)] w-full pb-4 mb-5">
                  <p className="font-mono text-[clamp(1.25rem,1.5vw,1.6rem)] capitalize tracking-tight text-[var(--text-muted)]">
                    Menu
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {/* Sub-column 1: Nav */}
                  <nav className="flex flex-col gap-1" aria-label="Footer navigation">
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
                            "group inline-flex items-center gap-2 leading-none",
                            "font-mono text-[clamp(1.25rem,1.5vw,1.6rem)] tracking-tight",
                            "text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--accent)]"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Sub-column 2: Legal & Extras */}
                  <nav className="flex flex-col gap-1" aria-label="Legal navigation">
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
                            "group inline-flex items-center gap-2 leading-none",
                            "font-mono text-[clamp(1.25rem,1.5vw,1.6rem)] tracking-tight text-[var(--text-muted)]",
                            "transition-colors duration-150 hover:text-[var(--text-primary)]"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Social */}
              <div className="flex flex-col">
                <div className="border-b-2 border-[var(--border)] w-full pb-4 mb-5">
                  <p className="font-mono text-[clamp(1.25rem,1.5vw,1.6rem)] capitalize tracking-tight text-[var(--text-muted)]">
                    Presencia
                  </p>
                </div>
                <div className="flex flex-col gap-1">
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
                          "group inline-flex items-center gap-2 leading-none",
                          "font-mono text-[clamp(1.25rem,1.5vw,1.6rem)] tracking-tight",
                          "text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--accent)]"
                        )}
                        aria-label={`Visita buildroot en ${link.label}`}
                      >
                        <span
                          className="block h-[2px] bg-current transition-all duration-300 w-6 group-hover:w-12"
                          aria-hidden="true"
                        />
                        {link.label}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── LOWER HALF — Contact Info Box ── */}
        <div className="flex justify-end px-4 md:px-6 pb-4 md:pb-6 pt-12 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="border-2 border-[var(--border)] bg-[var(--bg-secondary)] w-[95%] max-w-6xl"
            aria-label="Información de contacto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[var(--border)]">

              {/* Left — Address + City */}
              <div className="flex flex-col gap-0 divide-y-2 divide-[var(--border)]">
                <div className="px-8 py-10 md:px-12 md:py-14">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Dirección
                  </p>
                  <p className="headline text-[var(--text-primary)] text-[clamp(1.75rem,3vw,3.5rem)] leading-[0.95]">
                    {contactInfo.address}
                  </p>
                </div>
                <div className="px-8 py-10 md:px-12 md:py-14">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Ciudad / País
                  </p>
                  <p className="headline text-[var(--text-primary)] text-[clamp(1.75rem,3vw,3.5rem)] leading-[0.95]">
                    {contactInfo.city}
                  </p>
                </div>
              </div>

              {/* Right — Phone + Email */}
              <div className="flex flex-col gap-0 divide-y-2 divide-[var(--border)]">
                <div className="px-8 py-10 md:px-12 md:py-14">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Teléfono
                  </p>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="headline text-[var(--text-primary)] text-[clamp(1.75rem,3vw,3.5rem)] leading-[0.95] transition-colors duration-150 hover:text-[var(--accent)] block"
                    aria-label={`Llamar a ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="px-8 py-10 md:px-12 md:py-14 flex flex-col justify-between gap-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                      Correo
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="headline text-[var(--text-primary)] text-[clamp(1.25rem,2.2vw,2.75rem)] leading-[0.95] transition-colors duration-150 hover:text-[var(--accent)] block break-all"
                      aria-label={`Enviar correo a ${contactInfo.email}`}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                  <p className="font-mono text-[9px] text-[var(--text-muted)]">
                    © {year} buildroot_ — All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
