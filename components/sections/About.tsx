"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Zap, Target, TrendingUp } from "lucide-react";

export default function About() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Zap,
      title: t("value_1_title"),
      desc:  t("value_1_desc"),
      color: "text-accent-aqua",
      bg:    "bg-accent-aqua/10 border-accent-aqua/20",
    },
    {
      icon: Target,
      title: t("value_2_title"),
      desc:  t("value_2_desc"),
      color: "text-accent-blue",
      bg:    "bg-accent-blue/10 border-accent-blue/20",
    },
    {
      icon: TrendingUp,
      title: t("value_3_title"),
      desc:  t("value_3_desc"),
      color: "text-premium-400",
      bg:    "bg-premium-400/10 border-premium-400/25",
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-brand-background" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      <div className="absolute right-0 top-1/3 w-1/4 h-px bg-gradient-to-l from-transparent via-accent-aqua/15 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <div className="section-label mb-5">{t("label")}</div>

            <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-8">
              {t("headline")}{" "}
              <br />
              <span className="text-tech-gradient">{t("headline_2")}</span>
            </h2>

            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p className="data-line">{t("desc_1")}</p>
              <p className="data-line">{t("desc_2")}</p>
              <p className="relative pl-4 border-l-2 border-accent-blue/50 text-text-primary font-medium italic">
                {t("desc_3")}
              </p>
            </div>

            {/* Logo — vínculo con Clipper Summer87 */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 lg:gap-6">
              <div className="relative shrink-0 flex justify-start sm:self-center">
                <Image
                  src="/summer87.png"
                  alt="Summer87"
                  width={300}
                  height={300}
                  className="w-24 sm:w-28 md:w-40 lg:w-52 h-auto object-contain opacity-90"
                  priority
                />
              </div>
              <div className="max-w-md space-y-2 sm:pb-0">
                <p className="font-mono text-xs uppercase tracking-widest text-accent-aqua">
                  {t("visual_lead")}
                </p>
                <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                  {t("visual_text")}
                </p>
              </div>
            </div>
          </div>

          {/* Right — values */}
          <div className="space-y-5">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="group flex items-start gap-5 p-6 rounded-xl glass-card hover:border-accent-blue/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center flex-shrink-0 ${value.bg}`}>
                    <Icon size={20} className={value.color} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-accent-aqua transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="rounded-xl border border-brand-border bg-brand-surface1/40 p-6 md:p-8">
              <p className="text-base font-medium leading-relaxed text-text-primary md:text-lg">
                {t("testimonial_quote")}
              </p>
              <p className="mt-4 font-mono text-xs text-text-muted">{t("testimonial_note")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
