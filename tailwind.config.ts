import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e6f5f5',
          100: '#b3e0e0',
          200: '#80cccc',
          300: '#4db8b8',
          400: '#1aa3a3',
          500: '#066C6C',
          600: '#055d5d',
          700: '#044e4e',
          800: '#033f3f',
          900: '#022e2e',
          950: '#011f1f',
          DEFAULT: '#066C6C',
        },
        secondary: {
          50:  '#e6f9f4',
          100: '#b3eddf',
          200: '#80e1ca',
          300: '#4dd5b5',
          400: '#1ac9a0',
          500: '#0AAE8E',
          600: '#099979',
          700: '#078464',
          800: '#056f4f',
          900: '#035a3a',
          950: '#024525',
          DEFAULT: '#0AAE8E',
        },
        dark: '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
