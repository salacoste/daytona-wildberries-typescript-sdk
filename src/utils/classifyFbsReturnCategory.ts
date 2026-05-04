import type { ReturnCategory } from '../types/returns.types';

/**
 * Single FBS status event from order status history.
 * Consumer shapes this from their `order_wb_status_history` table or SDK call.
 *
 * @since v3.10.0
 */
export interface FbsStatusEvent {
  /** Status code (e.g., 'new', 'confirmed', 'assembled', 'delivered', 'cancelled', 'defected', 'returned', 'canceled_by_client'/'cancelled_by_client') */
  status: string;
  /** ISO 8601 timestamp when status was set */
  date: string;
}

/**
 * Classifies an FBS order's return category by analyzing its status history.
 *
 * **Heuristic** — based on observed WB status transition patterns. May misclassify
 * unusual sequences. Verify accuracy on your production data before relying on
 * results. Returns 'unknown' for sequences that don't match any known pattern.
 *
 * Mapping rules (in priority order):
 * 1. **`cancel_before_shipment`** — sequence ends with `cancelled`/`canceled` AND
 *    no `confirmed`/`assembled` status appears earlier (cancelled before warehouse picked up)
 * 2. **`refusal_at_pvz`** — `delivered` status followed by `defected` or `canceled_by_client`
 *    (buyer arrived at pickup point and refused the package)
 * 3. **`return_after_receipt`** — `delivered` status followed later by `returned`
 *    (buyer accepted the package, then initiated a return)
 * 4. **`unknown`** — empty array, no return-indicating status, or ambiguous sequence
 *
 * @param statuses - Chronologically ordered FBS status events. If unordered, function sorts by date.
 * @returns Categorized return type
 *
 * @example
 * ```typescript
 * const category = classifyFbsReturnCategory([
 *   { status: 'new', date: '2026-04-01T10:00:00Z' },
 *   { status: 'confirmed', date: '2026-04-01T11:00:00Z' },
 *   { status: 'assembled', date: '2026-04-02T09:00:00Z' },
 *   { status: 'delivered', date: '2026-04-05T14:00:00Z' },
 *   { status: 'returned', date: '2026-04-09T11:00:00Z' },
 * ]);
 * // → 'return_after_receipt'
 * ```
 *
 * @since v3.10.0
 */
export function classifyFbsReturnCategory(statuses: FbsStatusEvent[]): ReturnCategory {
  if (statuses.length === 0) return 'unknown';

  // Sort defensively by date
  const sorted = [...statuses].sort((a, b) => a.date.localeCompare(b.date));
  const codes = sorted.map((s) => s.status.toLowerCase());

  const hasDelivered = codes.includes('delivered');
  const hasReturned = codes.includes('returned');
  const hasCancelled = codes.some((c) => c === 'cancelled' || c === 'canceled');
  const hasDefected = codes.includes('defected');
  const hasClientCanceled = codes.some(
    (c) => c === 'canceled_by_client' || c === 'cancelled_by_client'
  );
  const hasConfirmed = codes.some((c) => c === 'confirmed' || c === 'assembled');

  // ASSUMPTION: WB FBS orderIds are not reused across shipments — each new
  // shipment gets a new orderId. Therefore indexOf() finding the FIRST
  // 'delivered'/'returned' is sufficient. If WB ever changes this contract,
  // these rules need to track ALL occurrences, not just first.

  // Rule 3: delivered → returned (after_receipt)
  if (hasDelivered && hasReturned) {
    const deliveredIdx = codes.indexOf('delivered');
    const returnedIdx = codes.indexOf('returned');
    if (returnedIdx > deliveredIdx) return 'return_after_receipt';
  }

  // Rule 2: delivered → defected/canceled_by_client (refusal_at_pvz)
  if (hasDelivered && (hasDefected || hasClientCanceled)) {
    const deliveredIdx = codes.indexOf('delivered');
    const refusalIdx = Math.min(
      hasDefected ? codes.indexOf('defected') : Infinity,
      hasClientCanceled
        ? (() => {
            const i1 = codes.indexOf('canceled_by_client');
            const i2 = codes.indexOf('cancelled_by_client');
            return Math.min(i1 < 0 ? Infinity : i1, i2 < 0 ? Infinity : i2);
          })()
        : Infinity
    );
    if (refusalIdx > deliveredIdx) return 'refusal_at_pvz';
  }

  // Rule 1: cancelled before any confirmed/assembled (cancel_before_shipment)
  if (hasCancelled && !hasConfirmed) return 'cancel_before_shipment';

  return 'unknown';
}
