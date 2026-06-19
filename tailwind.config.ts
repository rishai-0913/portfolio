import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060C18",
        surface: "#0C1525",
        "surface-2": "#111D32",
        border: "#1A2A42",
        "border-hover": "#243650",
        primary: "#4F7EFF",
        "primary-dark": "#3A65E0",
        cyan: "#06C8DA",
        text: "#EEF4FF",
        muted: "#7A90B0",
        "muted-2": "#4A5F7A",
        green: "#22D87A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4F7EFF 0%, #06C8DA 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(79,126,255,0.1) 0%, rgba(6,200,218,0.05) 100%)",
        "gradient-hero": "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(79,126,255,0.15) 0%, transparent 70%)",
        "gradient-text": "linear-gradient(135deg, #4F7EFF 0%, #06C8DA 100%)",
      },
      boxShadow: {
        "glow-primary": "0 0 30px rgba(79,126,255,0.25)",
        "glow-cyan": "0 0 30px rgba(6,200,218,0.2)",
        "glow-sm": "0 0 15px rgba(79,126,255,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
