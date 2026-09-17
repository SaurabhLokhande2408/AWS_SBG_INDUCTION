/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#09090b",
        cardDark: "#121118",
        awsPurple: {
          light: "#A855F7",
          DEFAULT: "#7C3AED",
          dark: "#581C87"
        },
        awsOrange: "#FF9900",
        awsGreen: "#10B981"
      }
    },
  },
  plugins: [],
}
