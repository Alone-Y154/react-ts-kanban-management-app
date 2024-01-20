/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        700: '#635FC7',
        600: '#A8A4FF',
      },
      secondary: {
        700: '#000112',
        600: '#20212C',
        500: '#2B2C37',
        400: '#3E3F4E',
      },
      grey: {
        700: '#828FA3',
        600: '#E4EBFA',
        500: '#F4F7FD',
        400: '#FFFFFF',
      },
      danger: {
        700: '#EA5555',
        400: '#FF9898',
      }
    },
    extend: {},
  },
  plugins: [],
}

