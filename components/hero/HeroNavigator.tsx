"use client";

/**
 * Lightweight “navigator” motif: compass, needle, rings, perspective grid, subtle routes.
 * No copy inside the graphic; motion respects prefers-reduced-motion.
 */
export default function HeroNavigator({ className }: { className?: string }) {
  const cx = 210;
  const cy = 178;
  const gridYs = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
  const gridXs = [-170, -136, -102, -68, -34, 0, 34, 68, 102, 136, 170];

  return (
    <div className={className}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes hn-needle-drift {
            0%, 100% { transform: rotate(-11deg); }
            50% { transform: rotate(11deg); }
          }
          .hn-needle {
            transform-origin: ${cx}px ${cy}px;
            animation: hn-needle-drift 36s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .hn-needle { animation: none !important; }
          }
        `,
      }}
      />
        <svg
          viewBox="0 0 420 420"
          className="mx-auto h-full w-full max-h-[min(560px,70vh)] opacity-[0.42]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hn-hub" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#12D9D9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#17A8FF" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="hn-plane" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(23,168,255,0.2)" />
              <stop offset="100%" stopColor="rgba(18,217,217,0.04)" />
            </linearGradient>
          </defs>

          <g opacity="0.55" transform={`translate(${cx} ${cy + 92}) rotate(-7) scale(1 0.36)`}>
            {gridYs.map((y) => (
              <line
                key={`h-${y}`}
                x1="-185"
                y1={y}
                x2="185"
                y2={y}
                stroke="url(#hn-plane)"
                strokeWidth="0.9"
              />
            ))}
            {gridXs.map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="-165"
                x2={x}
                y2="165"
                stroke="rgba(18,217,217,0.07)"
                strokeWidth="0.75"
              />
            ))}
          </g>

          <path
            d="M 78 132 Q 145 158 208 176"
            stroke="rgba(23,168,255,0.16)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <path
            d="M 318 124 Q 268 168 212 182"
            stroke="rgba(18,217,217,0.14)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <path
            d="M 210 268 Q 210 228 210 198"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
            strokeDasharray="2 5"
          />

          <circle cx={cx} cy={cy} r="122" stroke="rgba(23,168,255,0.11)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="100" stroke="rgba(18,217,217,0.09)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx={cx} cy={cy} r="78" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={cx}
              y1={cy - 72}
              x2={cx}
              y2={cy - 82}
              stroke="rgba(242,242,242,0.18)"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${deg} ${cx} ${cy})`}
            />
          ))}

          <circle cx={cx} cy={cy} r="26" fill="rgba(5,10,14,0.45)" stroke="rgba(18,217,217,0.28)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="11" fill="url(#hn-hub)" opacity="0.88" />

          <g className="hn-needle">
            <line
              x1={cx}
              y1={cy + 2}
              x2={cx}
              y2={cy - 58}
              stroke="rgba(18,217,217,0.82)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <polygon points={`${cx},${cy - 62} ${cx - 5},${cy - 50} ${cx + 5},${cy - 50}`} fill="rgba(23,168,255,0.55)" />
          </g>

          <circle cx="118" cy="128" r="3" fill="rgba(18,217,217,0.45)" />
          <circle cx="312" cy="136" r="2.5" fill="rgba(23,168,255,0.4)" />
          <circle cx="268" cy="248" r="2.5" fill="rgba(18,217,217,0.35)" />
          <circle cx="132" cy="252" r="2.5" fill="rgba(23,168,255,0.32)" />
        </svg>
    </div>
  );
}
