/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body: ['Exo 2', 'sans-serif'],
        label: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        bitgreen: '#06D6A0',
        bitteal: '#00B4D8',
        bitblue: '#0077B6',
        bitnavy: '#030f1c',
      },
    },
  },
  plugins: [],
}
