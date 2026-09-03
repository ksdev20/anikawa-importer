import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        xs: "480px",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        winky: [
          "Winky Sans",
          "sans-serif",
        ],
      },

      colors: {
        primary: "#8c52ff",
        accent: "#b28cff",

        secondary: "#141519",
        secondaryDeep: "#101116",
        secondarySoft: "#181a20",

        surface: "#1a1c22",
        surfaceLight: "#242730",
        surfaceElevated: "#20232b",

        border: "#2b2d35",

        muted: "#888888",
      },

      boxShadow: {
        glow: "0 0 40px rgb(140 82 255 / 0.12)",
        "glow-sm": "0 0 20px rgb(140 82 255 / 0.10)",
        panel: "0 20px 60px rgb(0 0 0 / 0.25)",
      },

      borderRadius: {
        panel: "1rem",
        control: "0.75rem",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },

  plugins: [
    typography,
  ],
};