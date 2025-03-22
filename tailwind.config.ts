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
        spacemono: ['"Space Mono"', 'monospace'],

      }
    },
    keyframes: {
      fadeInSlide: {
        '0%': { opacity: "0", transform: 'translateY(20px)' },
        '100%': { opacity: "1", transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeInSlide: 'fadeInSlide 0.5s ease-out',
    },
  },
  plugins: [],
} satisfies Config;
