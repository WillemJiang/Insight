import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test:{
    environment:'jsdom'
  },
  build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
            
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
