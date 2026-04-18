import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const revealSoft: Variants = {
  hidden: { opacity: 0, scale: 0.985, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: EASE_OUT_EXPO },
  },
};

export const staggerChildren = (delayChildren = 0.035, stagger = 0.062): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren: stagger },
  },
});
