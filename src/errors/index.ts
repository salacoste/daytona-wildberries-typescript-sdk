/**
 * Error handling module for Wildberries API TypeScript SDK
 *
 * This module provides a comprehensive error hierarchy for handling different
 * types of failures when interacting with the Wildberries API.
 *
 * ## Error Hierarchy
 *
 * ```
 * Error (native JavaScript)
 *   └── WBAPIError (base SDK error)
 *         ├── AuthenticationError (401, 403)
 *         ├── RateLimitError (429)
 *         ├── ValidationError (400, 422)
 *         │     └── InvalidBidError (bid validation failures)
 *         ├── NetworkError (timeouts, 5xx)
 *         ├── CampaignNotFoundError (404)
 *         ├── BudgetExceededError (400)
 *         └── InvalidCampaignStateError (400)
 * ```
 *
 * ## Usage Patterns
 *
 * All SDK errors extend {@link WBAPIError}, allowing consumers to catch all
 * SDK-specific errors with a single catch block if desired, or handle specific
 * error types using instanceof checks.
 *
 * ### Catch All SDK Errors
 *
 * ```typescript
 * import { WBAPIError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.products.getProductList();
 * } catch (error) {
 *   if (error instanceof WBAPIError) {
 *     console.error('SDK Error:', error.getUserMessage());
 *     console.error('Status Code:', error.statusCode);
 *     console.error('Request ID:', error.requestId);
 *   } else {
 *     // Handle non-SDK errors
 *     throw error;
 *   }
 * }
 * ```
 *
 * ### Handle Specific Error Types
 *
 * ```typescript
 * import {
 *   AuthenticationError,
 *   RateLimitError,
 *   ValidationError,
 *   NetworkError
 * } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.products.createProduct(productData);
 * } catch (error) {
 *   if (error instanceof AuthenticationError) {
 *     // Handle authentication failures (401, 403)
 *     console.error('Authentication failed:', error.getUserMessage());
 *     // Prompt user to update API key
 *   } else if (error instanceof RateLimitError) {
 *     // Handle rate limiting (429)
 *     console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
 *     // SDK automatically retries, so this is usually informational
 *   } else if (error instanceof ValidationError) {
 *     // Handle validation errors (400, 422)
 *     console.error('Validation failed:', error.getUserMessage());
 *     if (error.fieldErrors) {
 *       Object.entries(error.fieldErrors).forEach(([field, message]) => {
 *         console.error(`  - ${field}: ${message}`);
 *       });
 *     }
 *   } else if (error instanceof NetworkError) {
 *     // Handle network failures and server errors
 *     if (error.isTimeout) {
 *       console.error('Request timed out:', error.getUserMessage());
 *     } else {
 *       console.error('Network error:', error.getUserMessage());
 *     }
 *     // SDK automatically retries (max 3 attempts)
 *   }
 * }
 * ```
 *
 * ## Error Recovery Guidance
 *
 * Each error class provides a {@link WBAPIError.getUserMessage | getUserMessage()}
 * method that returns user-friendly error messages with actionable recovery steps.
 * These messages are designed to help developers quickly diagnose and resolve issues.
 *
 * ## Automatic Retry Behavior
 *
 * The SDK's RetryHandler automatically retries certain error types:
 * - {@link RateLimitError}: Retried after the specified delay
 * - {@link NetworkError}: Retried with exponential backoff (max 3 attempts)
 *
 * The SDK does NOT retry:
 * - {@link AuthenticationError}: Permanent failure requiring API key update
 * - {@link ValidationError}: Permanent failure requiring data correction
 *
 * @module errors
 */

export { WBAPIError } from './base-error';
export { AuthenticationError } from './auth-error';
export { RateLimitError } from './rate-limit-error';
export { ValidationError } from './validation-error';
export { NetworkError } from './network-error';

// Promotion-specific errors
export {
  CampaignNotFoundError,
  InvalidBidError,
  BudgetExceededError,
  InvalidCampaignStateError,
} from './promotion-errors';

// In-Store Pickup specific errors
export {
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError,
} from './in-store-pickup-errors';
