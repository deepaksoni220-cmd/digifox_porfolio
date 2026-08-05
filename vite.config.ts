import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/ai-builder/preset/drinking5d': {
        target: 'https://digifox-onlinestore.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai-builder\/preset\/drinking5d/, '')
      },
      '/ai-builder/preset/bnrmlss2': {
        target: 'https://digifox-storedemo-gqiq.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai-builder\/preset\/bnrmlss2/, '')
      },
      '/ai-builder/preset/aero': {
        target: 'http://localhost:1002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai-builder\/preset\/aero/, '')
      }
    }
  }
})
