"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import HeaderLogo from "@/components/layout/HeaderLogo";

const LOCALES = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect current locale from pathname
  const currentLocale =
    LOCALES.find((l) => pathname.startsWith(`/${l.code}`))?.code ?? "es";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (locale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const hasLocale = LOCALES.some((l) => l.code === segments[0]);
    const rest = hasLocale ? segments.slice(1) : segments;
    const newPath = locale === "es" ? `/${rest.join("/")}` : `/${locale}/${rest.join("/")}`;
    router.push(newPath);
  };

  const navLinks = [
    { href: "#origin", label: t("history") },
    { href: "#services", label: t("services") },
    { href: "#suite-bi", label: t("suite") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-brand-background/90 backdrop-blur-xl border-b border-brand-border shadow-blue-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <HeaderLogo slogan={t("slogan")} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="text-sm text-text-secondary hover:text-accent-pastel transition-colors duration-200 font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-yellow group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-brand-surface1 border border-accent-pastel/45">
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                className={cn(
                  "px-2 py-1 rounded border text-xs font-mono font-medium transition-all duration-200",
                  currentLocale === locale.code
                    ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                    : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
                )}
              >
                {locale.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a href="#contacto" className="btn-primary text-xs px-5 py-2.5">
            <span>{t("cta")}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text-secondary hover:text-accent-pastel transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 bg-brand-background/95 backdrop-blur-xl border-t border-brand-border space-y-4">
          {navLinks.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-text-secondary hover:text-accent-pastel transition-colors py-2 font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-2">
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                onClick={() => {
                  switchLocale(locale.code);
                  setMobileOpen(false);
                }}
                className={cn(
                  "px-3 py-1.5 rounded border text-xs font-mono font-semibold transition-all",
                  currentLocale === locale.code
                    ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                    : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
                )}
              >
                {locale.flag} {locale.label}
              </button>
            ))}
          </div>
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full text-center text-sm mt-2 block"
          >
            <span>{t("cta")}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
