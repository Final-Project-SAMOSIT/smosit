const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./core/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          10: "#CDBFC4",
          20: "#F8E8E6",
          30: "#8E96AA",
          40: "#5F5357",
          50: "#3F3F40",
        },
        primary: {
          10: "#168FBD",
          20: "#45788D",
          30: "#295B8D",
          40: "#3B586A",
        },
        gray: {
          10: "#F3F3F3",
          20: "#F0F0F0",
          30: "#E5E5E5",
          40: "#C1C1C1",
          50: "#808080",
        },
        error: "#EF4923",
      },
    },
    screens: {
      mobile: "320px",
      laptop: "1280px",
    },
  },
  plugins: [],
};
