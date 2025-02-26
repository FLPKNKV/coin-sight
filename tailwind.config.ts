import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D71C9",
        gray: "#0216260A",
        gray_border: "#0216261F"
      },
      fontFamily: {
        garamond: ['"EB Garamond"', 'serif'],
        grotesk: ['"Host Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
