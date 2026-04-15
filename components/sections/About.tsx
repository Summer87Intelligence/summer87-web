"use client";

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

            {/* 87 visual */}
            <div className="mt-10 flex items-center gap-4">
              <div className="relative">
                <div className="font-display font-bold text-[7rem] leading-none text-transparent bg-clip-text"
                     style={{ WebkitTextStroke: "1px rgba(23,168,255,0.30)" }}>
                  87
                </div>
                <div className="absolute inset-0 font-display font-bold text-[7rem] leading-none text-tech-gradient opacity-60 blur-[2px]">
                  87
                </div>
              </div>
              <div className="text-text-muted text-sm leading-relaxed max-w-[200px]">
                El porcentaje de decisiones empresariales tomadas sin datos suficientes.
                <span className="text-premium-400 font-semibold"> Estamos aquí para cambiarlo.</span>
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

            {/* Social proof placeholder */}
            <div className="p-6 rounded-xl border border-premium-400/25 bg-premium-400/8">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="w-8 h-8 rounded-full border-2 border-brand-surface2 bg-brand-surface1 flex items-center justify-center text-xs font-bold text-premium-400"
                    >
                      {["A", "M", "J", "+"][n - 1]}
                    </div>
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#F2C14E">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-text-secondary text-sm italic">
                "Summer87 transformó la manera en que tomamos decisiones. En 90 días nuestro pipeline se triplicó."
              </p>
              <p className="text-premium-400 text-xs font-mono mt-2">— CEO, Empresa de tecnología financiera</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
