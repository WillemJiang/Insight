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
  test:{
    environment:'jsdom'
  },
  build: {
    rollupOptions: {
    plugins: [ visualizer( ) ],
      external:['vue'],
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
      
          // echarts is too large to be a single chunk, needed to be splitted
          if (arr[0] == 'echarts') {
            if (arr[2] == 'component' || arr[2] == 'coord') {
              return '_' + arr[0] + '_' + arr[1] + '_' + arr[2];
            }
          
            return '_' + arr[0];
          }
          switch(arr[0]) {
            case '@vue':
            case 'echarts':
            case 'zrender':
              return '_' + arr[0]

            default :
              return '__vendor'
              
          }
        }
      }
    }
  },
})
