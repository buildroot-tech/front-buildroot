import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/ServicesSection";
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
    title: dict.services.title,
    description: dict.services.subtitle,
    alternates: buildAlternates(lang as Locale, "/services"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-[var(--accent)]">
      <ServicesSection dict={dict.services} />
    </div>
  );
}
