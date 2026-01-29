/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A3FF", // Electric Blue
          500: "#00A3FF",
          600: "#0080C7",
          900: "#003352",
        },
        secondary: {
          DEFAULT: "#0047AB", // Deep Royal
          accent: "#FF6B00",  // Sunset Orange
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        ripple: "ripple 2s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
