import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',          
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/widget.js',
      name: 'EcomWidget',
      fileName: () => 'widget.min.js',
      formats: ['iife']
    },
    minify: 'esbuild',
  },
  server: {
    port: 5173,
    open: false
  }
});
