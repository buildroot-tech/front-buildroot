import type { Metadata } from "next";
import { Poppins, Crimson_Pro, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/ui/Preloader";

// Primary typeface — body copy, navbar, footer, and everything on /work.
const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Secondary typeface — reserved for home's giant display headlines only
// (hero, the featured-work list, the CTA manifesto). Not used on /work.
// A plain book serif — elongated, low-contrast, not editorial/decorative.
const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

import { defaultMetadata } from "@/lib/seo";
import { getDictionary, Locale } from "@/lib/dictionaries";

export const metadata: Metadata = defaultMetadata;

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
        <Providers>
          <Preloader dict={dict.preloader} />
          <ScrollProgress />
          <Header dict={dict.header} lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
