/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".stroke-2": {
          strokeWidth: "2",
        },
      }
      addUtilities(newUtilities)
    },
  ],
  variants: {
    scrollbar: ["rounded"],
  },
}
