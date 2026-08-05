import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { routeThemes } from "@/lib/route-theme";

export const metadata: Metadata = {
  title: "Contact — buildroot_",
  description:
    "Get in touch with buildroot_. Tell us about your project — we reply ourselves, usually within a day.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const theme = routeThemes["/contact"];

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] pt-16 sm:pt-20"
      style={
        {
          "--bg-primary": theme.bg,
          "--text-primary": theme.text,
          "--border": theme.border,
        } as React.CSSProperties
      }
    >
      <ContactSection dict={dict.contact} />
    </div>
  );
}
