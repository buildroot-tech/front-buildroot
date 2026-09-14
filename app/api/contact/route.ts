import { NextResponse } from "next/server";
import { Resend } from "resend";

// The one thing this route exists to add: sending an inquiry no longer
// requires the visitor to have a mail client configured (mailto: silently
// does nothing on a phone/browser with none set up, or on webmail-only
// setups). ContactSection.tsx still composes the same fill-in-the-blank
// sentence it always did and keeps a plain mailto: link as a fallback —
// this route is just a second way to deliver it.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_SUBJECT = 200;
const MAX_BODY = 5000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  body?: unknown;
  // Honeypot — a field real visitors never see or fill in (hidden via CSS
  // in the form, not just visually blank). Non-empty means a bot filled
  // every input it found; silently accept without sending so it doesn't
  // learn the check exists.
  website?: unknown;
}

// Best-effort only: a serverless function has no shared memory across
// instances or cold starts, so this doesn't guarantee a hard cap under
// real scale — but it costs nothing and stops the common case (a script
// hammering the one warm instance) without adding infrastructure this
// site otherwise has none of.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  // Strip CR/LF defensively even though Resend's JSON API isn't the raw
  // SMTP wire format an injected header would need — cheap insurance.
  const subject =
    typeof payload.subject === "string"
      ? payload.subject.replace(/[\r\n]+/g, " ").trim()
      : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json({ error: "Missing or invalid name." }, { status: 400 });
  }
  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Missing or invalid email." }, { status: 400 });
  }
  if (!subject || subject.length > MAX_SUBJECT) {
    return NextResponse.json({ error: "Missing or invalid subject." }, { status: 400 });
  }
  if (!body || body.length > MAX_BODY) {
    return NextResponse.json({ error: "Missing or invalid message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "info@buildroot.co";
  const from = process.env.CONTACT_FROM_EMAIL || "Buildroot <contact@buildroot.co>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: `${body}\n\n—\n${name} <${email}>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
