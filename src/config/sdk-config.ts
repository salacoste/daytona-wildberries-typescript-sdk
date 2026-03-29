/**
 * Configuration interfaces for the Wildberries API TypeScript SDK
 *
 * @packageDocumentation
 */

/**
 * Configuration options for initializing the Wildberries SDK
 *
 * This interface defines all configuration parameters accepted by the SDK,
 * including authentication credentials, network settings, and operational parameters.
 *
 * @example
 * ```typescript
 * const config: SDKConfig = {
 *   apiKey: 'your-wildberries-api-key',
 *   timeout: 30000,
 *   logLevel: 'debug'
 * };
 *
 * const sdk = new WildberriesSDK(config);
 * ```
 *
 * @example Advanced configuration with custom base URLs
 * ```typescript
 * const config: SDKConfig = {
 *   apiKey: process.env.WB_API_KEY || '',
 *   baseUrls: {
 *     products: 'https://test-content-api.wildberries.ru', // Testing override
 *   },
 *   timeout: 60000, // 60 seconds for report generation
 *   retryConfig: {
 *     maxRetries: 5,
 *     retryDelay: 2000,
 *     exponentialBackoff: true
 *   },
 *   rateLimitConfig: {
 *     requestsPerSecond: 10,
 *     requestsPerMinute: 100
 *   },
 *   logLevel: 'info'
 * };
 * ```
 */
export interface SDKConfig {
  /**
   * Wildberries API key for authentication
   *
   * This key is automatically injected as `Authorization: Bearer <apiKey>` header
   * on all API requests. Obtain your API key from the Wildberries seller portal.
   *
   * @see {@link https://dev.wildberries.ru/ Wildberries API Documentation}
   */
  apiKey: string;

  /**
   * Optional base URL overrides per API module
   *
   * By default, each module uses its standard production base URL.
   * Use this option to override specific module base URLs (e.g., for testing environments).
   *
   * @example
   * ```typescript
   * baseUrls: {
   *   products: 'https://test-content-api.wildberries.ru',
   *   orders: 'https://test-marketplace-api.wildberries.ru'
   * }
   * ```
   */
  baseUrls?: Partial<Record<string, string>>;

  /**
   * Request timeout in milliseconds
   *
   * @defaultValue 30000 (30 seconds)
   *
   * @remarks
   * Wildberries API can be slow for complex operations (e.g., report generation).
   * Consider increasing this timeout for long-running operations.
   */
  timeout?: number;

  /**
   * Retry configuration for failed requests
   *
   * Controls automatic retry behavior for transient failures (network errors, 5xx, 429).
   * Will be used by RetryHandler in Story 1.5.
   *
   * @remarks
   * Authentication errors (401, 403) and validation errors (400, 422) are NOT retried.
   */
  retryConfig?: {
    /**
     * Maximum number of retry attempts
     * @defaultValue 3
     */
    maxRetries?: number;

    /**
     * Base delay between retries in milliseconds
     * @defaultValue 1000 (1 second)
     */
    retryDelay?: number;

    /**
     * Enable exponential backoff for retries
     *
     * When enabled, retry delay increases exponentially: delay * 2^attempt
     * @defaultValue true
     */
    exponentialBackoff?: boolean;
  };

  /**
   * Global rate limiting configuration
   *
   * Enforces global rate limits across all API endpoints.
   * Will be used by RateLimiter in Story 1.4.
   *
   * @remarks
   * Per-endpoint rate limits (extracted from OpenAPI specs) take precedence over global limits.
   */
  rateLimitConfig?: {
    /**
     * Maximum requests per second across all endpoints
     * @defaultValue undefined (no global limit)
     */
    requestsPerSecond?: number;

    /**
     * Maximum requests per minute across all endpoints
     * @defaultValue undefined (no global limit)
     */
    requestsPerMinute?: number;
  };

  /**
   * Logging verbosity level
   *
   * Controls the amount of debug information logged to console.
   *
   * - `debug`: Logs all requests, responses, and internal operations
   * - `info`: Logs high-level operations and successful requests
   * - `warn`: Logs warnings and recoverable errors (default)
   * - `error`: Logs only critical errors
   *
   * @defaultValue 'warn'
   *
   * @remarks
   * API keys and PII are automatically sanitized from logs at all levels.
   */
  logLevel?: 'debug' | 'info' | 'warn' | 'error';

  /**
   * Wildberries API token type
   *
   * Different token types have different rate limits.
   * Personal and Service tokens have full rate limits.
   * Basic and Test tokens have significantly reduced rate limits (enforced since March 30, 2026).
   *
   * - `'personal'` — For proprietary software, on-premise solutions. Full limits.
   * - `'service'` — For third-party SaaS services from WB Catalog. Full limits.
   * - `'basic'` — Auxiliary token. Reduced rate limits.
   * - `'test'` — For testing. Reduced rate limits.
   *
   * @defaultValue 'personal'
   *
   * @see {@link https://dev.wildberries.ru/news/281 WB API Rate Limits by Token Type}
   */
  tokenType?: 'personal' | 'service' | 'basic' | 'test';
}

/**
 * Per-request options that can override SDK defaults
 *
 * These options are passed to individual HTTP method calls to customize
 * behavior for specific requests.
 *
 * @example
 * ```typescript
 * const options: RequestOptions = {
 *   headers: {
 *     'X-Custom-Header': 'custom-value'
 *   },
 *   rateLimitKey: 'products.create' // For rate limiter identification
 * };
 *
 * await client.get<ProductResponse>(url, options);
 * ```
 *
 * @example Per-request timeout for long-running operations
 * ```typescript
 * // Override global timeout for a single slow request
 * await client.get<ReportResponse>(url, {
 *   timeout: 120000 // 2 minutes for report generation
 * });
 * ```
 */
export interface RequestOptions {
  /**
   * Custom HTTP headers to merge with defaults
   *
   * These headers are merged with the SDK's default headers
   * (Authorization, Content-Type, User-Agent).
   *
   * @example
   * ```typescript
   * headers: {
   *   'X-Request-ID': '123e4567-e89b-12d3-a456-426614174000',
   *   'Accept-Language': 'ru-RU'
   * }
   * ```
   */
  headers?: Record<string, string>;

  /**
   * URL query parameters
   *
   * Query parameters to append to the request URL.
   * These are automatically URL-encoded by axios.
   *
   * @example
   * ```typescript
   * params: {
   *   from: '2024-01-01',
   *   limit: 10,
   *   filter: 'active'
   * }
   * // Results in: ?from=2024-01-01&limit=10&filter=active
   * ```
   */
  params?: Record<string, unknown>;

  /**
   * Rate limit key for endpoint identification
   *
   * Used by RateLimiter (Story 1.4) to enforce per-endpoint rate limits.
   * Format: `moduleName.methodName` (e.g., 'products.create', 'orders.list')
   *
   * @remarks
   * This is automatically set by API module methods. Manual override is rare.
   */
  rateLimitKey?: string;

  /**
   * Per-request timeout in milliseconds
   *
   * Overrides the global `SDKConfig.timeout` for this single request.
   * Useful for long-running operations (e.g., report generation, large data sync)
   * that need more time than the default 30-second timeout.
   *
   * Each retry attempt uses this timeout individually (not cumulative).
   *
   * @example
   * ```typescript
   * // 2-minute timeout for large order sync
   * await sdk.ordersFBS.getOrders(params, {
   *   timeout: 120000
   * });
   * ```
   */
  timeout?: number;

  /**
   * Response type for special handling
   *
   * Specifies the expected response data type for Axios.
   * Used for downloading files as Blob (e.g., Excel reports).
   *
   * @example
   * ```typescript
   * responseType: 'blob' // For file downloads
   * ```
   */
  responseType?: 'json' | 'blob' | 'text' | 'arraybuffer' | 'document' | 'stream';
}
