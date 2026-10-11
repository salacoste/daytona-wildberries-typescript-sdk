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
const liveApiTestsEnabled = process.env.WB_LIVE_API_TESTS === 'true';

export default defineConfig({
  test: {
    // jsdom environment provides localStorage and other browser APIs
    // that MSW v2.x requires at module initialization time
    environment: 'jsdom',

    // Enable globals (describe, it, expect) without imports
    globals: true,

    // The exact opt-in switches this config to the separately selected live file.
    include: liveApiTestsEnabled
      ? ['tests/integration/api.test.ts']
      : ['tests/integration/**/*.test.ts'],

    // Live WB requests require a separate, explicit operator-selected run.
    // The default integration command is restricted to mocked integration tests.
    exclude: liveApiTestsEnabled
      ? ['node_modules', 'dist']
      : ['node_modules', 'dist', 'tests/integration/api.test.ts'],

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
