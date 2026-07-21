import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — buildroot_",
  description:
    "Two developers. One mission. Build software that actually works. Learn about buildroot_ software studio.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
          Who We Are
        </h1>
        <h2 className="mt-4 font-mono text-4xl font-bold text-white md:text-6xl">
          About
        </h2>
        <p className="mt-6 max-w-lg text-lg text-white/70">
          Two developers. One mission. Build software that actually works.
        </p>
      </div>
    </div>
  );
}
