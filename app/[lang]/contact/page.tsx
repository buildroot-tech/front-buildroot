import type { Metadata, Viewport } from "next";
import { buildAlternates } from "@/lib/seo";
import { ContactSection } from "@/components/contact/ContactSection";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { routeThemes } from "@/lib/route-theme";

// Colour behind the browser chrome on mobile — this page opens on
// #fbbf24, so the status-bar area matches instead of falling back
// to the browser default (a white band above a dark page on iOS).
export const viewport: Viewport = {
  themeColor: "#fbbf24",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  // Was a static English block with no alternates — on the Spanish page that
  // meant an English description and no canonical. The location is stated
  // here on purpose: a contact page is a strong local-search signal.
  const suffix =
    lang === "es"
      ? " Estudio de software en Ipiales, Nariño."
      : " Software studio in Ipiales, Nariño, Colombia.";

  return {
    title: dict.contact.title,
    description: dict.contact.subtitle + suffix,
    alternates: buildAlternates(lang as Locale, "/contact"),
  };
}

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
