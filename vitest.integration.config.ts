/**
 * Vitest configuration for MSW v2.x integration tests
 *
 * MSW v2.x requires localStorage to be available at module import time.
 * We use jsdom environment which provides browser globals including localStorage.
 *
 * IMPORTANT: The server.deps.inline setting ensures MSW modules are transformed
 * with the jsdom environment already set up, fixing the localStorage issue.
 */
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    // jsdom environment provides localStorage and other browser APIs
    // that MSW v2.x requires at module initialization time
    environment: 'jsdom',

    // Enable globals (describe, it, expect) without imports
    globals: true,

    // Only run integration tests
    include: ['tests/integration/**/*.test.ts'],

    // No exclusions - run all integration tests
    exclude: ['node_modules', 'dist'],

    // Reporters
    reporters: ['default'],

    // Performance - increased timeout for integration tests with MSW
    testTimeout: 30000,
    hookTimeout: 10000,

    // Use vite-node's server-side deps handling for MSW
    server: {
      deps: {
        inline: ['msw'],
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
