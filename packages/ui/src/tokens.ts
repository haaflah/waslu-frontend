export const tokens = {
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
    success: { 100: "#dcfce7", 700: "#15803d" },
    warning: { 100: "#fef3c7", 700: "#b45309" },
    danger: { 100: "#fee2e2", 700: "#b91c1c" }
  },
  screens: { xs: "360px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px" }
} as const;
