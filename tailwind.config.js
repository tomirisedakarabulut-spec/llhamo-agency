/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'tablet': '834px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'lhamo-black': '#000000',
        'lhamo-crimson': '#D72638',
        'lhamo-gold': '#FFD700',
        'lhamo-white': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'space-grotesk': ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

