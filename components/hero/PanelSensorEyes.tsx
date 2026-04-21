"use client";

import { useEffect } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MAX_OFFSET = 5;

export type PanelSensorEyesProps = {
  lookX: number;
  lookY: number;
  engaged?: boolean;
  reducedMotion?: boolean;
};

export default function PanelSensorEyes({
  lookX,
  lookY,
  engaged = false,
  reducedMotion = false,
}: PanelSensorEyesProps) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 24, mass: 0.6 };
  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  useEffect(() => {
    const scale = engaged && !reducedMotion ? MAX_OFFSET : 0;
    targetX.set(lookX * scale);
    targetY.set(lookY * scale);
  }, [lookX, lookY, engaged, reducedMotion, targetX, targetY]);

  const rightCoreX = useTransform(smoothX, (v) => v * 0.88);
  const rightCoreY = useTransform(smoothY, (v) => v * 0.88);

  return (
    <div
      className="pointer-events-none absolute right-4 top-4 z-[3] hidden md:block"
      aria-hidden="true"
    >
      <div
        className={`flex items-center gap-1.5 rounded-full border border-cyan-400/15 bg-[#050a0e]/75 px-2 py-1 backdrop-blur-[2px] transition-[box-shadow,opacity] duration-500 ${
          engaged ? "opacity-100 shadow-[0_0_16px_rgba(34,211,238,0.12)]" : "opacity-[0.55] shadow-none"
        }`}
      >
        <SensorLens offsetX={smoothX} offsetY={smoothY} />
        <SensorLens offsetX={rightCoreX} offsetY={rightCoreY} />
      </div>
    </div>
  );
}

function SensorLens({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) {
  return (
    <div className="relative h-[11px] w-[18px] overflow-hidden rounded-full border border-cyan-400/20 bg-[#030a10]/90">
      <motion.span
        className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/35 shadow-[0_0_6px_rgba(34,211,238,0.35)]"
        style={{ x: offsetX, y: offsetY }}
      />
    </div>
  );
}
