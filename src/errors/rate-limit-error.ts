import { WBAPIError } from './base-error';

/**
 * Rate limit error thrown when API rate limits are exceeded.
 *
 * This error is thrown for 429 Too Many Requests responses.
 * The SDK's RetryHandler automatically retries rate-limited requests
 * after the specified delay, so consumers typically don't need to
 * handle this error manually.
 *
 * @example
 * ```typescript
 * import { RateLimitError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.products.createProduct(data);
 * } catch (error) {
 *   if (error instanceof RateLimitError) {
 *     console.log(`Rate limited. SDK will retry after ${error.retryAfter}ms`);
 *     // The SDK automatically retries, so you usually don't need to do anything
 *   }
 * }
 * ```
 */
export class RateLimitError extends WBAPIError {
  /**
   * Milliseconds to wait before retrying the request
   */
  public readonly retryAfter: number;

  /**
   * Creates a rate limit error
   *
   * @param message - Error message (defaults to standard rate limit message)
   * @param retryAfter - Milliseconds until retry is allowed
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   * @param origin - Origin service identifier from RFC 7807 responses
   * @param timestamp - ISO 8601 timestamp from RFC 7807 responses
   */
  constructor(
    message = 'Rate limit exceeded. The SDK will automatically retry this request.',
    retryAfter: number,
    response?: unknown,
    requestId?: string,
    origin?: string,
    timestamp?: string
  ) {
    super(message, 429, response, requestId, origin, timestamp);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }

  /**
   * Returns user-friendly error message with retry timing information
   *
   * @returns Error message with retry delay and automatic handling notice
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const retrySeconds = (this.retryAfter / 1000).toFixed(1);
    const guidance = [
      `\n\nRetry after: ${retrySeconds} seconds`,
      '\nThe SDK will automatically retry this request.',
      '\nIf rate limiting occurs frequently, consider:',
      '1. Implementing request batching to reduce API call frequency',
      '2. Caching responses when appropriate',
      "3. Reviewing your application's API usage patterns",
    ].join('\n');

    return baseMessage + guidance;
  }

  /**
   * Custom JSON serialization to preserve retryAfter property
   *
   * @returns Object representation including retryAfter timing
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    retryAfter: number;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      statusCode: this.statusCode ?? 429,
      retryAfter: this.retryAfter,
    };
  }
}
