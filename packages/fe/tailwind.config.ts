import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Ensure dark mode is controlled by adding 'dark' class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Default light theme gradients
        'gradient-radial': "radial-gradient(var(--tw-gradient-stops, ellipse at center, #fdfbfb 0%, #ebedee 100%))",
        'gradient-conic': "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops, #fdfbfb 0%, #ebedee 100%))",

        // Dark theme gradients using the same CSS variables but different values
      },
      // Defining custom properties for dark theme inside dark selector
      dark: {
        backgroundImage: {
          'gradient-radial': "radial-gradient(var(--tw-gradient-stops, #333333 0%, #1a1a1a 100%))",
          'gradient-conic': "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops, #333333 0%, #1a1a1a 100%))",
        }
      }
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
    },
  },
  plugins: [],
};

export default config;
