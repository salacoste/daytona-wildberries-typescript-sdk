import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Vite configuration for dual ESM + CommonJS builds
 *
 * Context7 Reference: /vitejs/vite - "library mode build configuration"
 * Builds both ES modules (dist/esm/) and CommonJS (dist/cjs/) for maximum compatibility
 */
export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist/esm',
      entryRoot: 'src',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'modules/finances/index': resolve(__dirname, 'src/modules/finances/index.ts'),
        'modules/analytics/index': resolve(__dirname, 'src/modules/analytics/index.ts'),
        'modules/communications/index': resolve(__dirname, 'src/modules/communications/index.ts'),
        'modules/reports/index': resolve(__dirname, 'src/modules/reports/index.ts'),
      },
      name: 'WildberriesSDK',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `esm/${entryName}.js`;
        }
        if (format === 'cjs') {
          // CRITICAL FIX: Use .cjs extension for CommonJS when package.json has "type": "module"
          // This prevents "ReferenceError: exports is not defined" errors
          // See: https://nodejs.org/api/packages.html#determining-module-system
          return `cjs/${entryName}.cjs`;
        }
        return `${format}/${entryName}.js`;
      },
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      // Runtime dependencies will be added here as we implement the SDK
      external: [],
      output: {
        // Preserve module structure for better tree-shaking
        preserveModules: false,
        exports: 'named',
      },
    },
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Generate TypeScript declaration files
    emitAssets: true,
    // Output directory
    outDir: 'dist',
    // Clean output directory before build
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
