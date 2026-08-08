import type { Metadata } from "next";
import { Poppins, Crimson_Pro, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/ui/Preloader";
import { RouteTextShuffle } from "@/components/ui/RouteTextShuffle";

// Primary typeface — body copy, navbar, footer, and everything on /work.
const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Secondary typeface — reserved for giant display headlines only (home's
// hero and CTA manifesto, the giant project-title lists on /work, the
// /contact and /about statement headlines, footer contact info, giant
// slide titles on /services). Never body copy, never small text/buttons.
// A plain book serif — elongated, low-contrast, not editorial/decorative.
// Only 300 (font-light, used everywhere) and 700 (Hero.tsx's inline
// `fontWeight: 700` override on the main headline) are ever rendered.
const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

import {
  defaultMetadata,
  buildAlternates,
  ogLocale,
  localizedSeo,
  localBusinessJsonLd,
} from "@/lib/seo";
import { getDictionary, Locale } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  // Locale-aware title and description. The Spanish pages were previously
  // describing themselves in English — to the market we actually sell to.
  const copy = localizedSeo[locale] ?? localizedSeo.es;

  return {
    ...defaultMetadata,
    title: { default: copy.title, template: "%s | buildroot_" },
    description: copy.description,
    keywords: [...copy.keywords],
    alternates: buildAlternates(locale),
    openGraph: {
      ...defaultMetadata.openGraph,
      title: copy.title,
      description: copy.description,
      locale: ogLocale(locale),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: copy.title,
      description: copy.description,
    },
  };
}

import { Providers } from "@/app/providers";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${poppins.variable} ${crimsonPro.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd(lang as Locale)),
          }}
        />
        <Providers>
          <Preloader dict={dict.preloader} />
          <RouteTextShuffle />
          <ScrollProgress />
          <Header dict={dict.header} lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
