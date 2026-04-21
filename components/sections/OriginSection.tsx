"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const expandedKeys = ["e1", "e2", "e3", "e4", "e5", "e6"] as const;

const expandMotion = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.35, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.2 },
      height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

const originSectionEntrance = {
  rest: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function OriginSection() {
  const t = useTranslations("origin");
  const [expanded, setExpanded] = useState(true);
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.section
      id="origin"
      className="section-shell relative overflow-hidden border-t border-brand-border bg-brand-surface1 scroll-mt-24"
      aria-labelledby="origin-heading"
      initial={reduceMotion ? false : "rest"}
      whileInView={reduceMotion ? undefined : "enter"}
      viewport={{ once: true, amount: 0.2 }}
      variants={reduceMotion ? undefined : originSectionEntrance}
    >
      <div className="pointer-events-none absolute inset-0 bg-tech-mesh opacity-40" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center md:py-[7.25rem] lg:py-[8rem]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="flex flex-col gap-8 md:gap-10"
        >
          <motion.div variants={fadeUp} className="space-y-[1.125rem]">
            <p className="section-label text-[10px] md:text-xs">{t("label")}</p>
            <h2
              id="origin-heading"
              className="section-headline-refined font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl"
            >
              {t("title")}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            <p className="text-base leading-relaxed text-text-secondary md:text-lg md:leading-relaxed">
              {t("teaser")}
            </p>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-accent-pastel underline decoration-accent-pastel/40 underline-offset-4 transition-colors hover:text-accent-yellow hover:decoration-accent-yellow/60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow/70"
              aria-expanded={expanded}
              aria-controls="origin-expanded-content"
            >
              {expanded ? t("read_less") : t("read_more")}
            </button>
          </motion.div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="origin-expanded-content"
                key="expanded"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={expandMotion}
                style={{ overflow: "hidden" }}
                className="border-l border-accent-blue/25 pl-6 md:pl-8"
              >
                <div className="space-y-6 pb-2 pt-1 md:space-y-8">
                  {expandedKeys.map((key) => (
                    <p
                      key={key}
                      className="text-base leading-relaxed text-text-secondary md:text-lg md:leading-relaxed"
                    >
                      {t(key)}
                    </p>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl border-t border-brand-border pt-10 text-left md:pt-12"
                  >
                    <p className="text-lg font-medium leading-relaxed text-text-primary md:text-xl md:leading-relaxed">
                      {t("closing_line")}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 max-w-xl border-t border-white/10 pt-6 text-left md:mt-16"
                  >
                    <p className="text-base font-semibold text-white md:text-lg">
                      {t("signature_name")}
                    </p>
                    <p className="text-sm text-white/60">{t("signature_role")}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
