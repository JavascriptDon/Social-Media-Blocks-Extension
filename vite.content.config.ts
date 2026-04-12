import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';

/**
 * Strips CSS imports so the IIFE content script bundle stays self-contained.
 * CSS for the settings panel is already loaded by the popup UI build.
 */
function ignoreCss(): Plugin {
  return {
    name: 'ignore-css',
    transform(_code, id) {
      if (id.endsWith('.css')) return { code: '', map: null };
    },
  };
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/popup.ts'),
      name: 'SocialMediaBlocks',
      fileName: () => 'popup.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  plugins: [ignoreCss()],
});
