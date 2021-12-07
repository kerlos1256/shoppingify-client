module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#F9A109",
        secendary: "#FFF0DE",
        darkBrown: "#454545",
        darkGray: "#C1C1C4",
        darkCrimsion: "#80485B",
      },
      spacing: {
        120: "30rem",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      height: {
        fit: "fit-content",
      },
      width: {
        fit: "fit-content",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
    },
  },
  plugins: [],
};
