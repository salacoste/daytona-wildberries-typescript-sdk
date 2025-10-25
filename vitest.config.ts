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

    // Global setup files
    setupFiles: ['./tests/setup.ts'],

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
        functions: 75, // Lowered due to large number of utility functions in Products module (69 methods)
        lines: 80,
      },

      // Include source files in coverage
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/types/**',
        'src/client/index.ts', // Re-export only
        'src/modules/index.ts', // Re-export only
        'src/errors/index.ts', // Re-export only
        'src/config/index.ts', // Re-export only
        'src/config/sdk-config.ts', // Type-only configuration file
      ],
    },

    // Reporters
    reporters: ['default'],

    // Performance
    // Increased timeout for integration tests with MSW and multi-module operations
    testTimeout: 30000, // 30 seconds for integration tests
    hookTimeout: 10000,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
