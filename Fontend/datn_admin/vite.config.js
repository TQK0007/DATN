import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-react-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ['react'],
      dirs: ['./src/components'], // tự động import trong thư mục components
      dts: 'auto-imports.d.ts',
    }),
    Components({
      dirs: ['./src/components'], // tự động import component
      dts: 'components.d.ts',
    }),
  ],
})