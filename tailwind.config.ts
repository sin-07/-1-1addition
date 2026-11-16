import type { Config } from "tailwindcss";

const config: Config = {
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
        romantic: {
          dark: {
            950: "#04040a",
            900: "#080916",
            850: "#0d0e24",
            800: "#131435",
            700: "#1d1b4d",
          },
          pink: {
            300: "#f9a8d4",
            400: "#f472b6",
            500: "#ec4899",
            600: "#db2777",
          },
          rose: {
            300: "#fda4af",
            400: "#fb7185",
            500: "#f43f5e",
            600: "#e11d48",
          },
          gold: {
            300: "#fde68a",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
          },
          purple: {
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        cursive: ["var(--font-cursive)", "cursive"],
      },
      boxShadow: {
        'glow-pink': '0 0 40px -10px rgba(244, 114, 182, 0.45)',
        'glow-purple': '0 0 40px -10px rgba(168, 85, 247, 0.45)',
        'glow-gold': '0 0 40px -10px rgba(251, 191, 36, 0.45)',
        'glow-lg': '0 0 60px -15px rgba(236, 72, 153, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.9', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
