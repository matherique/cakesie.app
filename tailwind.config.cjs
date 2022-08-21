/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "50px 80px 100px 550px 100px",
      },
    },
  },
  plugins: [],
};
