import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#020002",
        surface: "#0A0910",
        indigo: { DEFAULT: "#6E74F7", deep: "#3B40B8" },
        muted: "#A1A1AA",
        ink: "#18181B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      screens: { "3xl": "1920px" },
    },
  },
  plugins: [],
};
export default config;
