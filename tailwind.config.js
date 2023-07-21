/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'black' : '000000',
      'primary-1' : '#1D4D4F',
      'primary-2' : '#285F43',
      'primary-3' : '#4AA366',
      'primary-4' : '#5AAE8A',
      'primary-5' : '#DDF1E9',
      'grey-1' : '#2E2D38',
      'grey-2' : '#4D5661',
      'grey-3' : '#6F8094',
      'grey-4' : '#C4C4C4',
      'grey-5' : '#DBDBDB',
      'grey-6' : '#F4F4F4',
      'error-1' : '#6B171F',
      'error-2' : '#D62E3E',
      'error-3' : '#E26D78',
      'error-4' : '#F3C0C5',
      'info-1' : '#C1A063',
      'info-2' : '#FFDD2D',
      'info-3' : '#FEE690',
      'info-4' : '#FFF4CB',
      'blue-1' : '#253365',
      'blue-2' : '#2D81FF',
      'blue-3' : '#90A8FE',
      'blue-4' : '#CBCDFF',
    },
    extend: {
      fontFamily:{
        suitB: ['SUIT-Bold'],
        suitSB: ['SUIT-SemiBold'],
        suitM: ['SUIT-Medium'],
        suitL: ['SUIT-Light'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwind-scrollbar-hide")
  ],
}

