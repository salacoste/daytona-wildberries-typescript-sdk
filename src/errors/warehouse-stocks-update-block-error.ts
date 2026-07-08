import { WBAPIError } from './base-error';

/**
 * Error thrown when WB returns HTTP 406 `WarehouseStocksUpdateBlock` on inventory updates.
 *
 * Returned during warehouse maintenance/processing work — inventory cannot be updated until
 * the work completes. **Transient and retryable**: the consumer should retry the request later.
 *
 * Thrown for `PUT /api/v3/stocks/{warehouseId}` (`sdk.products.updateStock`) when the warehouse
 * is processing.
 *
 * @example
 * ```typescript
 * import { WarehouseStocksUpdateBlockError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.products.updateStock(12345, { stocks: [{ chrtId: 12345678, amount: 100 }] });
 * } catch (error) {
 *   if (error instanceof WarehouseStocksUpdateBlockError) {
 *     console.log('Warehouse is processing — retry the inventory update later');
 *   }
 * }
 * ```
 */
export class WarehouseStocksUpdateBlockError extends WBAPIError {
  /**
   * Creates a WarehouseStocksUpdateBlockError (HTTP 406).
   *
   * @param message - Error message from WB (defaults to a maintenance/processing message)
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   * @param origin - Origin service identifier from RFC 7807 responses
   * @param timestamp - ISO 8601 timestamp from RFC 7807 responses
   */
  constructor(
    message: string,
    response?: unknown,
    requestId?: string,
    origin?: string,
    timestamp?: string
  ) {
    super(message, 406, response, requestId, origin, timestamp);
  }

  /**
   * Returns a human-readable error message with recovery guidance.
   */
  getUserMessage(): string {
    return `${this.message} The warehouse is processing — retry the inventory update later.`;
  }
}
