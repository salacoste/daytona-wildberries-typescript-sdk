/**
 * Centralized deprecation warning utility
 *
 * Provides once-per-process deprecation warnings with a clean API.
 * Replaces per-module static boolean flags with a central registry.
 *
 * @module utils/deprecation
 * @since v3.8.0
 */

/** Set of method keys that have already emitted a deprecation warning this process. */
const _warned = new Set<string>();

/**
 * Emit a deprecation warning for a method, at most once per process.
 *
 * @param methodKey - Unique identifier for the deprecated method (e.g. 'FinancesModule.getSupplierReportDetailByPeriod')
 * @param message - The warning message to display
 *
 * @example
 * ```typescript
 * warnOnce(
 *   'FinancesModule.getSupplierReportDetailByPeriod',
 *   '[DEPRECATED] getSupplierReportDetailByPeriod() is deprecated. Migrate to getSalesReportsDetailed().'
 * );
 * ```
 */
export function warnOnce(methodKey: string, message: string): void {
  if (_warned.has(methodKey)) return;
  _warned.add(methodKey);
  // eslint-disable-next-line no-console -- Intentional deprecation warning
  console.warn(message);
}

/**
 * Reset all deprecation warning flags. **Test helper only.**
 *
 * Call in `beforeEach` to ensure deprecation warnings fire again in each test.
 *
 * @example
 * ```typescript
 * import { resetDeprecationWarnings } from 'daytona-wildberries-typescript-sdk';
 *
 * beforeEach(() => {
 *   resetDeprecationWarnings();
 * });
 * ```
 */
export function resetDeprecationWarnings(): void {
  _warned.clear();
}
