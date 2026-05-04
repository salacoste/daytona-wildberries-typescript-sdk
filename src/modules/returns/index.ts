/**
 * ReturnsModule — unified return analytics aggregator.
 *
 * Orchestrates FBO, FBS, and Finance sources into a single `ReturnItem[]`
 * with full partial-failure tolerance, per-source telemetry, and srid-based
 * finance enrichment.
 *
 * @module
 * @since v3.10.0
 */

import type { BaseClient } from '../../client/base-client';
import type { ReportsModule } from '../reports';
import type { OrdersFbsModule } from '../orders-fbs';
import type { FinancesModule } from '../finances';
import type { GoodsReturnItem } from '../../types/reports.types';
import type { SalesReportDetailedItem } from '../../types/finances.types';
import { classifyReturnReason } from '../../utils/classifyReturnReason';
import { parseMoneyAmount } from '../../utils/parseMoneyAmount';
import type {
  ReturnItem,
  ReturnStatus,
  ReturnsApiRequest,
  ReturnsApiResponse,
  PartialFailure,
  ReturnsMeta,
  ReturnByOrderIdParams,
  ReturnStatsParams,
  ReturnStatsResult,
  ReturnStatsBucket,
} from '../../types/returns.types';

// ============================================================================
// Private helpers
// ============================================================================

/**
 * Validates the date range. Throws for invalid date strings, ranges > 31 days,
 * or if dateFrom > dateTo.
 */
function validateDateRange(dateFrom: string, dateTo: string): void {
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  if (isNaN(from.getTime())) {
    throw new Error(`Invalid dateFrom: '${dateFrom}' is not a valid date string`);
  }
  if (isNaN(to.getTime())) {
    throw new Error(`Invalid dateTo: '${dateTo}' is not a valid date string`);
  }
  const diffMs = to.getTime() - from.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  if (diffDays < 0) {
    throw new Error(`dateFrom (${dateFrom}) must be <= dateTo (${dateTo})`);
  }
  if (diffDays > 31) {
    throw new Error(
      `Date range exceeds 31-day limit (got ${Math.round(diffDays)} days). ` +
        `WB getAnalyticsGoodsReturn supports max 31 days. ` +
        `Split your range and call getReturns() multiple times.`
    );
  }
}

/**
 * Derives the return status for an FBO goods-return record.
 *
 * Rules (in order):
 * - `isStatusActive === 1` → `'initiated'` (still in flight)
 * - `isStatusActive === 0` and `completedDt` present → `'processed'`
 * - otherwise → `'received'`
 */
function deriveFboReturnStatus(item: GoodsReturnItem): ReturnStatus {
  if (item.isStatusActive === 1) return 'initiated';
  if (item.isStatusActive === 0 && item.completedDt) return 'processed';
  return 'received';
}

/**
 * Maps a `GoodsReturnItem` array from the FBO analytics endpoint to unified
 * `ReturnItem[]`. Skips records that are missing required fields.
 */
function mapFboToReturnItems(items: GoodsReturnItem[]): ReturnItem[] {
  const result: ReturnItem[] = [];
  for (const item of items) {
    // Required: nmId, orderId, at least one date field for returnDate
    if (item.nmId === undefined) continue;
    if (!item.orderId && item.orderId !== 0) continue;

    const returnDate = item.completedDt ?? item.readyToReturnDt ?? item.orderDt;
    if (!returnDate) continue;

    result.push({
      orderId: String(item.orderId),
      nmId: item.nmId,
      orderType: 'fbo',
      returnDate,
      returnStatus: deriveFboReturnStatus(item),
      returnReason: item.reason ?? '',
      returnReasonCode: classifyReturnReason(item.reason ?? ''),
      returnCategory: 'unknown',
      quantity: 1,
      srid: item.srid,
    });
  }
  return result;
}

/**
 * Enriches `ReturnItem[]` with `returnAmount` from finance lines.
 *
 * Join strategy (in priority order):
 * 1. Primary: `srid` match (when both sides have srid) — sums all matching lines
 * 2. Fallback: `(orderId, nmId)` tuple — sums all matching lines
 *
 * Finance data only ENRICHES existing rows — it never adds new rows.
 * Multiple finance lines for the same key are SUMMED (not last-write-wins).
 */
function enrichWithFinance(
  items: ReturnItem[],
  financeLines: SalesReportDetailedItem[]
): ReturnItem[] {
  if (financeLines.length === 0) return items;

  // Aggregate forPay per srid and per (orderId, nmId)
  const sumBySrid = new Map<string, number>();
  const sumByOrderNm = new Map<string, number>();
  const sridFromOrderNm = new Map<string, string>(); // for backfill

  for (const line of financeLines) {
    const amount = line.forPay !== undefined ? parseMoneyAmount(line.forPay) : 0;
    if (line.srid) {
      sumBySrid.set(line.srid, (sumBySrid.get(line.srid) ?? 0) + amount);
    }
    if (line.orderId !== undefined && line.nmId !== undefined) {
      const key = `${line.orderId}:${line.nmId}`;
      sumByOrderNm.set(key, (sumByOrderNm.get(key) ?? 0) + amount);
      if (line.srid && !sridFromOrderNm.has(key)) {
        sridFromOrderNm.set(key, line.srid);
      }
    }
  }

  return items.map((item) => {
    let returnAmount: number | undefined;
    let backfilledSrid: string | undefined;

    // 1. Try srid join
    if (item.srid && sumBySrid.has(item.srid)) {
      returnAmount = sumBySrid.get(item.srid);
    } else {
      // 2. Fallback: (orderId, nmId)
      const key = `${item.orderId}:${item.nmId}`;
      if (sumByOrderNm.has(key)) {
        returnAmount = sumByOrderNm.get(key);
        backfilledSrid = sridFromOrderNm.get(key);
      }
    }

    if (returnAmount === undefined) return item;
    return { ...item, returnAmount, srid: item.srid ?? backfilledSrid };
  });
}

/**
 * Deduplicates merged items by `srid` — when the same srid appears more than
 * once (e.g., from FBO and FBS simultaneously), the first occurrence wins.
 * Items without srid are always kept.
 */
function deduplicateBySrid(items: ReturnItem[]): ReturnItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.srid) return true;
    if (seen.has(item.srid)) return false;
    seen.add(item.srid);
    return true;
  });
}

// ============================================================================
// ReturnsModule
// ============================================================================

/**
 * Returns aggregator module — combines FBO, FBS, and Finance sources into a
 * unified `ReturnItem[]` with full partial-failure tolerance.
 *
 * @example
 * ```typescript
 * const result = await sdk.returns.getReturns({
 *   dateFrom: '2026-04-01',
 *   dateTo: '2026-04-30',
 * });
 * console.log(result.data);          // ReturnItem[]
 * console.log(result.partialFailures); // [] or [{ source: 'finance', error: '...' }]
 * ```
 *
 * @since v3.10.0
 */
export class ReturnsModule {
  private readonly reports: ReportsModule;
  private readonly finances: FinancesModule;

  /**
   * Constructor parameters `_client` and `_ordersFBS` are reserved for
   * v3.10.1 FBS status history implementation. The `_` prefix satisfies
   * TypeScript `noUnusedParameters` while preserving the full DI contract
   * documented in story 13.2.
   */
  constructor(
    _client: BaseClient,
    reports: ReportsModule,
    _ordersFBS: OrdersFbsModule,
    finances: FinancesModule
  ) {
    this.reports = reports;
    this.finances = finances;
  }

  /**
   * Fetches all finance lines via cursor pagination on rrdId.
   * Returns up to FINANCE_PAGE_LIMIT × FINANCE_MAX_PAGES rows; if truncated,
   * pushes a warning into the supplied warnings array.
   */
  private async fetchAllFinanceLines(
    dateFrom: string,
    dateTo: string,
    warnings: string[]
  ): Promise<SalesReportDetailedItem[]> {
    const FINANCE_PAGE_LIMIT = 100000;
    const FINANCE_MAX_PAGES = 5; // hard cap = 500k rows (safety bound)
    const all: SalesReportDetailedItem[] = [];
    let rrdId = 0;
    for (let page = 0; page < FINANCE_MAX_PAGES; page++) {
      const chunk = await this.finances.getSalesReportsDetailed({
        dateFrom,
        dateTo,
        limit: FINANCE_PAGE_LIMIT,
        rrdId,
      });
      if (chunk.length === 0) break;
      all.push(...chunk);
      if (chunk.length < FINANCE_PAGE_LIMIT) break;
      // Advance cursor — last item's rrdId (camelCase in SalesReportDetailedItem)
      const last = chunk[chunk.length - 1];
      if (last.rrdId === undefined) break;
      rrdId = last.rrdId;
    }
    // Warn if we hit the safety cap (likely more data exists)
    if (all.length >= FINANCE_PAGE_LIMIT * FINANCE_MAX_PAGES) {
      warnings.push(
        `Finance source truncated at ${all.length} lines (safety cap). ` +
          `Some returnAmount values may be missing for high-volume sellers — ` +
          `narrow your date range and call getReturns() multiple times.`
      );
    }
    return all;
  }

  /**
   * Unified return analytics aggregator.
   *
   * Fetches FBO returns from `sdk.reports.getAnalyticsGoodsReturn()`,
   * optionally FBS returns (reserved — currently skipped), and enriches all
   * records with financial amounts from `sdk.finances.getSalesReportsDetailed()`.
   *
   * Parallel execution via `Promise.allSettled` — one source failing does NOT
   * abort the response; failures are surfaced in `partialFailures`.
   *
   * **Rate limit note**: FBO source is 1 req/min; Finance source is 1 req/min.
   * Both are fetched in parallel to minimise wall-clock time.
   *
   * @param params - Date range, optional filters, and pagination
   * @returns Unified `ReturnsApiResponse` with data, warnings, partialFailures, _meta
   * @throws {Error} If `dateFrom > dateTo`, range exceeds 31 days, or date strings are invalid
   *
   * @example
   * ```typescript
   * const result = await sdk.returns.getReturns({
   *   dateFrom: '2026-04-01',
   *   dateTo: '2026-04-30',
   *   orderType: 'fbo',
   * });
   * result.data.forEach(r => console.log(r.returnReasonCode, r.returnAmount));
   * ```
   *
   * @since v3.10.0
   */
  async getReturns(params: ReturnsApiRequest): Promise<ReturnsApiResponse> {
    // 1. Validate date range
    validateDateRange(params.dateFrom, params.dateTo);

    // 2. Decide which sources to fetch
    // FBS is always skipped in v3.10.0 — implementation deferred
    const fetchFbo = params.orderType !== 'fbs';

    // 3. Build per-source warnings
    const warnings: string[] = [];

    if (params.orderType !== 'fbo') {
      // FBS would have been the target — add appropriate warning
      if (params.includeFbsStatusHistory === true) {
        warnings.push(
          'FBS status history fetching is reserved for future implementation in v3.10.0; FBS source skipped'
        );
      } else {
        warnings.push(
          'FBS status history skipped — pass includeFbsStatusHistory: true to include (currently no-op in v3.10.0)'
        );
      }
    }

    // 4. Parallel fetch with Promise.allSettled
    // FBS slot is omitted — always skipped in v3.10.0 (implementation deferred)
    // Note: Finance is fetched even if FBO fails — by the time we know FBO failed,
    // finance is already in flight (Promise.allSettled). The wasted call costs ~1
    // req/min but eliminates serial latency in the happy path.
    const [fboResult, financeResult] = await Promise.allSettled([
      fetchFbo
        ? this.reports.getAnalyticsGoodsReturn({
            dateFrom: params.dateFrom,
            dateTo: params.dateTo,
          })
        : Promise.resolve(null),
      this.fetchAllFinanceLines(params.dateFrom, params.dateTo, warnings),
    ]);

    // 5. Collect partial failures
    const partialFailures: PartialFailure[] = [];
    if (fboResult.status === 'rejected') {
      partialFailures.push({
        source: 'fbo',
        error:
          fboResult.reason instanceof Error ? fboResult.reason.message : String(fboResult.reason),
      });
    }
    if (financeResult.status === 'rejected') {
      partialFailures.push({
        source: 'finance',
        error:
          financeResult.reason instanceof Error
            ? financeResult.reason.message
            : String(financeResult.reason),
      });
    }

    // 6. Build per-source telemetry
    const fboItems =
      fboResult.status === 'fulfilled' && fboResult.value
        ? mapFboToReturnItems(fboResult.value.report ?? [])
        : [];

    const financeLines = financeResult.status === 'fulfilled' ? financeResult.value : [];

    const meta: ReturnsMeta = {
      sources: {
        fbo: fetchFbo
          ? {
              fetched: fboItems.length,
              skipped: false,
              failed: fboResult.status === 'rejected',
              reason: fboResult.status === 'rejected' ? 'fetch failed' : undefined,
            }
          : { fetched: 0, skipped: true, failed: false, reason: 'orderType filter' },
        fbs: {
          fetched: 0,
          skipped: true,
          failed: false,
          reason: 'v3.10.0: implementation deferred',
        },
        finance: {
          fetched: financeLines.length,
          skipped: false,
          failed: financeResult.status === 'rejected',
          reason: financeResult.status === 'rejected' ? 'fetch failed' : undefined,
        },
      },
    };

    // 7. Enrich with finance data (srid join, fallback orderId+nmId)
    const enriched = enrichWithFinance(fboItems, financeLines);

    // 8. Deduplicate by srid (handles FBO+FBS overlap in future)
    const deduped = deduplicateBySrid(enriched);

    // 9. Apply nmIds post-filter
    const nmIds = params.nmIds;
    const filtered = nmIds ? deduped.filter((r) => nmIds.includes(r.nmId)) : deduped;

    // 10. Sort descending by returnDate
    filtered.sort((a, b) => b.returnDate.localeCompare(a.returnDate));

    // 11. Apply limit / offset pagination
    const offset = params.offset ?? 0;
    const total = filtered.length;
    const limit = params.limit ?? filtered.length;
    const data = filtered.slice(offset, offset + limit);

    return { data, total, warnings, partialFailures, _meta: meta };
  }

  /**
   * Convenience: fetch a single return record by WB orderId.
   *
   * Wraps `getReturns()` and filters in-memory. Date range still required because
   * WB API requires it.
   *
   * @param orderId - WB order ID (string for BigInt safety)
   * @param params - Date window
   * @returns The matching ReturnItem, or `null` if not found
   * @throws {Error} When orderId is empty
   *
   * @example
   * ```typescript
   * const ret = await sdk.returns.getReturnByOrderId('123456789', {
   *   dateFrom: '2026-04-01',
   *   dateTo: '2026-04-30',
   * });
   * if (ret) console.log(ret.returnReason, ret.returnAmount);
   * ```
   *
   * **Important**: When the underlying `getReturns()` partial-failed (e.g., FBO
   * source down), this method may return `null` even though the order exists.
   * If you need failure visibility, call `getReturns()` directly and inspect
   * the `partialFailures` field.
   *
   * @since v3.10.0
   */
  async getReturnByOrderId(
    orderId: string,
    params: ReturnByOrderIdParams
  ): Promise<ReturnItem | null> {
    if (!orderId || orderId.trim() === '') {
      throw new Error('orderId must be a non-empty string');
    }
    const result = await this.getReturns({
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
      orderType: params.orderType,
    });
    return result.data.find((r) => r.orderId === orderId) ?? null;
  }

  /**
   * Convenience: aggregate return statistics grouped by nmId / category / orderType.
   *
   * Calls `getReturns()` once with the same filters, then post-processes in-memory.
   * Buckets sorted by `count` descending (key ascending as tiebreaker).
   *
   * @example
   * ```typescript
   * // Top SKUs by return count
   * const stats = await sdk.returns.getReturnStats({
   *   dateFrom: '2026-04-01',
   *   dateTo: '2026-04-30',
   *   groupBy: 'nmId',
   * });
   * stats.buckets.slice(0, 10).forEach(b => {
   *   console.log(`nmId=${b.key}: ${b.count} returns, ${b.totalAmount} ₽ ` +
   *     `(${b.pendingFinanceCount} pending finance)`);
   * });
   * ```
   *
   * **Important**: When `partialFailures` is non-empty, the bucket counts may be
   * understated — one or more underlying sources failed. Always check
   * `result.partialFailures.length === 0` before trusting zero/low counts.
   *
   * @example
   * ```typescript
   * const stats = await sdk.returns.getReturnStats({ ... });
   * if (stats.partialFailures.length > 0) {
   *   console.warn('Some sources failed:', stats.partialFailures);
   *   // Treat zero counts as "unknown", not "no returns"
   * }
   * ```
   *
   * @since v3.10.0
   */
  async getReturnStats(params: ReturnStatsParams): Promise<ReturnStatsResult> {
    const result = await this.getReturns({
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
      nmIds: params.nmIds,
      orderType: params.orderType,
      // No limit — we want ALL records for accurate stats
    });

    const buckets = new Map<
      string,
      { count: number; totalAmount: number; pendingFinanceCount: number }
    >();

    for (const item of result.data) {
      let key: string;
      switch (params.groupBy) {
        case 'nmId':
          key = String(item.nmId);
          break;
        case 'category':
          key = item.returnCategory;
          break;
        case 'orderType':
          key = item.orderType;
          break;
        default: {
          // Exhaustive check — TypeScript will error if new groupBy values added
          // without handling them here.
          const exhaustive: never = params.groupBy;
          throw new Error(`Unsupported groupBy value: ${String(exhaustive)}`);
        }
      }

      const bucket = buckets.get(key) ?? { count: 0, totalAmount: 0, pendingFinanceCount: 0 };
      bucket.count++;
      if (item.returnAmount !== undefined) {
        bucket.totalAmount += item.returnAmount;
      } else {
        bucket.pendingFinanceCount++;
      }
      buckets.set(key, bucket);
    }

    const bucketArray: ReturnStatsBucket[] = Array.from(buckets.entries()).map(([key, v]) => ({
      key,
      count: v.count,
      totalAmount: v.totalAmount,
      pendingFinanceCount: v.pendingFinanceCount,
    }));

    // Sort: count desc, key asc as tiebreaker
    bucketArray.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.key.localeCompare(b.key);
    });

    return {
      buckets: bucketArray,
      totalReturns: bucketArray.reduce((s, b) => s + b.count, 0),
      totalAmount: bucketArray.reduce((s, b) => s + b.totalAmount, 0),
      warnings: result.warnings,
      partialFailures: result.partialFailures,
      _meta: result._meta,
    };
  }
}
