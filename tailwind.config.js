// ✅ tailwind.config.ts hoặc tailwind.config.js
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f472b6',
      },
    },
  },
  experimental: {
    disableColorPalette: true // ⬅️ NGẮT màu OKLCH nếu dùng Tailwind v4
  },
}
