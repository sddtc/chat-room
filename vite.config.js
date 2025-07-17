import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/vitest-setup.js'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.exclude,
        'src/index.jsx'
      ]
    }
  }
})