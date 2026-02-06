/**
 * Global test setup file
 *
 * Configures global test environment settings and suppressions.
 *
 * Note: Integration tests with MSW use jsdom environment (set via environmentMatchGlobs
 * in vitest.config.ts) which provides localStorage. MSW v2.12.9+ works correctly
 * with jsdom environment.
 */

// Suppress expected PromiseRejectionHandledWarning that occurs when testing
// retry logic with Vitest fake timers. These warnings are expected behavior
// when promises reject during timer advancement.
const originalEmit = process.emit.bind(process);

(process.emit as unknown) = function (
  this: NodeJS.Process,
  event: string | symbol,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
): boolean {
  if (
    event === 'warning' &&
    typeof args[0] === 'object' &&
    args[0]?.name === 'PromiseRejectionHandledWarning'
  ) {
    // Suppress this specific warning
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (originalEmit as any).call(this, event, ...args);
};
