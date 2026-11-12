import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        rule: "var(--rule)",
        card: "var(--card)",
        muted: "var(--muted)",
        bg: "var(--paper)",
        panel: "var(--card)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        border: "var(--rule)"
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "monospace"]
      },
      spacing: {
        xs: "10px", sm: "16px", md: "20px", lg: "24px", xl: "32px"
      },
      borderRadius: {
        none: "0", sm: "4px", base: "8px", md: "10px", lg: "12px", full: "999px"
      },
      transitionDuration: {
        micro: "120ms", fast: "200ms", standard: "300ms", slow: "600ms"
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: []
};
export default config;
