import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/profile/',  // 配置为你的 GitHub Pages 路径
  plugins: [
    vue(),
  ],
})
