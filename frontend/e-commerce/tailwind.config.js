/** @type {import('tailwindcss').Config} */
const daisyuiThemes = require('daisyui/src/theming/themes');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      screens: {
        xs: '300px',
        sm: '640px',
        md: '768px',
        lg: '1080px',
        xl: '1280px',
        '2xl': '1400px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes.light,
          'primary': '#123fff',
          'base-100': '#f2f2f2',
          'base-200': '#ffffff',
          'base-300':'#000000',
          'base-content':'#111111',


        },
        dark: {
          ...daisyuiThemes.dark,
          'primary': '#123fff',
          'base-100': '#212121',
          'base-200': '#2e2e2e',
          'base-300':'#000000',
          'base-content':'#ffffff',

        },
      },
    ],
  },
};
