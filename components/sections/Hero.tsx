"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Compass, Scale, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animation/motion";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";
import { LANDING_EVENTS, trackLandingEvent } from "@/lib/analytics/tracking";
import ScrollIndicator from "@/components/hero/ScrollIndicator";

function HeroDataNetworkLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(0,200,255,0.08),transparent_58%)]" />
      <div className="absolute inset-0 opacity-[0.18] md:opacity-[0.22]">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="20" y1="30" x2="60" y2="20" stroke="rgba(0,200,255,0.16)" strokeWidth="0.12" vectorEffect="non-scaling-stroke" />
          <line x1="60" y1="20" x2="80" y2="60" stroke="rgba(0,200,255,0.16)" strokeWidth="0.12" vectorEffect="non-scaling-stroke" />
          <line x1="20" y1="30" x2="40" y2="70" stroke="rgba(0,200,255,0.16)" strokeWidth="0.12" vectorEffect="non-scaling-stroke" />
          <line x1="40" y1="70" x2="78" y2="78" stroke="rgba(0,200,255,0.1)" strokeWidth="0.08" vectorEffect="non-scaling-stroke" />
          <line x1="10" y1="55" x2="35" y2="48" stroke="rgba(0,200,255,0.08)" strokeWidth="0.08" vectorEffect="non-scaling-stroke" />
          <line x1="55" y1="42" x2="92" y2="35" stroke="rgba(0,200,255,0.08)" strokeWidth="0.08" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="absolute inset-0 opacity-[0.22] md:opacity-[0.28]">
        <div className="absolute left-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
        <div className="absolute left-[60%] top-[20%] h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
        <div className="absolute left-[80%] top-[60%] h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
        <div className="absolute left-[40%] top-[70%] h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduceMotion = useReducedMotionSafe();
  const shouldReduceMotion = Boolean(reduceMotion);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-overlay scroll-mt-28 bg-[#050A0E]"
    >
      <div className="absolute inset-0 bg-[#050A0E]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_12%_18%,rgba(18,217,217,0.11),transparent_50%),radial-gradient(ellipse_70%_48%_at_92%_22%,rgba(23,168,255,0.12),transparent_52%),radial-gradient(ellipse_60%_42%_at_55%_95%,rgba(18,217,217,0.06),transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(23,168,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18,217,217,0.038) 1px, transparent 1px),
            repeating-linear-gradient(106deg, transparent 0px, transparent 47px, rgba(18,217,217,0.025) 48px, transparent 49px)
          `,
          backgroundSize: "72px 72px, 72px 72px, auto",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_50%_0%,rgba(23,168,255,0.06),transparent_70%)]"
        aria-hidden="true"
      />

      <HeroDataNetworkLayer />

      <motion.div
        variants={staggerChildren(0.08, 0.11)}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-[8.75rem] lg:pb-[5.75rem] w-full"
      >
        <div className="max-w-3xl xl:max-w-[42.5rem] hero-content-panel">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-10 hidden h-56 w-56 rounded-full bg-accent-blue/10 blur-3xl md:block"
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
            }}
            className="mb-6 lg:mb-[1.55rem] flex justify-center md:justify-start"
          >
            <p className="max-w-xl xl:max-w-2xl text-center font-display text-xl font-bold leading-tight tracking-tight text-tech-gradient md:text-left md:text-2xl lg:text-3xl">
              {t("label")}
            </p>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.72 } },
            }}
            className="hero-headline-refined font-display font-bold text-4xl sm:text-5xl md:text-5xl lg:text-[3.5rem] xl:text-[3.72rem] text-text-primary mb-6 lg:mb-[1.6rem]"
          >
            {t("headline_part1")}
            <span className="text-tech-gradient">{t("headline_gradient")}</span>
            {t("headline_part2")}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
            }}
            className="hero-subheadline-refined text-text-secondary text-lg md:text-xl max-w-2xl xl:max-w-[54ch] mb-9 lg:mb-10"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-4 mb-12 lg:mb-[3.15rem]"
          >
            <a
              href="#contacto"
              className="btn-primary btn-magnetic"
              onClick={() =>
                trackLandingEvent(LANDING_EVENTS.HERO_CTA_PRIMARY_CLICK, {
                  locale,
                  cta: "primary",
                  target: "#contacto",
                })
              }
            >
              <span className="flex items-center gap-2">
                {t("cta_primary")}
                <ArrowRight size={16} />
              </span>
            </a>
            <a
              href="#services"
              className="btn-secondary btn-sheen"
              onClick={() =>
                trackLandingEvent(LANDING_EVENTS.HERO_CTA_SECONDARY_CLICK, {
                  locale,
                  cta: "secondary",
                  target: "#services",
                })
              }
            >
              {t("cta_secondary")}
            </a>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="relative border-t border-brand-border/90 pt-8 lg:pt-[2.25rem]"
          >
            <div
              className="pointer-events-none absolute left-[6%] right-[6%] top-[2.35rem] z-0 hidden h-px md:block"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(18,217,217,0.2) 18%, rgba(23,168,255,0.16) 50%, rgba(18,217,217,0.2) 82%, transparent 100%)",
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-brand-border/40">
              {(
                [
                  { value: t("stat_1_value"), label: t("stat_1_label"), mark: "01", Icon: Compass },
                  { value: t("stat_2_value"), label: t("stat_2_label"), mark: "02", Icon: Scale },
                  { value: t("stat_3_value"), label: t("stat_3_label"), mark: "03", Icon: Rocket },
                ] as const
              ).map((stat, i) => (
                <div
                  key={stat.mark}
                  className={`relative text-left ${i > 0 ? "md:pl-6 lg:pl-10" : ""}`}
                >
                  <span
                    className="pointer-events-none absolute -left-1 -top-5 select-none font-display text-5xl font-bold tabular-nums tracking-tight text-accent-aqua/[0.08] md:-top-1 md:text-6xl lg:text-[4.25rem]"
                    aria-hidden="true"
                  >
                    {stat.mark}
                  </span>
                  <div className="relative z-[1] flex gap-3">
                    <stat.Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-aqua/70" strokeWidth={1.5} aria-hidden />
                    <div className="min-w-0">
                      <div className="stat-number font-display text-lg font-semibold leading-tight tracking-tight md:text-xl">
                        {stat.value}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-text-muted md:text-sm">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-background to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
