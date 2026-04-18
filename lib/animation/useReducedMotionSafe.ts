"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useReducedMotionSafe() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? shouldReduce : true;
}
