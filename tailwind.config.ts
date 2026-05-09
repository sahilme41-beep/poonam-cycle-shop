import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#6B3F1D",
          brown2: "#7A4A23",
          beige: "#F7F0E6",
          cream: "#FFF9F1",
          ink: "#1F1B16"
        }
      }
    }
  },
  plugins: []
};

export default config;
