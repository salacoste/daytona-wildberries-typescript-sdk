/**
 * Global test setup file
 *
 * Configures global test environment settings and suppressions.
 */

// Suppress expected PromiseRejectionHandledWarning that occurs when testing
// retry logic with Vitest fake timers. These warnings are expected behavior
// when promises reject during timer advancement.
const originalEmit = process.emit.bind(process);

// @ts-expect-error - Overriding process.emit for warning suppression
process.emit = function (event: string, warning: Error, ...args: unknown[]) {
  if (
    event === 'warning' &&
    warning.name === 'PromiseRejectionHandledWarning'
  ) {
    // Suppress this specific warning
    return false;
  }
  // @ts-expect-error - Types are correct but complex
  return originalEmit(event, warning, ...args);
};
