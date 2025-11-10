/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        primarioUno: "#98BE91",
        primarioDos: "#5B7257",
        primarioUnoInvertido: "#5B7257",
        primarioDosInvertido: "#98BE91",
        auxiliarUno: "#F1DB6E",
        auxiliarDos: "#BEAC56",
        secundarioUno: "#DBCAFF",
        secundarioDos: "#A09AC3",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
