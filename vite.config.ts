import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv';
import inject from '@rollup/plugin-inject'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
        define: {
            global: "globalThis",
        },
        plugins: [
           
        ],
    },
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    }
  },
  build: {
    rollupOptions: {
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
},
})

dotenv.config();
