/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ug: {
          purple: "#5E2750",
          purpleDark: "#441938",
          purpleLight: "#7B3469",
          gold: "#E5A93C",
          goldLight: "#FDE68A",
          goldDark: "#B47E19",
        }
      }
    },
  },
  plugins: [],
}
