import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 7002,
    host: '0.0.0.0',
    watch: {
      ignored: ['**/data/**', '**/server/**', '**/dist/**', '**/blacklane-nextjs/**', '**/.next/**', '**/.git/**', '**/public/templates/**'],
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
