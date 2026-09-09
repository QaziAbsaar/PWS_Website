import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pws: {
          green: "#006400",
          sage: "#4F9856",
          teal: "#006C43",
        },
        background: "#FFFFFF",
        "off-white": "#F2F4F2",
        charcoal: "#222222",
        line: "#E4E9E4",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      maxWidth: {
        shell: "1160px",
      },
      letterSpacing: {
        eyebrow: "0.12em",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
