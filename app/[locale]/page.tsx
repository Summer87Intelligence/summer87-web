import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import OriginSection from "@/components/sections/OriginSection";
import Services from "@/components/sections/Services";
import ContactSection from "@/components/sections/ContactSection";
import { locales } from "@/i18n";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: { locale: string };
}
const OG_LOCALE_MAP: Record<string, string> = {
  es: "es_ES",
  en: "en_US",
  de: "de_DE",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "hero" });
  const publicDir = join(process.cwd(), "public");
  const has16 = existsSync(join(publicDir, "favicon-16x16.png"));
  const has32 = existsSync(join(publicDir, "favicon-32x32.png"));
  const canonicalPath = locale === "es" ? "/" : `/${locale}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;

  const icons: NonNullable<Metadata["icons"]> = {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      ...(has32 ? [{ rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" }] : []),
      ...(has16 ? [{ rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" }] : []),
    ],
  };

  return {
    title: "Summer87 — Intelligent Business Engines",
    description: t("subheadline"),
    icons,
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: "/",
        en: "/en",
        de: "/de",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: "Summer87 — Intelligent Business Engines",
      description: t("subheadline"),
      siteName: "Summer87",
      locale: OG_LOCALE_MAP[locale] ?? "es_ES",
      alternateLocale: Object.values(OG_LOCALE_MAP).filter(
        (mappedLocale) => mappedLocale !== (OG_LOCALE_MAP[locale] ?? "es_ES")
      ),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Summer87 — Intelligent Business Engines",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Summer87 — Intelligent Business Engines",
      description: t("subheadline"),
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const contactT = await getTranslations({ locale, namespace: "contact" });
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Summer87",
    url: SITE_URL,
    logo: `${SITE_URL}/summer87.png`,
    email: contactT("email"),
    telephone: contactT("phone_tel"),
    sameAs: ["https://www.linkedin.com/company/summer87", "https://x.com/summer87ai"],
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Summer87",
    inLanguage: locale,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#local-business`,
    name: "Summer87",
    url: SITE_URL,
    email: contactT("email"),
    telephone: contactT("phone_tel"),
    address: {
      "@type": "PostalAddress",
      streetAddress: contactT("address_line1"),
      addressLocality: "Montevideo",
      addressCountry: "UY",
    },
    areaServed: ["UY", "LATAM", "EU", "US"],
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ScrollDepthTracker locale={locale} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent-blue/18 to-transparent lg:block"
      />
      <Navbar />
      <Hero />
      <OriginSection />
      <Services />
      <ContactSection />
      <Footer />
    </main>
  );
}
