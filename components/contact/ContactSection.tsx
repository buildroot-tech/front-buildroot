"use client";

import { useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ScrambleText,
  type ScrambleTextHandle,
} from "@/components/ui/TextScrambler";
import type { Dictionary } from "@/lib/dictionaries";

interface ContactSectionProps {
  dict?: Dictionary["contact"];
}

// The one canonical inbox — matches Footer.tsx's contactInfo.email and the
// mailto links across /work, /services and /about.
const EMAIL = "info@buildroot.co";

const NEED_KEYS = ["web", "product", "consulting", "unsure"] as const;
const TIMING_KEYS = ["now", "soon", "year", "exploring"] as const;

type NeedKey = (typeof NEED_KEYS)[number];
type TimingKey = (typeof TIMING_KEYS)[number];

const FALLBACK = {
  hint: "Fill in the blanks. Sending opens your email with everything ready.",
  greeting: "Hi, I'm",
  namePlaceholder: "your name",
  from: "from",
  companyPlaceholder: "your company",
  need: "I need",
  start: "and I'd like to start",
  extra: "Anything else we should know:",
  extraPlaceholder: "tell us briefly",
  needs: {
    web: "a website",
    product: "a digital product",
    consulting: "technical advice",
    unsure: "something I'm still working out",
  } as Record<NeedKey, string>,
  timings: {
    now: "as soon as possible",
    soon: "in one to three months",
    year: "this year",
    exploring: "no date yet, just exploring",
  } as Record<TimingKey, string>,
  send: "Send message",
  subject: "New project",
};

/**
 * A blank inside the sentence. It's a real <input> sized to its own
 * content, so the sentence reflows around it as you type rather than
 * reserving a fixed gap — the line has to keep reading as a sentence,
 * not as a form.
 */
function Blank({
  value,
  onChange,
  placeholder,
  label,
  tightRight = false,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  label: string;
  tightRight?: boolean;
}) {
  // `size` counts characters, so tying it to the current text keeps the
  // underline exactly as wide as what's written.
  const width = Math.max((value || placeholder).length, 4);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={label}
      size={width}
      className={`ml-[0.25em] inline-block max-w-full border-b-2 border-current bg-transparent text-center italic outline-none transition-colors placeholder:opacity-40 focus:border-[var(--accent)] ${tightRight ? "mr-0" : "mr-[0.25em]"}`}
    />
  );
}

/**
 * A blank that cycles through a fixed set of answers on click. It's a
 * button so it stays keyboard-reachable and announces itself, but reads as
 * part of the running sentence.
 */
function Choice({
  options,
  index,
  onCycle,
  label,
  tightRight = false,
}: {
  options: readonly string[];
  index: number;
  onCycle: () => void;
  label: string;
  tightRight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onCycle}
      aria-label={label}
      className={`ml-[0.25em] inline-block cursor-pointer border-b-2 border-dashed border-current italic outline-none transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)] ${tightRight ? "mr-0" : "mr-[0.25em]"}`}
    >
      {options[index]}
    </button>
  );
}

export function ContactSection({ dict }: ContactSectionProps) {
  const emailRef = useRef<ScrambleTextHandle>(null);
  const sendRef = useRef<ScrambleTextHandle>(null);

  const c = dict?.compose;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [needIndex, setNeedIndex] = useState(0);
  const [timingIndex, setTimingIndex] = useState(0);
  const [extra, setExtra] = useState("");

  const needs = NEED_KEYS.map((k) => c?.needs?.[k] || FALLBACK.needs[k]);
  const timings = TIMING_KEYS.map(
    (k) => c?.timings?.[k] || FALLBACK.timings[k],
  );

  const namePlaceholder = c?.name_placeholder || FALLBACK.namePlaceholder;
  const companyPlaceholder =
    c?.company_placeholder || FALLBACK.companyPlaceholder;

  // The mailto the composed sentence resolves to. Both parts are encoded,
  // so an apostrophe or a newline in the free-text field can't truncate the
  // body the way a plain concatenation would.
  const mailtoHref = useMemo(() => {
    const subject = `${c?.subject || FALLBACK.subject} — ${name || namePlaceholder}`;
    const lines = [
      `${c?.greeting || FALLBACK.greeting} ${name || namePlaceholder} ${c?.from || FALLBACK.from} ${company || companyPlaceholder}.`,
      `${c?.need || FALLBACK.need} ${needs[needIndex]} ${c?.start || FALLBACK.start} ${timings[timingIndex]}.`,
    ];
    if (extra.trim()) {
      lines.push("", `${c?.extra || FALLBACK.extra} ${extra.trim()}`);
    }
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [
    c,
    name,
    company,
    extra,
    needIndex,
    timingIndex,
    needs,
    timings,
    namePlaceholder,
    companyPlaceholder,
  ]);

  return (
    <section
      id="contact"
      className="relative w-full bg-[var(--bg-primary)] py-24 md:py-32"
    >
      <div className="w-full px-6 md:px-12">
        {/* Header — eyebrow in the left 46% column, statement opposite it:
            the same opening /work and /about use. */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 lg:grid lg:grid-cols-[46%_1fr] lg:items-start lg:gap-8"
        >
          <h1 className="type-eyebrow text-[var(--text-primary)] lg:col-start-1">
            <ScrambleText
              text={dict?.title || "Contact"}
              speed={55}
              trigger="manual"
            />
          </h1>

          <p className="type-statement max-w-2xl text-[var(--text-primary)] lg:col-start-2">
            {dict?.subtitle ||
              "Have a project in mind? Tell us about it — we read every message ourselves."}
          </p>
        </m.div>

        {/* ── COMPOSER ─────────────────────────────────────────
            The enquiry is written as a sentence rather than a stack of
            labelled fields. Nothing is posted anywhere: sending hands the
            finished text to the visitor's own mail client, which keeps
            this page's promise literal — the message really does land in
            our inbox with nothing in between, and there's no third-party
            form service holding anyone's details. */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-20 md:mt-28"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]/60">
            {c?.hint || FALLBACK.hint}
          </p>

          <div className="type-manifesto mt-8 max-w-6xl text-[var(--text-primary)]">
            <span>{c?.greeting || FALLBACK.greeting}</span>
            <Blank
              value={name}
              onChange={setName}
              placeholder={namePlaceholder}
              label={namePlaceholder}
            />
            <span>{c?.from || FALLBACK.from}</span>
            <span className="whitespace-nowrap">
              <Blank
                value={company}
                onChange={setCompany}
                placeholder={companyPlaceholder}
                label={companyPlaceholder}
                tightRight
              />
              <span>.</span>
            </span>{" "}
            <span>{c?.need || FALLBACK.need}</span>
            <Choice
              options={needs}
              index={needIndex}
              onCycle={() => setNeedIndex((i) => (i + 1) % needs.length)}
              label={c?.need || FALLBACK.need}
            />
            <span>{c?.start || FALLBACK.start}</span>
            <span className="whitespace-nowrap">
              <Choice
                options={timings}
                index={timingIndex}
                onCycle={() => setTimingIndex((i) => (i + 1) % timings.length)}
                label={c?.start || FALLBACK.start}
                tightRight
              />
              <span>.</span>
            </span>
          </div>

          {/* Free text, optional — the sentence covers the shape of the
              enquiry, this covers whatever it can't. */}
          <div className="mt-12 max-w-3xl">
            <label
              htmlFor="contact-extra"
              className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]/60"
            >
              {c?.extra || FALLBACK.extra}
            </label>
            <textarea
              id="contact-extra"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder={c?.extra_placeholder || FALLBACK.extraPlaceholder}
              rows={3}
              className="type-body mt-4 w-full resize-none border-b-2 border-[var(--border)] bg-transparent pb-2 text-[var(--text-primary)] outline-none placeholder:opacity-40 focus:border-[var(--accent)]"
            />
          </div>

          {/* Send, with the plain address underneath for anyone who'd
              rather just write to us directly. */}
          <div className="mt-14 flex max-w-3xl flex-col font-display text-3xl sm:text-4xl md:text-5xl">
            <a
              href={mailtoHref}
              onMouseEnter={() => sendRef.current?.scramble()}
              onMouseLeave={() => sendRef.current?.reset()}
              className="group flex items-center justify-between border-t border-b border-[var(--text-primary)] py-6 text-[var(--text-primary)]"
            >
              <ScrambleText
                ref={sendRef}
                text={c?.send || FALLBACK.send}
                trigger="manual"
                speed={40}
              />
              <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-10 md:w-10" />
            </a>

            <a
              href={`mailto:${EMAIL}`}
              onMouseEnter={() => emailRef.current?.scramble()}
              onMouseLeave={() => emailRef.current?.reset()}
              className="group mt-8 inline-flex items-center gap-3 self-start font-mono text-sm uppercase tracking-widest text-[var(--text-primary)]/70 transition-colors hover:text-[var(--text-primary)]"
            >
              <ScrambleText
                ref={emailRef}
                text={dict?.email_button || EMAIL}
                trigger="manual"
                speed={40}
              />
            </a>
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]/60">
            {dict?.response_note ||
              "We read every message ourselves — usually a reply within a day."}
          </p>
        </m.div>
      </div>
    </section>
  );
}
