/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#15345B",
          "navy-dark": "#0B1D33",
          blue: "#2563EB",
          "blue-dark": "#1D4ED8",
          cyan: "#38BDF8",
          "cyan-dark": "#0284C7",
          text: "#172B4D",
          muted: "#64748B",
          border: "#E2E8F0",
          soft: "#F0F7FF",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 10px 30px -5px rgba(21, 52, 91, 0.08), 0 4px 6px -2px rgba(21, 52, 91, 0.04)',
        'elevated': '0 20px 40px -15px rgba(21, 52, 91, 0.12)',
        'blue-glow': '0 12px 30px -10px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [],
}
