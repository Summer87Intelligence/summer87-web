"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import HeaderLogo from "@/components/layout/HeaderLogo";
import { LANDING_EVENTS, trackLandingEvent } from "@/lib/analytics/tracking";
import { usePathname, useRouter } from "@/navigation";

type AppLocale = "es" | "en" | "de";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "origin", "services", "contacto"];

    const syncActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.26;
      let current = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
          current = id;
          break;
        }
      }

      setActiveSection(current);
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;

    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const base = pathname || "/";
    const href = `${base}${search}${hash}`;

    trackLandingEvent(LANDING_EVENTS.LANGUAGE_SWITCH, {
      from_locale: locale,
      to_locale: nextLocale,
      source: "navbar",
      target_url: href,
    });

    router.replace(href, { locale: nextLocale });
  };

  const toggleMobileMenu = () => {
    const nextState = !mobileOpen;
    setMobileOpen(nextState);
    trackLandingEvent(LANDING_EVENTS.MOBILE_MENU_TOGGLE, {
      locale,
      state: nextState ? "open" : "close",
    });
  };

  const navLinks = [
    { href: "#home", label: t("home") },
    { href: "#origin", label: t("history") },
    { href: "#services", label: t("services") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2 bg-brand-background/90 backdrop-blur-xl"
          : "py-5 bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-500 sm:px-6 sm:gap-4 lg:px-8",
          "md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:justify-normal md:gap-x-4 lg:gap-x-8"
        )}
      >
        {/* Logo — left */}
        <div className="flex min-w-0 shrink md:justify-self-start">
          <HeaderLogo slogan={t("slogan")} />
        </div>

        {/* Desktop Nav — visual center */}
        <nav className="hidden items-center justify-center gap-4 md:flex md:justify-self-center lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              className={cn(
                "nav-link-premium",
                activeSection === link.href.slice(1) && "nav-link-premium-active"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language switcher — right */}
        <div className="hidden shrink-0 items-center md:flex md:justify-self-end">
          {/* Language switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-brand-surface1 border border-accent-pastel/45">
            <button
              type="button"
              onClick={() => handleLocaleChange("es")}
              className={cn(
                "px-2 py-1 rounded border text-xs font-mono font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80",
                locale === "es"
                  ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                  : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
              )}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange("en")}
              className={cn(
                "px-2 py-1 rounded border text-xs font-mono font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80",
                locale === "en"
                  ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                  : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange("de")}
              className={cn(
                "px-2 py-1 rounded border text-xs font-mono font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80",
                locale === "de"
                  ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                  : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
              )}
            >
              DE
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          className="shrink-0 md:hidden text-text-secondary hover:text-accent-pastel transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav-menu"
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
            <button
              type="button"
              onClick={() => {
                handleLocaleChange("es");
                setMobileOpen(false);
              }}
              className={cn(
                "px-3 py-1.5 rounded border text-xs font-mono font-semibold transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80",
                locale === "es"
                  ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                  : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
              )}
            >
              🇪🇸 ES
            </button>
            <button
              type="button"
              onClick={() => {
                handleLocaleChange("en");
                setMobileOpen(false);
              }}
              className={cn(
                "px-3 py-1.5 rounded border text-xs font-mono font-semibold transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80",
                locale === "en"
                  ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                  : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
              )}
            >
              🇺🇸 EN
            </button>
            <button
              type="button"
              onClick={() => {
                handleLocaleChange("de");
                setMobileOpen(false);
              }}
              className={cn(
                "px-3 py-1.5 rounded border text-xs font-mono font-semibold transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80",
                locale === "de"
                  ? "bg-accent-aqua border-accent-aqua text-brand-background shadow-aqua-sm"
                  : "border-accent-pastel/45 text-accent-pastel hover:border-accent-yellow hover:text-accent-yellow hover:shadow-pastel-sm"
              )}
            >
              🇩🇪 DE
            </button>
          </div>
        </div>
      </div>

      <div
        className={`navbar-divider-top ${
          scrolled ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
        }`}
      />
    </header>
  );
}
