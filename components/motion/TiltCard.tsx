"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/animation/useReducedMotionSafe";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  id?: string;
  style?: CSSProperties;
}

export default function TiltCard({ children, className, intensity = 7, id, style }: TiltCardProps) {
  const reduceMotion = useReducedMotionSafe();
  const [coarsePointer, setCoarsePointer] = useState(true);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 160, damping: 18, mass: 0.5 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 160, damping: 18, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const handlers = useMemo(() => {
    if (reduceMotion || coarsePointer) {
      return {};
    }

    return {
      onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateXRaw.set((0.5 - py) * intensity);
        rotateYRaw.set((px - 0.5) * intensity);
      },
      onMouseLeave: () => {
        rotateXRaw.set(0);
        rotateYRaw.set(0);
      },
    };
  }, [coarsePointer, intensity, reduceMotion, rotateXRaw, rotateYRaw]);

  return (
    <motion.article
      id={id}
      {...handlers}
      className={cn("transform-gpu", className)}
      whileHover={reduceMotion || coarsePointer ? undefined : { scale: 1.01 }}
      style={
        reduceMotion || coarsePointer
          ? style
          : {
              ...style,
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
            }
      }
    >
      {children}
    </motion.article>
  );
}
