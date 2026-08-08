import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/ui/Preloader";
import { RouteTextShuffle } from "@/components/ui/RouteTextShuffle";

import {
  defaultMetadata,
  buildAlternates,
  ogLocale,
  localizedSeo,
  localBusinessJsonLd,
} from "@/lib/seo";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { fontVariables } from "@/lib/fonts";

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
    <html lang={lang} className={`${fontVariables} h-full antialiased`}>
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
