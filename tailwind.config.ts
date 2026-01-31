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
        brand: {
          primary: "#CBDA08",
          secondary: "#EAF83C",
          dark: "#1A1A1A", // For that high-end luxury feel
        },
      },
    },
  },
  plugins: [],
};
export default config;