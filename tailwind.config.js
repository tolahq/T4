/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        ...defaultTheme.borderRadius,
        DEFAULT: '.375rem',
      },
      opacity: {
        15: '.15',
      },
      colors: {
        peach: '#FFA47E',
        gray: {
          50: '#F6F8F8',
          100: '#F1F3F4',
          200: '#E2E7E9',
          300: '#C7CED1',
          400: '#9DAAAE',
          500: '#73858C',
          600: '#5C6A70',
          700: '#455054',
          800: '#232829',
          900: '#0B0C0D',
        },
        black: '#000000',
        // tmp colors that should be fixed according to 100-900 scale
        'cream-light': '#FEFDF0',
        'blue-light': '#6AC4E9',
        primary: {
          50: '#EEE7FF',
          100: '#D2C5FE',
          200: '#B39EFF',
          300: '#9074FF',
          400: '#7054FF',
          DEFAULT: '#4733FF',
          500: '#4733FF',
          600: '#342FF8',
          700: '#0027F0',
          800: '#0021EB',
          900: '#1013E5',
        },
      },
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        sans: ['Monument Grotesk', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
