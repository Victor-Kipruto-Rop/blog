// tailwind.config.portfolio-match.ts
// ============================================
// This config matches the portfolio tokens EXACTLY
// Use this to replace tailwind.config.ts if opting for portfolio visual consistency
// Current blog uses green accent (#40c463) intentionally — this config uses portfolio's orange-red

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Portfolio dark mode (default)
        paper: "#0a0e14",    // Background / primary surface
        ink: "#f5f0e8",      // Text / foreground
        rule: "#27272a",     // Borders
        card: "#18181b",     // Secondary surface
        muted: "#a1a1aa",    // Secondary text
        
        // Accent — Orange-red (portfolio matches)
        accent: {
          primary: "#c8401a",  // Primary accent
          hover: "#ff4b2b",    // Hover state
        },
        
        // Alternative: explicit token mapping
        bg: "#0a0e14",
        panel: "#18181b",
        border: "#27272a",
      },
      fontFamily: {
        // Portfolio typography
        display: ["'DM Serif Display'", "serif"],
        sans: ["'Syne'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      fontSize: {
        // Recommend extracting from portfolio source for exact scale
        // Placeholder values — verify against live site
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      spacing: {
        // Portfolio spacing scale
        xs: "10px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
      },
      borderRadius: {
        // Portfolio observed values
        none: "0",
        sm: "4px",
        base: "8px",
        md: "10px",
        lg: "12px",
        full: "50%",
      },
      transitionDuration: {
        // Portfolio motion scale
        micro: "120ms",
        fast: "200ms",
        standard: "300ms",
        slow: "600ms",
        slower: "800ms",
      },
      transitionTimingFunction: {
        // Portfolio easing functions
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring-tight": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
      boxShadow: {
        // Portfolio shadow (exact values extracted from DevTools recommended)
        // Placeholder — update after visual inspection
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
