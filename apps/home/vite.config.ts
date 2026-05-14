import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { devServer, routes } from '../../src/router/index.mjs';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: {
    proxy: {
      [routes.blogProxy]: {
        target: devServer.blogTarget,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
