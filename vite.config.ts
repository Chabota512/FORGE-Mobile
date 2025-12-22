import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'www',
    emptyOutDir: true,
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src/client/src', import.meta.url)),
      "@/components": fileURLToPath(new URL('./src/client/src/components', import.meta.url)),
      "@/pages": fileURLToPath(new URL('./src/client/src/pages', import.meta.url)),
      "@/lib": fileURLToPath(new URL('./src/client/src/lib', import.meta.url)),
      "@/contexts": fileURLToPath(new URL('./src/client/src/contexts', import.meta.url)),
      "@/hooks": fileURLToPath(new URL('./src/client/src/hooks', import.meta.url)),
    },
  },
  publicDir: 'public',
})
