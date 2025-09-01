/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          650: '#4a5568',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
      }
    },
  },
  plugins: [],
};