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
        "cream-bg": "#FAF5EB",
        "cream-card": "#FFFDF9",
        "brutal-black": "#18181B",
        "pastel-yellow": "#FFE66D",
        "pastel-coral": "#FF6B6B",
        "pastel-purple": "#A78BFA",
        "pastel-mint": "#4ECDC4",
        "pastel-peach": "#FFD3B6",
        "pastel-blue": "#93C5FD",
        "pastel-rose": "#FFAAA6",
        "pastel-lavender": "#BDB2FF",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px",
      },
      spacing: {
        "gutter": "1.5rem",
        "margin-mobile": "1.25rem",
        "margin": "3rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-2xl": "4rem",
      },
      fontFamily: {
        "display-hero": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-lg-mobile": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-lg": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-md": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-sm": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "body-lg": ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        "body-md": ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        "label-lg": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "label-md": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "label-sm": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0px #18181B",
        "brutal": "3.5px 3.5px 0px #18181B",
        "brutal-lg": "5px 5px 0px #18181B",
        "brutal-xl": "7px 7px 0px #18181B",
      },
    },
  },
  plugins: [],
};

export default config;
