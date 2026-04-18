"use client";

import { useTranslations } from "next-intl";
import { Brain, Cpu, BarChart3, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

const SERVICE_ICONS = [
  { icon: Brain, color: "from-accent-aqua/25 to-accent-blue/10", border: "border-accent-aqua/25", glow: "rgba(18,217,217,0.18)" },
  { icon: Cpu, color: "from-accent-blue/25 to-accent-aqua/10", border: "border-accent-blue/25", glow: "rgba(23,168,255,0.18)" },
  { icon: BarChart3, color: "from-premium-400/16 to-premium-300/8", border: "border-premium-400/22", glow: "rgba(242,193,78,0.18)" },
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
        "group relative h-full min-h-[30.5rem] rounded-2xl p-7 md:min-h-[32rem] md:p-[1.9rem] glass-card transition-all duration-500 cursor-pointer scroll-mt-28 premium-card-shadow",
        featured && "ring-1 ring-accent-aqua/40 shadow-aqua-md"
      )}
      style={{
        background: featured
          ? "linear-gradient(135deg, rgba(16,16,16,0.96) 0%, rgba(10,10,10,0.82) 100%)"
          : undefined,
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
    <section id="services" className="section-shell relative py-32 md:py-[7.75rem] lg:py-[8.15rem] overflow-hidden scroll-mt-28">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-surface2" />
      <div className="absolute inset-0 dots-bg opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-[3.75rem] md:mb-16">
          <div className="flex justify-center mb-5">
            <div className="section-label">{t("label")}</div>
          </div>
          <h2 className="section-headline-refined font-display font-bold text-4xl md:text-5xl text-text-primary mb-4">
            {t("headline")}{" "}
            <span className="text-tech-gradient">{t("headline_2")}</span>
          </h2>
          <p className="section-copy-refined mx-auto text-text-secondary text-lg leading-relaxed">
            {t("subheadline")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {services.map((service, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>

        <Reveal
          className="mt-14 flex w-full justify-center md:mt-[3.7rem] md:mb-1"
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
