"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, type CSSProperties } from "react";

/**
 * Hero engine visual — holographic core, dominant orbital ring, probe, intentional pixels.
 * Summer87 aqua/cyan on deep navy. SVG + CSS + Framer Motion.
 */
const VB = 400;
const CX = 200;
const CY = 168;

type Orb = { r: number; a0: number; dur: number; del: number; kind: "glow" | "dot" };
const ORBIT_LIGHTS: Orb[] = [
  { r: 108, a0: 0, dur: 42, del: 0, kind: "glow" },
  { r: 108, a0: 120, dur: 42, del: -7, kind: "dot" },
  { r: 132, a0: 240, dur: 50, del: -3, kind: "glow" },
  { r: 132, a0: 60, dur: 50, del: -12, kind: "dot" },
  { r: 118, a0: 200, dur: 46, del: -5, kind: "glow" },
  { r: 118, a0: 310, dur: 46, del: -18, kind: "dot" },
];

const FLOAT_LIGHTS = [
  { t: 14, l: 10, fx: 2.5, fy: -3, dur: 8.5, del: 0, frag: true },
  { t: 24, l: 86, fx: -2, fy: 2.5, dur: 10, del: -1.5, frag: false },
  { t: 62, l: 8, fx: 3, fy: 2, dur: 9.2, del: -0.8, frag: false },
  { t: 78, l: 78, fx: -2.5, fy: -2, dur: 11, del: -2.2, frag: true },
] as const;

const SHARD_POS = [
  { x: -54, y: 62, rot: -10 },
  { x: 12, y: 76, rot: 8 },
  { x: 52, y: 68, rot: 12 },
] as const;

export default function HeroNavigator({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gid = `hvr-${uid}`;
  const rm = useReducedMotion() === true;
  const cx = 100;
  const cy = 100;

  return (
    <div
      className={`pointer-events-none relative mx-auto h-full w-full max-w-[400px] select-none ${className ?? ""}`}
      aria-hidden="true"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hvr-root { --hvr-ox: 50%; --hvr-oy: 41.5%; }
            @keyframes hvr-amb {
              0%, 100% { opacity: 0.72; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
            }
            @keyframes hvr-orbit-main {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes hvr-orbit-slow {
              from { transform: rotate(12deg); }
              to { transform: rotate(372deg); }
            }
            @keyframes hvr-core-pulse {
              0%, 100% { transform: scale(1); opacity: 0.92; }
              50% { transform: scale(1.024); opacity: 1; }
            }
            @keyframes hvr-core-glow {
              0%, 100% { opacity: 0.55; }
              50% { opacity: 0.92; }
            }
            @keyframes hvr-float {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(var(--hvr-fx), var(--hvr-fy)); }
            }
            @keyframes hvr-pixel-orbit {
              from { transform: translate(-50%, -50%) rotate(var(--hvr-a0)) translateX(var(--hvr-r)); }
              to { transform: translate(-50%, -50%) rotate(calc(var(--hvr-a0) + 360deg)) translateX(var(--hvr-r)); }
            }
            @keyframes hvr-needle {
              0%, 100% { transform: rotate(-15deg); }
              50% { transform: rotate(15deg); }
            }
            @keyframes hvr-probe {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes hvr-probe-wake {
              0%, 100% { opacity: 0.14; }
              50% { opacity: 0.32; }
            }
            @keyframes hvr-shard {
              0%, 100% { opacity: 0.12; }
              50% { opacity: 0.42; }
            }
            @keyframes hvr-pulse {
              0%, 100% { opacity: 0.5; filter: brightness(1); }
              50% { opacity: 1; filter: brightness(1.18); }
            }
            @keyframes hvr-drift {
              0%, 100% { transform: translate(0,0) rotate(0deg); }
              50% { transform: translate(1.2px,-1.8px) rotate(0.8deg); }
            }
            .hvr-amb { animation: hvr-amb 5.5s ease-in-out infinite; }
            .hvr-orbit-main {
              transform-origin: var(--hvr-ox) var(--hvr-oy);
              animation: hvr-orbit-main 38s linear infinite;
            }
            .hvr-orbit-slow {
              transform-origin: var(--hvr-ox) var(--hvr-oy);
              animation: hvr-orbit-slow 64s linear infinite;
            }
            .hvr-core-pulse { animation: hvr-core-pulse 4.8s ease-in-out infinite; }
            .hvr-core-glow { animation: hvr-core-glow 5.2s ease-in-out infinite; }
            .hvr-float { animation: hvr-float var(--hvr-fdur) ease-in-out infinite; animation-delay: var(--hvr-fdel); }
            .hvr-pixel-orbit { animation: hvr-pixel-orbit var(--hvr-dur) linear infinite; animation-delay: var(--hvr-del); }
            .hvr-needle { transform-origin: ${cx}px ${cy}px; animation: hvr-needle 6.5s ease-in-out infinite; }
            .hvr-probe { transform-origin: 50% 100%; animation: hvr-probe var(--hvr-pdur, 11s) linear infinite; }
            .hvr-probe-wake { animation: hvr-probe-wake var(--hvr-pdur, 11s) ease-in-out infinite; }
            .hvr-shard { animation: hvr-shard 6s ease-in-out infinite; }
            .hvr-pulse { animation: hvr-pulse 3s ease-in-out infinite; }
            .hvr-drift { animation: hvr-drift 4.5s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) {
              .hvr-amb, .hvr-orbit-main, .hvr-orbit-slow, .hvr-core-pulse, .hvr-core-glow, .hvr-float, .hvr-pixel-orbit,
              .hvr-needle, .hvr-probe, .hvr-probe-wake, .hvr-shard, .hvr-pulse, .hvr-drift { animation: none !important; }
            }
          `,
        }}
      />

      <motion.div
        className="hvr-root relative aspect-square w-full overflow-visible"
        initial={false}
        animate={rm ? undefined : { y: [0, -3.2, 0], rotate: [0, 0.35, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Fuerte glow ambiental cyan */}
        <div
          className={`absolute left-1/2 top-[41%] z-0 h-[82%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[36px] ${rm ? "opacity-[0.88]" : "hvr-amb"}`}
          style={{
            background:
              "radial-gradient(ellipse 58% 50% at 50% 44%, rgba(72,255,255,0.5), rgba(23,168,255,0.28) 48%, transparent 72%)",
          }}
        />

        {/* Plano técnico — muy sutil; sin masa oscura inferior */}
        <div
          className="absolute inset-x-0 bottom-0 top-[36%] z-[1] overflow-hidden"
          style={{
            perspective: "580px",
            maskImage: "linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.45) 58%, transparent 76%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.45) 58%, transparent 76%)",
          }}
        >
          <div
            className="absolute inset-0 origin-bottom"
            style={{ transform: "rotateX(63deg) rotateZ(-4deg) scale(1.04)", transformStyle: "preserve-3d" }}
          >
            <svg className="h-full w-full overflow-visible opacity-[0.38]" viewBox="-82 -14 164 102" preserveAspectRatio="xMidYMax meet">
              <defs>
                <linearGradient id={`${gid}-g`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(40,200,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(48,250,250,0.14)" />
                </linearGradient>
              </defs>
              {[-58, -44, -30, -16, -2, 12, 26, 40, 54, 68, 82].map((y) => (
                <line
                  key={`h-${y}`}
                  x1="-80"
                  y1={y}
                  x2="80"
                  y2={y}
                  stroke={`url(#${gid}-g)`}
                  strokeOpacity={y > 22 ? 0.14 : y > 8 ? 0.22 : 0.32}
                  strokeWidth={y > 22 ? 0.34 : 0.28}
                />
              ))}
              {[-66, -44, -22, 0, 22, 44, 66].map((x, i) => (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1="-8"
                  x2={x}
                  y2="88"
                  stroke="rgba(130,245,255,0.09)"
                  strokeWidth={i % 2 === 0 ? 0.32 : 0.24}
                />
              ))}
              {SHARD_POS.map((s, i) => (
                <g key={`sh-${i}`} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
                  <polygon
                    className={rm ? "" : "hvr-shard"}
                    points="0,0 6,2 4,9 -1,7"
                    fill="rgba(150,255,255,0.07)"
                    stroke="rgba(80,240,255,0.2)"
                    strokeWidth="0.35"
                    style={rm ? undefined : { animationDelay: `${-i * 0.7}s` }}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <motion.div
          className="absolute inset-[6%] z-[2] overflow-visible"
          animate={rm ? undefined : { x: [0, 2.2, 0], y: [0, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Órbita protagonista: capa glow + capa trazo */}
          <svg
            className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${rm ? "" : "hvr-orbit-main"}`}
            viewBox={`0 0 ${VB} ${VB}`}
            fill="none"
            aria-hidden
          >
            <defs>
              <filter id={`${gid}-bloom`} x="-45%" y="-45%" width="190%" height="190%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse
              cx={CX}
              cy={CY}
              rx="142"
              ry="58"
              fill="none"
              stroke="rgba(100,255,255,0.45)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="28 18"
              transform={`rotate(-7 ${CX} ${CY})`}
              filter={`url(#${gid}-bloom)`}
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx="142"
              ry="58"
              fill="none"
              stroke="rgba(245,255,255,0.92)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="28 18"
              transform={`rotate(-7 ${CX} ${CY})`}
            />
          </svg>

          {/* Eco orbital lento (profundidad) */}
          <svg
            className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${rm ? "" : "hvr-orbit-slow"}`}
            viewBox={`0 0 ${VB} ${VB}`}
            fill="none"
            aria-hidden
          >
            <ellipse
              cx={CX}
              cy={CY - 4}
              rx="122"
              ry="48"
              fill="none"
              stroke="rgba(23,168,255,0.22)"
              strokeWidth="1"
              strokeDasharray="6 14"
              transform={`rotate(5 ${CX} ${CY - 4})`}
            />
          </svg>

          {/* Probe */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] z-[4] h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2"
            style={{ ["--hvr-pdur" as string]: "11s" } as CSSProperties}
          >
            <div
              className="absolute left-1/2 top-1/2 w-[2px] -translate-x-1/2"
              style={{ height: "120px", marginTop: "-120px", transformOrigin: "50% 100%" }}
            >
              <div className={`h-full w-full ${rm ? "" : "hvr-probe"}`} style={rm ? { transform: "rotate(55deg)" } : undefined}>
                <div
                  className={`pointer-events-none absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 ${rm ? "opacity-[0.22]" : "hvr-probe-wake"}`}
                  style={{
                    background: "radial-gradient(circle, rgba(130,255,255,0.45) 0%, transparent 70%)",
                    filter: "blur(6px)",
                  }}
                />
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[58%]"
                  style={{ filter: "drop-shadow(0 0 8px rgba(100,250,255,0.65))" }}
                >
                  <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden>
                    <rect x="7" y="7" width="11" height="7" rx="1.2" fill="rgba(6,16,22,0.95)" stroke="rgba(140,255,255,0.6)" strokeWidth="0.7" />
                    <path d="M7 10H4L2.5 8" stroke="rgba(180,255,255,0.55)" strokeWidth="0.55" strokeLinecap="round" />
                    <path d="M18 10h3l1.5-2" stroke="rgba(160,255,255,0.5)" strokeWidth="0.55" strokeLinecap="round" />
                    <rect x="10" y="3" width="5" height="3.5" rx="0.6" fill="rgba(12,36,44,0.98)" stroke="rgba(100,230,255,0.45)" strokeWidth="0.45" />
                    <circle cx="12.5" cy="4.5" r="0.6" fill="rgba(220,255,255,0.9)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Núcleo holográfico — capas */}
          <div className="absolute left-1/2 top-[42%] z-[5] w-[58%] -translate-x-1/2 -translate-y-1/2">
            <div
              className={`pointer-events-none absolute -inset-[18%] rounded-full ${rm ? "opacity-75" : "hvr-core-glow"}`}
              style={{
                background:
                  "radial-gradient(circle, rgba(80,255,255,0.42) 0%, rgba(30,160,255,0.2) 42%, transparent 72%)",
                filter: "blur(14px)",
              }}
            />
            <div
              className={`relative aspect-square w-full rounded-full ${rm ? "" : "hvr-core-pulse"}`}
              style={{
                background: `
                  radial-gradient(circle at 24% 20%, rgba(255,255,255,0.72) 0%, rgba(210,255,255,0.28) 14%, transparent 36%),
                  radial-gradient(circle at 76% 80%, rgba(2,12,22,0.85) 0%, rgba(6,28,42,0.5) 42%, transparent 58%),
                  radial-gradient(circle at 44% 38%, rgba(120,255,255,0.5) 0%, rgba(40,180,255,0.55) 36%, #061a22 74%, #02080c 100%)
                `,
                boxShadow: `
                  inset 12px 16px 32px rgba(255,255,255,0.28),
                  inset -18px -28px 48px rgba(4,16,26,0.55),
                  0 0 0 1.5px rgba(190,255,255,0.28),
                  0 0 48px rgba(24,240,240,0.55),
                  0 0 88px rgba(23,168,255,0.28)
                `,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full opacity-[0.38]"
                style={{
                  background:
                    "repeating-linear-gradient(180deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 5px)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-[3%] rounded-full"
                style={{
                  border: "1px solid rgba(160,255,255,0.22)",
                  boxShadow: "inset 0 0 32px rgba(56,240,255,0.18), 0 0 20px rgba(120,255,255,0.12)",
                }}
              />
              <div className="pointer-events-none absolute inset-[10%] rounded-full border border-cyan-300/20 opacity-80" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full rounded-full" viewBox="0 0 200 200" aria-hidden>
                <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(40,230,240,0.18)" strokeWidth="0.65" />
                <path
                  d="M 100 28 Q 148 52 162 100 Q 148 156 100 172 Q 52 156 38 100 Q 52 52 100 28"
                  fill="none"
                  stroke="rgba(120,220,255,0.22)"
                  strokeWidth="0.7"
                />
              </svg>
            </div>
          </div>

          {/* Brújula */}
          <svg
            className="pointer-events-none absolute left-1/2 top-[42%] z-[6] h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id={`${gid}-nd`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#8ef8ff" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#2aa8ff" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <circle cx={cx} cy={cy} r="35" stroke="rgba(200,255,255,0.42)" strokeWidth="0.85" strokeDasharray="4 6" />
            <circle cx={cx} cy={cy} r="27" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1={cx}
                y1={cy - 20}
                x2={cx}
                y2={cy - 26}
                stroke="rgba(248,255,255,0.55)"
                strokeWidth="1"
                strokeLinecap="round"
                transform={`rotate(${deg} ${cx} ${cy})`}
              />
            ))}
            <g className="hvr-needle">
              <line
                x1={cx}
                y1={cy + 1.5}
                x2={cx}
                y2={cy - 24}
                stroke={`url(#${gid}-nd)`}
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d={`M ${cx} ${cy - 27} L ${cx - 2.3} ${cy - 19} L ${cx + 2.3} ${cy - 19} Z`}
                fill="rgba(100,210,255,0.9)"
              />
            </g>
            <circle cx={cx} cy={cy} r="3.4" fill="rgba(3,8,12,0.96)" stroke="rgba(240,255,255,0.6)" strokeWidth="0.55" />
            <circle cx={cx} cy={cy} r="1.5" fill="#fff" />
          </svg>

          {/* Partículas orbitales */}
          <div className="absolute inset-0 z-[4] overflow-visible">
            {ORBIT_LIGHTS.map((p, i) => (
              <div
                key={`orb-${i}`}
                className={`absolute left-1/2 top-[42%] h-0 w-0 ${rm ? "" : "hvr-pixel-orbit"}`}
                style={
                  {
                    "--hvr-a0": `${p.a0}deg`,
                    "--hvr-r": `${p.r}px`,
                    "--hvr-dur": `${p.dur}s`,
                    "--hvr-del": `${p.del}s`,
                  } as CSSProperties
                }
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <div className={!rm && i % 2 === 0 ? "inline-block hvr-drift" : "inline-block"}>
                    <div
                      className={`rounded-sm ${p.kind === "glow" ? "h-2 w-2 bg-cyan-100/95 shadow-[0_0_16px_rgba(120,255,255,0.85)]" : "h-1.5 w-1.5 bg-cyan-50/90 shadow-[0_0_8px_rgba(80,240,255,0.55)]"} ${rm ? "" : "hvr-pulse"}`}
                      style={{ animationDelay: `${(i * 0.25) % 1.5}s` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Luces flotantes */}
          {FLOAT_LIGHTS.map((f, i) => (
            <div
              key={`fl-${i}`}
              className={`absolute ${rm ? "" : "hvr-float"}`}
              style={
                {
                  top: `${f.t}%`,
                  left: `${f.l}%`,
                  "--hvr-fx": `${f.fx}px`,
                  "--hvr-fy": `${f.fy}px`,
                  "--hvr-fdur": `${f.dur}s`,
                  "--hvr-fdel": `${f.del}s`,
                } as CSSProperties
              }
            >
              {f.frag ? (
                <div
                  className={`h-2 w-2 rotate-45 rounded-[1px] border border-cyan-200/50 bg-cyan-300/30 shadow-[0_0_12px_rgba(120,255,255,0.5)] ${rm ? "" : "hvr-pulse"}`}
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              ) : (
                <div className={rm ? "" : "inline-block hvr-drift"}>
                  <div
                    className={`h-1.5 w-1.5 rounded-full bg-cyan-100/85 shadow-[0_0_10px_rgba(100,240,255,0.55)] ${rm ? "" : "hvr-pulse"}`}
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
