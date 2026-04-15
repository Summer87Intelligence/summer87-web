import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#050505",
          surface1: "#0A0A0A",
          surface2: "#101010",
          border: "rgba(242, 242, 242, 0.12)",
          borderStrong: "rgba(242, 242, 242, 0.22)",
        },
        text: {
          primary: "#F2F2F2",
          secondary: "rgba(242, 242, 242, 0.75)",
          muted: "rgba(242, 242, 242, 0.56)",
          pastel: "#E6D8A8",
          inverse: "#050505",
        },
        accent: {
          aqua: "#12D9D9",
          blue: "#17A8FF",
          green: "#17C8A0",
          pastel: "#E6D8A8",
          yellow: "#FFD86A",
          gold: "#F2C14E",
        },
        premium: {
          100: "#FFF3CC",
          200: "#FFE7A0",
          300: "#FFD86A",
          400: "#F2C14E",
          500: "#D6A93B",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Syne", "Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "surface-gradient": "linear-gradient(180deg, #050505 0%, #0A0A0A 100%)",
        "tech-mesh":
          "radial-gradient(ellipse 75% 55% at 50% -10%, rgba(23,168,255,0.12), transparent 62%), radial-gradient(ellipse 65% 45% at 80% 18%, rgba(18,217,217,0.10), transparent 66%)",
        "aqua-blue-gradient": "linear-gradient(135deg, #12D9D9 0%, #17A8FF 100%)",
        "premium-gradient": "linear-gradient(135deg, #FFD86A 0%, #F2C14E 100%)",
      },
      boxShadow: {
        "aqua-sm": "0 0 15px rgba(18,217,217,0.16)",
        "aqua-md": "0 0 36px rgba(18,217,217,0.26)",
        "blue-sm": "0 0 18px rgba(23,168,255,0.16)",
        "blue-md": "0 0 38px rgba(23,168,255,0.26)",
        "pastel-sm": "0 0 18px rgba(230,216,168,0.22)",
        "premium-sm": "0 0 18px rgba(242,193,78,0.18)",
        card: "0 12px 36px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.02)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scanLine 8s linear infinite",
        "data-stream": "dataStream 4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(18,217,217,0.18)" },
          "50%": { boxShadow: "0 0 40px rgba(23,168,255,0.34)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        scanLine: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        dataStream: {
          "0%":   { opacity: "0", transform: "translateY(-10px)" },
          "50%":  { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
