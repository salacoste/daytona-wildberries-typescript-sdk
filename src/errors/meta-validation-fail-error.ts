import { WBAPIError } from './base-error';
import type { MetaDetail } from '../types/orders-fbs.types';

/**
 * Error thrown when `PATCH /api/v3/supplies/{supplyId}/deliver` returns HTTP 409
 * with marking-code validation failures in the `metaDetails` response array.
 *
 * From **2026-06-03**, Wildberries validates Честный Знак (Honest Sign) marking codes
 * server-side for B2C FBS orders. Codes must be passed **in full** — with GS separators
 * (ASCII 0x1D) and the cryptographic authenticity tail. Invalid codes trigger this error.
 *
 * ⚠️ **Rate-limit penalty**: every 409 response counts as **10 requests** against the
 * FBS supply/order budget. Use `sdk.ordersFBS.getOrdersMetaBulk()` for pre-flight
 * validation to avoid burning budget on repeated failures.
 *
 * @since 3.15.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs} — Orders FBS API
 * @see [Migration guide](../../docs/guides/fbs-marking-code-validation.md)
 *
 * @example Narrowing with instanceof
 * ```typescript
 * import { MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
 * } catch (err) {
 *   if (err instanceof MetaValidationFailError) {
 *     // Typed access to the failing marking codes
 *     err.metaDetails.forEach(d => {
 *       console.log(`key=${d.key} value="${d.value}" decision=${d.decision}`);
 *     });
 *     // err is still instanceof WBAPIError — existing catch-all blocks still work
 *   }
 *   throw err;
 * }
 * ```
 */
export class MetaValidationFailError extends WBAPIError {
  /**
   * WB error code from the response body (e.g. `'MetaValidationFail'`).
   * Defaults to `'Unknown'` when WB omits the code field.
   */
  public readonly code: string;

  /**
   * Array of individual marking-code validation failures.
   * Each item exposes `key` (metadata type), `value` (the submitted code),
   * and `decision` (`'invalid'` when the code failed validation).
   */
  public readonly metaDetails: MetaDetail[];

  /**
   * Creates a MetaValidationFailError
   *
   * @param message - Human-readable error message from the API response
   * @param code - WB error code string (e.g. `'MetaValidationFail'`). Defaults to 'Unknown' when WB omits the code field.
   * @param metaDetails - Array of individual validation failures
   * @param response - Raw API response body
   * @param requestId - Correlation ID for debugging and tracing
   * @param origin - Origin service identifier from RFC 7807 problem+json responses
   * @param timestamp - ISO 8601 timestamp from RFC 7807 problem+json responses
   */
  constructor(
    message: string,
    code: string,
    metaDetails: MetaDetail[],
    response?: unknown,
    requestId?: string,
    origin?: string,
    timestamp?: string
  ) {
    super(message, 409, response, requestId, origin, timestamp);
    this.name = 'MetaValidationFailError';
    this.code = code;
    // Defensive copy: prevents downstream mutation
    this.metaDetails = [...metaDetails];
  }

  /**
   * Returns a user-friendly error message listing the failing marking codes.
   *
   * @returns Error message with metaDetails summary and recovery guidance
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const invalidItems = this.metaDetails.filter((d) => d.decision === 'invalid');
    const requiredItems = this.metaDetails.filter((d) => d.decision === 'required');

    const lines: string[] = [baseMessage];

    if (invalidItems.length > 0) {
      lines.push(
        `\n\nInvalid marking codes (${invalidItems.length.toString()}):`,
        ...invalidItems.map((d) => `  - ${d.key}: "${d.value}"`)
      );
    }

    if (requiredItems.length > 0) {
      lines.push(
        `\n\nMissing required marking codes (${requiredItems.length.toString()}):`,
        ...requiredItems.map((d) => `  - ${d.key}`)
      );
    }

    lines.push(
      '\n\nRecovery steps:',
      '1. Use sdk.ordersFBS.getOrdersMetaBulk() to pre-flight check marking codes before deliver',
      '2. Ensure marking codes include GS separators (ASCII 0x1D) and crypto-tail in full',
      '3. Fix the flagged assembly tasks, then retry updateSuppliesDeliver()',
      '\n⚠️ Each 409 response counts as 10 requests against the rate-limit budget.'
    );

    return lines.join('\n');
  }

  /**
   * Custom JSON serialization to include metaDetails and code properties
   *
   * @returns Object representation including metaDetails and code
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode?: number;
    code: string;
    metaDetails: MetaDetail[];
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      code: this.code,
      metaDetails: this.metaDetails,
    };
  }
}
