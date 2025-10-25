/**
 * In-Store Pickup specific error classes
 *
 * These errors handle failures specific to click & collect order operations,
 * including order state transitions, customer verification, and metadata management.
 *
 * @module errors/in-store-pickup-errors
 */

import { WBAPIError } from './base-error';

/**
 * Error thrown when a pickup order is not found
 *
 * **HTTP Status**: 404
 * **Retry**: No (permanent failure)
 *
 * @example
 * ```typescript
 * try {
 *   await sdk.inStorePickup.confirmOrder(999999);
 * } catch (error) {
 *   if (error instanceof PickupOrderNotFoundError) {
 *     console.error(`Order ${error.orderId} not found`);
 *     // Handle order not found scenario
 *   }
 * }
 * ```
 */
export class PickupOrderNotFoundError extends WBAPIError {
  /**
   * Creates a new PickupOrderNotFoundError
   *
   * @param orderId - ID of the order that was not found
   * @param requestId - Optional request ID from API response
   */
  constructor(
    public readonly orderId: number,
    requestId?: string
  ) {
    super(
      `Pickup order not found: ${orderId}`,
      404,
      {
        orderId,
        errorType: 'OrderNotFound',
      },
      requestId
    );
    this.name = 'PickupOrderNotFoundError';
  }

  /**
   * Returns user-friendly error message with recovery guidance
   */
  override getUserMessage(): string {
    return `Pickup order ${this.orderId} was not found. Please verify the order ID and try again. The order may have been cancelled or does not exist.`;
  }
}

/**
 * Error thrown when an order state transition is invalid
 *
 * **HTTP Status**: 409 Conflict
 * **Retry**: No (permanent failure - requires state correction)
 * **Rate Limit**: 409 responses count as 5 requests!
 *
 * This error occurs when attempting to transition an order to a state that is
 * not valid given its current state (e.g., trying to prepare an order that
 * hasn't been confirmed yet).
 *
 * **Valid State Transitions**:
 * - `new` → `confirm` (confirmOrder)
 * - `confirm` → `prepare` (prepareOrder)
 * - `prepare` → `receive` (receiveOrder) - terminal state
 * - `prepare` → `reject` (rejectOrder) - terminal state
 * - Any → `cancel` (cancelOrder) - terminal state
 *
 * @example
 * ```typescript
 * try {
 *   // Trying to prepare order without confirming first
 *   await sdk.inStorePickup.prepareOrder(12345);
 * } catch (error) {
 *   if (error instanceof InvalidOrderStateError) {
 *     console.error(`Cannot ${error.attemptedAction} order ${error.orderId}`);
 *     console.error(`Current state: ${error.currentState}`);
 *     console.error('Recovery:', error.getUserMessage());
 *
 *     // Get current status and retry with correct action
 *     const statuses = await sdk.inStorePickup.getOrderStatuses([error.orderId]);
 *     const currentState = statuses.orders[0]?.supplierStatus;
 *     // Handle based on current state
 *   }
 * }
 * ```
 */
export class InvalidOrderStateError extends WBAPIError {
  /**
   * Creates a new InvalidOrderStateError
   *
   * @param orderId - ID of the order with invalid state
   * @param currentState - Current state of the order (if known)
   * @param attemptedAction - Action that was attempted (e.g., "prepare", "receive")
   * @param requestId - Optional request ID from API response
   */
  constructor(
    public readonly orderId: number,
    public readonly currentState: string | undefined,
    public readonly attemptedAction: string,
    requestId?: string
  ) {
    const stateInfo = currentState ? ` in ${currentState} state` : '';
    super(
      `Cannot ${attemptedAction} order ${orderId}${stateInfo}. Invalid state transition.`,
      409,
      {
        orderId,
        currentState,
        attemptedAction,
        errorType: 'StatusMismatch',
      },
      requestId
    );
    this.name = 'InvalidOrderStateError';
  }

  /**
   * Returns user-friendly error message with recovery guidance
   */
  override getUserMessage(): string {
    const stateMsg = this.currentState
      ? `The order is currently in "${this.currentState}" state and`
      : 'The order';

    return (
      `${stateMsg} cannot be transitioned to "${this.attemptedAction}". ` +
      `Please check the current order status using getOrderStatuses() and ` +
      `ensure you follow the correct state transition sequence: ` +
      `new → confirm → prepare → receive/reject. ` +
      `Note: This 409 response counts as 5 requests toward your rate limit.`
    );
  }
}

/**
 * Error thrown when customer identity verification fails
 *
 * **HTTP Status**: 409 Conflict
 * **Retry**: No (permanent failure - requires correct passcode)
 * **Rate Limit**: 409 responses count as 5 requests!
 *
 * This error occurs when the passcode provided for identity verification does
 * not match the customer's order code. The customer needs to provide the correct
 * passcode from their Wildberries app.
 *
 * @example
 * ```typescript
 * try {
 *   const result = await sdk.inStorePickup.verifyCustomerIdentity({
 *     orderCode: '21117866-0006',
 *     passcode: '1234'
 *   });
 * } catch (error) {
 *   if (error instanceof CustomerVerificationError) {
 *     console.error('Verification failed:', error.getUserMessage());
 *     // Ask customer to check their app for correct passcode
 *     // Note: Be careful not to exceed rate limits (30 req/min)
 *   }
 * }
 * ```
 */
export class CustomerVerificationError extends WBAPIError {
  /**
   * Creates a new CustomerVerificationError
   *
   * @param orderCode - Customer's order code that failed verification
   * @param message - Detailed error message from API
   * @param requestId - Optional request ID from API response
   */
  constructor(
    public readonly orderCode: string,
    message: string,
    requestId?: string
  ) {
    super(
      `Customer verification failed for order ${orderCode}: ${message}`,
      409,
      {
        orderCode,
        errorType: 'InvalidPasscode',
      },
      requestId
    );
    this.name = 'CustomerVerificationError';
  }

  /**
   * Returns user-friendly error message with recovery guidance
   */
  override getUserMessage(): string {
    return (
      `Customer identity verification failed for order ${this.orderCode}. ` +
      `The passcode provided does not match. Please ask the customer to check ` +
      `their Wildberries app for the correct passcode. ` +
      `Note: This 409 response counts as 5 requests toward your rate limit. ` +
      `Be careful not to exceed the 30 requests/minute limit for this endpoint.`
    );
  }
}

/**
 * Error thrown when product metadata validation fails
 *
 * **HTTP Status**: 409 Conflict (metadata update failures)
 * **Retry**: No (permanent failure - requires correct data or order state)
 * **Rate Limit**: 409 responses count as 5 requests!
 *
 * This error occurs when attempting to set metadata (SGTIN, UIN, IMEI, GTIN) codes
 * but the operation fails due to:
 * - Invalid code format
 * - Order not in `confirm` status
 * - Metadata type not in order's `requiredMeta` list
 * - Delivery not by WB (for UIN, IMEI, GTIN)
 *
 * @example
 * ```typescript
 * try {
 *   await sdk.inStorePickup.setSGTINCode(12345, ['invalid-code']);
 * } catch (error) {
 *   if (error instanceof MetadataValidationError) {
 *     console.error(`Cannot set ${error.codeType}:`, error.getUserMessage());
 *
 *     // Check order status
 *     const statuses = await sdk.inStorePickup.getOrderStatuses([12345]);
 *     console.log('Current status:', statuses.orders[0].supplierStatus);
 *
 *     // Check required metadata
 *     const newOrders = await sdk.inStorePickup.getNewOrders();
 *     const order = newOrders.orders.find(o => o.id === 12345);
 *     console.log('Required metadata:', order?.requiredMeta);
 *   }
 * }
 * ```
 */
export class MetadataValidationError extends WBAPIError {
  /**
   * Creates a new MetadataValidationError
   *
   * @param codeType - Type of metadata code (SGTIN, UIN, IMEI, GTIN)
   * @param orderId - ID of the order for which metadata update failed
   * @param message - Detailed error message from API
   * @param requestId - Optional request ID from API response
   */
  constructor(
    public readonly codeType: 'SGTIN' | 'UIN' | 'IMEI' | 'GTIN',
    public readonly orderId: number,
    message: string,
    requestId?: string
  ) {
    super(
      message,
      409,
      {
        codeType,
        orderId,
        errorType: 'FailedToUpdateMeta',
      },
      requestId
    );
    this.name = 'MetadataValidationError';
  }

  /**
   * Returns user-friendly error message with recovery guidance
   */
  override getUserMessage(): string {
    return (
      `Failed to set ${this.codeType} metadata for order ${this.orderId}. ` +
      `Please ensure: 1) Order is in "confirm" status, ` +
      `2) "${this.codeType.toLowerCase()}" is in the order's requiredMeta list, ` +
      `3) Code format is valid, ` +
      `4) For UIN/IMEI/GTIN: delivery is by WB. ` +
      `Use getNewOrders() to check requiredMeta and getOrderStatuses() to check status. ` +
      `Note: This 409 response counts as 5 requests toward your rate limit.`
    );
  }
}
