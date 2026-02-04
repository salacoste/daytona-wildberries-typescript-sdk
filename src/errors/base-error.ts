/**
 * Base error class for all Wildberries SDK errors.
 *
 * All SDK-specific errors extend this class to enable consumers to catch
 * all SDK errors with a single catch block if desired.
 *
 * @example
 * ```typescript
 * import { WBAPIError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.general.ping();
 * } catch (error) {
 *   if (error instanceof WBAPIError) {
 *     console.error('SDK error:', error.getUserMessage());
 *     console.error('Status code:', error.statusCode);
 *   }
 * }
 * ```
 */
export class WBAPIError extends Error {
  /**
   * HTTP status code if applicable
   */
  public readonly statusCode?: number;

  /**
   * API response body if available
   */
  public readonly response?: unknown;

  /**
   * Correlation ID for debugging and tracing requests
   */
  public readonly requestId?: string;

  /**
   * Origin service identifier from RFC 7807 problem+json responses.
   *
   * Indicates which internal Wildberries service originated the error
   * (e.g., "s2s-api-auth-catalog").
   */
  public readonly origin?: string;

  /**
   * ISO 8601 timestamp from RFC 7807 problem+json responses.
   *
   * Indicates when the error occurred on the server side
   * (e.g., "2024-09-30T06:52:38Z").
   */
  public readonly timestamp?: string;

  /**
   * Creates a new WBAPIError
   *
   * @param message - Error message describing what went wrong
   * @param statusCode - HTTP status code if applicable
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   * @param origin - Origin service identifier from RFC 7807 responses
   * @param timestamp - ISO 8601 timestamp from RFC 7807 responses
   */
  constructor(
    message: string,
    statusCode?: number,
    response?: unknown,
    requestId?: string,
    origin?: string,
    timestamp?: string
  ) {
    super(message);

    // Set error name to class name for proper identification
    this.name = this.constructor.name;

    // Preserve stack trace for debugging (V8 engines like Node.js)
    // Type assertion needed because captureStackTrace is V8-specific
    const captureStackTrace = (
      Error as {
        captureStackTrace?: (
          target: object,
          constructor: new (...args: unknown[]) => unknown
        ) => void;
      }
    ).captureStackTrace;
    if (captureStackTrace) {
      captureStackTrace(this, this.constructor as new (...args: unknown[]) => unknown);
    }

    this.statusCode = statusCode;
    this.response = response;
    this.requestId = requestId;
    this.origin = origin;
    this.timestamp = timestamp;
  }

  /**
   * Returns a human-readable error message with recovery guidance.
   *
   * Override this method in subclasses to provide specific recovery steps.
   *
   * @returns User-friendly error message with actionable guidance
   *
   * @example
   * ```typescript
   * try {
   *   await sdk.products.createProduct(data);
   * } catch (error) {
   *   if (error instanceof WBAPIError) {
   *     // Show user-friendly message
   *     alert(error.getUserMessage());
   *
   *     // Log technical details for debugging
   *     console.error('Technical details:', {
   *       statusCode: error.statusCode,
   *       requestId: error.requestId
   *     });
   *   }
   * }
   * ```
   */
  getUserMessage(): string {
    let message = this.message;

    if (this.statusCode !== undefined) {
      message += ` (Status: ${this.statusCode.toString()})`;
    }

    if (this.requestId) {
      message += ` [Request ID: ${this.requestId}]`;
    }

    if (this.origin) {
      message += ` [Origin: ${this.origin}]`;
    }

    return message;
  }

  /**
   * Custom JSON serialization to preserve all error properties.
   *
   * By default, Error objects don't serialize the `message` property
   * when using JSON.stringify(). This method ensures all important
   * properties are included in the JSON output.
   *
   * @returns Object representation of the error for JSON serialization
   *
   * @example
   * ```typescript
   * const error = new WBAPIError('Test error', 400, { detail: 'info' }, 'req-123');
   * const json = JSON.stringify(error);
   * // { "name": "WBAPIError", "message": "Test error", "statusCode": 400, ... }
   * ```
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode?: number;
    response?: unknown;
    requestId?: string;
    origin?: string;
    timestamp?: string;
  } {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      response: this.response,
      requestId: this.requestId,
      origin: this.origin,
      timestamp: this.timestamp,
    };
  }
}
