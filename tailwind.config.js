/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7f4',
          100: '#ffece5',
          400: '#ff7a59',
          500: '#ff5a36',
          600: '#e6431f',
          700: '#bf3417',
        },
      },
      fontFamily: {
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(41, 37, 36, 0.04), 0 8px 24px -12px rgba(41, 37, 36, 0.18)',
        lifted: '0 4px 8px rgba(41, 37, 36, 0.04), 0 16px 32px -12px rgba(41, 37, 36, 0.24)',
      },
      keyframes: {
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'pop': 'pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-in': 'scale-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
