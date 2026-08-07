"use client";

import { useRef } from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrambleText, type ScrambleTextHandle } from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface ContactSectionProps {
  dict?: Dictionary["contact"];
}

// The one canonical inbox — matches Footer.tsx's contactInfo.email and the
// mailto links added across /work, /services and /about this session.
const EMAIL = "info@buildroot.co";

export function ContactSection({ dict }: ContactSectionProps) {
  // Imperative scramble ref — same idiom as the work page's link rows: the
  // hover area is the whole <a>, not just the inner text span.
  const emailRef = useRef<ScrambleTextHandle>(null);

  return (
    <section
      id="contact"
      className="relative w-full bg-[var(--bg-primary)] py-24 md:py-32"
    >
      <div className="w-full px-6 md:px-12">
        {/* Header — the site-wide opening: eyebrow in the left 46% column,
            statement opposite it. Same shape as /work and /about. */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 lg:grid lg:grid-cols-[46%_1fr] lg:items-start lg:gap-8"
        >
          <h1 className="type-eyebrow text-[var(--text-primary)] lg:col-start-1">
            <ScrambleText text={dict?.title || "Contact"} speed={55} trigger="manual" />
          </h1>

          <p className="type-statement max-w-2xl text-[var(--text-primary)] lg:col-start-2">
            {dict?.subtitle ||
              "Have a project in mind? Tell us about it — we read every message ourselves."}
          </p>
        </m.div>

        {/* Manifesto line — the giant, ultra-light serif treatment reserved
            for section-closing statements elsewhere on the site (see
            home/CTA.tsx and work/ProjectsGrid.tsx's closing CTA). */}
        <m.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="type-manifesto mt-16 max-w-5xl text-[var(--text-primary)] md:mt-24"
        >
          {dict?.message ||
            "No middlemen, no account managers. Tell us what you're building and we'll reply ourselves, usually within a day."}
        </m.p>

        {/* Prominent mailto link row — plain text on a border, no fill,
            matching the Case Study / Visit Site / Start a Build pattern
            used across /work. ArrowUpRight because this leaves the site
            (mailto), not ArrowRight. */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 md:mt-20 flex max-w-3xl flex-col font-display text-3xl sm:text-4xl md:text-5xl"
        >
          <a
            href={`mailto:${EMAIL}`}
            onMouseEnter={() => emailRef.current?.scramble()}
            onMouseLeave={() => emailRef.current?.reset()}
            className="group flex items-center justify-between border-t border-b border-[var(--text-primary)] py-6 text-[var(--text-primary)]"
          >
            <ScrambleText
              ref={emailRef}
              text={dict?.email_button || EMAIL}
              trigger="manual"
              speed={40}
            />
            <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-10 md:w-10" />
          </a>
        </m.div>

        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]/60">
          {dict?.response_note ||
            "We read every message ourselves — usually a reply within a day."}
        </p>
      </div>
    </section>
  );
}
