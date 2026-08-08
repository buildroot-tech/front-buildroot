import type { Metadata } from "next";
import type { Locale } from "@/lib/dictionaries";

export const siteConfig = {
  name: "buildroot_ | Digital Products & Engineering",
  description:
    "We build brutalist, high-performance web applications, digital products, and SaaS solutions for modern tech ventures.",
  url: "https://buildroot.co",
  email: "info@buildroot.co",
  phone: "+57 310 425 2781",
  /** Street address as shown in the footer. */
  address: {
    street: "Cl. 7 Este Av. Panamericana",
    city: "Ipiales",
    region: "Nariño",
    postalCode: "524060",
    country: "CO",
  },
  /** Ipiales — matches the coordinates printed in the footer. */
  geo: { latitude: 0.827782, longitude: -77.615538 },
  /** Where we actually take work from. Drives `areaServed` in the
   *  LocalBusiness graph, which is what local search reads.
   *
   *  Both sides of the border on purpose: Ipiales sits ~10 km from Tulcán,
   *  closer to it than to most of its own department, and the Carchi and
   *  Imbabura market is a natural part of the same catchment. */
  areaServed: [
    { name: "Ipiales", type: "City", country: "CO" },
    { name: "Pasto", type: "City", country: "CO" },
    { name: "Nariño", type: "AdministrativeArea", country: "CO" },
    { name: "Colombia", type: "Country", country: "CO" },
    { name: "Tulcán", type: "City", country: "EC" },
    { name: "Carchi", type: "AdministrativeArea", country: "EC" },
    { name: "Ibarra", type: "City", country: "EC" },
    { name: "Imbabura", type: "AdministrativeArea", country: "EC" },
    { name: "Ecuador", type: "Country", country: "EC" },
  ],
  /** Radius, in metres, around the Ipiales coordinates. 150 km reaches
   *  Pasto to the north and Ibarra to the south, which is the region we
   *  can realistically serve in person. */
  serviceRadiusMeters: 150000,
  links: {
    github: "https://github.com/buildroot-tech",
    // TODO(pre-launch): real company LinkedIn. This feeds the footer and the
    // Organization JSON-LD, so a wrong value ships twice.
    linkedin: "https://linkedin.com/company/buildroot",
  },
};

/**
 * Per-locale title, description and keywords.
 *
 * Spanish is the primary market and it is a *local* one — the terms people
 * actually search are "desarrollo web Ipiales", "software Pasto", not
 * "SaaS engineering". The place names belong in the copy for the same
 * reason: a page that never says where it is cannot rank for where it is.
 */
export const localizedSeo = {
  es: {
    title: "buildroot_ | Desarrollo de software en Ipiales, Nariño",
    description:
      "Estudio de desarrollo de software en Ipiales, Nariño. Creamos sitios y aplicaciones web, productos digitales y plataformas a medida para empresas de Ipiales, Pasto, todo Nariño y el norte del Ecuador: Tulcán, Carchi e Ibarra.",
    keywords: [
      "desarrollo web Ipiales",
      "desarrollo de software Ipiales",
      "páginas web Ipiales",
      "desarrollo web Pasto",
      "software a la medida Nariño",
      "diseño web Nariño",
      "aplicaciones web Colombia",
      "estudio de software Ipiales",
      "programadores Ipiales",
      "consultoría técnica Nariño",
      "desarrollo web Tulcán",
      "desarrollo web Ibarra",
      "páginas web Tulcán",
      "software Carchi",
      "diseño web norte del Ecuador",
      "desarrollo de software Imbabura",
    ],
  },
  en: {
    title: "buildroot_ | Software studio in Ipiales, Nariño",
    description:
      "Software development studio based in Ipiales, Nariño, Colombia. We design and build websites, web applications and custom digital products for businesses across Nariño and northern Ecuador — Ipiales, Pasto, Tulcán, Carchi and Ibarra.",
    keywords: [
      "software development Ipiales",
      "web development Colombia",
      "software studio Nariño",
      "web applications Colombia",
      "custom software Nariño",
      "digital products",
      "technical consulting Colombia",
      "web development Tulcán",
      "software development northern Ecuador",
      "web design Ibarra",
    ],
  },
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  title: {
    default: siteConfig.name,
    template: `%s | buildroot_`,
  },
  description: siteConfig.description,
  keywords: [...localizedSeo.es.keywords],
  authors: [
    {
      name: "buildroot_",
      url: siteConfig.url,
    },
  ],
  creator: "buildroot_",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // Image itself is supplied by the `opengraph-image.tsx` file convention
    // (app/[lang]/opengraph-image.tsx), which Next.js auto-generates and
    // injects into <head> — no static file to keep in sync here.
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // Image: falls back to the og:image generated by opengraph-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Builds a locale-correct `alternates` block for a given route so the
 * canonical URL and hreflang links always point at the equivalent page in
 * each locale, instead of the generic locale-root fallback in
 * `defaultMetadata`. `path` is the locale-agnostic route, e.g. "/work" or
 * "/work/my-project-id" — pass "" for the homepage.
 */
export function buildAlternates(
  lang: Locale,
  path: string = "",
): Metadata["alternates"] {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      en: `/en${path}`,
      es: `/es${path}`,
      // Where to send a searcher whose language matches neither. Spanish,
      // for the same reason it is the default locale: the market is
      // Colombian and Ecuadorian.
      "x-default": `/es${path}`,
    },
  };
}

/** Locale code for `openGraph.locale`. es_CO, not es_ES — the audience is
 *  Colombian, and the region half of this tag is a targeting signal. */
export function ogLocale(lang: Locale): string {
  return lang === "es" ? "es_CO" : "en_US";
}

/**
 * LocalBusiness graph. This is the piece that actually matters for ranking
 * in Ipiales, Pasto and the rest of Nariño: a plain Organization tells
 * search engines who we are, but not *where*, and local results are built
 * from address, coordinates and served area.
 */
export function localBusinessJsonLd(lang: Locale) {
  const copy = localizedSeo[lang] ?? localizedSeo.es;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: "buildroot_",
    description: copy.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/buildroot-logo-black.svg`,
    image: `${siteConfig.url}/brand/buildroot-logo-black.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": area.type,
      name: area.name,
      ...(area.type !== "Country"
        ? {
            containedInPlace: {
              "@type": "Country",
              name: area.country === "EC" ? "Ecuador" : "Colombia",
            },
          }
        : {}),
    })),
    // A radius says something `areaServed` can't: that the catchment is
    // continuous across the border rather than a list of disconnected names.
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      geoRadius: siteConfig.serviceRadiusMeters,
    },
    knowsLanguage: ["es-CO", "es-EC", "en"],
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  };
}
