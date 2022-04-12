module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
        error: "#EF4923",
      },
    },
  },
  plugins: [],
};
