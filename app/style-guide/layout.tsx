export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="sticky top-0 z-50 border-b-2 border-[var(--border)] bg-[var(--bg-primary)] px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)]">
            buildroot_ Style Guide
          </span>
          <a
            href="/"
            className="brutalist-button text-xs"
          >
            ← Back to Site
          </a>
        </div>
      </nav>
      <main className="mx-auto max-w-[1400px] px-6 py-12">{children}</main>
    </div>
  );
}
