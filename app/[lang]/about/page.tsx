import type { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";
import { getDictionary, Locale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "About — buildroot_",
  description:
    "buildroot_ is a two-person studio building high-performance web products. Quality over quantity, clean code, and direct communication — no account managers.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-[var(--bg-hero)]">
      <AboutSection dict={dict.about} />
    </div>
  );
}
