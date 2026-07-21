import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — buildroot_",
  description:
    "Web development, technical consulting, and SaaS products. Buildroot_ delivers full-stack solutions with modern frameworks.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--accent)] pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
          What We Do
        </h1>
        <h2 className="mt-4 font-mono text-4xl font-bold text-white md:text-6xl">
          Services
        </h2>
        <p className="mt-6 max-w-lg text-lg text-white/70">
          Web development, technical consulting, and SaaS products for startups
          and enterprises.
        </p>
      </div>
    </div>
  );
}
