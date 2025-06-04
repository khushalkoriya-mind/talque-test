/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "off-white": "#F5F5F5",
        "dark-blue": "#227BEF",
      },
      textColor: {
        "talque-primary-color": "#222",
        "talque-secondary-color": "#666",
        "talque-blue-color": "#227BEF",
      },
      lineHeight: {
        94: "94px",
        66: "66px",
        33: "33px",
      },
      fontSize: {
        c43: "43px",
        c65: "65px",
        c40: "40px",
      },
    },
  },
  plugins: [],
};
