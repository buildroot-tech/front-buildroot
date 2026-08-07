import type { Metadata, Viewport } from "next";
import { LegalSection } from "@/components/legal/LegalSection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/seo";

// Bump this when the wording actually changes — it's what the page shows as
// the last-updated date, so a build date would quietly make it lie.
const UPDATED_ON = "2026-08-07";

export const viewport: Viewport = {
  themeColor: "#e2e8f0",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.legal.cookies.title,
    description: dict.legal.cookies.intro,
    alternates: buildAlternates(lang as Locale, "/cookies"),
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <LegalSection doc={dict.legal.cookies} updatedOn={UPDATED_ON} locale={lang} />
    </div>
  );
}
