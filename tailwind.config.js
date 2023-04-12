/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main':{
          100: '#FF9EA1',
          200: '#F7797D',
          DEFAULT: '#DF4055',
          600: '#BE1941',
        },
        'secondary-green':'#9BEAD2',
        'secondary-yellow' : '#FBD786',
        'secondary-gray': '#6A6061',
      },

      height:{
        '100svh': '100svh' 
      },

      fontFamily:{
        'nunito': ["Nunito", "sans-serif"]
      },
    },
  },
  plugins: [],
}

