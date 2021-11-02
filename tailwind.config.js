module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      main: {
        light: "#282C51",
        default: "#1E2140",
        dark: "#151932",
      },
      orange: {
        default: "#F8716E",
        darker: "#C45957",
      },
      font: {
        default: "#D7E0FF",
        dark: "#4E526D",
      },
    },
    letterSpacing: {
      extraWide: "1em",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
