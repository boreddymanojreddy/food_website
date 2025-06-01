/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9e6ee',
          100: '#f2cddd',
          200: '#e69bbb',
          300: '#d96899',
          400: '#cc3677',
          500: '#7D0633', // main primary
          600: '#6e052d',
          700: '#5f0427',
          800: '#4f0321',
          900: '#40021b',
        },
        accent: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#FFB800', // main accent
          600: '#e6a600',
          700: '#cc9300',
          800: '#b38000',
          900: '#996d00',
        },
        success: {
          500: '#4CAF50',
        },
        warning: {
          500: '#FF9800',
        },
        error: {
          500: '#F44336',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};