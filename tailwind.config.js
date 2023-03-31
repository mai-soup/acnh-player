/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "acnh-blue": "#74e0aa",
        "acnh-green-bright": "#bee893",
        "acnh-green-dull": "#c4d9a9",
        "acnh-yellow": "#fbfeb2",
        "acnh-brown": "#dbbf9e",
        grey: "#596a73",
      },
    },
  },
  plugins: [],
};
