/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        "fluid-xs": "var(--font-size-xs)",
        "fluid-sm": "var(--font-size-sm)",
        "fluid-base": "var(--font-size-base)",
        "fluid-lg": "var(--font-size-lg)",
        "fluid-xl": "var(--font-size-xl)",
        "fluid-2xl": "var(--font-size-2xl)",
        "fluid-3xl": "var(--font-size-3xl)",
        "fluid-4xl": "var(--font-size-4xl)",
      },
      spacing: {
        "fluid-1": "var(--space-1)",
        "fluid-2": "var(--space-2)",
        "fluid-3": "var(--space-3)",
        "fluid-4": "var(--space-4)",
        "fluid-5": "var(--space-5)",
        "fluid-6": "var(--space-6)",
        "fluid-8": "var(--space-8)",
        "fluid-10": "var(--space-10)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "var(--container-padding)",
        },
        screens: {
          sm: "640px",
          md: "768px",
          intermediate: "1000px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        },
      },
      animation: {
        "fluid-spin": "spin calc(var(--transition-duration) * 4) linear infinite",
        "fluid-ping": "ping calc(var(--transition-duration) * 2) cubic-bezier(0, 0, 0.2, 1) infinite",
        "fluid-pulse": "pulse calc(var(--transition-duration) * 2) cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fluid-bounce": "bounce calc(var(--transition-duration) * 2) infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require('@tailwindcss/typography'),
  ],
}

