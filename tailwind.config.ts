import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFF9ED",
        card: "#FFFFFF",
        ink: "#253153",
        inkSoft: "#65728D",
        muted: "#8B96AB",
        line: "#E9E4F4",
        primary: "#7C5CFA",
        primaryDark: "#593AD5",
        primarySoft: "#EFE9FF",
        secondary: "#FFCB57",
        secondarySoft: "#FFF2D0",
        success: "#62CFA8",
        successSoft: "#DAF6EC",
        accent: "#FF8E9E",
        accentSoft: "#FFE1E6",
        blue: "#45B5FF",
        blueSoft: "#D9EFFF",
        orange: "#FFA260",
        orangeSoft: "#FFEBD6",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Baloo 2", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
