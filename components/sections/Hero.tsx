"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroDepthScene from "@/components/3d/HeroDepthScene";
import { staggerChildren } from "@/lib/animation/motion";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";
import { LANDING_EVENTS, trackLandingEvent } from "@/lib/analytics/tracking";

function ParticleField({ reduceMotion, isMobile }: { reduceMotion: boolean; isMobile: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: isMobile ? 18 : 34 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        top: `${(i * 29) % 100}%`,
        delay: `${(i % 8) * 0.7}s`,
        duration: `${7 + (i % 6) * 1.3}s`,
        size: i % 4 === 0 ? 2 : 1,
        opacity: 0.08 + (i % 6) * 0.04,
      })),
    [isMobile]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full bg-accent-aqua ${reduceMotion ? "" : "animate-pulse"}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduceMotion = useReducedMotionSafe();
  const shouldReduceMotion = Boolean(reduceMotion);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-overlay premium-depth-bg scroll-mt-28"
    >
      <div className="absolute inset-0 bg-surface-gradient" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
      <div className="absolute inset-0 bg-tech-mesh" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(18,217,217,0.14),transparent_38%),radial-gradient(circle_at_80%_24%,rgba(23,168,255,0.16),transparent_35%),radial-gradient(circle_at_55%_72%,rgba(242,193,78,0.1),transparent_30%)]" aria-hidden="true" />

      <ParticleField reduceMotion={shouldReduceMotion} isMobile={isMobile} />
      <HeroDepthScene isMobile={isMobile} />

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
            className="grid grid-cols-3 gap-6 md:gap-9 xl:gap-10 pt-6 lg:pt-[1.7rem] border-t border-brand-border/90"
          >
            {[
              { value: t("stat_1_value"), label: t("stat_1_label") },
              { value: t("stat_2_value"), label: t("stat_2_label") },
              { value: t("stat_3_value"), label: t("stat_3_label") },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="font-display text-lg font-semibold leading-tight tracking-tight text-text-primary md:text-xl stat-number">
                  {stat.value}
                </div>
                <div className="text-text-muted text-xs leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-background to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
