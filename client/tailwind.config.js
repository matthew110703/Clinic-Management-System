/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        accent: "#34d399",
        background: "#f3f4f6",
        text: "#1f2937",
        highlight: "#a7f3d0",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
};
