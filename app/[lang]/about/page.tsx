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
    <div className="min-h-screen bg-[var(--bg-hero)]">
      <AboutSection dict={dict.about} />
    </div>
  );
}
