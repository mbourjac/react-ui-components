/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Raleway', 'sans-serif'],
      },
      colors: {
        'off-black': '#0c0c0c',
        'off-white': '#fffcf7',
        primary: colors.slate[200],
      },
    },
  },
  plugins: [],
};
