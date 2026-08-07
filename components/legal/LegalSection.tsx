"use client";

import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface LegalDoc {
  title: string;
  intro: string;
  updated: string;
  sections: ReadonlyArray<{ heading: string; body: string }>;
}

interface LegalSectionProps {
  doc: LegalDoc;
  /** ISO date the document last changed. Rendered, not computed, so it
   *  reflects when the text was actually revised rather than build time. */
  updatedOn: string;
  locale: string;
}

const EMAIL = "info@buildroot.co";

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const revealTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Shared layout for the privacy and cookie pages. They're plain documents,
 * so they get the site's opening (eyebrow + statement) and then straight
 * prose on rules — no marquees or scroll tricks, which would read as
 * showmanship on a page someone opens to check a fact.
 */
export function LegalSection({ doc, updatedOn, locale }: LegalSectionProps) {
  const formatted = new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(updatedOn));

  return (
    <section className="w-full bg-[var(--bg-primary)] px-6 py-24 text-[var(--text-primary)] md:px-12 md:py-32">
      <m.div
        initial="hidden"
        animate="visible"
        variants={revealUp}
        transition={revealTransition}
        className="flex flex-col gap-4 lg:grid lg:grid-cols-[46%_1fr] lg:items-start lg:gap-8"
      >
        <h1 className="type-eyebrow lg:col-start-1">{doc.title}</h1>
        <p className="type-statement max-w-2xl lg:col-start-2">{doc.intro}</p>
      </m.div>

      <p className="mt-10 font-mono text-xs uppercase tracking-widest opacity-60">
        {doc.updated}: {formatted}
      </p>

      <div className="mt-16 flex flex-col border-t border-[var(--border)] md:mt-20">
        {doc.sections.map((section) => (
          <m.article
            key={section.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            transition={revealTransition}
            className="border-b border-[var(--border)] py-10 lg:grid lg:grid-cols-[46%_1fr] lg:gap-8"
          >
            <h2 className="font-display text-xl md:text-2xl lg:col-start-1">
              {section.heading}
            </h2>
            <p className="type-body mt-4 max-w-3xl opacity-90 lg:col-start-2 lg:mt-0">
              {section.body}
            </p>
          </m.article>
        ))}
      </div>

      <a
        href={`mailto:${EMAIL}`}
        className="group mt-14 inline-flex items-center gap-3 font-display text-2xl md:text-3xl"
      >
        {EMAIL}
        <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  );
}
