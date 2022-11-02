/* 
 *    Copyright 2022 Insight authors
 *   
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *  
 *        http://www.apache.org/licenses/LICENSE-2.0
 *  
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

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
              return arr[0]
            default :
              return 'vendor'
          }
        }
      }
    }
  }
})
