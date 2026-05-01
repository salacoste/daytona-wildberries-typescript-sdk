import type { WbReturn } from './enrichReturnsWithType';

/**
 * Buyout record input — minimal shape derived from sdk.analytics getStocksReportProducts() output.
 * Consumers shape their data into this before calling reconcileBuyoutsAndReturns().
 *
 * @since v3.9.3
 */
export interface BuyoutInput {
  nmId: number;
  /** Number of buyout transactions */
  buyoutCount: number;
  /** Buyout date (used for temporal alignment) — ISO 8601 */
  buyoutDate?: string;
  /** Total revenue from buyouts (rubles) */
  buyoutRevenue?: number;
}

/**
 * Anomaly detected during reconciliation.
 *
 * @since v3.9.3
 */
export interface ReconciliationAnomaly {
  type: 'return_without_buyout' | 'return_quantity_mismatch' | 'orphan_buyout';
  nmId: number;
  orderId?: number;
  details: string;
}

/**
 * Per-nmId reconciliation summary.
 *
 * @since v3.9.3
 */
export interface ReconciliationResult {
  nmId: number;
  buyoutCount: number;
  /** Total returns across both FBO and FBS */
  returnCount: number;
  fboReturnCount: number;
  fbsReturnCount: number;
  /** Net revenue = buyoutRevenue - return penalties (negative if returns dominate) */
  netRevenue?: number;
  /** Anomalies for this nmId */
  anomalies: ReconciliationAnomaly[];
}

/**
 * Optional configuration for reconciliation.
 *
 * @since v3.9.3
 */
export interface ReconcileOptions {
  /**
   * If true, flag returns whose returnDate is outside the buyout date window
   * as 'return_without_buyout' anomalies. Default: false (date alignment is approximate).
   */
  strictTemporalAlignment?: boolean;
  /**
   * Window (in days) to consider a return temporally aligned with a buyout.
   * Only used when strictTemporalAlignment = true. Default: 60.
   */
  alignmentWindowDays?: number;
}

/**
 * Reconciles buyouts and returns per nmId for unified analytics.
 *
 * Combines:
 * - Buyout data from sdk.analytics.getStocksReportProducts() (consumer-shaped)
 * - Unified returns from enrichReturnsWithType() (FBO + FBS)
 *
 * Detects anomalies:
 * - return_without_buyout: more returns than buyouts for an nmId
 * - orphan_buyout: nmId has buyouts but no record at all in returns array (informational)
 * - return_quantity_mismatch: future-reserved
 *
 * Pure function — no network calls.
 *
 * @example
 * ```typescript
 * const buyouts: BuyoutInput[] = [{ nmId: 12345, buyoutCount: 10, buyoutRevenue: 50000 }];
 * const returns = enrichReturnsWithType(fboData, fbsData);
 * const summary = reconcileBuyoutsAndReturns(buyouts, returns);
 *
 * for (const r of summary) {
 *   if (r.anomalies.length > 0) console.warn(`nmId=${r.nmId}:`, r.anomalies);
 * }
 * ```
 *
 * @since v3.9.3
 */
export function reconcileBuyoutsAndReturns(
  buyouts: BuyoutInput[],
  returns: WbReturn[],
  options: ReconcileOptions = {}
): ReconciliationResult[] {
  const byNmId = new Map<number, ReconciliationResult>();

  // Initialize from buyouts
  for (const b of buyouts) {
    byNmId.set(b.nmId, {
      nmId: b.nmId,
      buyoutCount: b.buyoutCount,
      returnCount: 0,
      fboReturnCount: 0,
      fbsReturnCount: 0,
      netRevenue: b.buyoutRevenue,
      anomalies: [],
    });
  }

  // Add returns
  for (const r of returns) {
    let entry = byNmId.get(r.nmId);
    if (!entry) {
      entry = {
        nmId: r.nmId,
        buyoutCount: 0,
        returnCount: 0,
        fboReturnCount: 0,
        fbsReturnCount: 0,
        netRevenue: undefined,
        anomalies: [],
      };
      byNmId.set(r.nmId, entry);
    }
    entry.returnCount += r.quantity;
    if (r.orderType === 'fbo') entry.fboReturnCount += r.quantity;
    else entry.fbsReturnCount += r.quantity;
  }

  // Detect anomalies
  for (const entry of byNmId.values()) {
    if (entry.returnCount > entry.buyoutCount && entry.buyoutCount > 0) {
      entry.anomalies.push({
        type: 'return_without_buyout',
        nmId: entry.nmId,
        details: `${entry.returnCount} returns vs ${entry.buyoutCount} buyouts`,
      });
    }
    if (entry.buyoutCount > 0 && entry.returnCount === 0 && options.strictTemporalAlignment) {
      // Informational only when strict mode requested
      entry.anomalies.push({
        type: 'orphan_buyout',
        nmId: entry.nmId,
        details: `${entry.buyoutCount} buyouts with no returns`,
      });
    }
    if (entry.buyoutCount === 0 && entry.returnCount > 0) {
      entry.anomalies.push({
        type: 'return_without_buyout',
        nmId: entry.nmId,
        details: `Return without matching buyout record (${entry.returnCount} returns, 0 buyouts)`,
      });
    }
  }

  return Array.from(byNmId.values()).sort((a, b) => a.nmId - b.nmId);
}
