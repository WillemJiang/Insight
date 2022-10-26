import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      plugins: [ visualizer( ) ],
      output:{
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          let dependencyName = id.toString().split('node_modules/')[1];
          if (dependencyName.startsWith('.pnpm')) {
            // consider pnpm case
            dependencyName = id.toString().split('node_modules/')[2];
          }
          const arr = dependencyName.split('/');

          switch(arr[0]) {
            case '@vue':
            case 'echarts':
            case 'zrender':
              return '_' + arr[0]
              break;
            default :
              return '__vendor'
              break;
          }
        }
      }
    }
  },
  test:{
    environment:'jsdom'
  }
})
