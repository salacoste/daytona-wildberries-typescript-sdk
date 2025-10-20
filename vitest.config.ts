import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Vitest configuration for Wildberries SDK
 *
 * Context7 Reference: /vitest-dev/vitest - "vitest configuration typescript coverage thresholds"
 * Configured for comprehensive unit and integration testing with coverage enforcement
 */
export default defineConfig({
  test: {
    // Test environment
    environment: 'node',

    // Enable globals (describe, it, expect) without imports
    globals: true,

    // Test file patterns
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist', '**/*.d.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      enabled: false, // Enable via CLI: npm run test:coverage
      reporter: ['text', 'json', 'html', 'lcov'],

      // Coverage thresholds per architecture.md requirements
      thresholds: {
        // ≥90% for core infrastructure (src/client/)
        'src/client/**': {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },

        // ≥80% for API modules (src/modules/)
        'src/modules/**': {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },

        // Global thresholds
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },

      // Include source files in coverage
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/types/**',
      ],
    },

    // Reporters
    reporters: ['default'],

    // Performance
    testTimeout: 10000,
    hookTimeout: 10000,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
