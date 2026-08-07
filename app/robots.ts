import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /style-guide is an internal design reference, not part of the
      // site's story — and it still documents the older brutalist system
      // rather than the current type scale. Keep it reachable for us, out
      // of the index for everyone else.
      disallow: ["/private/", "/style-guide"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
