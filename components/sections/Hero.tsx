"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";

// Animated background particles
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 10}s`,
    size: Math.random() > 0.7 ? 2 : 1,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent-aqua animate-pulse"
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

// Data visualization decoration
function DataNodes() {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
      <svg viewBox="0 0 600 700" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        <g stroke="#17A8FF" strokeWidth="0.5" strokeDasharray="4,8">
          <line x1="200" y1="100" x2="400" y2="200" />
          <line x1="400" y1="200" x2="500" y2="350" />
          <line x1="400" y1="200" x2="300" y2="400" />
          <line x1="300" y1="400" x2="450" y2="500" />
          <line x1="300" y1="400" x2="150" y2="500" />
          <line x1="150" y1="300" x2="300" y2="400" />
          <line x1="150" y1="300" x2="200" y2="100" />
          <line x1="500" y1="350" x2="450" y2="500" />
          <line x1="100" y1="550" x2="150" y2="500" />
          <line x1="500" y1="600" x2="450" y2="500" />
        </g>
        {/* Nodes */}
        <g fill="#12D9D9">
          <circle cx="200" cy="100" r="4" opacity="0.8" />
          <circle cx="400" cy="200" r="6" opacity="1" />
          <circle cx="500" cy="350" r="4" opacity="0.6" />
          <circle cx="300" cy="400" r="8" opacity="1" />
          <circle cx="150" cy="300" r="4" opacity="0.7" />
          <circle cx="450" cy="500" r="5" opacity="0.8" />
          <circle cx="150" cy="500" r="3" opacity="0.5" />
          <circle cx="100" cy="550" r="3" opacity="0.4" />
          <circle cx="500" cy="600" r="4" opacity="0.6" />
        </g>
        {/* Rings around key nodes */}
        <g fill="none" stroke="#17A8FF" strokeWidth="0.5">
          <circle cx="400" cy="200" r="16" opacity="0.3" />
          <circle cx="400" cy="200" r="28" opacity="0.15" />
          <circle cx="300" cy="400" r="20" opacity="0.3" />
          <circle cx="300" cy="400" r="35" opacity="0.15" />
        </g>
        {/* Labels */}
        <g fill="#12D9D9" fontSize="9" fontFamily="JetBrains Mono" opacity="0.5">
          <text x="415" y="198">MOTOR_01</text>
          <text x="315" y="398">ENGINE_CORE</text>
          <text x="510" y="348">DATA_IN</text>
          <text x="165" y="298">SIGNAL_A</text>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-overlay">
      {/* Background layers */}
      <div className="absolute inset-0 bg-surface-gradient" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-tech-mesh" />

      {/* Subtle scan line effect */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent pointer-events-none"
        style={{
          top: "30%",
          animation: "scanLine 12s ease-in-out infinite",
        }}
      />

      {/* Particles */}
      <ParticleField />

      {/* Data visualization */}
      <DataNodes />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">

          {/* Label */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-aqua/10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua animate-pulse" />
              <span className="text-accent-aqua text-xs font-mono tracking-widest uppercase">
                {t("label")}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-1 mb-8">
            <h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.05] animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              {t("headline_1")}
            </h1>
            <h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-tech-shimmer leading-[1.05] animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              {t("headline_2")}
            </h1>
            <h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              <span className="text-tech-gradient">{t("headline_3")}</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <a href="#contact" className="btn-primary">
              <span className="flex items-center gap-2">
                {t("cta_primary")}
                <ArrowRight size={16} />
              </span>
            </a>
            <a href="#suite" className="btn-secondary">
              {t("cta_secondary")}
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-brand-border animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            {[
              { value: t("stat_1_value"), label: t("stat_1_label") },
              { value: t("stat_2_value"), label: t("stat_2_label") },
              { value: t("stat_3_value"), label: t("stat_3_label") },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="stat-number text-3xl md:text-4xl leading-none">
                  {stat.value}
                </div>
                <div className="text-text-muted text-xs leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown size={16} className="text-accent-blue animate-bounce" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-background to-transparent pointer-events-none" />
    </section>
  );
}
