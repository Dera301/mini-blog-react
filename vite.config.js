import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mini-blog-react/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser', // Cette ligne cause l'erreur si terser n'est pas installé
    terserOptions: {
      compress: {
        drop_console: true, // Supprime les console.log en production
        drop_debugger: true // Supprime les debugger
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})