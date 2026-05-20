import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        label: "var(--label)",
        card: "var(--card)",
        border: "var(--border)",
      },
      maxWidth: {
        content: "960px",
      },
      borderRadius: {
        pill: "999px",
      },
      backdropBlur: {
        nav: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
