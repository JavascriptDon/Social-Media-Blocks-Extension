import { resolve } from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
  resolve: {
    alias: {
      "root": resolve(__dirname),
      "@": resolve(__dirname, "src")
    }
  },
  esbuild: {
    keepNames: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popup: resolve(__dirname,"src/popup.ts"),
      },
      output: {
        entryFileNames: chunkInfo => {
          return `${chunkInfo.name}.js`
        }
      },
    },
  }
});