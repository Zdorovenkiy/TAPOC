import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'


//https://vitejs.dev/config/
export default ({ mode }: any) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const env = loadEnv(mode, process.cwd());
  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
        '@icons': fileURLToPath(new URL('./src/assets/images/icons', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '#types': fileURLToPath(new URL('./src/types', import.meta.url)),
      },
      extensions: ['*', '.vue', '.ts']
    },
    define: {
      defaultColors: {
        Black: 'rgba(13, 13, 13, 1)',
        Yellow: 'rgba(255, 241, 0, 1)',
        GrayDark: 'rgba(39, 39, 39, 1)',
        Gray: 'rgba(182, 182, 182, 1)',
        White: 'rgba(255, 255, 255, 1)',
        GrayLight: 'rgba(106, 106, 106, 1)',
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@assets/styles/_variables.scss";`,
        },
      },
    },
    optimizeDeps: { 
      exclude: ["swiper/vue", "swiper/types", "swiper/modules",], 
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
          port: 5173,
          // host: "localhost",
          // protocol: "ws",
      },
    },
  });
}



