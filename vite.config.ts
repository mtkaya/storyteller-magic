import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const apiProxyTarget = env.STORY_API_PROXY_TARGET || 'http://localhost:8787';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: apiProxyTarget,
            changeOrigin: true,
          }
        }
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 800,
        rollupOptions: {
          output: {
            manualChunks(id) {
              // Vendor chunks
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'vendor-react';
                }
                if (id.includes('@capacitor')) {
                  return 'vendor-capacitor';
                }
                return 'vendor';
              }

              // Page chunks
              if (id.includes('/pages/Reader.')) {
                return 'page-reader';
              }
              if (id.includes('/pages/Library.')) {
                return 'page-library';
              }
              if (id.includes('/pages/CreateStory.') || id.includes('/pages/StoryCraftsman.')) {
                return 'page-create';
              }

              // Service chunks
              if (id.includes('/services/')) {
                return 'services';
              }
            }
          }
        }
      }
    };
});
