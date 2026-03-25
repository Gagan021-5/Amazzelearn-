/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        amazze: {
          purple: {
            50: "#f5f3ff",
            100: "#ede9fe",
            200: "#ddd6fe",
            300: "#c4b5fd",
            400: "#a78bfa",
            500: "#8B5CF6",
            600: "#7c3aed",
            700: "#6d28d9",
          },
          mint: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34D399",
            500: "#10b981",
            600: "#059669",
          },
          orange: {
            50: "#fff7ed",
            100: "#ffedd5",
            200: "#fed7aa",
            300: "#fdba74",
            400: "#FB923C",
            500: "#f97316",
            600: "#ea580c",
          },
          pink: {
            50: "#fdf2f8",
            100: "#fce7f3",
            200: "#fbcfe8",
            300: "#f9a8d4",
            400: "#F472B6",
            500: "#ec4899",
            600: "#db2777",
          },
          sky: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38BDF8",
            500: "#0ea5e9",
            600: "#0284c7",
          },
        },
      },
      boxShadow: {
        "purple-glow": "0 8px 32px -8px rgba(139,92,246,0.35)",
        "purple-glow-lg": "0 16px 48px -12px rgba(139,92,246,0.4)",
        "mint-glow": "0 8px 32px -8px rgba(52,211,153,0.35)",
        "orange-glow": "0 8px 32px -8px rgba(251,146,60,0.35)",
        "pink-glow": "0 8px 32px -8px rgba(244,114,182,0.35)",
        "sky-glow": "0 8px 32px -8px rgba(56,189,248,0.35)",
        soft: "0 4px 24px -4px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04)",
        "soft-lg": "0 12px 40px -8px rgba(15,23,42,0.12), 0 4px 6px rgba(15,23,42,0.04)",
        "soft-xl": "0 24px 64px -16px rgba(15,23,42,0.14)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        wiggle: "wiggle 0.4s ease-in-out",
        "bounce-in": "bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
