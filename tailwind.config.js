/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0d1117",
          surface: "#161b22",
          primary: "#00d4ff",
          secondary: "#7c3aed",
          textMain: "#e6edf3",
          textMuted: "#8b949e",
          border: "#30363d",
        },
        light: {
          bg: "#f8fafc",
          surface: "#ffffff",
          primary: "#0891b2",
          secondary: "#7c3aed",
          textMain: "#0f172a",
          textMuted: "#64748b",
          border: "#e2e8f0",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        code: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 1.5s infinite",
        float: "float 6s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 2s infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px var(--color-dark-primary/0.5), 0 0 20px var(--color-dark-primary/0.3)",
          },
          "100%": {
            boxShadow:
              "0 0 20px var(--color-dark-primary/0.8), 0 0 40px var(--color-dark-primary/0.6)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      boxShadow: {
        "glow-primary":
          "0 0 20px rgba(255, 46, 147, 0.5), 0 0 40px rgba(255, 46, 147, 0.3)",
        "glow-secondary":
          "0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)",
        glass:
          "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
