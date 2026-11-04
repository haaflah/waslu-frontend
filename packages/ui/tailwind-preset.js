/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dce9ff",
          200: "#bdd5ff",
          300: "#92b8ff",
          400: "#5f90ff",
          500: "#3c6ef8",
          600: "#2f56d6",
          700: "#2543ab",
          800: "#223986",
          900: "#22346a"
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a"
        },
        success: {
          100: "#dcfce7",
          700: "#15803d"
        },
        warning: {
          100: "#fef3c7",
          700: "#b45309"
        },
        danger: {
          100: "#fee2e2",
          700: "#b91c1c"
        }
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }]
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem"
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem"
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 23 42 / 0.08)",
        md: "0 4px 8px -2px rgb(15 23 42 / 0.12)",
        lg: "0 10px 20px -4px rgb(15 23 42 / 0.16)"
      },
      screens: {
        xs: "360px"
      }
    }
  }
};

export default preset;
