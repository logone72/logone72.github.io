import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

const appRoot = new URL('.', import.meta.url);

export default defineConfig({
  root: fileURLToPath(appRoot),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('index.html', appRoot)),
        ko: fileURLToPath(new URL('ko/index.html', appRoot)),
      },
    },
  },
});
