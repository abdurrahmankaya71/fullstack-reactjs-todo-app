/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true, 
      padding: {
        DEFAULT: "1rem", 
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "540px", 
        md: "720px", 
        lg: "960px", 
        xl: "1140px", 
        "2xl": "1320px", 
      },
    },
  },
  plugins: [],
};