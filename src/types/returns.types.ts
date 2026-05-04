import type { ReturnReasonCode } from '../utils/classifyReturnReason';

/**
 * Current state of a return.
 *
 * NOTE: WB does not expose `'in_transit'` for FBO returns — only the three
 * states below are available across both FBO and FBS sources. Intermediate
 * FBO transit states are omitted intentionally.
 *
 * @since v3.10.0
 */
export type ReturnStatus = 'initiated' | 'received' | 'processed';

/**
 * Categorized return type, derived from order fulfillment path and status history.
 *
 * - `cancel_before_shipment` — buyer cancelled before the seller shipped
 * - `refusal_at_pvz` — buyer refused the package at the pickup point
 * - `return_after_receipt` — buyer accepted the package then initiated a return
 * - `unknown` — status sequence is ambiguous or unsupported
 *
 * @since v3.10.0
 */
export type ReturnCategory =
  | 'cancel_before_shipment'
  | 'refusal_at_pvz'
  | 'return_after_receipt'
  | 'unknown';

/**
 * Unified return record across FBO and FBS sources.
 *
 * Built by `sdk.returns.getReturns()` (since v3.10.0) by aggregating:
 * - **FBO returns** from `sdk.reports.getAnalyticsGoodsReturn()` (real-time)
 * - **FBS returns** from `sdk.ordersFBS.getOrders()` + status history (real-time)
 * - **Finance amount/srid** from `sdk.finances.getSalesReportsDetailed()` (weekly delay)
 *
 * Fields are populated from different sources — see per-field JSDoc for source attribution.
 *
 * @since v3.10.0
 */
export interface ReturnItem {
  /** WB order ID. Source: FBO/FBS endpoint. */
  orderId: string;
  /** SKU. Source: all sources. */
  nmId: number;
  /**
   * Seller article. Source: FBS preferred (when implemented in v3.10.1).
   * **NOT populated by FBO source** — the goods-return endpoint does not
   * expose vendorCode. Always undefined for FBO records in v3.10.0.
   */
  vendorCode?: string;
  /** Fulfillment type — derived from data source. */
  orderType: 'fbo' | 'fbs';
  /** ISO 8601 date when return was initiated. Source: completedDt (FBO) or status transition date (FBS). */
  returnDate: string;
  /** Current return state. NOTE: WB does not expose 'in_transit' for FBO — only initiated/received/processed available. */
  returnStatus: ReturnStatus;
  /** Free-text Russian reason from WB. Source: reason (FBO) or status detail (FBS). */
  returnReason: string;
  /** Standardized reason code (via classifyReturnReason). */
  returnReasonCode: ReturnReasonCode;
  /** Return category — authoritative for FBS (via classifyFbsReturnCategory), best-effort 'unknown' or 'return_after_receipt' for FBO. */
  returnCategory: ReturnCategory;
  /** Number of units. Default 1 (each goods-return record = one unit). */
  quantity: number;
  /**
   * Sum in rubles. Source: `getSalesReportsDetailed` via `srid` join.
   * **undefined** when finance hasn't materialized yet — WB Sales Reports
   * publish on a weekly cadence anchored to Mondays, so a return processed
   * Sunday may have its amount available Monday (1 day), while a return
   * processed Monday may not show until the following Monday (~7 days).
   */
  returnAmount?: number;
  /** Sales Realization ID. Source: getSalesReportsDetailed. Used for cross-source reconciliation. */
  srid?: string;
}

/**
 * Request parameters for `sdk.returns.getReturns()`.
 *
 * @since v3.10.0
 */
export interface ReturnsApiRequest {
  /** ISO 8601 date (YYYY-MM-DD). Required. Max 31 days range. */
  dateFrom: string;
  /** ISO 8601 date (YYYY-MM-DD). Required. Must be >= dateFrom. */
  dateTo: string;
  /** Filter by SKU. Pre-filter at WB level where supported, post-filter otherwise. */
  nmIds?: number[];
  /** Filter by fulfillment type. If omitted, both FBO and FBS are fetched. */
  orderType?: 'fbo' | 'fbs';
  /**
   * Whether to fetch FBS status history for return categorization.
   * **Default: false** to prevent N+1 rate-limit exhaustion.
   * Reserved for v3.10.0 — currently NOT implemented; passing `true` adds
   * a warning and falls back to skipping FBS source.
   */
  includeFbsStatusHistory?: boolean;
  /** Hard cap on FBS orders processed when includeFbsStatusHistory is true. Default: 100. */
  fbsStatusHistoryLimit?: number;
  /** Pagination limit applied to merged result. Default: no limit. */
  limit?: number;
  /** Pagination offset applied to merged result. Default: 0. */
  offset?: number;
}

/**
 * Per-source failure record returned in ReturnsApiResponse.
 *
 * @since v3.10.0
 */
export interface PartialFailure {
  source: 'fbo' | 'fbs' | 'finance';
  error: string;
}

/**
 * Per-source telemetry — surfaces what was fetched/skipped.
 *
 * @since v3.10.0
 */
export interface ReturnsMeta {
  sources: {
    fbo: { fetched: number; skipped: boolean; failed: boolean; reason?: string };
    fbs: { fetched: number; skipped: boolean; failed: boolean; reason?: string };
    finance: { fetched: number; skipped: boolean; failed: boolean; reason?: string };
  };
}

/**
 * Response from `sdk.returns.getReturns()`.
 *
 * Aggregates FBO + FBS + Finance sources with full transparency about which
 * sources succeeded, were skipped, or failed.
 *
 * @since v3.10.0
 */
export interface ReturnsApiResponse {
  /** Unified return records, sorted by returnDate descending. */
  data: ReturnItem[];
  /** Total count BEFORE pagination (limit/offset). */
  total: number;
  /** Non-fatal warnings (e.g., FBS skipped due to opt-out). */
  warnings: string[];
  /** Per-source failures (one source down, others succeed). */
  partialFailures: PartialFailure[];
  /** Per-source telemetry. */
  _meta: ReturnsMeta;
}

/**
 * Parameters for `sdk.returns.getReturnByOrderId()`.
 * Date window is required because WB API requires it.
 *
 * @since v3.10.0
 */
export interface ReturnByOrderIdParams {
  /** Same date window as getReturns() — required because WB API needs it. */
  dateFrom: string;
  dateTo: string;
  /**
   * Optional fulfillment-type hint. When provided, the underlying getReturns()
   * call skips the unrelated source (e.g., orderType: 'fbo' skips FBS fetch).
   * Reduces wasted rate-limit budget when consumer knows the order type.
   */
  orderType?: 'fbo' | 'fbs';
}

/**
 * Parameters for `sdk.returns.getReturnStats()`.
 *
 * @since v3.10.0
 */
export interface ReturnStatsParams {
  dateFrom: string;
  dateTo: string;
  /** Field to group by */
  groupBy: 'nmId' | 'category' | 'orderType';
  /** Optional pre-filter passed through to getReturns() */
  nmIds?: number[];
  /** Optional pre-filter passed through to getReturns() */
  orderType?: 'fbo' | 'fbs';
}

/**
 * Single bucket in a return statistics aggregation.
 *
 * @since v3.10.0
 */
export interface ReturnStatsBucket {
  /** Group key value (string for category/orderType, number stringified for nmId) */
  key: string;
  /** Number of returns in this bucket */
  count: number;
  /** Sum of returnAmount values (skipping undefined) in this bucket */
  totalAmount: number;
  /** Number of records with returnAmount === undefined (finance not yet materialized) */
  pendingFinanceCount: number;
}

/**
 * Aggregated return statistics returned by `sdk.returns.getReturnStats()`.
 * Surfaces underlying getReturns() telemetry transparently.
 *
 * @since v3.10.0
 */
export interface ReturnStatsResult {
  /** Aggregated buckets sorted by count descending, key ascending as tiebreaker. */
  buckets: ReturnStatsBucket[];
  /** Total return count across all buckets. */
  totalReturns: number;
  /** Total amount across all buckets. */
  totalAmount: number;
  /** Surfaces underlying getReturns() telemetry */
  warnings: string[];
  partialFailures: PartialFailure[];
  _meta: ReturnsMeta;
}
