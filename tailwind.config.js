/** @type {import('tailwindcss').Config} */
// import LineClamp from "@tailwindw"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-line-clamp")
  ],
}

