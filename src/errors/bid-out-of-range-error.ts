import { ValidationError } from './validation-error';

/**
 * Parsed components of a WB advert "wrong bid value" 400 detail string.
 *
 * WB returns the out-of-range bid rejection as an RFC 7807 body whose `detail`
 * has the shape `'wrong bid value: <received>; min: <min>[; max: <max>]'`.
 * `received` and `min` are always present; `max` is only present when WB
 * reports a ceiling (currently unobserved — see task-135 experiment (c)).
 *
 * The numeric unit depends on which endpoint rejected the bid:
 * - `updateBids` → **kopecks** (e.g. `250` = 2.50 RUB)
 * - `setNormqueryBids` → **RUB** (whole rubles)
 *
 * The parser is unit-agnostic; it only extracts the numbers.
 */
export interface ParsedBidRange {
  /** The bid value WB rejected (the "wrong bid value"). */
  received: number;
  /** The minimum accepted bid (the floor). */
  min: number;
  /** The maximum accepted bid (the ceiling), only when WB reports one. */
  max?: number;
}

/**
 * Named capture groups extracted from {@link BID_RANGE_DETAIL_PATTERN}.
 *
 * `received` and `min` always participate in a successful match; `max` is only
 * present when WB reports a ceiling.
 */
interface BidRangeGroups {
  received: string;
  min: string;
  max?: string;
}

/**
 * Regular expression matching WB's advert bid-out-of-range detail string.
 *
 * Matches: `wrong bid value: 3; min: 150` and optionally `...; max: 5000`.
 * Case-insensitive and tolerant of whitespace variations. Named captures:
 * - `received` → the rejected value
 * - `min` → the floor
 * - `max` → the ceiling (optional, only when WB reports one)
 */
const BID_RANGE_DETAIL_PATTERN =
  /wrong bid value:\s*(?<received>-?\d+)\s*;\s*min:\s*(?<min>-?\d+)(?:\s*;\s*max:\s*(?<max>-?\d+))?/i;

/**
 * Parse a WB advert `detail` string for the bid-out-of-range format.
 *
 * Pure, side-effect-free, network-free. Exported so callers (and tests) can
 * probe a detail string without constructing a full error, and so BaseClient
 * can reuse it without duplicating the regex.
 *
 * @param detail - The `detail` field from a WB RFC 7807 400 response
 * @returns Parsed `{ received, min, max? }` when the detail matches the
 *   bid-out-of-range shape, otherwise `null`
 *
 * @example
 * ```typescript
 * parseBidOutOfRangeDetail('wrong bid value: 3; min: 150');
 * // => { received: 3, min: 150 }
 *
 * parseBidOutOfRangeDetail('wrong bid value: 3; min: 150; max: 5000');
 * // => { received: 3, min: 150, max: 5000 }
 *
 * parseBidOutOfRangeDetail('some other validation error');
 * // => null
 * ```
 */
export function parseBidOutOfRangeDetail(detail: unknown): ParsedBidRange | null {
  if (typeof detail !== 'string') return null;
  const match = BID_RANGE_DETAIL_PATTERN.exec(detail);
  const groups = (match?.groups ?? undefined) as BidRangeGroups | undefined;
  if (!groups) return null;

  const received = Number(groups.received);
  const min = Number(groups.min);
  if (Number.isNaN(received) || Number.isNaN(min)) return null;

  const result: ParsedBidRange = { received, min };
  if (groups.max !== undefined) {
    const max = Number(groups.max);
    if (!Number.isNaN(max)) result.max = max;
  }
  return result;
}

/**
 * Error thrown when WB rejects a bid for being out of the accepted range.
 *
 * Wildberries advert endpoints reject out-of-range bids with an HTTP 400 whose
 * RFC 7807 body looks like:
 *
 * ```json
 * {
 *   "detail": "wrong bid value: 3; min: 150",
 *   "title": "invalid payload",
 *   "status": 400
 * }
 * ```
 *
 * BaseClient detects this shape and throws `BidOutOfRangeError` instead of a
 * generic {@link ValidationError}, exposing the parsed floor (and ceiling when
 * reported) directly. This is high-value for auto-bidding engines: the
 * canonical minimum is available from the error itself, avoiding a separate
 * `getBidsRecommendations` round-trip (which is capped at 5 req/min).
 *
 * This error is a subclass of {@link ValidationError}, so existing
 * `catch (error) { if (error instanceof ValidationError) ... }` blocks still
 * catch it — the change is purely additive.
 *
 * The `received`/`min`/`max` numeric unit depends on which endpoint rejected
 * the bid: **kopecks** for `updateBids`, **RUB** for `setNormqueryBids`.
 *
 * @example
 * ```typescript
 * import { BidOutOfRangeError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.promotion.updateBids({
 *     bids: [{ advert_id: 12345, nm_bids: [{ nm_id: 1, bid_kopecks: 3, placement: 'search' }] }]
 *   });
 * } catch (error) {
 *   if (error instanceof BidOutOfRangeError) {
 *     console.error(`Bid ${error.received} below minimum ${error.min}`);
 *     // Retry at error.min (the canonical floor)
 *   }
 * }
 * ```
 *
 * @see {@link InvalidBidError} for the broader bid-validation sibling
 *   (legacy; not thrown by BaseClient — reserved for caller-side validation).
 */
export class BidOutOfRangeError extends ValidationError {
  /** The bid value WB rejected (the "wrong bid value"). */
  public readonly received?: number;

  /** The minimum accepted bid (the floor). */
  public readonly min?: number;

  /** The maximum accepted bid (the ceiling), only when WB reports one. */
  public readonly max?: number;

  /**
   * Creates a BidOutOfRangeError.
   *
   * @param message - Error message (typically the raw WB `detail` string)
   * @param context - Parsed bid-range context (`received`/`min`/`max`) plus optional `field`
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(
    message: string,
    context?: {
      received?: number;
      min?: number;
      max?: number;
      field?: string;
    },
    response?: unknown,
    requestId?: string
  ) {
    const fieldErrors = { [context?.field ?? 'bid']: message };

    super(message, fieldErrors, 400, response, requestId);
    this.name = 'BidOutOfRangeError';
    this.received = context?.received;
    this.min = context?.min;
    this.max = context?.max;
  }

  /**
   * Returns a user-friendly error message with the accepted bid range.
   *
   * @returns Error message naming the rejected bid and the accepted floor/ceiling
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const bidInfo: string[] = [];

    if (this.received !== undefined) {
      bidInfo.push(`Your bid: ${this.received.toString()}`);
    }

    if (this.min !== undefined) {
      bidInfo.push(`Minimum accepted: ${this.min.toString()}`);
    }

    if (this.max !== undefined) {
      bidInfo.push(`Maximum accepted: ${this.max.toString()}`);
    }

    if (bidInfo.length > 0) {
      const guidance = [
        '\n\nBid out of range:',
        ...bidInfo.map((info) => `  - ${info}`),
        '\nAdjust your bid to fall within the accepted range and retry.',
      ].join('\n');

      return baseMessage + guidance;
    }

    return baseMessage;
  }

  /**
   * Custom JSON serialization to preserve bid-range fields.
   *
   * @returns Object representation including received/min/max
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    fieldErrors?: Record<string, string>;
    received?: number;
    min?: number;
    max?: number;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      received: this.received,
      min: this.min,
      max: this.max,
    };
  }
}
