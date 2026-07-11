import type { DaysV3Item, FullStatsItem } from '../types/promotion.types';

/**
 * Result of {@link computeROAS}.
 *
 * @public
 */
export interface ROASResult {
  /**
   * ROAS = `revenue / spend`, or `null` when `spend === 0` (no ad spend → div-by-zero
   * avoided).
   */
  roas: number | null;
  /** Σ `sum_price` over the window — attributed order revenue (RUB). */
  revenue: number;
  /** Σ `sum` over the window — ad spend (RUB). */
  spend: number;
  /** Number of days included in the sums. */
  daysUsed: number;
  /** Number of freshest days actually dropped (capped to the available day count). */
  excludedDays: number;
}

/**
 * Options for {@link computeROAS}.
 *
 * @public
 */
export interface ComputeROASOptions {
  /**
   * Number of the most-recent (freshest) days to EXCLUDE from the window. Default `1`.
   *
   * WB attributes `sum_price` (revenue) to the click day, but finalization lags ~1-2 days —
   * the freshest day's `sum_price` is typically undercounted. Excluding it avoids the
   * same-day-ROAS footgun (Q6). See the task-135(b) / task-136 findings.
   */
  excludeLastDays?: number;
  /**
   * Cap the window to the most recent N days (AFTER exclusion). Default: all remaining days.
   */
  windowDays?: number;
}

/**
 * Compute ROAS (Return on Ad Spend) from WB fullstats per-day data.
 *
 * **Semantics** (confirmed empirically against a live cabinet, task-136 AC#1):
 * - `sum` = ad spend (Затраты, RUB) — proportional to `clicks × cpc`, same-day.
 * - `sum_price` = order revenue (Сумма заказов, RUB) — attributed to the click day.
 *
 * **ROAS = Σ(sum_price) / Σ(sum)** over a rolling window.
 *
 * **Why exclude the freshest day**: WB's `sum_price` finalization lags ~1-2 days, so the
 * most recent day undercounts revenue → same-day ROAS is a known footgun (Q6). The default
 * `excludeLastDays: 1` drops it. (0-rev-on-clicked-days is mostly genuine zero-conversion,
 * not lag — but the freshest day is where the undercount concentrates.)
 *
 * @param stats - Either a {@link FullStatsItem} (uses its `.days`) or a `DaysV3Item[]`
 *   directly (e.g. `FullStatsItem.days`).
 * @param options - {@link ComputeROASOptions}.
 * @returns {@link ROASResult}. `roas` is `null` when `spend === 0` (no ad spend) or when the
 *   window is empty.
 *
 * @see {@link PromotionModule.getAdvFullstats} for the source data.
 * @example
 * ```typescript
 * const stats = await sdk.promotion.getAdvFullstats({
 *   ids: '36508180',
 *   beginDate: '2026-06-28',
 *   endDate: '2026-07-11',
 * });
 * const { roas, revenue, spend } = computeROAS(stats); // default: exclude freshest 1 day
 * if (roas !== null) {
 *   console.log(`ROAS ${roas.toFixed(2)}x (spent ${spend} RUB, earned ${revenue} RUB)`);
 * }
 * ```
 *
 * @public
 */
export function computeROAS(
  stats: FullStatsItem | DaysV3Item[],
  options?: ComputeROASOptions
): ROASResult {
  const excludeLastDays = options?.excludeLastDays ?? 1;
  const windowDays = options?.windowDays;

  const days: DaysV3Item[] = Array.isArray(stats) ? stats : stats.days;

  // Sort by date ascending (oldest first) so the freshest days are at the tail.
  const sorted = [...days].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const excludedDays = Math.max(0, Math.min(excludeLastDays, sorted.length));
  let window = sorted.slice(0, sorted.length - excludedDays);

  if (windowDays != null && windowDays >= 0) {
    window = window.slice(Math.max(0, window.length - windowDays));
  }

  let spend = 0;
  let revenue = 0;
  for (const d of window) {
    spend += d.sum;
    revenue += d.sum_price;
  }

  return {
    roas: spend > 0 ? revenue / spend : null,
    revenue,
    spend,
    daysUsed: window.length,
    excludedDays,
  };
}
