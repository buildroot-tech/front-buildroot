import type { Metadata } from "next";
import { WorkSection } from "@/components/work/WorkSection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getProjects } from "@/lib/projects";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.work.title,
    description: dict.work.subtitle,
    alternates: buildAlternates(lang as Locale, "/work"),
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div
      className="pt-16 sm:pt-20 bg-[var(--bg-primary)]"
      style={{ "--bg-primary": "var(--bg-work)" } as React.CSSProperties}
    >
      <WorkSection dict={dict.work} projects={getProjects(lang as Locale)} />
    </div>
  );
}
