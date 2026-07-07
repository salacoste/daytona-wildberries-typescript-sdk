import type { BidsRecommendationsResponse } from '../types/promotion.types';
import { BidOutOfRangeError } from '../errors';

/**
 * Effective accepted bid range for an article, in kopecks.
 *
 * Derived from a {@link BidsRecommendationsResponse}:
 * - `min` — the lowest `reachMin.bidKopecks` across the returned search clusters.
 *   This is the floor WB enforces: a bid below it is rejected with HTTP 400
 *   `wrong bid value: <X>; min: <Y>` (parsed into {@link BidOutOfRangeError}).
 * - `max` — the highest `reachMax.bidKopecks` across clusters. An advisory ceiling
 *   (the top-reach bid); bidding above it is not rejected by WB, only wasteful.
 */
export interface BidRange {
  /** Minimum accepted bid in kopecks (the WB 400 floor). */
  min: number;
  /** Maximum recommended bid in kopecks (advisory reachMax ceiling). */
  max: number;
}

/**
 * Compute the effective bid range for an article from a recommendations response.
 *
 * Aggregates across all returned search clusters (`normQueries`):
 * `min = min(reachMin.bidKopecks)`, `max = max(reachMax.bidKopecks)`.
 *
 * Pure and network-free. Returns `null` when the response carries no cluster data
 * (e.g. a paused campaign) — treat `null` as "unknown range" and skip pre-validation
 * rather than fabricating bounds.
 *
 * @param recommendations - A `getBidsRecommendations` response (one advertId + nmId)
 * @returns The `{ min, max }` envelope in kopecks, or `null` if no cluster data
 *
 * @example
 * ```typescript
 * const reco = await sdk.promotion.getBidsRecommendations({ advertId: 1, nmId: 2 });
 * const range = extractBidRange(reco);
 * if (range) console.log(`valid range: ${range.min}–${range.max} kopecks`);
 * ```
 *
 * @since 3.16.0
 */
export function extractBidRange(recommendations: BidsRecommendationsResponse): BidRange | null {
  const clusters = recommendations.normQueries;
  if (clusters.length === 0) return null;

  let min = Infinity;
  let max = -Infinity;
  for (const cluster of clusters) {
    min = Math.min(min, cluster.reachMin.bidKopecks);
    max = Math.max(max, cluster.reachMax.bidKopecks);
  }
  return { min, max };
}

/**
 * Validate a desired bid against an article's recommendation range.
 *
 * Throws {@link BidOutOfRangeError} (with parsed `received` / `min` / `max`) when the
 * bid falls outside `[min, max]`. No-op (no throw) when the range can't be derived
 * (`extractBidRange` returns `null`) — never fabricates a range from missing data.
 *
 * Pure and network-free. Use this to fail fast **before** calling
 * {@link PromotionModule.updateBids}, saving a rate-limit slot and avoiding a 400
 * round-trip. Strictly opt-in — NOT applied automatically inside `updateBids`.
 *
 * @param recommendations - A `getBidsRecommendations` response for the article
 * @param bidKopecks - The desired bid in kopecks (same unit as `updateBids`)
 * @throws {BidOutOfRangeError} When `bidKopecks` is outside the recommendation range
 *
 * @example
 * ```typescript
 * const reco = await sdk.promotion.getBidsRecommendations({ advertId: 1, nmId: 2 });
 * try {
 *   validateBid(reco, 150);
 *   await sdk.promotion.updateBids({
 *     bids: [{ advert_id: 1, nm_bids: [{ nm_id: 2, bid_kopecks: 150, placement: 'search' }] }],
 *   });
 * } catch (e) {
 *   if (e instanceof BidOutOfRangeError) console.warn(`floor is ${e.min}`);
 * }
 * ```
 *
 * @since 3.16.0
 */
export function validateBid(
  recommendations: BidsRecommendationsResponse,
  bidKopecks: number
): void {
  const range = extractBidRange(recommendations);
  if (range === null) return;

  if (bidKopecks < range.min || bidKopecks > range.max) {
    throw new BidOutOfRangeError(
      `Bid ${bidKopecks} is outside the recommended range [${range.min}, ${range.max}] kopecks`,
      { received: bidKopecks, min: range.min, max: range.max, field: 'bid_kopecks' }
    );
  }
}

/**
 * Clamp a desired bid into an article's recommendation range.
 *
 * Returns `bidKopecks` adjusted to lie within `[min, max]` (floored on the low end,
 * ceilinged on the high end). Returns the bid unchanged when the range can't be
 * derived (`extractBidRange` returns `null`). Never throws.
 *
 * Pure and network-free. Use this when you want a best-effort in-range bid rather than
 * a hard failure (contrast with {@link validateBid}). Strictly opt-in.
 *
 * @param recommendations - A `getBidsRecommendations` response for the article
 * @param bidKopecks - The desired bid in kopecks
 * @returns The clamped bid in kopecks (within `[min, max]`, or unchanged if no range)
 *
 * @example
 * ```typescript
 * const reco = await sdk.promotion.getBidsRecommendations({ advertId: 1, nmId: 2 });
 * const safe = clampBid(reco, 5); // -> range.min (the floor)
 * await sdk.promotion.updateBids({
 *   bids: [{ advert_id: 1, nm_bids: [{ nm_id: 2, bid_kopecks: safe, placement: 'search' }] }],
 * });
 * ```
 *
 * @since 3.16.0
 */
export function clampBid(recommendations: BidsRecommendationsResponse, bidKopecks: number): number {
  const range = extractBidRange(recommendations);
  if (range === null) return bidKopecks;
  return Math.min(range.max, Math.max(range.min, bidKopecks));
}
