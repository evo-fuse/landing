/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        main: {
          DEFAULT: '#B9F5C2',
          [100]: '#E6F9E6',
          [200]: '#CFF2CF',
          [300]: '#B9EBC9',
          [400]: '#A3E4A3',
          [500]: '#8DDB8D',
          [600]: '#77D277',
          [700]: '#61C961',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
