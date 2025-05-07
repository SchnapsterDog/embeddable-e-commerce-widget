// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'EcomWidget',
      fileName: () => 'widget.js',
      formats: ['iife'], // IIFE = works via <script>
    },
    rollupOptions: {
      output: {
        globals: {},
    }},
    emptyOutDir: true,
    minify: 'terser',
  },
});
