import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        purple: "#7C3AED",
        pink: "#EC4899",
        orange: "#F97316",
        yellow: "#FACC15",
        cyan: "#06B6D4",
        lime: "#84CC16",
        ink: "#1E1B4B",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Be Vietnam Pro", "sans-serif"],
        display: ["var(--font-baloo)", "Baloo 2", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
