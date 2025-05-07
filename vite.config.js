import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 1. Tell Vite where your static files live:
  publicDir: 'public',

  // 2. On `npm run dev`, open `/preview.html` automatically:
  server: {
    open: '/preview.html',
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    // 3. Keep your library build as-is:
    lib: {
      entry: resolve(__dirname, 'src/widget.js'),
      name: 'EcomWidget',
      fileName: () => 'widget.min.js',
      formats: ['iife'],
    },

    // 4. Use esbuild or terser, as preferred:
    minify: 'esbuild',
  }
});
