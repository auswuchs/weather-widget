
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/weather-widget/',
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        entryFileNames: 'weather-widget.js',
      },
    },
  }
})
