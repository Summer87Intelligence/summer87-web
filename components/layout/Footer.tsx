"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const links = {
    services: [
      { label: t("neuroventas"), href: "#services" },
      { label: t("motores"), href: "#services" },
      { label: t("suite"), href: "#services" },
    ],
    company: [
      { label: tNav("home"), href: "#home" },
      { label: tNav("history"), href: "#origin" },
      { label: tNav("contact"), href: "#contacto" },
    ],
  };

  return (
    <footer className="section-shell relative border-t border-brand-border bg-brand-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          {/* Brand */}
          <Reveal className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/summer87.png"
                alt="Summer87"
                width={160}
                height={48}
                sizes="120px"
                className="h-9 w-auto shrink-0 object-contain md:h-10"
              />
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
                { icon: Mail,     href: "mailto:hola@summer87.ai",            label: "Email"    },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg border border-accent-pastel/45 flex items-center justify-center text-accent-pastel hover:text-accent-yellow hover:border-accent-yellow transition-all duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Services */}
          <Reveal className="lg:col-span-3">
            <h4 className="text-text-primary font-semibold text-sm mb-5 font-mono tracking-wider uppercase text-xs">
              {t("services_title")}
            </h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-pastel text-sm hover:text-accent-yellow transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80 rounded-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Company */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <h4 className="text-text-primary font-semibold text-sm mb-5 font-mono tracking-wider uppercase text-xs">
              {t("company_title")}
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-pastel text-sm hover:text-accent-yellow transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/80 rounded-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          className="mt-12 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 mx-auto sm:flex-row"
          delay={0.12}
        >
          <p className="text-accent-pastel text-xs font-mono">{t("copyright")}</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua animate-pulse" />
            <span className="text-accent-pastel text-xs font-mono">{t("made_with")}</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
