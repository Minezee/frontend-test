import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#537C8E",
        purple: "#623EB8",
        secondary : "#A4A4A4",
        "gray-bg": "#F4EfEB",
        black: "#010101",
        "yellow-notif" : "#EDCF5D",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "12px",
          sm: "0px",
        },
        screens: {
          sm: "640px",
          md: "720px",
          lg: "958px",
          xl: "1149px",
          "2xl": "1405px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
