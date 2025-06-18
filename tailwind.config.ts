// ✅ tailwind.config.ts hoặc tailwind.config.js
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './app/**/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  experimental: {
    disableColorPalette: true
  },
  theme: {
    extend: {
      colors: {
        red: {
          500: '#ef4444',
          600: '#dc2626',
        },
        blue: {
          500: '#3b82f6',
        },
        green: {
          500: '#10b981',
        },
        primary: '#f43f5e',
        secondary: '#3b82f6',
      },
    },
  },
}
