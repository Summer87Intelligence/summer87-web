export default function BackgroundCircuits() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-circuit-fade-mask" />

      <svg
        className="absolute inset-0 h-full w-full circuit-drift-slow opacity-[0.22]"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="rgba(34,211,238,0.05)" strokeWidth="1">
          <path d="M32 180 H260 V290 H480" />
          <path d="M980 120 H760 V260 H620" />
          <path d="M1060 460 H890 V610 H720" />
          <path d="M120 760 H280 V640 H460" />
          <path d="M940 860 H760 V730 H620" />
          <path d="M80 1010 H220 V900 H360" />
          <path d="M1120 980 H980 V860 H840" />
          <path d="M520 120 H520 V260 H640" />
          <path d="M680 1040 H680 V900 H560" />
        </g>
        <g fill="rgba(220,244,255,0.05)">
          <circle cx="260" cy="290" r="2" className="circuit-node-pulse" />
          <circle cx="760" cy="260" r="2" className="circuit-node-pulse delay-1" />
          <circle cx="890" cy="610" r="2" className="circuit-node-pulse delay-2" />
          <circle cx="280" cy="640" r="2" className="circuit-node-pulse delay-3" />
          <circle cx="760" cy="730" r="2" className="circuit-node-pulse delay-4" />
          <circle cx="220" cy="900" r="2" className="circuit-node-pulse delay-5" />
          <circle cx="980" cy="860" r="2" className="circuit-node-pulse delay-6" />
        </g>
      </svg>

      <svg
        className="absolute inset-0 h-full w-full circuit-drift-reverse opacity-[0.14]"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="rgba(180,220,255,0.045)" strokeWidth="1">
          <path d="M140 90 H340 V180 H520" />
          <path d="M1090 260 H900 V380 H740" />
          <path d="M80 540 H260 V430 H420" />
          <path d="M1020 700 H860 V820 H700" />
          <path d="M180 930 H360 V810 H520" />
        </g>
      </svg>
    </div>
  );
}
