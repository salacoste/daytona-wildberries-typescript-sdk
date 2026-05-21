/**
 * Retry Handler with Exponential Backoff
 *
 * Provides resilience against transient failures through automatic retry
 * with configurable exponential backoff strategy.
 *
 * @module client/retry-handler
 */

import {
  AuthenticationError,
  ValidationError,
  RateLimitError,
  NetworkError,
  MetaValidationFailError,
} from '../errors';
import { isOperationReadonly } from '../config/operation-metadata';

/**
 * Configuration options for retry behavior
 *
 * Controls how the RetryHandler responds to failures, including
 * maximum retry attempts, delay timing, and backoff strategy.
 *
 * @example
 * ```typescript
 * // Default behavior (3 retries with exponential backoff)
 * const defaultConfig = {};
 *
 * // Custom: More aggressive retries
 * const aggressive: RetryConfig = {
 *   maxRetries: 5,
 *   retryDelay: 500,
 *   exponentialBackoff: true
 * };
 *
 * // Custom: Linear backoff (no exponential)
 * const linear: RetryConfig = {
 *   maxRetries: 3,
 *   retryDelay: 2000,
 *   exponentialBackoff: false
 * };
 * ```
 */
export interface RetryConfig {
  /**
   * Maximum number of retry attempts after initial failure
   *
   * @default 3
   * Minimum: 0
   * @example
   * ```typescript
   * maxRetries: 3  // Initial attempt + 3 retries = 4 total attempts
   * maxRetries: 0  // Disable retries completely
   * ```
   */
  maxRetries?: number;

  /**
   * Initial delay in milliseconds before first retry
   *
   * With exponential backoff, subsequent delays are calculated as:
   * `retryDelay * 2^attempt * jitter`
   *
   * @default 1000 (1 second)
   * Minimum: 0
   * @example
   * ```typescript
   * retryDelay: 1000  // 1s, 2s, 4s, 8s with exponential backoff
   * retryDelay: 500   // 500ms, 1s, 2s, 4s with exponential backoff
   * ```
   */
  retryDelay?: number;

  /**
   * Whether to use exponential backoff for retry delays
   *
   * - `true`: Delays increase exponentially (1s, 2s, 4s, 8s...)
   * - `false`: Delays remain constant (1s, 1s, 1s, 1s...)
   *
   * Exponential backoff gives APIs time to recover from overload
   * and reduces load during incidents.
   *
   * @default true
   * @example
   * ```typescript
   * exponentialBackoff: true   // 1s → 2s → 4s → 8s
   * exponentialBackoff: false  // 1s → 1s → 1s → 1s
   * ```
   */
  exponentialBackoff?: boolean;
}

/**
 * Options for controlling retry behavior per-operation
 *
 * Allows callers to specify operation metadata for readonly-aware retry logic
 * and to force retries even for write operations when explicitly intended.
 *
 * @example
 * ```typescript
 * // Retry with operation key lookup
 * await handler.executeWithRetry(
 *   () => api.getProducts(),
 *   'getProducts',
 *   { operationKey: 'products.getCardsList' }
 * );
 *
 * // Force retry for write operation (use with caution)
 * await handler.executeWithRetry(
 *   () => api.createProduct(data),
 *   'createProduct',
 *   { operationKey: 'products.createCardsUpload', forceRetry: true }
 * );
 * ```
 */
export interface RetryOptions {
  /**
   * Operation key for metadata lookup (format: '{module}.{methodName}')
   *
   * Used to check if the operation is readonly (safe to retry).
   * If the operation is NOT readonly (write operation), retries will be
   * skipped unless `forceRetry` is true.
   *
   * @example 'products.getCardsList', 'products.createCardsUpload'
   */
  operationKey?: string;

  /**
   * Force retry even for write operations
   *
   * **Use with extreme caution!** Write operations may have side effects
   * and retrying could cause duplicate data (e.g., duplicate product cards).
   *
   * Only set to true when you have idempotency guarantees or are certain
   * the operation can be safely retried.
   *
   * @default false
   */
  forceRetry?: boolean;
}

/**
 * Context information for a retry operation
 *
 * Provides metadata about the current retry attempt, used
 * for logging and debugging purposes.
 */
export interface RetryContext {
  /**
   * Current retry attempt number (0-indexed)
   *
   * - Attempt 0: Initial try
   * - Attempt 1: First retry
   * - Attempt 2: Second retry
   * - etc.
   *
   * Minimum: 0
   */
  attempt: number;

  /**
   * Human-readable description of the operation being retried
   *
   * Used for logging and debugging to identify which operation
   * is experiencing retries.
   *
   * @example
   * ```typescript
   * operation: 'GET https://api.example.com/products'
   * operation: 'POST https://api.example.com/orders'
   * ```
   */
  operation: string;
}

/**
 * RetryHandler - Automatic retry with exponential backoff
 *
 * Provides resilience against transient failures by automatically retrying
 * failed operations with configurable delays and backoff strategies.
 *
 * **Retry Policy:**
 * - ✅ Retries: 5xx errors, 429 rate limits, network timeouts, connection failures
 * - ❌ NO Retry: 401/403 auth errors, 400/422 validation errors, other 4xx errors
 *
 * **Exponential Backoff:**
 * - Formula: `delay = retryDelay * 2^attempt * jitter`
 * - Jitter: Random ±10% to prevent thundering herd
 * - Max delay: Capped at 30 seconds
 *
 * @example
 * ```typescript
 * const handler = new RetryHandler({
 *   maxRetries: 3,
 *   retryDelay: 1000,
 *   exponentialBackoff: true
 * });
 *
 * const result = await handler.executeWithRetry(
 *   async () => await fetchData(),
 *   'fetchData'
 * );
 * ```
 */
export class RetryHandler {
  private config: Required<RetryConfig>;
  private logLevel: 'debug' | 'info' | 'warn' | 'error';

  /**
   * Creates a new RetryHandler instance
   *
   * @param config - Optional retry configuration (uses defaults if not provided)
   * @param logLevel - Log level to control retry log verbosity (inherits from SDKConfig)
   *
   * @example
   * ```typescript
   * // Use defaults (3 retries, 1s delay, exponential backoff)
   * const handler = new RetryHandler();
   *
   * // Custom configuration
   * const handler = new RetryHandler({
   *   maxRetries: 5,
   *   retryDelay: 500,
   *   exponentialBackoff: true
   * });
   * ```
   */
  constructor(config?: RetryConfig, logLevel?: 'debug' | 'info' | 'warn' | 'error') {
    this.config = {
      maxRetries: config?.maxRetries ?? 3,
      retryDelay: config?.retryDelay ?? 1000,
      exponentialBackoff: config?.exponentialBackoff ?? true,
    };
    this.logLevel = logLevel ?? 'warn';
  }

  /**
   * Executes an async operation with automatic retry on transient failures
   *
   * Wraps the provided operation and automatically retries on failures that
   * are likely to be transient (network errors, server errors, rate limits).
   *
   * **Retry Behavior:**
   * - Retries on: NetworkError (5xx, timeout, no status), RateLimitError (429)
   * - NO retry on: AuthenticationError, ValidationError, other 4xx errors
   * - Uses exponential backoff with jitter (if configured)
   * - Preserves and re-throws final error after max retries exhausted
   *
   * @typeParam T - The return type of the operation
   * @param operation - Async function to execute (and retry on failure)
   * @param operationName - Description of operation for logging (optional)
   * @returns The result of the successful operation
   * @throws The final error if all retry attempts are exhausted
   *
   * @example
   * ```typescript
   * // Basic usage
   * const data = await handler.executeWithRetry(
   *   async () => await api.getData(),
   *   'getData'
   * );
   *
   * // With arrow function
   * const result = await handler.executeWithRetry(
   *   () => fetch('https://api.example.com/data').then(r => r.json()),
   *   'fetch data'
   * );
   *
   * // With readonly-aware retry (recommended for SDK operations)
   * const products = await handler.executeWithRetry(
   *   () => api.getProducts(),
   *   'getProducts',
   *   { operationKey: 'products.getCardsList' }
   * );
   *
   * // Force retry for write operation (use with caution)
   * const created = await handler.executeWithRetry(
   *   () => api.createProduct(data),
   *   'createProduct',
   *   { operationKey: 'products.createCardsUpload', forceRetry: true }
   * );
   * ```
   */
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName = 'operation',
    options?: RetryOptions
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await operation();

        // Log success after retries
        if (attempt > 0) {
          this.log('info', `Operation succeeded after ${String(attempt)} retries`, {
            operationName,
          });
        }

        return result;
      } catch (error) {
        lastError = error as Error;

        // Check if we should retry this error
        if (!this.shouldRetry(error, attempt, options)) {
          if (attempt > 0) {
            this.log(
              'warn',
              `All retries exhausted for ${operationName} after ${String(attempt)} attempts`,
              {
                operationName,
                attempts: attempt,
                maxRetries: this.config.maxRetries,
                finalError: error instanceof Error ? error.message : String(error),
              }
            );
          }
          throw error;
        }

        // Calculate delay for next retry
        const delay = this.calculateDelay(attempt);

        // Info-level: concise retry status for users
        this.log(
          'info',
          `Retrying ${operationName} (attempt ${String(attempt + 1)}/${String(this.config.maxRetries)}, waiting ${String(Math.round(delay))}ms)`,
          {
            operationName,
            attempt: attempt + 1,
            maxRetries: this.config.maxRetries,
            delay: Math.round(delay),
          }
        );

        // Debug-level: full error context for developers
        this.log('debug', `Retry context for ${operationName}`, {
          operationName,
          attempt: attempt + 1,
          maxRetries: this.config.maxRetries,
          delay: Math.round(delay),
          errorMessage: error instanceof Error ? error.message : String(error),
          errorType: error instanceof Error ? error.constructor.name : typeof error,
          statusCode: error instanceof NetworkError ? error.statusCode : undefined,
          isTimeout: error instanceof NetworkError ? error.isTimeout : undefined,
        });

        await this.sleep(delay);
      }
    }

    // All retries exhausted
    this.log('warn', `Max retries exhausted for ${operationName}`, {
      maxRetries: this.config.maxRetries,
    });

    // This should never happen due to loop logic, but TypeScript needs the check
    if (!lastError) {
      throw new Error('Unexpected: No error captured after retry exhaustion');
    }

    throw lastError;
  }

  /**
   * Determines if an error should be retried
   *
   * Classifies errors into retryable (transient) and non-retryable (permanent).
   *
   * **Retryable Errors:**
   * - NetworkError with 5xx status (500-599)
   * - NetworkError with timeout flag
   * - NetworkError with no status (network failure)
   * - RateLimitError (429)
   *
   * **Non-Retryable Errors:**
   * - AuthenticationError (401, 403) - invalid credentials won't fix with retry
   * - ValidationError (400, 422) - bad request data won't fix with retry
   * - Other 4xx errors - client errors are permanent failures
   * - Write operations (unless forceRetry is true) - may cause duplicate data
   *
   * @param error - The error to classify
   * @param attempt - Current attempt number (0-indexed)
   * @param options - Optional retry options with operation metadata
   * @returns true if error should be retried, false otherwise
   *
   * @private
   */
  private shouldRetry(error: unknown, attempt: number, options?: RetryOptions): boolean {
    // Exhausted retries
    if (attempt >= this.config.maxRetries) {
      return false;
    }

    // Type-safe error checking using instanceof
    if (error instanceof AuthenticationError) {
      return false; // Permanent failure - invalid credentials
    }

    // MetaValidationFailError is never retried — 409 responses on FBS deliver-supply
    // count as 10 requests against the rate-limit budget; retry storms would exhaust
    // quota 10× faster than for any other error class.
    if (error instanceof MetaValidationFailError) {
      return false;
    }

    if (error instanceof ValidationError) {
      return false; // Permanent failure - bad request data
    }

    // Check readonly safety for write operations
    // This check happens BEFORE error type checks to prevent any retry of write operations
    if (options?.operationKey) {
      const isReadonly = isOperationReadonly(options.operationKey);
      if (!isReadonly && !options.forceRetry) {
        this.log('info', `Skipping retry for write operation: ${options.operationKey}`, {
          operationKey: options.operationKey,
          readonly: isReadonly,
          forceRetry: options.forceRetry ?? false,
        });
        return false;
      }
    }

    if (error instanceof RateLimitError) {
      return true; // Transient - should retry with backoff
    }

    if (error instanceof NetworkError) {
      // Retry on 5xx, timeouts, and network failures
      const status = error.statusCode;

      // No status = network failure (retry)
      if (!status || status === 0) return true;

      // 5xx errors are transient server errors
      if (status >= 500 && status < 600) return true;

      // Timeouts are transient
      if (error.isTimeout) return true;

      // Other status codes (4xx except 429) are permanent failures
      return false;
    }

    // Unknown error type - default to no retry (conservative approach)
    return false;
  }

  /**
   * Calculates the delay before the next retry attempt
   *
   * **Exponential Backoff (when enabled):**
   * - Formula: `delay = retryDelay * 2^attempt * jitter`
   * - Example: 1s → 2s → 4s → 8s (with default 1000ms retryDelay)
   *
   * **Linear Backoff (when disabled):**
   * - Formula: `delay = retryDelay * jitter`
   * - Example: 1s → 1s → 1s → 1s (constant delay)
   *
   * **Jitter:**
   * - Adds random ±10% variation to prevent thundering herd
   * - Multiple clients won't retry simultaneously after service recovery
   *
   * **Max Cap:**
   * - Delays are capped at 30 seconds to prevent excessive waits
   *
   * @param attempt - Current attempt number (0-indexed)
   * @returns Delay in milliseconds before next retry
   *
   * @example
   * ```typescript
   * // With exponentialBackoff: true, retryDelay: 1000
   * calculateDelay(0) // ~1000ms (1s * 2^0 * jitter)
   * calculateDelay(1) // ~2000ms (1s * 2^1 * jitter)
   * calculateDelay(2) // ~4000ms (1s * 2^2 * jitter)
   *
   * // With exponentialBackoff: false, retryDelay: 1000
   * calculateDelay(0) // ~1000ms
   * calculateDelay(1) // ~1000ms
   * calculateDelay(2) // ~1000ms
   * ```
   *
   * @private
   */
  private calculateDelay(attempt: number): number {
    let delay: number;

    if (this.config.exponentialBackoff) {
      // Exponential: delay * 2^attempt
      delay = this.config.retryDelay * Math.pow(2, attempt);
    } else {
      // Linear: constant delay
      delay = this.config.retryDelay;
    }

    // Add jitter (±10%) to prevent thundering herd
    const jitter = 1 + (Math.random() * 0.2 - 0.1);
    delay = delay * jitter;

    // Cap at 30 seconds to prevent excessive waits
    return Math.min(delay, 30000);
  }

  /**
   * Sleeps for the specified number of milliseconds
   *
   * @param ms - Milliseconds to sleep
   * @returns Promise that resolves after the delay
   *
   * @private
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Logs retry-related messages respecting SDK logLevel configuration
   *
   * Uses structured JSON logging format consistent with BaseClient.
   * Only emits logs when the message level meets or exceeds the configured threshold.
   *
   * @param level - Log level for this message
   * @param message - Human-readable log message
   * @param meta - Optional structured metadata to include
   *
   * @private
   */
  private log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    meta?: Record<string, unknown>
  ): void {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    if (levels[level] < levels[this.logLevel]) return;

    const consoleMethods = {
      // eslint-disable-next-line no-console
      debug: console.debug,
      // eslint-disable-next-line no-console
      info: console.info,
      // eslint-disable-next-line no-console
      warn: console.warn,
      // eslint-disable-next-line no-console
      error: console.error,
    };

    consoleMethods[level](
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        service: 'RetryHandler',
        message,
        ...(meta ?? {}),
      })
    );
  }
}
