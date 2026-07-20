"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/buildroot-tech", label: "gh/buildroot-tech" },
  { href: "https://twitter.com/buildroot_dev", label: "tw/buildroot_dev" },
  { href: "https://linkedin.com/company/buildroot", label: "li/buildroot" },
];

const contactInfo = {
  address: "Calle Principal 42",
  city: "Bogotá, Colombia",
  phone: "+57 300 000 0000",
  email: "hello@buildroot.dev",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Footer(): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t-2 border-[var(--border)] bg-[var(--bg-primary)]"
      style={{ minHeight: "80vh" }}
      aria-label="Site footer"
    >
      <div className="flex flex-col h-full" style={{ minHeight: "inherit" }}>

        {/* ── UPPER HALF ── */}
        <div className="flex-1 border-b-2 border-[var(--border)] px-6 md:px-16 py-12 md:py-16">
          <div className="mx-auto max-w-[1400px] h-full flex flex-col justify-between gap-16">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* Navigation */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
                  Pages
                </p>
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
                          "group inline-flex items-center gap-2",
                          "font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold",
                          "leading-tight tracking-tight text-[var(--text-primary)]",
                          "transition-colors duration-150 hover:text-[var(--accent)]"
                        )}
                      >
                        <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Social */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
                  Presencia
                </p>
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
                          "group inline-flex items-center gap-3",
                          "font-mono text-[clamp(1rem,1.5vw,1.5rem)]",
                          "text-[var(--text-muted)] transition-colors duration-150",
                          "hover:text-[var(--accent)]"
                        )}
                        aria-label={`Visita buildroot en ${link.label}`}
                      >
                        <span
                          className={cn(
                            "block w-6 h-[2px] bg-current transition-all duration-300",
                            "group-hover:w-10"
                          )}
                          aria-hidden="true"
                        />
                        {link.label}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Legal / Cookies */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
                  Legal
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    { href: "/privacy", label: "Política de privacidad" },
                    { href: "/cookies", label: "Cookies" },
                    { href: "/terms", label: "Términos de uso" },
                  ].map((link, i) => (
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
                          "font-mono text-sm text-[var(--text-muted)]",
                          "transition-colors duration-150 hover:text-[var(--text-primary)]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Brand stamp */}
            <div>
              <Link
                href="/"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                buildroot_ — digital ventures
              </Link>
            </div>
          </div>
        </div>

        {/* ── LOWER HALF — Contact Info Box ── */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "border-2 border-[var(--border)]",
              "bg-[var(--bg-secondary)]",
              "p-10 md:p-16",
              "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0"
            )}
            style={{ width: "80%", minHeight: "50vh" }}
            aria-label="Información de contacto"
          >
            {/* Address + City */}
            <div className="flex flex-col justify-between gap-8 md:border-r-2 md:border-[var(--border)] md:pr-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                  Dirección
                </p>
                <p
                  className={cn(
                    "headline text-[var(--text-primary)]",
                    "text-[clamp(2rem,4vw,4.5rem)]",
                    "leading-[0.95]"
                  )}
                >
                  {contactInfo.address}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                  Ciudad / País
                </p>
                <p
                  className={cn(
                    "headline text-[var(--text-primary)]",
                    "text-[clamp(2rem,4vw,4.5rem)]",
                    "leading-[0.95]"
                  )}
                >
                  {contactInfo.city}
                </p>
              </div>
            </div>

            {/* Phone + Email */}
            <div className="flex flex-col justify-between gap-8 md:pl-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                  Teléfono
                </p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className={cn(
                    "headline text-[var(--text-primary)]",
                    "text-[clamp(2rem,4vw,4.5rem)]",
                    "leading-[0.95]",
                    "transition-colors duration-150 hover:text-[var(--accent)]",
                    "block"
                  )}
                  aria-label={`Llamar a ${contactInfo.phone}`}
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                  Correo
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className={cn(
                    "headline text-[var(--text-primary)]",
                    "text-[clamp(1.5rem,3vw,3.5rem)]",
                    "leading-[0.95]",
                    "transition-colors duration-150 hover:text-[var(--accent)]",
                    "block break-all"
                  )}
                  aria-label={`Enviar correo a ${contactInfo.email}`}
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* Copyright strip */}
              <p className="font-mono text-[10px] text-[var(--text-muted)] mt-auto pt-8 border-t border-[var(--border-muted)]">
                © {year} buildroot_ — All rights reserved
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
