"use client";

import { Compass, Rocket, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";
import { cn } from "@/lib/utils";

const HERO_OCE_STATS = [
  { key: "stat_1", valueKey: "stat_1_value" as const, labelKey: "stat_1_label" as const, Icon: Compass },
  { key: "stat_2", valueKey: "stat_2_value" as const, labelKey: "stat_2_label" as const, Icon: Scale },
  { key: "stat_3", valueKey: "stat_3_value" as const, labelKey: "stat_3_label" as const, Icon: Rocket },
] as const;

/** Franja horizontal bajo el hero (desktop + mobile). */
export type HeroOceVariant = "band";

/** Misma cápsula que `.hero-content-panel::before`: radius 28px, borde cyan suave, gradiente, inset. */
const heroOceBandPanelClass =
  "relative w-full rounded-[28px] border border-cyan-400/20 bg-[linear-gradient(145deg,rgba(10,10,10,0.55),rgba(10,10,10,0.12))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-out hover:border-cyan-300/35 hover:shadow-[0_0_40px_rgba(34,211,238,0.10)] lg:p-8";

export default function HeroOceStats({ variant }: { variant: HeroOceVariant }) {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotionSafe();
  const shouldReduceMotion = Boolean(reduceMotion);

  return (
    <motion.div
      data-oce-variant={variant}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      className="relative z-[1] w-full min-w-0"
    >
      <div className={cn(heroOceBandPanelClass)}>
        <div className="grid grid-cols-1 gap-8 sm:gap-9 md:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10">
          {HERO_OCE_STATS.map((stat) => (
            <div
              key={stat.key}
              className="group relative flex min-w-0 gap-4 text-left transition-all duration-300 ease-out motion-safe:hover:-translate-y-px"
            >
              <span
                className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] transition-all duration-300 ease-out group-hover:border-cyan-300/35 group-hover:bg-cyan-500/[0.08]"
                aria-hidden
              >
                <stat.Icon
                  className="h-5 w-5 text-accent-aqua/70 transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:text-cyan-300"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
              <div className="relative min-w-0 flex-1 pb-0.5">
                <div className="stat-number text-balance font-display text-lg font-semibold leading-snug tracking-tight text-text-primary transition-colors duration-300 ease-out group-hover:text-cyan-300 md:text-xl">
                  {t(stat.valueKey)}
                </div>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-text-muted transition-colors duration-300 ease-out group-hover:text-text-secondary md:text-[15px] md:leading-relaxed">
                  {t(stat.labelKey)}
                </p>
                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-[38%] origin-left scale-x-0 bg-cyan-400/35 transition-transform duration-400 ease-out group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover:scale-x-0"
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
