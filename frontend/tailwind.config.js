/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        neon: {
          violet: "#7c3aed",
          coral: "#f43f5e",
          cyan: "#06b6d4",
          mint: "#10b981",
          amber: "#f59e0b",
          pink: "#ec4899",
        },
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(124,58,237,0.35)",
        "glow-cyan": "0 0 40px -12px rgba(6,182,212,0.35)",
        "glow-coral": "0 0 40px -12px rgba(244,63,94,0.35)",
        soft: "0 20px 60px -20px rgba(15,23,42,0.18)",
        "soft-lg": "0 32px 80px -24px rgba(15,23,42,0.22)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
