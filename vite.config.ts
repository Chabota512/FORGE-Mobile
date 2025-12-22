import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
      "@": path.resolve(__dirname, "./src/client/src"),
      "@/components": path.resolve(__dirname, "./src/client/src/components"),
      "@/pages": path.resolve(__dirname, "./src/client/src/pages"),
      "@/lib": path.resolve(__dirname, "./src/client/src/lib"),
      "@/contexts": path.resolve(__dirname, "./src/client/src/contexts"),
      "@/hooks": path.resolve(__dirname, "./src/client/src/hooks"),
    },
  },
  publicDir: 'public',
})
