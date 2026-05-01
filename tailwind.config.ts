import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f6f1e7",
          dark: "#1a1614",
        },
        ink: {
          DEFAULT: "#1a1614",
          dark: "#e8e2d4",
        },
        accent: {
          DEFAULT: "#b4533a",
          dark: "#d97757",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Iowan Old Style", "Georgia", "serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "720px",
      },
    },
  },
  plugins: [],
} satisfies Config;
