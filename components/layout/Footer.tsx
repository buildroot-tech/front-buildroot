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
      className="border-t-2 border-[var(--border)] bg-[var(--bg-primary)]"
      aria-label="Site footer"
    >
      <div className="flex flex-col">

        {/* ── UPPER HALF ── */}
        <div className="border-b-2 border-[var(--border)] px-6 md:px-16 py-12 md:py-14">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

              {/* Navigation */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
                  Pages
                </p>
                <nav className="flex flex-col gap-0.5" aria-label="Footer navigation">
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
                          "group inline-flex items-center gap-2.5",
                          "font-display text-[clamp(1.4rem,2vw,2rem)] font-bold",
                          "leading-tight tracking-tight text-[var(--text-primary)]",
                          "transition-colors duration-150 hover:text-[var(--accent)]"
                        )}
                      >
                        <span className="font-mono text-[9px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors tabular-nums">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
                  Presencia
                </p>
                <div className="flex flex-col gap-2">
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
                          "font-mono text-[clamp(0.85rem,1.2vw,1.1rem)]",
                          "text-[var(--text-muted)] transition-colors duration-150",
                          "hover:text-[var(--accent)]"
                        )}
                        aria-label={`Visita buildroot en ${link.label}`}
                      >
                        <span
                          className="block h-[1.5px] bg-current transition-all duration-300 w-4 group-hover:w-8"
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
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
                  Legal
                </p>
                <div className="flex flex-col gap-1.5">
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


          </div>
        </div>

        {/* ── LOWER HALF — Contact Info Box ── */}
        <div className="flex justify-end px-4 md:px-6 pb-4 md:pb-6 pt-12 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="border-2 border-[var(--border)] bg-[var(--bg-secondary)] w-[90%] max-w-4xl"
            aria-label="Información de contacto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[var(--border)]">

              {/* Left — Address + City */}
              <div className="flex flex-col gap-0 divide-y-2 divide-[var(--border)]">
                <div className="p-10 md:p-16">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Dirección
                  </p>
                  <p className="headline text-[var(--text-primary)] text-[clamp(1.75rem,3vw,3.5rem)] leading-[0.95]">
                    {contactInfo.address}
                  </p>
                </div>
                <div className="p-10 md:p-16">
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
                <div className="p-10 md:p-16">
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
                <div className="p-10 md:p-16 flex flex-col justify-between gap-10">
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
