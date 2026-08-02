"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
  Code2,
  Target,
  Rocket,
  Check,
  ArrowUpRight,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { ScrambleText } from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface ServicesSectionProps {
  dict?: Dictionary["services"];
}

const SERVICE_KEYS = ["web", "consulting", "saas"] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  web: Code2,
  consulting: Target,
  saas: Rocket,
};

const FALLBACK_SERVICES: Record<
  ServiceKey,
  { title: string; description: string; points: readonly string[] }
> = {
  web: {
    title: "Web Development",
    description:
      "Full-stack web applications built on Next.js, React, and TypeScript. From a landing page that converts to a dashboard that handles real traffic — shipped fast, built to last.",
    points: [
      "Marketing sites & product landing pages",
      "Web apps & internal tools",
      "API design & integrations",
      "Performance & Core Web Vitals",
    ],
  },
  consulting: {
    title: "Technical Consulting",
    description:
      "Architecture reviews, migrations, audits. We read your codebase, tell you what's actually wrong, and help you fix it — not what's trendy or safest for our invoice.",
    points: [
      "Architecture & system design reviews",
      "Legacy migrations — framework, cloud, database",
      "Codebase & security audits",
      "CTO-as-a-service for early teams",
    ],
  },
  saas: {
    title: "SaaS Products",
    description:
      "We design, build, and ship SaaS products end to end — auth, billing, dashboards, infrastructure — so you can focus on customers instead of plumbing.",
    points: [
      "MVP to production in weeks, not quarters",
      "Auth, billing & multi-tenant architecture",
      "Cloud infrastructure & CI/CD",
      "Ongoing iteration after launch",
    ],
  },
};

const ENGAGE_KEYS = ["project", "retainer", "audit"] as const;
type EngageKey = (typeof ENGAGE_KEYS)[number];

const FALLBACK_ENGAGE: Record<EngageKey, { title: string; description: string }> = {
  project: {
    title: "Project-Based",
    description:
      "Fixed scope, fixed price. You know exactly what you're getting before we write a line of code.",
  },
  retainer: {
    title: "Retainer",
    description:
      "Ongoing partnership for teams that ship continuously. We plug into your sprint, not the other way around.",
  },
  audit: {
    title: "Audit & Advise",
    description:
      "A one-time deep dive into your codebase or architecture. A clear report, not a sales pitch.",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <>
      {/* Header */}
      <section className="w-full px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-lg md:text-xl capitalize tracking-tight text-white/60">
            {dict?.badge || "What We Do"}
          </h2>
          <h1 className="headline text-h1 mt-4 text-white tracking-tight">
            <ScrambleText
              text={dict?.title || "Services"}
              speed={55}
              trigger="mount"
            />
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg leading-relaxed text-white/80 font-sans">
            {dict?.subtitle ||
              "Three ways we work with you: we build your product, we fix what's broken, or we ship the whole thing end to end. No agencies of agencies, no account managers — you talk to the people writing the code."}
          </p>
        </m.div>
      </section>

      {/* Service Cards */}
      <section className="w-full px-6 pb-16 md:px-12 md:pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = SERVICE_ICONS[key];
            const item = dict?.items?.[key] || FALLBACK_SERVICES[key];

            return (
              <m.div
                key={key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="brutalist-card p-6 md:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-primary)]">
                  <Icon
                    className="h-5 w-5 text-[var(--accent)]"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="heading text-h3 text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t-2 border-[var(--border-muted)] pt-5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 font-mono text-xs text-[var(--text-primary)]"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            );
          })}
        </div>
      </section>

      {/* Engagement models */}
      <section className="w-full border-t border-white/15 px-6 py-16 md:px-12 md:py-24">
        <m.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-lg md:text-xl capitalize tracking-tight text-white/60"
        >
          {dict?.engage?.title || "How We Engage"}
        </m.h2>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {ENGAGE_KEYS.map((key, i) => {
            const model = dict?.engage?.models?.[key] || FALLBACK_ENGAGE[key];

            return (
              <m.div
                key={key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="border-t border-white/20 pt-5 md:border-t-0 md:pt-0"
              >
                <span className="font-mono text-xs text-white/40">
                  0{i + 1}
                </span>
                <h3 className="heading text-h3 mt-2 text-white">
                  {model.title}
                </h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-white/70">
                  {model.description}
                </p>
              </m.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t border-white/15 px-6 py-16 md:px-12 md:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="headline text-h2 text-white tracking-tight">
              {dict?.cta?.title || "Have a project in mind?"}
            </h3>
            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/70">
              {dict?.cta?.subtitle ||
                "Tell us what you're building. We'll tell you honestly whether we're the right fit — and if we are, how fast we can start."}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 shrink-0">
            <Link
              href="/#cta"
              className="brutalist-button text-xs font-bold tracking-wider py-4 px-8"
            >
              <span>{dict?.cta?.button || "Start a Project"} →</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href="mailto:hello@buildroot.dev"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{dict?.cta?.email_label || "or email us directly"}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
