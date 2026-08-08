import type { Metadata } from "next";
import Link from "next/link";

import "../globals.css";
import { fontVariables } from "@/lib/fonts";

// /style-guide is a sibling of app/[lang], not a child, so it is never
// wrapped by the localized layout — it has to render its own <html> and
// pull in globals.css and the fonts itself. Without this it renders as
// unstyled default text, which is exactly how it sat unnoticed while
// proxy.ts was also rewriting the route into a 404.
export const metadata: Metadata = {
  title: "Style guide — buildroot_",
  robots: { index: false, follow: false },
};

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)] px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)]">
              buildroot_ Style Guide
            </span>
            <Link
              href="/"
              className="border border-[var(--border)] px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--text-inverse)]"
            >
              ← Back to Site
            </Link>
          </div>
        </nav>
        <main className="mx-auto max-w-[1400px] px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
