/**
 * BaseClient - Core HTTP infrastructure for Wildberries API SDK
 *
 * Provides centralized HTTP client with authentication, timeout configuration,
 * error transformation, and debug logging for all SDK modules.
 *
 * @packageDocumentation
 */

import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { SDKConfig, RequestOptions } from '../config';
import {
  WBAPIError,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
} from '../errors';
import { RateLimiter } from './rate-limiter';
import { RetryHandler } from './retry-handler';
import { ALL_RATE_LIMITS } from '../config/rate-limits';

/**
 * Base HTTP client for all Wildberries API modules
 *
 * This class provides a unified HTTP interface with:
 * - Automatic authentication header injection
 * - Configurable timeouts
 * - Typed error transformation
 * - Debug logging with PII sanitization
 *
 * All API modules receive a BaseClient instance via dependency injection
 * to ensure consistent behavior across the SDK.
 *
 * @example Basic usage
 * ```typescript
 * const config: SDKConfig = {
 *   apiKey: 'your-api-key',
 *   timeout: 30000,
 *   logLevel: 'debug'
 * };
 *
 * const client = new BaseClient(config);
 *
 * // Make GET request
 * const data = await client.get<ProductResponse>(
 *   'https://content-api.wildberries.ru/api/v1/products'
 * );
 * ```
 *
 * @example With custom headers
 * ```typescript
 * const data = await client.post<CreateProductResponse>(
 *   'https://content-api.wildberries.ru/api/v1/products',
 *   { brandName: 'MyBrand', title: 'Product Title' },
 *   { headers: { 'X-Request-ID': '123' } }
 * );
 * ```
 */
export class BaseClient {
  private axios: AxiosInstance;
  private apiKey: string;
  private logLevel: 'debug' | 'info' | 'warn' | 'error';
  private rateLimiter: RateLimiter;
  private retryHandler: RetryHandler;

  /**
   * Creates a new BaseClient instance
   *
   * @param config - SDK configuration object
   *
   * @throws {Error} If apiKey is not provided or invalid
   *
   * @example
   * ```typescript
   * const client = new BaseClient({
   *   apiKey: process.env.WB_API_KEY || '',
   *   timeout: 60000,
   *   logLevel: 'info'
   * });
   * ```
   */
  constructor(config: SDKConfig) {
    this.apiKey = config.apiKey;
    this.logLevel = config.logLevel ?? 'warn';

    // Initialize Axios instance with configuration
    this.axios = axios.create({
      timeout: config.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'WildberriesSDK/0.1.0',
      },
    });

    // Set up request interceptor for authentication
    this.setupRequestInterceptor();

    // Initialize rate limiter with predefined limits
    this.rateLimiter = new RateLimiter(ALL_RATE_LIMITS);

    // Initialize retry handler with configuration
    this.retryHandler = new RetryHandler(config.retryConfig);
  }

  /**
   * Make a GET request with automatic retry on transient failures
   *
   * Automatically retries on network errors, 5xx server errors, and 429 rate limits.
   * Does NOT retry on authentication errors (401/403) or validation errors (400/422).
   *
   * @typeParam T - Expected response type
   * @param url - Full URL for the request
   * @param options - Optional request options
   * @returns Promise resolving to typed response data
   *
   * @throws {AuthenticationError} On 401/403 responses
   * @throws {RateLimitError} On 429 responses (after retries exhausted)
   * @throws {ValidationError} On 400/422 responses
   * @throws {NetworkError} On network failures or 5xx responses (after retries exhausted)
   *
   * @example
   * ```typescript
   * interface Product {
   *   id: string;
   *   name: string;
   * }
   *
   * const product = await client.get<Product>(
   *   'https://content-api.wildberries.ru/api/v1/products/123'
   * );
   * console.log(product.name);
   * ```
   */
  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.retryHandler.executeWithRetry(async () => {
      // Apply rate limiting if rateLimitKey provided
      if (options?.rateLimitKey) {
        await this.rateLimiter.waitForSlot(options.rateLimitKey);
      }

      try {
        this.log('debug', 'GET request', { url });

        const response = await this.axios.get<T>(url, {
          headers: options?.headers,
          params: options?.params,
          responseType: options?.responseType,
        });

        this.log('debug', 'GET response', {
          url,
          status: response.status,
        });

        return response.data;
      } catch (error) {
        this.transformError(error);
      }
    }, `GET ${url}`);
  }

  /**
   * Make a POST request with automatic retry on transient failures
   *
   * Automatically retries on network errors, 5xx server errors, and 429 rate limits.
   * Does NOT retry on authentication errors (401/403) or validation errors (400/422).
   *
   * @typeParam T - Expected response type
   * @param url - Full URL for the request
   * @param data - Request body data
   * @param options - Optional request options
   * @returns Promise resolving to typed response data
   *
   * @throws {AuthenticationError} On 401/403 responses
   * @throws {RateLimitError} On 429 responses (after retries exhausted)
   * @throws {ValidationError} On 400/422 responses
   * @throws {NetworkError} On network failures or 5xx responses (after retries exhausted)
   *
   * @example
   * ```typescript
   * interface CreateProductRequest {
   *   brandName: string;
   *   title: string;
   * }
   *
   * interface CreateProductResponse {
   *   id: string;
   * }
   *
   * const result = await client.post<CreateProductResponse>(
   *   'https://content-api.wildberries.ru/api/v1/products',
   *   { brandName: 'MyBrand', title: 'New Product' }
   * );
   * ```
   */
  async post<T>(
    url: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.retryHandler.executeWithRetry(async () => {
      // Apply rate limiting if rateLimitKey provided
      if (options?.rateLimitKey) {
        await this.rateLimiter.waitForSlot(options.rateLimitKey);
      }

      try {
        this.log('debug', 'POST request', { url });

        const response = await this.axios.post<T>(url, data, {
          headers: options?.headers,
          params: options?.params,
        });

        this.log('debug', 'POST response', {
          url,
          status: response.status,
        });

        return response.data;
      } catch (error) {
        this.transformError(error);
      }
    }, `POST ${url}`);
  }

  /**
   * Make a PUT request with automatic retry on transient failures
   *
   * Automatically retries on network errors, 5xx server errors, and 429 rate limits.
   * Does NOT retry on authentication errors (401/403) or validation errors (400/422).
   *
   * @typeParam T - Expected response type
   * @param url - Full URL for the request
   * @param data - Request body data
   * @param options - Optional request options
   * @returns Promise resolving to typed response data
   *
   * @throws {AuthenticationError} On 401/403 responses
   * @throws {RateLimitError} On 429 responses (after retries exhausted)
   * @throws {ValidationError} On 400/422 responses
   * @throws {NetworkError} On network failures or 5xx responses (after retries exhausted)
   *
   * @example
   * ```typescript
   * const updated = await client.put<ProductResponse>(
   *   'https://content-api.wildberries.ru/api/v1/products/123',
   *   { title: 'Updated Title' }
   * );
   * ```
   */
  async put<T>(
    url: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.retryHandler.executeWithRetry(async () => {
      // Apply rate limiting if rateLimitKey provided
      if (options?.rateLimitKey) {
        await this.rateLimiter.waitForSlot(options.rateLimitKey);
      }

      try {
        this.log('debug', 'PUT request', { url });

        const response = await this.axios.put<T>(url, data, {
          headers: options?.headers,
          params: options?.params,
        });

        this.log('debug', 'PUT response', {
          url,
          status: response.status,
        });

        return response.data;
      } catch (error) {
        this.transformError(error);
      }
    }, `PUT ${url}`);
  }

  /**
   * Make a PATCH request with automatic retry on transient failures
   *
   * Automatically retries on network errors, 5xx server errors, and 429 rate limits.
   * Does NOT retry on authentication errors (401/403) or validation errors (400/422).
   *
   * @typeParam T - Expected response type
   * @param url - Full URL for the request
   * @param data - Request body data
   * @param options - Optional request options
   * @returns Promise resolving to typed response data
   *
   * @throws {AuthenticationError} On 401/403 responses
   * @throws {RateLimitError} On 429 responses (after retries exhausted)
   * @throws {ValidationError} On 400/422 responses
   * @throws {NetworkError} On network failures or 5xx responses (after retries exhausted)
   *
   * @example
   * ```typescript
   * const patched = await client.patch<ProductResponse>(
   *   'https://content-api.wildberries.ru/api/v1/products/123',
   *   { stock: 100 }
   * );
   * ```
   */
  async patch<T>(
    url: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.retryHandler.executeWithRetry(async () => {
      // Apply rate limiting if rateLimitKey provided
      if (options?.rateLimitKey) {
        await this.rateLimiter.waitForSlot(options.rateLimitKey);
      }

      try {
        this.log('debug', 'PATCH request', { url });

        const response = await this.axios.patch<T>(url, data, {
          headers: options?.headers,
          params: options?.params,
        });

        this.log('debug', 'PATCH response', {
          url,
          status: response.status,
        });

        return response.data;
      } catch (error) {
        this.transformError(error);
      }
    }, `PATCH ${url}`);
  }

  /**
   * Make a DELETE request with automatic retry on transient failures
   *
   * Automatically retries on network errors, 5xx server errors, and 429 rate limits.
   * Does NOT retry on authentication errors (401/403) or validation errors (400/422).
   *
   * @typeParam T - Expected response type
   * @param url - Full URL for the request
   * @param data - Optional request body data (RFC 7231 allows DELETE with body)
   * @param options - Optional request options
   * @returns Promise resolving to typed response data
   *
   * @throws {AuthenticationError} On 401/403 responses
   * @throws {RateLimitError} On 429 responses (after retries exhausted)
   * @throws {ValidationError} On 400/422 responses
   * @throws {NetworkError} On network failures or 5xx responses (after retries exhausted)
   *
   * @example
   * ```typescript
   * // DELETE without body
   * await client.delete<void>(
   *   'https://content-api.wildberries.ru/api/v1/products/123'
   * );
   *
   * // DELETE with body (RFC 7231 allows this)
   * await client.delete<void>(
   *   'https://marketplace-api.wildberries.ru/api/v3/stocks/123',
   *   { skus: ['SKU123', 'SKU456'] }
   * );
   * ```
   */
  async delete<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.retryHandler.executeWithRetry(async () => {
      // Apply rate limiting if rateLimitKey provided
      if (options?.rateLimitKey) {
        await this.rateLimiter.waitForSlot(options.rateLimitKey);
      }

      try {
        this.log('debug', 'DELETE request', { url, hasBody: !!data });

        const response = await this.axios.delete<T>(url, {
          headers: options?.headers,
          params: options?.params,
          data,
        });

        this.log('debug', 'DELETE response', {
          url,
          status: response.status,
        });

        return response.data;
      } catch (error) {
        this.transformError(error);
      }
    }, `DELETE ${url}`);
  }

  /**
   * Set up Axios request interceptor for authentication
   *
   * Automatically injects the Authorization header on all requests
   * and logs request details in debug mode.
   *
   * @private
   */
  private setupRequestInterceptor(): void {
    this.axios.interceptors.request.use((config) => {
      // Inject authentication header
      config.headers.Authorization = `Bearer ${this.apiKey}`;

      // Debug logging with sanitized headers
      if (this.logLevel === 'debug') {
        this.log('debug', 'HTTP Request Interceptor', {
          method: config.method?.toUpperCase(),
          url: config.url,
          headers: this.sanitizeHeaders(config.headers),
        });
      }

      return config;
    });
  }

  /**
   * Transform Axios errors to typed SDK errors
   *
   * Maps HTTP status codes and network errors to appropriate error classes:
   * - 401/403 → AuthenticationError
   * - 429 → RateLimitError
   * - 400/422 → ValidationError
   * - 5xx → NetworkError
   * - Network failures → NetworkError
   *
   * @param error - Error from Axios request
   * @throws Typed SDK error
   *
   * @private
   */
  private transformError(error: unknown): never {
    // Type guard for Axios errors
    if (!axios.isAxiosError(error)) {
      this.log('error', 'Unknown error occurred', { error });
      throw new NetworkError(
        'Unknown error occurred',
        false,
        0,
        error as Error
      );
    }

    const axiosError = error as AxiosError;

    // No response = network failure
    if (!axiosError.response) {
      const isTimeout =
        axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT';

      this.log('error', 'Network error', {
        code: axiosError.code,
        isTimeout,
        message: axiosError.message,
      });

      throw new NetworkError(
        isTimeout ? 'Request timed out' : 'Network error occurred',
        isTimeout,
        0,
        axiosError
      );
    }

    const status = axiosError.response.status;
    const responseData = axiosError.response.data;

    this.log('warn', 'HTTP error response', {
      status,
      url: axiosError.config?.url,
    });

    // Transform based on status code
    if (status === 401 || status === 403) {
      throw new AuthenticationError(
        'Authentication failed. Please verify your API key.',
        status
      );
    }

    if (status === 429) {
      const retryAfter = this.parseRetryAfter(
        axiosError.response.headers['retry-after'] as string | undefined
      );
      throw new RateLimitError(
        `Rate limit exceeded. Retry after ${retryAfter.toString()}ms`,
        retryAfter
      );
    }

    if (status === 400 || status === 422) {
      const fieldErrors = this.extractFieldErrors(responseData);
      throw new ValidationError(
        'Validation failed',
        fieldErrors,
        status
      );
    }

    if (status >= 500) {
      throw new NetworkError(
        `Server error: ${status.toString()}`,
        false,
        status,
        axiosError
      );
    }

    // Fallback for unexpected status codes
    throw new WBAPIError(`HTTP error ${status.toString()}`, status, responseData);
  }

  /**
   * Parse Retry-After header to milliseconds
   *
   * @param header - Retry-After header value (in seconds)
   * @returns Retry delay in milliseconds
   *
   * @private
   */
  private parseRetryAfter(header?: string): number {
    if (!header) return 5000; // Default 5 seconds
    const seconds = parseInt(header, 10);
    return isNaN(seconds) ? 5000 : seconds * 1000; // Convert to milliseconds
  }

  /**
   * Extract field-level validation errors from API response
   *
   * @param responseData - API response data
   * @returns Field errors map or undefined
   *
   * @private
   */
  private extractFieldErrors(
    responseData: unknown
  ): Record<string, string> | undefined {
    // Parse API-specific error format
    if (
      responseData &&
      typeof responseData === 'object' &&
      'errors' in responseData &&
      responseData.errors &&
      typeof responseData.errors === 'object'
    ) {
      return responseData.errors as Record<string, string>;
    }
    return undefined;
  }

  /**
   * Log message with structured format and sanitization
   *
   * Only logs if message level meets or exceeds configured logLevel.
   * Automatically sanitizes sensitive information (API keys, PII).
   *
   * @param level - Log level
   * @param message - Log message
   * @param meta - Optional metadata
   *
   * @private
   */
  private log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    meta?: unknown
  ): void {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    const currentLevel = levels[this.logLevel];
    const messageLevel = levels[level];

    if (messageLevel < currentLevel) return; // Skip if below threshold

    const logData = {
      timestamp: new Date().toISOString(),
      level,
      service: 'WildberriesSDK',
      message,
      meta: this.sanitizeMeta(meta),
    };

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

    consoleMethods[level](JSON.stringify(logData));
  }

  /**
   * Sanitize metadata to remove sensitive information
   *
   * @param meta - Raw metadata object
   * @returns Sanitized metadata
   *
   * @private
   */
  private sanitizeMeta(meta: unknown): unknown {
    if (!meta) return undefined;

    try {
      // Deep clone to avoid modifying original
      const sanitized: unknown = JSON.parse(JSON.stringify(meta));

      // Sanitize Authorization headers with proper type guards
      if (
        sanitized &&
        typeof sanitized === 'object' &&
        'headers' in sanitized &&
        sanitized.headers &&
        typeof sanitized.headers === 'object'
      ) {
        const headers = sanitized.headers as Record<string, unknown>;
        if ('Authorization' in headers) {
          headers.Authorization = 'Bearer ***';
        }
      }

      return sanitized;
    } catch {
      return undefined;
    }
  }

  /**
   * Sanitize headers for logging
   *
   * @param headers - Request headers
   * @returns Sanitized headers
   *
   * @private
   */
  private sanitizeHeaders(
    headers: Record<string, string>
  ): Record<string, string> {
    const sanitized = { ...headers };
    if (sanitized.Authorization) {
      sanitized.Authorization = 'Bearer ***';
    }
    return sanitized;
  }
}
