import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import OriginSection from "@/components/sections/OriginSection";
import Services from "@/components/sections/Services";
import ContactSection from "@/components/sections/ContactSection";
import { locales } from "@/i18n";

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: "Summer87 — Intelligent Business Engines",
    description: t("subheadline"),
    alternates: {
      canonical: locale === "es" ? "/" : `/${locale}`,
      languages: {
        es: "/",
        en: "/en",
        de: "/de",
      },
    },
  };
}

export default async function HomePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <OriginSection />
      <Services />
      <ContactSection />
      <Footer />
    </main>
  );
}
