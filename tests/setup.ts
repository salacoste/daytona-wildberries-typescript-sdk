/**
 * Global localStorage polyfill for MSW v2.x compatibility
 * MUST be at the very top, before any imports
 *
 * MSW v2.x uses localStorage for cookie storage in Node.js environment.
 * This polyfill provides a minimal in-memory implementation.
 */
if (typeof globalThis.localStorage === 'undefined') {
  let store: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    removeItem: (key: string): void => {
      const { [key]: _, ...rest } = store;
      store = rest;
    },
    clear: (): void => {
      store = {};
    },
    key: (index: number): string | null => Object.keys(store)[index] ?? null,
    get length(): number {
      return Object.keys(store).length;
    },
  } as Storage;
}

/**
 * Global test setup file
 *
 * Configures global test environment settings and suppressions.
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
