import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects";

const LOCALES = ["en", "es"] as const;

// Static routes relative to a locale prefix, e.g. "" -> /en, /es
const STATIC_ROUTES = ["", "/work", "/services", "/about", "/contact", "/privacy", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }

    for (const project of PROJECTS) {
      entries.push({
        url: `${siteConfig.url}/${locale}/work/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
