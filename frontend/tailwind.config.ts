import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef3ff",
          100: "#e0e9ff",
          200: "#c7d6fe",
          300: "#a5b8fc",
          400: "#8191f8",
          500: "#636df1",
          600: "#4f4ee5",
          700: "#433eca",
          800: "#3836a3",
          900: "#313481",
          950: "#1e1d4b",
        },
        ink: {
          DEFAULT: "#0f1222",
          soft: "#3a3f55",
          muted: "#6b7188",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,18,34,0.04), 0 8px 24px -8px rgba(15,18,34,0.10)",
        glow: "0 0 0 1px rgba(79,78,229,0.12), 0 12px 40px -12px rgba(79,78,229,0.35)",
        card: "0 1px 3px rgba(15,18,34,0.06), 0 12px 28px -16px rgba(15,18,34,0.18)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "scale-in": "scale-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
