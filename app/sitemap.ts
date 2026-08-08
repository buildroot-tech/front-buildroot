import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects";

// Spanish first, and given the higher priority — it is the primary language
// and the one the local market searches in. Order is a weak signal, but a
// free one.
const LOCALES = ["es", "en"] as const;

// Static routes relative to a locale prefix, e.g. "" -> /en, /es
const STATIC_ROUTES = [
  "",
  "/work",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Spanish is the primary language, so its pages rank slightly ahead of
    // their English counterparts rather than competing with them evenly.
    const weight = locale === "es" ? 1 : 0.9;

    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: Number(((route === "" ? 1 : 0.8) * weight).toFixed(2)),
      });
    }

    for (const project of PROJECTS) {
      entries.push({
        url: `${siteConfig.url}/${locale}/work/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: Number((0.6 * weight).toFixed(2)),
      });
    }
  }

  return entries;
}
