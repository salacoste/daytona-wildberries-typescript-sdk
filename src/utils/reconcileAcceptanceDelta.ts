import type { AcceptanceReportDownloadItem } from '../types/reports.types';

/**
 * Per-nmId acceptance delta (declared vs accepted).
 *
 * @since v4.1.0
 */
export interface AcceptanceDeltaItem {
  nmId: number;
  declared: number;
  accepted: number;
  /** declared - accepted (negative = over-accepted). */
  delta: number;
  /** true when delta !== 0. */
  hasDiscrepancy: boolean;
}

/**
 * Input for {@link reconcileAcceptanceDelta}.
 *
 * @since v4.1.0
 */
export interface ReconcileAcceptanceDeltaInput {
  /** Declared/packed quantity per nmId (from the seller's own supply/order data). */
  declared: Record<number, number> | Map<number, number>;
  /**
   * Accepted rows from sdk.reports.downloadAcceptanceReport()
   * (already filtered to the supply's incomeId by the caller).
   */
  accepted: AcceptanceReportDownloadItem[];
}

/**
 * Aggregated acceptance reconciliation result.
 *
 * @since v4.1.0
 */
export interface ReconcileAcceptanceDeltaResult {
  /** Sorted by nmId ascending. */
  items: AcceptanceDeltaItem[];
  totalDeclared: number;
  totalAccepted: number;
  totalDelta: number;
  /** Number of items where hasDiscrepancy === true. */
  discrepancyCount: number;
}

/**
 * Reconciles declared vs accepted quantity per nmId for FBO acceptance.
 *
 * WB exposes no dedicated "act-of-acceptance discrepancy" API. Sellers reconcile
 * client-side: declared quantity (from their own supply/order data) vs accepted
 * quantity (from the acceptance report). This helper is the pure diff — no
 * network calls, no WB ID-mapping assumptions.
 *
 * Behaviour:
 * - `declared` may be a `Record<number, number>` or a `Map<number, number>`.
 * - `accepted` rows are aggregated by `nmID`, summing `count`.
 * - Rows without an `nmID` are skipped; missing `count` is treated as 0.
 * - The result unions every nmId present in either input.
 * - `delta = declared - accepted` (negative means over-accepted).
 *
 * Pure function — no side effects, no network calls.
 *
 * @example
 * ```typescript
 * // Declared quantities from your own packing list for one supply (incomeId=500).
 * const declared: Record<number, number> = { 12345: 10, 67890: 5 };
 *
 * // Accepted rows pulled from the SDK, pre-filtered to this supply's incomeId.
 * const allAccepted = await sdk.reports.downloadAcceptanceReport({ /* ... *\/ });
 * const accepted = allAccepted.filter((row) => row.incomeId === 500);
 *
 * const result = reconcileAcceptanceDelta({ declared, accepted });
 * for (const item of result.items) {
 *   if (item.hasDiscrepancy) {
 *     console.warn(`nmId=${item.nmId} short by ${item.delta}`);
 *   }
 * }
 * console.log(`Total discrepancy: ${result.totalDelta} (across ${result.discrepancyCount} items)`);
 * ```
 *
 * @since v4.1.0
 */
export function reconcileAcceptanceDelta(
  input: ReconcileAcceptanceDeltaInput
): ReconcileAcceptanceDeltaResult {
  const declaredMap =
    input.declared instanceof Map
      ? new Map<number, number>(input.declared)
      : new Map<number, number>(Object.entries(input.declared).map(([k, v]) => [Number(k), v]));

  const acceptedMap = new Map<number, number>();
  for (const row of input.accepted) {
    if (row.nmID === undefined) continue;
    const current = acceptedMap.get(row.nmID) ?? 0;
    acceptedMap.set(row.nmID, current + (row.count ?? 0));
  }

  const nmIds = new Set<number>([...declaredMap.keys(), ...acceptedMap.keys()]);

  const items: AcceptanceDeltaItem[] = [];
  let totalDeclared = 0;
  let totalAccepted = 0;
  let totalDelta = 0;
  let discrepancyCount = 0;

  for (const nmId of nmIds) {
    const declared = declaredMap.get(nmId) ?? 0;
    const accepted = acceptedMap.get(nmId) ?? 0;
    const delta = declared - accepted;
    const hasDiscrepancy = delta !== 0;

    items.push({ nmId, declared, accepted, delta, hasDiscrepancy });

    totalDeclared += declared;
    totalAccepted += accepted;
    totalDelta += delta;
    if (hasDiscrepancy) discrepancyCount += 1;
  }

  items.sort((a, b) => a.nmId - b.nmId);

  return {
    items,
    totalDeclared,
    totalAccepted,
    totalDelta,
    discrepancyCount,
  };
}
