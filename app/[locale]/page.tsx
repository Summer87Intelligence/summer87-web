import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: "Summer87 — Intelligent Business Engines",
    description: t("subheadline"),
    alternates: {
      canonical: locale === "es" ? "/" : `/${locale}`,
      languages: {
        "es": "/",
        "en": "/en",
        "de": "/de",
      },
    },
  };
}

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
