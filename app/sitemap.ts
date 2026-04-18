import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => {
    const path = locale === "es" ? "" : `/${locale}`;
    return {
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "es" ? 1 : 0.9,
      alternates: {
        languages: {
          es: `${SITE_URL}`,
          en: `${SITE_URL}/en`,
          de: `${SITE_URL}/de`,
        },
      },
    };
  });
}
