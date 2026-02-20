/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.php",
     "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
     "./templates/**/*.php",
  ],
  theme: {
    extend: {
      colors: {

        /* Твои фирменные */
        brand: {
          DEFAULT: "#1D4ED8",   // bg-brand
          strong: "#1E40AF",    // hover:bg-brand-strong
          medium: "#BFDBFE",    // focus:ring-brand-medium
        },

        heading: "#0F172A",     // text-heading
        body: "#475569",        // text-body,

        /* Добавляем primary palette (Flowbite-совместимая) */
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },

        /* Нейтральные если понадобятся */
        neutral: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

      },

      borderRadius: {
        base: "0.5rem",
      },

      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.05)",
      },

      borderColor: {
        default: "#E5E7EB",
      },

      backgroundColor: {
        "neutral-primary-soft": "#FFFFFF",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
  safelist: [
    "block","w-full",
    "mb-2",
    "text-sm","font-medium",
    "text-gray-900","dark:text-gray-300",
    "shadow-sm",
    "bg-gray-50",
    "border","border-gray-300",
    "rounded-lg",
    "p-2.5","p-3",
  ],
};




