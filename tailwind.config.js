/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        Redd: "rgb(255, 0, 0)", // Define your custom red color
        Bluee:"#B3EBF2"

      },
      textStroke: {
        DEFAULT: '2px black', // Adjust size and color of the stroke
      },
    },
  },
  plugins: [
    require('tailwindcss-text-stroke'), // Install this plugin
  ],
};
