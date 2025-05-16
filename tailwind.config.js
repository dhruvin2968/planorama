/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        Redd: "rgb(255, 0, 0)", // Define your custom red color
        Bluee:"#F9FCFF"

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
