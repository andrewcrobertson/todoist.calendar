/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-fill': 'repeat(auto-fill, minmax(2rem, auto))',
        'auto-fit': 'repeat(auto-fit, minmax(2rem, auto))'
      },
      width: {
        '21': '21cm',
        '45': '45%'
      },
      height: {
        '29': '29cm'
      }
    },
  },
  plugins: [],
}
