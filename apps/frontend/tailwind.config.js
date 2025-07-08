import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-green-600",
    "bg-orange-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-gray-500",
  ],
  theme: {
    extend: {
      colors: {
        Jet_Black: "#121212",
        Jet_Black_2: "#1e1e1e",
        Jet_Black_3: "#6f6f6f",
        Jet_Black_4: "#262626",
        Porcelain_White: "#f8f7f4",
        Stone_Beige: "#d7d2c8",
        Dusty_Rose: "#d8a39d",
        Champagne_Gold: "#d4bfaa",
        Slate_Blue: "#6d7c91",
        Ash_Gray: "#9e9e9e",
        Forest_Emerald: "#3e5f55",
        Burnt_Coral: "#d17264",
      },
      fontFamily: {
        rokh: ["var(--font-rokh)"],
        sf_med: ["var(--font-sf_med)"],
        sf_bold: ["var(--font-sf_bold)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
