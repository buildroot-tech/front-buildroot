import type { Metadata } from "next";
import { WorkSection } from "@/components/work/WorkSection";
import { getDictionary, Locale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Selected Work — buildroot_",
  description:
    "Explore case studies and web development projects built by buildroot_ software studio. High performance SaaS, Next.js web applications, and cloud architecture.",
};

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
      <WorkSection dict={dict.work} />
    </div>
  );
}
