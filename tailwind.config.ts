import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Portfolio token mapping
        paper: "#0a0e14",      // Background
        ink: "#f5f0e8",        // Text
        rule: "#27272a",       // Borders
        card: "#18181b",       // Secondary surface
        muted: "#a1a1aa",      // Secondary text
        
        // Semantic aliases for component usage
        bg: "#0a0e14",         // Same as paper
        panel: "#18181b",      // Same as card
        accent: "#c8401a",     // Orange-red primary
        "accent-hover": "#ff4b2b", // Orange hover
        border: "#27272a",     // Same as rule
      },
      fontFamily: {
        display: ["'DM Serif Display'", "serif"],
        sans: ["'Syne'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      spacing: {
        xs: "10px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        base: "8px",
        md: "10px",
        lg: "12px",
        full: "50%",
      },
      transitionDuration: {
        micro: "120ms",
        fast: "200ms",
        standard: "300ms",
        slow: "600ms",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
