import { WBAPIError } from './base-error';

/**
 * Authentication error thrown when API key is invalid or lacks permissions.
 *
 * This error is thrown for:
 * - 401 Unauthorized responses (invalid API key)
 * - 403 Forbidden responses (insufficient permissions)
 * - Client-side API key validation failures
 *
 * @example
 * ```typescript
 * import { AuthenticationError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.general.ping();
 * } catch (error) {
 *   if (error instanceof AuthenticationError) {
 *     console.error('Invalid API key:', error.getUserMessage());
 *     // Prompt user to update API key in settings
 *   }
 * }
 * ```
 */
export class AuthenticationError extends WBAPIError {
  /**
   * Creates an authentication error
   *
   * @param message - Error message (defaults to standard authentication failure message)
   * @param statusCode - HTTP status code (401 or 403)
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   * @param origin - Origin service identifier from RFC 7807 responses
   * @param timestamp - ISO 8601 timestamp from RFC 7807 responses
   */
  constructor(
    message = 'Authentication failed. Please verify your API key is valid and has the required permissions.',
    statusCode: 401 | 403 = 401,
    response?: unknown,
    requestId?: string,
    origin?: string,
    timestamp?: string
  ) {
    super(message, statusCode, response, requestId, origin, timestamp);
    this.name = 'AuthenticationError';
  }

  /**
   * Returns user-friendly error message with API key troubleshooting guidance
   *
   * @returns Error message with actionable recovery steps
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const guidance = [
      '\n\nTo resolve this issue:',
      '1. Verify your API key is valid and correctly formatted',
      '2. Check that your API key has the required permissions for this operation',
      '3. Ensure the Authorization header is properly set',
      '4. Confirm your API key has not been revoked or expired',
    ].join('\n');

    return baseMessage + guidance;
  }
}
