"use client";

import { BrainCircuit, Cpu, LineChart } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";
import PanelSensorEyes from "@/components/hero/PanelSensorEyes";

const PANEL_ROWS = [
  { lineKey: "line1" as const, Icon: BrainCircuit, featured: false },
  { lineKey: "line2" as const, Icon: Cpu, featured: true },
  { lineKey: "line3" as const, Icon: LineChart, featured: false },
] as const;

export default function HeroServiceCards() {
  const t = useTranslations("hero");
  const shouldReduceMotion = Boolean(useReducedMotionSafe());
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelEngaged, setPanelEngaged] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [4, -4]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-5, 5]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });
  const glowX = useTransform(pointerX, (v) => `${v}%`);
  const glowY = useTransform(pointerY, (v) => `${v}%`);
  const dynamicGlowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(320px circle at ${x} ${y}, rgba(72,225,255,0.08), transparent 58%)`
  );

  const onMoreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("servicios");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onPanelMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    pointerX.set(Math.max(0, Math.min(100, x)));
    pointerY.set(Math.max(0, Math.min(100, y)));
    const nx = (x / 100 - 0.5) * 2;
    const ny = (y / 100 - 0.5) * 2;
    setLook({ x: nx, y: ny });
  };

  const onPanelEnter = () => {
    setPanelEngaged(true);
  };

  const onPanelLeave = () => {
    setPanelEngaged(false);
    setLook({ x: 0, y: 0 });
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <motion.aside
      ref={panelRef}
      onMouseEnter={onPanelEnter}
      onMouseMove={onPanelMove}
      onMouseLeave={onPanelLeave}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      className="relative w-full max-w-[35rem] rounded-[30px] border border-cyan-400/20 bg-gradient-to-b from-[#050c14] to-[#020617] p-5 shadow-[inset_0_1px_0_rgba(34,211,238,0.06),0_0_25px_rgba(34,211,238,0.08)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-sm md:p-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
      aria-label={t("heroPanel.aside_aria")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_58%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[30px] opacity-65"
        style={{
          background: dynamicGlowBg,
        }}
      />
      {shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[30px] opacity-80"
          style={{
            background: "radial-gradient(320px circle at 50% 50%, rgba(72,225,255,0.09), transparent 55%)",
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent" />
      <PanelSensorEyes
        lookX={look.x}
        lookY={look.y}
        engaged={panelEngaged}
        reducedMotion={shouldReduceMotion}
      />
      <div className="relative space-y-4">
        {PANEL_ROWS.map((item, index) => (
          <motion.article
            key={item.lineKey}
            className={`group relative rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-[#07111b] to-[#030814] px-4 py-4 transition-all duration-300 hover:border-cyan-300/35 hover:shadow-[0_0_28px_rgba(34,211,238,0.10)] md:px-5 md:py-[1.05rem] ${
              item.featured ? "shadow-[0_0_18px_rgba(34,211,238,0.06)]" : "shadow-[0_0_18px_rgba(34,211,238,0.06)]"
            }`}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.08 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={shouldReduceMotion ? undefined : { y: -2.5, x: 1 }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(34,211,238,0.05),transparent_48%)] opacity-65" />
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 transition-colors group-hover:border-cyan-300/35 group-hover:bg-cyan-500/18"
                aria-hidden="true"
              >
                <item.Icon className="h-4.5 w-4.5 text-cyan-300 transition-colors group-hover:text-cyan-200/90" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-300/75">
                  {t(`heroPanel.${item.lineKey}.label`)}
                </p>
                <h3 className="mt-1 text-sm font-semibold leading-snug text-white/90 transition-colors group-hover:text-cyan-300 md:text-[15px]">
                  {t(`heroPanel.${item.lineKey}.title`)}
                </h3>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <a
        href="#servicios"
        onClick={onMoreClick}
        className="relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-cyan-400/25 bg-[#07111b]/70 px-4 py-2.5 text-sm font-semibold tracking-tight text-cyan-300/80 shadow-[0_0_18px_rgba(34,211,238,0.06)] transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-[0_0_28px_rgba(34,211,238,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070d14]"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />
        {t("heroPanel.cta")}
      </a>
    </motion.aside>
  );
}
