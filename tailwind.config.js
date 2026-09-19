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
    },
  },
  plugins: [],
};
