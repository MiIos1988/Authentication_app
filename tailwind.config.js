/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      'fs-acc': '26px',
      'fs-ham':'14px'
    },
    // colors: {
    //   'col-acc': '#FFF',
    // },
    width: {
      'acc-76': '300px',
    }
    
  },
  plugins: [],
}

