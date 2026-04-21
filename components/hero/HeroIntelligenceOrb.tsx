"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";

const SIGNALS = [
  { label: "Ventas", top: "13%", left: "7%", delay: 0.2 },
  { label: "Leads", top: "30%", left: "4%", delay: 0.55 },
  { label: "Márgenes", top: "47%", left: "8%", delay: 0.9 },
  { label: "Cobranza", top: "64%", left: "5%", delay: 1.2 },
  { label: "Operación", top: "79%", left: "10%", delay: 1.45 },
] as const;

const OUTPUTS = [
  { title: "Prioridad Alta", subtitle: "Recuperar cobranza crítica", tone: "strong", delay: 0.35 },
  { title: "Acción Sugerida", subtitle: "Ajustar mix comercial B2B", tone: "medium", delay: 0.7 },
  { title: "Riesgo Operativo", subtitle: "Cuello de botella detectado", tone: "soft", delay: 1.05 },
] as const;

export default function HeroIntelligenceOrb() {
  const shouldReduceMotion = Boolean(useReducedMotionSafe());

  return (
    <motion.div
      className="relative w-full max-w-[34rem]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="relative min-h-[25rem] rounded-[30px] border border-cyan-300/15 bg-[linear-gradient(145deg,rgba(8,18,27,0.74),rgba(7,14,22,0.44))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_26px_84px_rgba(6,142,184,0.16)] backdrop-blur-xl md:min-h-[26rem] md:p-6"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -3, 0],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_30%_26%,rgba(67,210,255,0.13),transparent_42%),radial-gradient(circle_at_76%_72%,rgba(16,160,201,0.1),transparent_44%)]" />
        <motion.div
          className="pointer-events-none absolute left-[35%] top-[28%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(28,188,224,0.26),rgba(8,23,35,0)_68%)] blur-2xl"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.07, 1], opacity: [0.28, 0.42, 0.28] }}
          transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full text-cyan-200/55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="signalPath" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="rgba(142,239,255,0.3)" />
              <stop offset="100%" stopColor="rgba(21,150,193,0.08)" />
            </linearGradient>
            <linearGradient id="outputPath" x1="0" y1="0" x2="100" y2="0">
              <stop offset="0%" stopColor="rgba(120,233,255,0.28)" />
              <stop offset="100%" stopColor="rgba(55,168,209,0.06)" />
            </linearGradient>
          </defs>
          <line x1="24" y1="19" x2="48" y2="43" stroke="url(#signalPath)" strokeWidth="0.45" />
          <line x1="20" y1="33" x2="48" y2="47" stroke="url(#signalPath)" strokeWidth="0.45" />
          <line x1="24" y1="48" x2="48" y2="51" stroke="url(#signalPath)" strokeWidth="0.45" />
          <line x1="21" y1="63" x2="48" y2="55" stroke="url(#signalPath)" strokeWidth="0.45" />
          <line x1="25" y1="78" x2="48" y2="59" stroke="url(#signalPath)" strokeWidth="0.45" />

          <line x1="56" y1="47" x2="80" y2="35" stroke="url(#outputPath)" strokeWidth="0.45" />
          <line x1="57" y1="51" x2="82" y2="51" stroke="url(#outputPath)" strokeWidth="0.45" />
          <line x1="56" y1="55" x2="80" y2="67" stroke="url(#outputPath)" strokeWidth="0.45" />
        </svg>

        <div className="relative h-full min-h-[22rem]">
          {SIGNALS.map((signal) => (
            <motion.div
              key={signal.label}
              className="absolute rounded-full border border-cyan-200/15 bg-cyan-300/[0.07] px-2.5 py-1 text-[11px] font-medium tracking-wide text-cyan-50/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              style={{ top: signal.top, left: signal.left }}
              animate={shouldReduceMotion ? undefined : { x: [0, 1.5, 0], opacity: [0.82, 1, 0.82] }}
              transition={{
                duration: 4.8,
                delay: signal.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {signal.label}
            </motion.div>
          ))}

          <motion.div
            className="absolute left-[35%] top-[36%] w-[34%] rounded-2xl border border-cyan-200/15 bg-[linear-gradient(165deg,rgba(18,42,56,0.7),rgba(9,20,30,0.55))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.018, 1] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/50">Decision Engine</p>
            <p className="mt-1 text-[13px] font-semibold leading-tight text-cyan-50/90">Intelligence Layer</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cyan-900/30">
              <motion.div
                className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300/40 via-cyan-200/65 to-cyan-100/30"
                animate={shouldReduceMotion ? undefined : { x: ["-18%", "35%", "-18%"] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <div className="absolute right-[4%] top-[22%] flex w-[40%] flex-col gap-2.5">
            {OUTPUTS.map((output) => (
              <motion.div
                key={output.title}
                className={`rounded-xl border px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
                  output.tone === "strong"
                    ? "border-cyan-200/22 bg-cyan-300/[0.11]"
                    : output.tone === "medium"
                      ? "border-cyan-200/16 bg-cyan-300/[0.08]"
                      : "border-cyan-200/12 bg-cyan-300/[0.06]"
                }`}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  delay: shouldReduceMotion ? 0 : output.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-100/52">{output.title}</p>
                <p className="mt-1 text-[12px] leading-snug text-cyan-50/88">{output.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
