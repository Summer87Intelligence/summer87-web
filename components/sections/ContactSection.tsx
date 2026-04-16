"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react";

function buildWhatsAppHref(phoneDigits: string, message: string) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

function buildGoogleMapsHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function buildWazeHref(query: string) {
  return `https://waze.com/ul?q=${encodeURIComponent(query)}`;
}

export default function ContactSection() {
  const t = useTranslations("contact");

  const email = t("email");
  const webHref = t("web_href");
  const webDisplay = t("web_display");
  const phoneDisplay = t("phone_display");
  const phoneTel = t("phone_tel");
  const phoneDigits = phoneTel.replace(/\D/g, "");
  const whatsappPrefill = t("whatsapp_prefill");
  const whatsappHref = buildWhatsAppHref(phoneDigits, whatsappPrefill);
  const mapsQuery = `${t("address_line1")}, ${t("address_line2")}`;
  const googleMapsHref = buildGoogleMapsHref(mapsQuery);
  const wazeHref = buildWazeHref(mapsQuery);

  return (
    <section
      id="contacto"
      className="relative border-t border-white/10 bg-brand-background py-24 md:py-28 lg:py-32 overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-aqua/15 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16 md:mb-20 lg:mb-24">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            {t("subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              label: t("email_label"),
              content: (
                <a
                  href={`mailto:${email}`}
                  aria-label={`${t("email_label")}: ${email}`}
                  className="inline-flex items-start gap-2 text-sm text-accent-pastel hover:text-accent-yellow transition-colors break-all"
                >
                  <Mail size={18} className="shrink-0 mt-0.5 opacity-80" strokeWidth={1.5} aria-hidden />
                  {email}
                </a>
              ),
            },
            {
              label: t("web_label"),
              content: (
                <a
                  href={webHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("web_label")}: ${webDisplay}`}
                  className="inline-flex items-start gap-2 text-sm text-accent-pastel hover:text-accent-yellow transition-colors break-all"
                >
                  <ExternalLink size={18} className="shrink-0 mt-0.5 opacity-80" strokeWidth={1.5} aria-hidden />
                  {webDisplay}
                </a>
              ),
            },
            {
              label: t("phone_label"),
              content: (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("whatsapp_aria")}
                  className="inline-flex items-start gap-2 text-sm text-accent-pastel hover:text-accent-yellow transition-colors"
                >
                  <MessageCircle size={18} className="shrink-0 mt-0.5 opacity-80" strokeWidth={1.5} aria-hidden />
                  {phoneDisplay}
                </a>
              ),
            },
            {
              label: t("address_label"),
              content: (
                <div className="inline-flex items-start gap-2 text-sm leading-relaxed">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-accent-pastel/80" strokeWidth={1.5} aria-hidden />
                  <span className="space-y-2">
                    <a
                      href={googleMapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("maps_aria")}
                      className="block text-accent-pastel hover:text-accent-yellow transition-colors"
                    >
                      <span className="block text-text-primary/90">{t("address_line1")}</span>
                      <span className="block mt-1 text-white/70">{t("address_line2")}</span>
                    </a>
                    <a
                      href={wazeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("waze_aria")}
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-text-muted hover:text-accent-pastel transition-colors"
                    >
                      {t("waze_label")}
                      <ExternalLink size={12} className="opacity-70" strokeWidth={1.5} aria-hidden />
                    </a>
                  </span>
                </div>
              ),
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-brand-surface1/40 p-6 md:p-8 backdrop-blur-sm"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
                {card.label}
              </p>
              {card.content}
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
          <a
            href={`mailto:${email}`}
            aria-label={`${t("cta_email")}: ${email}`}
            className="btn-primary text-sm px-8 py-3.5 justify-center"
          >
            <span className="flex items-center gap-2">
              <Mail size={17} strokeWidth={1.75} aria-hidden />
              {t("cta_email")}
            </span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp_aria")}
            className="btn-secondary text-sm px-8 py-3.5 justify-center"
          >
            <span className="flex items-center gap-2">
              <MessageCircle size={17} strokeWidth={1.75} aria-hidden />
              {t("cta_whatsapp")}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
