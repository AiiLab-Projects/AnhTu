import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        purple: "#7B5CFA",
        pink: "#E84BA5",
        orange: "#F58A1F",
        yellow: "#F7B500",
        ink: "#2B235A",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"],
        display: ["var(--font-baloo)", "Baloo 2", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
