/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B1F',
        surface: '#15152E',
        primary: '#8B5CF6',
        secondary: '#22D3EE',
      }
    },
  },
  plugins: [],
}
