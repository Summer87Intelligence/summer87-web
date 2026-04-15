"use client";

import { useTranslations } from "next-intl";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const links = {
    services: [
      { label: t("neuroventas"), href: "#services" },
      { label: t("motores"),     href: "#services" },
      { label: t("suite"),       href: "#suite"    },
    ],
    company: [
      { label: t("about"),   href: "#about"   },
      { label: t("blog"),    href: "/blog"    },
      { label: t("careers"), href: "/careers" },
    ],
    legal: [
      { label: t("privacy"), href: "/privacy" },
      { label: t("terms"),   href: "/terms"   },
      { label: t("cookies"), href: "/cookies" },
    ],
  };

  return (
    <footer className="relative border-t border-brand-border bg-brand-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-aqua-blue-gradient flex items-center justify-center shadow-aqua-sm">
                <span className="text-brand-background font-display font-bold text-sm">S87</span>
              </div>
              <div>
                <div className="font-display font-bold text-text-primary leading-none">Summer87</div>
                <div className="font-mono text-[9px] text-accent-aqua tracking-widest uppercase opacity-60 mt-0.5">
                  Intelligence
                </div>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-[220px]">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com/company/summer87", label: "LinkedIn" },
                { icon: Twitter,  href: "https://twitter.com/summer87ai",        label: "Twitter"  },
                { icon: Mail,     href: "mailto:hello@summer87.ai",              label: "Email"    },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg border border-accent-pastel/45 flex items-center justify-center text-accent-pastel hover:text-accent-yellow hover:border-accent-yellow transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-5 font-mono tracking-wider uppercase text-xs">
              {t("services_title")}
            </h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-pastel text-sm hover:text-accent-yellow transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-5 font-mono tracking-wider uppercase text-xs">
              {t("company_title")}
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-pastel text-sm hover:text-accent-yellow transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-5 font-mono tracking-wider uppercase text-xs">
              {t("legal_title")}
            </h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-pastel text-sm hover:text-accent-yellow transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-accent-pastel text-xs font-mono">{t("copyright")}</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua animate-pulse" />
            <span className="text-accent-pastel text-xs font-mono">{t("made_with")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
