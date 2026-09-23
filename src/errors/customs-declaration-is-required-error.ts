import { WBAPIError } from './base-error';

/**
 * Error thrown when WB returns HTTP 409 with body `code: 'CustomsDeclarationIsRequired'`
 * — at least one assembly order in the request lacks a required customs-declaration
 * (ДТ, декларация на товары) number.
 *
 * Since **2026-08-18** (WB news):
 * - A customs-declaration number can be attached **only to assembly orders in `confirm` status**
 *   (via `sdk.ordersFBS.setCustomsDeclaration()`).
 * - **Armenia sellers** must attach a ДТ for items produced **outside the EAEU** when an order
 *   from Armenia is delivered to the Russian Federation.
 * - `POST /api/v3/orders/stickers` (`sdk.ordersFBS.createOrdersSticker()`) returns this 409
 *   when any requested order lacks a required ДТ — stickers cannot be obtained until it is attached.
 *
 * The raw WB response body (including any `data` payload with order identifiers WB may include)
 * is preserved on {@link CustomsDeclarationIsRequiredError.response}.
 *
 * @since 4.3.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs} — Orders FBS API
 *
 * @example Narrowing with instanceof
 * ```typescript
 * import { CustomsDeclarationIsRequiredError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.ordersFBS.createOrdersSticker({ type: 'png' }, { orders: [123456] });
 * } catch (err) {
 *   if (err instanceof CustomsDeclarationIsRequiredError) {
 *     console.log('Attach a customs declaration number before printing stickers');
 *     console.log('Raw body:', err.response);
 *     // err is still instanceof WBAPIError — existing catch-all blocks still work
 *   }
 *   throw err;
 * }
 * ```
 */
export class CustomsDeclarationIsRequiredError extends WBAPIError {
  /**
   * WB error code from the response body (`'CustomsDeclarationIsRequired'`).
   */
  public readonly code: string;

  /**
   * Creates a CustomsDeclarationIsRequiredError (HTTP 409)
   *
   * @param message - Human-readable error message from the API response
   * @param code - WB error code string (e.g. `'CustomsDeclarationIsRequired'`)
   * @param response - Raw API response body (may carry order identifiers in `data`)
   * @param requestId - Correlation ID for debugging and tracing
   * @param origin - Origin service identifier from RFC 7807 problem+json responses
   * @param timestamp - ISO 8601 timestamp from RFC 7807 problem+json responses
   */
  constructor(
    message: string,
    code: string,
    response?: unknown,
    requestId?: string,
    origin?: string,
    timestamp?: string
  ) {
    super(message, 409, response, requestId, origin, timestamp);
    this.name = 'CustomsDeclarationIsRequiredError';
    this.code = code;
  }

  /**
   * Returns a user-friendly error message with recovery guidance.
   *
   * @returns Error message with recovery steps for the missing customs declaration
   */
  getUserMessage(): string {
    const lines: string[] = [
      super.getUserMessage(),
      '\n\nRecovery steps:',
      '1. Check requiredMeta on new orders (sdk.ordersFBS.getOrdersNew()) for customsDeclaration',
      '2. Verify the assembly order is in "confirm" status — DT can only be attached to confirm-status orders',
      '3. Attach the DT number via sdk.ordersFBS.setCustomsDeclaration(orderId, { customsDeclaration })',
      '4. Retry the stickers request',
      '\nArmenia sellers: a DT is required for non-EAEU-made goods shipped from Armenia to the RF.',
    ];

    return lines.join('\n');
  }

  /**
   * Custom JSON serialization to include the code property
   *
   * @returns Object representation including code
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode?: number;
    code: string;
    response?: unknown;
    requestId?: string;
    origin?: string;
    timestamp?: string;
  } {
    return {
      ...super.toJSON(),
      code: this.code,
    };
  }
}
