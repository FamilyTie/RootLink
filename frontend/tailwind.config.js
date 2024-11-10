/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      screens: {
        'laptop' : '1495px',
        'laptop-sm': '1390px',
        'tablet': '1390px',
        'tablet-sm': '1175px',
        'tablet-xs': '930px',
        'phone-lg': '540px',
        'phone-sm': '410px'

      }
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
