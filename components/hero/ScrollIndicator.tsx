"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";

export default function ScrollIndicator() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 md:bottom-10">
      <a
        href="#origin"
        className="pointer-events-auto flex flex-col items-center rounded-full border border-white/10 bg-[#050A0E]/50 px-3 py-2 text-text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-accent-aqua/25 hover:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue/50 motion-reduce:transition-none"
        aria-label={t("scroll_indicator_label")}
      >
        <ChevronDown
          className={`h-5 w-5 opacity-80 ${reduceMotion ? "" : "motion-safe:animate-bounce"}`}
          aria-hidden
        />
      </a>
    </div>
  );
}
