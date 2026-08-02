import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/ServicesSection";
import { getDictionary, Locale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Services — buildroot_",
  description:
    "Web development, technical consulting, and SaaS products built by buildroot_. Full-stack engineering, architecture reviews, and end-to-end product delivery.",
};

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
