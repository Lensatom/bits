/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#374955",
        primary: "#8d7257",
        "grey.1": "#677a87",
        "grey.2": "#374955",
      }
    },
  },
  plugins: [],
}