import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/UI': path.resolve(__dirname, './src/UI'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/data': path.resolve(__dirname, './src/data'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
