"use client";

import { useEffect, useRef } from "react";
import { LANDING_EVENTS, trackLandingEvent } from "@/lib/analytics/tracking";

const DEPTH_STEPS = [25, 50, 75, 100] as const;

interface ScrollDepthTrackerProps {
  locale: string;
}

export default function ScrollDepthTracker({ locale }: ScrollDepthTrackerProps) {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        return;
      }

      const depth = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      for (const step of DEPTH_STEPS) {
        if (depth >= step && !fired.current.has(step)) {
          fired.current.add(step);
          trackLandingEvent(LANDING_EVENTS.SCROLL_DEPTH, {
            locale,
            depth: step,
          });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return null;
}
