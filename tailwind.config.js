/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F3F2EC',
        surface: '#FFFFFF',
        ink: '#16211D',
        inksoft: '#4A5750',
        teal: { DEFAULT: '#1F6F5C', deep: '#14453A' },
        marigold: '#E0952E',
        brick: '#B0483B',
        line: '#DEDACE',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
