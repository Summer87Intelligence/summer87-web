"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";

interface HeroDepthSceneProps {
  isMobile: boolean;
}

export default function HeroDepthScene({ isMobile }: HeroDepthSceneProps) {
  const reduceMotion = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion || isMobile) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const px = event.clientX / window.innerWidth - 0.5;
      const py = event.clientY / window.innerHeight - 0.5;
      x.set(px);
      y.set(py);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, reduceMotion, x, y]);

  const sceneX = useTransform(sx, (value) => value * 20);
  const sceneY = useTransform(sy, (value) => value * 14);
  const cardNearX = useTransform(sx, (value) => value * 18);
  const cardNearY = useTransform(sy, (value) => value * 12);
  const cardFarX = useTransform(sx, (value) => value * -14);
  const cardFarY = useTransform(sy, (value) => value * -10);
  const pulseX = useTransform(sx, (value) => value * 10);
  const pulseY = useTransform(sy, (value) => value * 8);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] items-center justify-center overflow-hidden lg:flex"
      aria-hidden="true"
    >
      <motion.div
        className="relative h-[620px] w-[620px] -translate-x-2"
        style={reduceMotion || isMobile ? undefined : { x: sceneX, y: sceneY }}
        animate={reduceMotion ? undefined : { rotate: [0, 1.1, -0.8, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_55%_42%,rgba(23,168,255,0.25),transparent_48%),radial-gradient(circle_at_38%_64%,rgba(18,217,217,0.22),transparent_44%)] blur-3xl" />

        <svg viewBox="0 0 620 620" className="absolute inset-0 h-full w-full opacity-[0.72]">
          <g fill="none" stroke="rgba(23,168,255,0.24)" strokeWidth="1">
            <line x1="310" y1="310" x2="178" y2="182" />
            <line x1="310" y1="310" x2="454" y2="182" />
            <line x1="310" y1="310" x2="505" y2="300" />
            <line x1="310" y1="310" x2="448" y2="442" />
            <line x1="310" y1="310" x2="180" y2="440" />
            <line x1="310" y1="310" x2="128" y2="302" />
          </g>
          <g fill="none" stroke="rgba(18,217,217,0.32)" strokeDasharray="4 8" strokeWidth="1">
            <circle cx="310" cy="310" r="164" />
          </g>
          <g>
            <circle cx="178" cy="182" r="8" fill="rgba(18,217,217,0.78)" />
            <circle cx="454" cy="182" r="7" fill="rgba(23,168,255,0.72)" />
            <circle cx="505" cy="300" r="8" fill="rgba(18,217,217,0.74)" />
            <circle cx="448" cy="442" r="7" fill="rgba(23,168,255,0.7)" />
            <circle cx="180" cy="440" r="8" fill="rgba(18,217,217,0.72)" />
            <circle cx="128" cy="302" r="6.5" fill="rgba(23,168,255,0.68)" />
          </g>
        </svg>

        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-blue/25 bg-[radial-gradient(circle_at_33%_30%,rgba(255,255,255,0.2),rgba(23,168,255,0.22)_35%,rgba(5,5,5,0.2)_76%)] shadow-[0_0_88px_rgba(23,168,255,0.3)]" />
        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-aqua/35 bg-[radial-gradient(circle_at_42%_38%,rgba(18,217,217,0.38),rgba(23,168,255,0.14)_54%,rgba(7,11,18,0.22)_84%)] backdrop-blur-sm" />
        <div className="absolute left-1/2 top-1/2 h-[184px] w-[184px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[radial-gradient(circle_at_48%_34%,rgba(242,242,242,0.4),rgba(18,217,217,0.28)_30%,rgba(23,168,255,0.12)_58%,rgba(5,5,5,0.2)_86%)]" />

        <motion.div
          className="absolute left-[12%] top-[60%] h-28 w-44 rounded-2xl border border-white/15 bg-brand-surface1/72 p-4 backdrop-blur-md"
          style={reduceMotion || isMobile ? undefined : { x: cardNearX, y: cardNearY }}
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="h-2 w-20 rounded-full bg-accent-aqua/75" />
          <div className="mt-3 h-1 w-24 rounded-full bg-white/35" />
          <div className="mt-2 h-1 w-16 rounded-full bg-white/22" />
          <div className="mt-4 flex items-end gap-1.5">
            <div className="h-6 w-2 rounded-full bg-accent-blue/50" />
            <div className="h-4 w-2 rounded-full bg-accent-aqua/45" />
            <div className="h-7 w-2 rounded-full bg-accent-blue/65" />
            <div className="h-5 w-2 rounded-full bg-accent-aqua/50" />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[13%] top-[20%] h-24 w-36 rounded-xl border border-white/12 bg-brand-surface1/64 p-3 backdrop-blur-md"
          style={reduceMotion || isMobile ? undefined : { x: cardFarX, y: cardFarY }}
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="h-1.5 w-14 rounded-full bg-accent-blue/70" />
          <div className="mt-3 h-1 w-20 rounded-full bg-white/35" />
          <div className="mt-2 h-1 w-12 rounded-full bg-white/25" />
          <div className="mt-3 h-5 w-full rounded-md bg-gradient-to-r from-accent-aqua/30 to-accent-blue/26" />
        </motion.div>

        <motion.div
          className="absolute left-[31%] top-[26%] h-3 w-3 rounded-full bg-accent-aqua/85 shadow-[0_0_16px_rgba(18,217,217,0.7)]"
          style={reduceMotion || isMobile ? undefined : { x: pulseX, y: pulseY }}
          animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.9, 1.18, 0.9] }}
          transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[25%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-accent-blue/80 shadow-[0_0_14px_rgba(23,168,255,0.65)]"
          style={reduceMotion || isMobile ? undefined : { x: pulseX, y: pulseY }}
          animate={reduceMotion ? undefined : { opacity: [0.25, 0.9, 0.25], scale: [0.92, 1.14, 0.92] }}
          transition={{ duration: 4.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.div
          className="absolute left-[56%] top-[15%] h-2 w-2 rounded-full bg-white/75"
          animate={reduceMotion ? undefined : { opacity: [0.2, 0.82, 0.2] }}
          transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[214px] w-[214px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-aqua/20"
          animate={reduceMotion ? undefined : { scale: [0.98, 1.03, 0.98], opacity: [0.25, 0.48, 0.25] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[292px] w-[292px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-blue/16"
          animate={reduceMotion ? undefined : { scale: [1, 1.035, 1], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 8.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute left-1/2 top-[23%] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-accent-aqua/85" />
          <div className="absolute left-[25%] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-accent-blue/80" />
          <div className="absolute bottom-[24%] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-accent-aqua/76" />
          <div className="absolute right-[25%] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-accent-blue/74" />
        </motion.div>
      </motion.div>
    </div>
  );
}
