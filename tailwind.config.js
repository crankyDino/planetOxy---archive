/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // textColor: {
      // },
      colors: {
        white: "#fff",
        white: {
          dh: "#ddd",
        },
        "light-gray": {
          dh: "#d9d9d9",
        },
        black: {
          dh: "#161616",
        },
        green: {
          dh: "#72db31",
        },
        red: {
          dh: " darkred",
        },
        "light-pink": {
          dh: " salmon",
        },
        orange: {
          dh: "#e77236",
        },
        blue: {
          dh: "#326dee",
        },
        pink: {
          dh: "#ffd7ba",
        },
      },
      fontFamily: {
        chintzy: ["chintzy"],
        "pokemon-classic": ["Pokemon Classic"],
        comic: ["Comic"],
        "space-mono": ["Space Mono"],
        hanuman: ["Hanuman"],
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
