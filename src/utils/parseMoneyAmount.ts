/**
 * Parse a money amount string from v1 finance reports to a JavaScript number.
 *
 * WB v1 finance report endpoints return money amounts as **strings** (e.g., `"367.99"`) to avoid
 * JS float precision loss on very large amounts. Use this helper when you need JS number math
 * (e.g., for sums, averages, comparisons) and don't need exact precision beyond ~15 significant digits.
 *
 * **Precision warning**: For amounts with more than 15 significant digits (extremely rare in WB
 * reports, but possible in aggregated sums), use a dedicated decimal library (decimal.js, big.js)
 * instead. For all typical seller amounts (< 10^12 kopecks), parseFloat is safe.
 *
 * **Behavior**:
 * - Valid numeric string → parsed number (e.g., `"367.99"` → `367.99`)
 * - `null` / `undefined` / empty string → `0`
 * - Non-numeric string → `0` (NaN from parseFloat is converted to 0)
 * - Scientific notation → parsed (e.g., `"1e10"` → `10000000000`)
 *
 * @param value - Money string from a v1 finance report field, or null/undefined
 * @returns Parsed number, or 0 if input is null/undefined/empty/invalid
 *
 * @example
 * ```typescript
 * import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
 *
 * const rows = await sdk.finances.getSalesReportsDetailed({ dateFrom, dateTo });
 * const total = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
 * ```
 *
 * @since v3.7.0
 */
export function parseMoneyAmount(value?: string | null): number {
  if (value == null || value === '') return 0;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}
