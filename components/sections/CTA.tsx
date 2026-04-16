"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";

export default function CTA() {
  const t = useTranslations("cta");

  const cardItems = [t("card_item_1"), t("card_item_2"), t("card_item_3")];

  const trusts = [
    { icon: Shield,       label: t("trust_1") },
    { icon: Clock,        label: t("trust_2") },
    { icon: CheckCircle,  label: t("trust_3") },
  ];

  return (
    <section id="conversar" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-surface2" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glow orbs */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-aqua/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-blue/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Terminal header decoration */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-border bg-brand-surface1/70 mb-10 font-mono text-xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-premium-400/80" />
          <span className="w-2 h-2 rounded-full bg-accent-green/80" />
          <span className="ml-2">summer87.ai/session/new</span>
        </div>

        {/* Headline */}
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight">
          {t("headline")}
        </h2>

        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="mailto:hola@summer87.ai"
            className="btn-primary text-base px-8 py-4 shadow-aqua-md"
          >
            <span className="flex items-center gap-2">
              {t("cta_primary")}
              <ArrowRight size={18} />
            </span>
          </a>
          <a href="#services" className="btn-secondary text-base px-8 py-4">
            {t("cta_secondary")}
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {trusts.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2 text-text-muted text-sm">
                <Icon size={15} className="text-accent-blue/80" strokeWidth={1.5} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Floating card decoration */}
        <div className="mt-16 mx-auto max-w-sm">
          <div className="glass-card rounded-2xl p-6 border border-accent-blue/25 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-aqua-blue-gradient flex items-center justify-center">
                <span className="text-brand-background font-bold text-xs">S87</span>
              </div>
              <div>
                <div className="text-text-primary text-sm font-semibold">{t("card_title")}</div>
                <div className="text-text-muted text-xs font-mono">{t("card_subtitle")}</div>
              </div>
            </div>
            <div className="space-y-2">
              {cardItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                  <div className="w-1 h-1 rounded-full bg-premium-400" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-brand-border pt-4">
              <span className="font-mono text-xs text-text-muted">{t("card_footer_label")}</span>
              <span className="text-xs font-medium text-text-secondary">{t("card_footer_value")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
