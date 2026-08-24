import type { MetadataRoute } from "next";

/**
 * robots.txt — ce au voie motoarele de căutare să indexeze.
 * Site de prezentare: totul e public, în afară de rutele de API.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://krevo.ro/sitemap.xml",
  };
}
