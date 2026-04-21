"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Brain, Cpu, BarChart3, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

/** Outer wrapper only — CSS keyframes; inner panel + TiltCard stay separate transform layers */
const SERVICE_CARD_FLOAT_AMBIENT = [
  { duration: 7.5, delay: 0 },
  { duration: 8.2, delay: 0.85 },
  { duration: 7.8, delay: 1.45 },
] as const;

const SERVICE_ICONS = [
  { icon: Brain, color: "from-accent-aqua/25 to-accent-blue/10", border: "border-accent-aqua/25", glow: "rgba(18,217,217,0.18)" },
  { icon: Cpu, color: "from-accent-aqua/25 to-accent-blue/10", border: "border-accent-aqua/25", glow: "rgba(18,217,217,0.18)" },
  { icon: BarChart3, color: "from-accent-aqua/25 to-accent-blue/10", border: "border-accent-aqua/25", glow: "rgba(18,217,217,0.18)" },
];

interface ServiceCardProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  iconIndex: number;
  learnMore: string;
  featured?: boolean;
  anchorId?: string;
}

function ServiceCard({
  badge, title, subtitle, description, features, iconIndex, learnMore, featured, anchorId
}: ServiceCardProps) {
  const { icon: Icon, color, border, glow } = SERVICE_ICONS[iconIndex];

  return (
    <TiltCard
      id={anchorId}
      className={cn(
        "group relative h-full min-h-[30.5rem] rounded-2xl p-6 md:min-h-[32rem] md:p-6 glass-card transition-all duration-500 cursor-pointer scroll-mt-24 premium-card-shadow",
        "ring-1 ring-accent-aqua/40 shadow-aqua-md"
      )}
      style={{
        background: "linear-gradient(135deg, rgba(16,16,16,0.96) 0%, rgba(10,10,10,0.82) 100%)",
      }}
    >
      <div className="flex h-full flex-col">
      {/* Icon */}
      <div
        className={cn(
          "w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br border transition-all duration-300 group-hover:scale-110",
          color, border
        )}
        style={{ boxShadow: `0 0 20px ${glow}` }}
      >
        <Icon size={24} className="text-text-primary opacity-90" strokeWidth={1.5} />
      </div>

      {/* Badge */}
      <div className="section-label mb-3 text-[10px]">{badge}</div>

      {/* Title */}
      <h3 className="font-display font-bold text-2xl text-text-primary mb-2 group-hover:text-accent-aqua transition-colors">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-text-muted text-sm font-medium mb-4 italic">{subtitle}</p>

      {/* Description */}
      <p className="card-body-refined text-text-secondary text-sm mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
            <div className="w-4 h-4 rounded-full border border-accent-blue/40 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Check size={9} className="text-accent-aqua" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {/* Learn more */}
      <a
        href="#contacto"
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-aqua transition-colors group/link focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-aqua/80 rounded-sm"
      >
        {learnMore}
        <ArrowUpRight
          size={15}
          className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
        />
      </a>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${glow}, transparent)`,
        }}
      />
      </div>
    </TiltCard>
  );
}

export default function Services() {
  const t = useTranslations("services");
  const methodologyFooter = t("methodology_footer");
  const reduceMotion = useReducedMotionSafe();

  const services: ServiceCardProps[] = [
    {
      badge:        t("s1_badge"),
      title:        t("s1_title"),
      subtitle:     t("s1_subtitle"),
      description:  t("s1_desc"),
      features:     [t("s1_features.0"), t("s1_features.1"), t("s1_features.2"), t("s1_features.3")],
      iconIndex:    0,
      learnMore:    t("learn_more"),
    },
    {
      badge:        t("s2_badge"),
      title:        t("s2_title"),
      subtitle:     t("s2_subtitle"),
      description:  t("s2_desc"),
      features:     [t("s2_features.0"), t("s2_features.1"), t("s2_features.2"), t("s2_features.3")],
      iconIndex:    1,
      learnMore:    t("learn_more"),
      featured:     true,
    },
    {
      badge:        t("s3_badge"),
      title:        t("s3_title"),
      subtitle:     t("s3_subtitle"),
      description:  t("s3_desc"),
      features:     [t("s3_features.0"), t("s3_features.1"), t("s3_features.2"), t("s3_features.3")],
      iconIndex:    2,
      learnMore:    t("learn_more"),
      anchorId:     "suite-bi",
    },
  ];

  return (
    <section id="servicios" className="section-shell relative py-16 md:py-20 overflow-hidden scroll-mt-24">
      {/* Base */}
      <div className="absolute inset-0 z-0 bg-brand-surface2" />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),rgba(0,0,0,0.9)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.05),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-repeat [background-size:256px_256px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 z-[2] dots-bg opacity-40" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent-blue/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex justify-center mb-5">
            <div className="section-label">{t("label")}</div>
          </div>
          <h2 className="section-headline-refined font-display font-bold text-4xl md:text-5xl text-text-primary mb-0">
            {t("headline")}{" "}
            <span className="text-tech-gradient">{t("headline_2")}</span>
          </h2>
          <p className="section-copy-refined mx-auto mt-4 text-text-secondary text-lg leading-relaxed">
            {t("subheadline")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {services.map((service, i) => {
            const cfg = SERVICE_CARD_FLOAT_AMBIENT[i];
            const floatOn = !reduceMotion;
            const floatStyle = floatOn
              ? ({
                  ["--scf-duration" as string]: `${cfg.duration}s`,
                  ["--scf-delay" as string]: `${cfg.delay}s`,
                } as CSSProperties)
              : undefined;

            return (
              <div
                key={i}
                className={cn(
                  "service-card-float-ambient h-full min-h-0",
                  floatOn && "service-card-float-ambient--on"
                )}
                style={floatStyle}
              >
                <div className="service-card-float-ambient-inner">
                  <Reveal delay={i * 0.08} className="h-full">
                    <ServiceCard {...service} />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal
          className="mt-10 flex w-full justify-center md:mb-1"
          delay={0.2}
        >
          <div
            className={[
              "inline-flex max-w-[min(100%,34rem)] items-center gap-2.5 rounded-full border border-white/10",
              "bg-brand-surface1/60 px-4 py-2 backdrop-blur-md sm:gap-3 sm:px-6 sm:py-2",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]",
              "transition-all duration-200",
              "hover:border-white/20 hover:bg-brand-surface1/72 hover:shadow-[0_0_24px_rgba(18,217,217,0.08)]",
            ].join(" ")}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.45)]"
              aria-hidden
            />
            <span className="text-left text-sm font-mono leading-snug tracking-wide text-white/80">
              {methodologyFooter}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
