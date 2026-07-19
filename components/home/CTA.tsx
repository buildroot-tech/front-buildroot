"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section className="section-generous bg-[var(--bg-primary)]">
      <div className="container-padded">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Get In Touch
          </p>
          <h2 className="headline text-h1 mt-6">
            Let&apos;s build something{" "}
            <span className="text-[var(--accent)]">together</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text-muted)]">
            Have a project in mind? We&apos;d love to hear about it. Send us a
            message and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:hello@buildroot.dev"
              className="brutalist-button brutalist-button-accent text-sm"
            >
              hello@buildroot.dev →
            </Link>
            <Link
              href="/process"
              className="brutalist-button text-sm"
            >
              See How We Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
