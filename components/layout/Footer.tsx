import Link from "next/link";

const footerLinks = {
  nav: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/process", label: "Process" },
  ],
  social: [
    { href: "https://github.com/buildroot-tech", label: "GitHub" },
    { href: "https://twitter.com/buildroot_dev", label: "Twitter" },
    { href: "https://linkedin.com/company/buildroot", label: "LinkedIn" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-mono text-sm font-bold uppercase tracking-widest"
            >
              buildroot_
            </Link>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Digital products & consulting.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Navigation
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              {footerLinks.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Connect
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              {footerLinks.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:hello@buildroot.dev"
                className="text-sm transition-colors hover:text-[var(--accent)]"
              >
                hello@buildroot.dev
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-[var(--border)] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} buildroot_. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Built with Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
