import { WBAPIError } from './base-error';

/**
 * Validation error thrown when request data fails validation.
 *
 * This error is thrown for:
 * - 400 Bad Request responses (malformed requests)
 * - 422 Unprocessable Entity responses (validation failures)
 *
 * Includes field-level error details when available to help
 * identify which specific fields failed validation.
 *
 * @example
 * ```typescript
 * import { ValidationError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.products.createProduct({
 *     // Missing required fields
 *   });
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('Validation failed:', error.getUserMessage());
 *
 *     // Access field-level errors
 *     if (error.fieldErrors) {
 *       Object.entries(error.fieldErrors).forEach(([field, message]) => {
 *         console.error(`  - ${field}: ${message}`);
 *       });
 *     }
 *   }
 * }
 * ```
 */
export class ValidationError extends WBAPIError {
  /**
   * Map of field names to their validation error messages
   */
  public readonly fieldErrors?: Record<string, string>;

  /**
   * Creates a validation error
   *
   * @param message - Error message (defaults to standard validation failure message)
   * @param fieldErrors - Optional map of field names to error messages
   * @param statusCode - HTTP status code (400 or 422)
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(
    message = 'Validation failed. Please check the request data and try again.',
    fieldErrors?: Record<string, string>,
    statusCode: 400 | 422 = 400,
    response?: unknown,
    requestId?: string
  ) {
    super(message, statusCode, response, requestId);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }

  /**
   * Returns user-friendly error message with field-level validation details
   *
   * @returns Error message with specific field errors and resolution guidance
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    if (this.fieldErrors && Object.keys(this.fieldErrors).length > 0) {
      const fieldErrorsList = Object.entries(this.fieldErrors)
        .map(([field, error]) => `  - ${field}: ${error}`)
        .join('\n');

      const guidance = [
        '\n\nField validation errors:',
        fieldErrorsList,
        '\nPlease correct the above fields and try again.',
      ].join('\n');

      return baseMessage + guidance;
    }

    const guidance = [
      '\n\nTo resolve this issue:',
      '1. Ensure all required fields are provided',
      '2. Verify that field values meet the API specifications',
      '3. Check that data types and formats are correct',
      '4. Review the API documentation for field requirements',
    ].join('\n');

    return baseMessage + guidance;
  }

  /**
   * Custom JSON serialization to preserve fieldErrors property
   *
   * @returns Object representation including field-level error details
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    fieldErrors?: Record<string, string>;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      statusCode: this.statusCode ?? 400,
      fieldErrors: this.fieldErrors,
    };
  }
}
