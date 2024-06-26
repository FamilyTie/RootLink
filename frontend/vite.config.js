/* eslint-disable */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3761',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  define: {
    "process.env": {},
  },
})
