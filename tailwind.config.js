/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',  // 你的 HTML 文件
    './src/**/*.{vue,js,ts,jsx,tsx}',  // 扫描所有 Vue、JavaScript 和 TypeScript 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
