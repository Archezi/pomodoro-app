module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      main: {
        light: "#282C51",
        default: "#1E2140",
        dark: "#151932",
        darker: "#292929",
      },
      orange: {
        default: "#F8716E",
        darker: "#C45957",
      },
      font: {
        default: "#D7E0FF",
        dark: "#4E526D",
      },
      button: {
        accept: "#1FB919",
        acceptDarker: "#0D520B",
        cancel: "#DD511C",
        cancelDarker: "#292929",
      },
      gray: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
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
