/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./server/resources/views/*.ejs",
    "./server/public/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
