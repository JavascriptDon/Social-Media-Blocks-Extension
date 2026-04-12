import { defineConfig, Plugin } from 'vite';
import { copyFileSync, cpSync } from 'fs';
import { resolve } from 'path';

/**
 * Copies manifest.json and the assets/ folder into dist/ after each build.
 * Chrome extensions require these files alongside the compiled JS/CSS.
 */
function copyExtensionAssets(): Plugin {
  return {
    name: 'copy-extension-assets',
    closeBundle() {
      copyFileSync(
        resolve(__dirname, 'manifest.json'),
        resolve(__dirname, 'dist/manifest.json')
      );
      cpSync(
        resolve(__dirname, 'assets'),
        resolve(__dirname, 'dist/assets'),
        { recursive: true }
      );
    },
  };
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  plugins: [copyExtensionAssets()],
});
