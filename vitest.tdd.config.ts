import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Vitest configuration for TDD red-phase tests only.
 * These tests are expected to fail — they define expected behavior
 * for unimplemented EPIC changes (EPICs 14–47).
 *
 * Run via: npm run test:tdd
 */
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/tdd/**/*.test.ts'],
    exclude: ['node_modules', 'dist', '**/*.d.ts'],
    reporters: ['verbose'],
    testTimeout: 30000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
