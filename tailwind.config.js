/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b8c9ff',
          400: '#94a8ff',
          500: '#667eea',
          600: '#5568d3',
          700: '#4553b8',
          800: '#3a4694',
          900: '#2d3659',
        },
        secondary: {
          500: '#764ba2',
          600: '#5f3c82',
        }
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
