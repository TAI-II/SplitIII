/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#695AE2',
        secondary: '#84E488',
        grey: '#f1f1f1',
      },
      dropShadow:{
        'cartoon': '0px 5px 0px #000000'
      }
    },
  },
  plugins: [],
}
