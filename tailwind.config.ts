import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2E7D32",
          green2: "#388E3C",
          greenlight: "#E8F5E9",
          cream: "#F9FAFB",
          beige: "#F1F5F1",
          ink: "#1A1A2E",
          brown: "#2E7D32",
          brown2: "#388E3C"
        }
      }
    }
  },
  plugins: []
};

export default config;
