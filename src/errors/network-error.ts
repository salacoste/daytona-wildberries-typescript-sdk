import { WBAPIError } from './base-error';

/**
 * Network error thrown for connection failures, timeouts, and server errors.
 *
 * This error is thrown for:
 * - Network connection failures (no internet, DNS failures)
 * - Request timeouts (exceeding configured timeout)
 * - 500-level server errors (500, 502, 503, 504)
 *
 * The SDK's RetryHandler automatically retries network errors with
 * exponential backoff (max 3 attempts), so transient failures are
 * handled automatically.
 *
 * @example
 * ```typescript
 * import { NetworkError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.products.getProductList();
 * } catch (error) {
 *   if (error instanceof NetworkError) {
 *     if (error.isTimeout) {
 *       console.error('Request timed out:', error.getUserMessage());
 *     } else {
 *       console.error('Network error:', error.getUserMessage());
 *     }
 *     // The SDK already attempted 3 retries automatically
 *   }
 * }
 * ```
 */
export class NetworkError extends WBAPIError {
  /**
   * Original error from the HTTP client
   */
  public readonly cause?: Error;

  /**
   * True if the error was caused by a timeout
   */
  public readonly isTimeout: boolean;

  /**
   * Creates a network error
   *
   * @param message - Error message describing the network failure
   * @param isTimeout - Whether this error was caused by a timeout
   * @param statusCode - HTTP status code (0 for network failures, 5xx for server errors)
   * @param cause - Original error from the HTTP client
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(
    message: string,
    isTimeout = false,
    statusCode?: number,
    cause?: Error,
    response?: unknown,
    requestId?: string
  ) {
    super(message, statusCode, response, requestId);
    this.name = 'NetworkError';
    this.isTimeout = isTimeout;
    this.cause = cause;
  }

  /**
   * Returns user-friendly error message with retry information and troubleshooting guidance
   *
   * @returns Error message with network-specific recovery steps
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    let guidance: string;

    if (this.isTimeout) {
      guidance = [
        '\n\nThis request timed out after 30 seconds.',
        'The SDK automatically retried this request 3 times.',
        '\nTo resolve timeout issues:',
        '1. Check if the Wildberries API is experiencing high latency',
        '2. Consider increasing the timeout configuration',
        '3. Verify your network connection is stable',
        '4. Try again later if the API is overloaded',
      ].join('\n');
    } else if (this.statusCode && this.statusCode >= 500) {
      guidance = [
        '\n\nThe Wildberries API server encountered an error.',
        'The SDK automatically retried this request 3 times.',
        '\nTo resolve server errors:',
        '1. Wait a few moments and try again',
        '2. Check the Wildberries API status page for known issues',
        '3. If the problem persists, contact Wildberries API support',
      ].join('\n');
    } else {
      guidance = [
        '\n\nNetwork connection failed.',
        'The SDK automatically retried this request 3 times.',
        '\nTo resolve connection issues:',
        '1. Check your internet connection',
        '2. Verify network firewalls allow HTTPS connections',
        '3. Ensure DNS resolution is working properly',
        '4. Try again when network connectivity is restored',
      ].join('\n');
    }

    return baseMessage + guidance;
  }

  /**
   * Custom JSON serialization to preserve isTimeout property
   *
   * Note: The `cause` property is not serialized as Error objects
   * don't serialize well. Check the cause property directly if needed.
   *
   * @returns Object representation including timeout flag and status
   */
  toJSON(): {
    name: string;
    message: string;
    isTimeout: boolean;
    statusCode?: number;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      isTimeout: this.isTimeout,
    };
  }
}
