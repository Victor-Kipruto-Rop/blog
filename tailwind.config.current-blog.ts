// tailwind.config.current.ts
// ============================================
// REFERENCE: Current blog config (with green accent)
// This is the blog's intentional choice to differentiate from portfolio
// Kept here for comparison and rollback if needed

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0e1a",           // Blog background (similar but slightly different from portfolio)
        panel: "#0f1524",        // Blog panel color
        accent: "#3ddc97",       // Blog accent — GREEN (deliberate choice vs. portfolio orange)
        border: "#1c2438",       // Blog border (different from portfolio #27272a)
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        // Note: Does not import portfolio fonts (DM Serif Display, Syne)
      },
    },
  },
  plugins: [],
};

export default config;
