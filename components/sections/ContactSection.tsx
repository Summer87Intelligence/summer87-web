"use client";

import type { ComponentType, KeyboardEvent, ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPinned } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { LANDING_EVENTS, trackLandingEvent } from "@/lib/analytics/tracking";
import { cn } from "@/lib/utils";

function buildGoogleMapsHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Subject + body fijos para conversión (formato acordado) */
const CONTACT_MAILTO_HREF =
  "mailto:hola@summer87.ai";

/** Mensaje precargado en WhatsApp (formato acordado) */
const CONTACT_WHATSAPP_HREF =
  "https://wa.me/59898260258";

const cardLinkFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-aqua/80";

/** Sobre / correo — trazo limpio, escaneo rápido */
function ContactIconMail({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4 6.5h16A1.5 1.5 0 0121.5 8v8A1.5 1.5 0 0120 17.5H4A1.5 1.5 0 012.5 16V8A1.5 1.5 0 014 6.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m3 8 8.3 5.53a1 1 0 001.4 0L21 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Marca WhatsApp (silueta reconocible) */
function ContactIconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Pin sobre mapa — mismo peso visual que los SVG custom */
function ContactIconMapPinned({ className }: { className?: string }) {
  return <MapPinned className={className} strokeWidth={1.5} aria-hidden />;
}

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const email = t("email");
  const mapsQuery = `${t("address_line1")}, ${t("address_line2")}`;
  const googleMapsHref = buildGoogleMapsHref(mapsQuery);
  const contactMailtoHref =
    "mailto:hola@summer87.ai?subject=" +
    encodeURIComponent("Interés en Summer87") +
    "&body=" +
    encodeURIComponent("Hola, estoy interesado en Summer87 y me gustaría recibir más información.");

  const handleMailCardActivate = () => {
    const selectedText = window.getSelection?.()?.toString()?.trim();
    if (selectedText) return;
    window.location.href = contactMailtoHref;
  };

  const handleMailCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMailCardActivate();
    }
  };

  type CardConfig = {
    key: string;
    href: string;
    external: boolean;
    /** Solo enlaces http(s); mailto no usa target blank */
    newTab?: boolean;
    label: string;
    icon: ComponentType<{ className?: string }>;
    /** WhatsApp usa verde de marca; resto heredan currentColor + hover del contenedor */
    iconClassName?: string;
    ariaLabel: string;
    onTrack: () => void;
    value?: string;
    body?: ReactNode;
  };

  const cards: CardConfig[] = [
    {
      key: "email",
      href: CONTACT_MAILTO_HREF,
      external: false,
      label: t("email_label"),
      value: "hola@summer87.ai",
      icon: ContactIconMail,
      ariaLabel: t("email_action_aria", { email }),
      onTrack: () =>
        trackLandingEvent(LANDING_EVENTS.CONTACT_EMAIL_CLICK, {
          locale,
          location: "card",
        }),
    },
    {
      key: "whatsapp",
      href: CONTACT_WHATSAPP_HREF,
      external: true,
      label: t("phone_label"),
      value: t("phone_display"),
      icon: ContactIconWhatsApp,
      iconClassName: "text-[#25D366] group-hover:border-emerald-400/35 group-hover:text-[#3fe07a]",
      ariaLabel: t("whatsapp_aria"),
      onTrack: () =>
        trackLandingEvent(LANDING_EVENTS.CONTACT_WHATSAPP_CLICK, {
          locale,
          location: "card",
        }),
    },
    {
      key: "address",
      href: googleMapsHref,
      external: true,
      label: t("address_label"),
      icon: ContactIconMapPinned,
      ariaLabel: t("maps_aria"),
      onTrack: () =>
        trackLandingEvent(LANDING_EVENTS.CONTACT_MAPS_CLICK, {
          locale,
          provider: "google_maps",
        }),
      body: (
        <div className="mt-3 max-w-[17.5rem] text-sm leading-relaxed text-white/75">
          <span className="block text-text-primary/90">{t("address_line1")}</span>
          <span className="mt-1.5 block text-white/70">{t("address_line2")}</span>
        </div>
      ),
    },
  ];

  return (
    <section
      id="contacto"
      className="section-shell relative border-t border-white/10 bg-brand-background py-16 md:py-20 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="section-headline-refined font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight mb-0">
            {t("title")}
          </h2>
          <p className="section-copy-refined mx-auto mt-3 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        </Reveal>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const iconWrap = cn(
              "mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10",
              "transition-colors duration-300",
              card.iconClassName ??
                "text-white/70 group-hover:border-accent-aqua/35 group-hover:text-accent-aqua"
            );

            const tiltShell = cn(
              "group relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-2xl",
              "glass-card transition-all duration-500 premium-card-shadow",
              "border-white/10 hover:border-accent-aqua/30"
            );

            const glow = (
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 60% at 50% 0%, rgba(18,217,217,0.16), transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(23,168,255,0.1), transparent 50%)",
                }}
                aria-hidden
              />
            );

            return (
              <Reveal key={card.key} delay={i * 0.06}>
                {card.key === "email" ? (
                  <div
                    role="link"
                    tabIndex={0}
                    aria-label="Enviar correo a hola@summer87.ai"
                    onClick={() => {
                      card.onTrack();
                      handleMailCardActivate();
                    }}
                    onKeyDown={handleMailCardKeyDown}
                    className={cn("block h-full w-full cursor-pointer", cardLinkFocus)}
                  >
                    <TiltCard intensity={5} className={tiltShell}>
                      <div
                        className={cn(
                          "relative z-[1] flex h-full w-full min-h-[210px] flex-1 flex-col items-center justify-center px-5 py-6 text-center sm:px-6 md:min-h-[220px] md:px-6 md:py-7",
                          "rounded-2xl transition-colors duration-300",
                          "hover:bg-white/[0.03]"
                        )}
                      >
                        <span className={iconWrap} aria-hidden>
                          <Icon className="h-5 w-5" />
                        </span>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted">{card.label}</p>
                        {card.value ? (
                          <p className="mt-2 select-text text-base font-medium leading-tight text-text-primary">{card.value}</p>
                        ) : null}
                        {card.body}
                      </div>
                      {glow}
                    </TiltCard>
                  </div>
                ) : (
                  <TiltCard intensity={5} className={tiltShell}>
                    <a
                      href={card.href}
                      aria-label={card.ariaLabel}
                      {...(card.external || card.newTab
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={card.onTrack}
                      className={cn(
                        "relative z-[1] flex h-full w-full min-h-[210px] flex-1 flex-col items-center justify-center px-5 py-6 text-center sm:px-6 md:min-h-[220px] md:px-6 md:py-7",
                        "rounded-2xl transition-colors duration-300",
                        "hover:bg-white/[0.03]",
                        cardLinkFocus
                      )}
                    >
                      <span className={iconWrap} aria-hidden>
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-xs font-mono uppercase tracking-widest text-text-muted">{card.label}</p>
                      {card.value ? (
                        <p className="mt-2 text-base font-medium leading-tight text-text-primary">{card.value}</p>
                      ) : null}
                      {card.body}
                    </a>
                    {glow}
                  </TiltCard>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
