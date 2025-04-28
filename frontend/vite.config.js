import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
  },
})
