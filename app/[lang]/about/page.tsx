import type { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.about.title,
    description: dict.about.intro,
    alternates: buildAlternates(lang as Locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    // Mirrors the "/about" entry in lib/route-theme.ts, which is what the
    // Header and Footer already colour themselves from — set here as CSS
    // vars so the page body agrees with the chrome above and below it.
    <div
      className="min-h-screen bg-[var(--bg-primary)]"
      style={
        {
          "--bg-primary": "#000000",
          "--text-primary": "#ffffff",
          "--border": "#ffffff",
        } as React.CSSProperties
      }
    >
      <AboutSection dict={dict.about} />
    </div>
  );
}
