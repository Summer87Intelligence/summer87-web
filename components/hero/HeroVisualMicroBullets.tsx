"use client";

import { ListOrdered, ScanSearch, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";

const KEYS = ["micro_bullet_1", "micro_bullet_2", "micro_bullet_3"] as const;
const ICONS = [ScanSearch, ListOrdered, Zap] as const;

/** Mismo lenguaje que `.hero-content-panel::before`: radius 28px, borde, gradiente, inset. */
const microPanelClass =
  "relative w-full max-w-full rounded-[28px] border border-[rgba(23,168,255,0.14)] bg-[linear-gradient(145deg,rgba(10,10,10,0.55),rgba(10,10,10,0.12))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:p-7";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Micro-puntos bajo el HeroNavigator (desktop): panel alineado al copy + motion muy sutil.
 */
export default function HeroVisualMicroBullets() {
  const t = useTranslations("hero");
  const rm = Boolean(useReducedMotionSafe());

  return (
    <motion.div
      className="relative w-full min-w-0"
      initial={rm ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={rm ? { duration: 0 } : { duration: 0.75, ease: EASE_OUT }}
    >
      <motion.div
        className={microPanelClass}
        initial={false}
        animate={rm ? undefined : { y: [0, -1.2, 0] }}
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.85,
        }}
      >
        <ul className="flex flex-col gap-4 lg:gap-5">
          {KEYS.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <li key={key} className="flex items-center gap-3">
                <Icon
                  className="h-4 w-4 shrink-0 text-accent-aqua/65"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-[15px] leading-snug tracking-tight text-white/90">
                  {t(key)}
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
