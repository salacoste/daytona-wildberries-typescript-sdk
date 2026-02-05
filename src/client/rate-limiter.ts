/**
 * Rate Limiting with Token Bucket Algorithm
 *
 * This module implements automatic rate limiting for Wildberries API endpoints using
 * the token bucket algorithm. Each endpoint can have independent rate limits configured
 * to prevent exceeding API quotas and avoid request throttling or bans.
 *
 * @module client/rate-limiter
 */

/**
 * Configuration for rate limiting a specific endpoint.
 *
 * Rate limits follow the token bucket algorithm where:
 * - Each request consumes 1 token from the bucket
 * - Tokens refill at a steady rate based on `requestsPerMinute`
 * - The bucket can hold up to `burstLimit` tokens maximum
 * - Requests wait in queue when no tokens are available
 *
 * @example
 * ```typescript
 * // Strict limit: 1 request every 10 seconds
 * const strictLimit: RateLimitConfig = {
 *   requestsPerMinute: 6,      // 60s / 10s = 6 requests/minute
 *   intervalSeconds: 10,       // Minimum 10s between requests
 *   burstLimit: 1              // Cannot burst multiple requests
 * };
 *
 * // Burst-friendly: 20 requests/minute, can burst 10 initially
 * const burstLimit: RateLimitConfig = {
 *   requestsPerMinute: 20,
 *   burstLimit: 10             // Can send 10 rapid requests, then throttled
 * };
 *
 * // Simple rate limit: 5 requests/minute
 * const simpleLimit: RateLimitConfig = {
 *   requestsPerMinute: 5       // burstLimit defaults to 5
 * };
 * ```
 */
export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed per 1-minute window.
   *
   * This determines the token refill rate:
   * - refillRate = requestsPerMinute / 60000 (tokens per millisecond)
   *
   * @example 6 // Allows 6 requests per minute (1 request every 10 seconds)
   * @example 20 // Allows 20 requests per minute (3 requests every second)
   */
  requestsPerMinute: number;

  /**
   * Optional minimum interval in seconds between requests.
   *
   * When specified, enforces a strict minimum time gap between consecutive requests.
   * This is useful for endpoints with explicit interval requirements (e.g., "20 seconds between requests").
   *
   * @example 10 // Enforces 10-second minimum interval between requests
   * @default undefined // No interval enforcement, only per-minute limit
   */
  intervalSeconds?: number;

  /**
   * Optional maximum number of tokens the bucket can hold (burst capacity).
   *
   * Allows sending multiple requests rapidly up to this limit before rate limiting kicks in.
   * After consuming all burst tokens, requests are throttled to the `requestsPerMinute` rate.
   *
   * @example 10 // Can send 10 rapid requests, then limited to requestsPerMinute
   * @default requestsPerMinute // Burst limit equals per-minute limit
   */
  burstLimit?: number;

  /**
   * Optional penalty multiplier for 409 (Conflict) responses.
   *
   * When a request receives a 409 response, this many tokens are consumed from the bucket
   * instead of the default 1. This accounts for API-level penalties where conflict responses
   * count as multiple requests toward the rate limit.
   *
   * @example 5 // In-store pickup: one 409 counts as 5 requests
   * @example 10 // FBS/FBW: one 409 counts as 10 requests
   * @default undefined // No penalty (409 counts as 1 request like any other)
   */
  penaltyMultiplier?: number;
}

/**
 * Mapping of endpoint keys to their rate limit configurations.
 *
 * Each key represents a unique API endpoint or operation (e.g., 'products.create', 'orders.list').
 * Keys are arbitrary strings defined by the SDK module implementations.
 *
 * @example
 * ```typescript
 * const limits: EndpointLimits = {
 *   'products.create': {
 *     requestsPerMinute: 6,
 *     intervalSeconds: 10,
 *     burstLimit: 1
 *   },
 *   'products.list': {
 *     requestsPerMinute: 20,
 *     burstLimit: 20
 *   },
 *   'orders.updateStatus': {
 *     requestsPerMinute: 10
 *   }
 * };
 * ```
 */
export type EndpointLimits = Record<string, RateLimitConfig>;

/**
 * Internal token bucket implementation for rate limiting.
 *
 * Implements the token bucket algorithm where:
 * 1. A bucket holds up to `capacity` tokens
 * 2. Tokens refill at a steady `refillRate` over time
 * 3. Each request consumes 1 token
 * 4. Requests queue when no tokens are available
 * 5. Queued requests are processed FIFO when tokens become available
 *
 * This class is used internally by RateLimiter and not exported.
 *
 * @internal
 * @see {@link https://en.wikipedia.org/wiki/Token_bucket Token Bucket Algorithm}
 */
class _TokenBucket {
  /**
   * Current number of tokens available in the bucket.
   * Starts at `capacity` and decreases with each request.
   * Refills over time based on `refillRate`.
   */
  private tokens: number;

  /**
   * Maximum number of tokens the bucket can hold (burst capacity).
   * Derived from config.burstLimit or config.requestsPerMinute.
   */
  private readonly capacity: number;

  /**
   * Rate at which tokens are added to the bucket (tokens per millisecond).
   * Calculated as: requestsPerMinute / 60000
   *
   * @example
   * // For 6 requests/minute:
   * refillRate = 6 / 60000 = 0.0001 tokens/ms = 1 token/10000ms
   */
  private readonly refillRate: number;

  /**
   * Timestamp (milliseconds since epoch) of the last token refill operation.
   * Used to calculate how many tokens to add based on elapsed time.
   */
  private lastRefill: number;

  /**
   * Queue of pending requests waiting for tokens to become available.
   * Each item is a Promise resolve function that will be called when
   * a token becomes available for that request.
   *
   * Requests are processed in FIFO order.
   */
  private readonly queue: (() => void)[];

  /**
   * Creates a new token bucket with the specified rate limit configuration.
   *
   * @param config - Rate limit configuration for this bucket
   */
  constructor(config: RateLimitConfig) {
    this.capacity = config.burstLimit ?? config.requestsPerMinute;
    this.tokens = this.capacity; // Start with full bucket
    this.refillRate = config.requestsPerMinute / 60000; // tokens per millisecond
    this.lastRefill = Date.now();
    this.queue = [];
  }

  /**
   * Refills tokens based on elapsed time since last refill.
   *
   * Tokens are added at the configured `refillRate` but never exceed `capacity`.
   * This method is called before each token consumption attempt.
   *
   * @example
   * // If refillRate is 0.0001 tokens/ms and 10000ms have elapsed:
   * // tokensToAdd = 10000 * 0.0001 = 1 token
   * // tokens = Math.min(capacity, currentTokens + 1)
   */
  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = elapsed * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  /**
   * Attempts to consume a token for a request.
   *
   * If tokens are available, consumes one immediately and resolves.
   * If no tokens are available, queues the request and returns a Promise
   * that will resolve when a token becomes available.
   *
   * Queued requests are processed in FIFO order.
   *
   * @returns Promise that resolves when a token has been consumed
   *
   * @example
   * ```typescript
   * const bucket = new TokenBucket({ requestsPerMinute: 6, burstLimit: 1 });
   *
   * // First request: immediate (token available)
   * await bucket.consume(); // Resolves immediately
   *
   * // Second request: queued (no tokens)
   * await bucket.consume(); // Waits ~10 seconds for token refill
   * ```
   */
  async consume(): Promise<void> {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return; // Immediate execution
    }

    // Queue the request and wait for token availability
    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
      this.scheduleNextRelease();
    });
  }

  /**
   * Schedules the release of the next queued request when a token becomes available.
   *
   * Calculates the time until the next token will be available based on `refillRate`,
   * then uses setTimeout to process the next queued request at that time.
   *
   * This method is called automatically when a request is queued.
   *
   * @private
   */
  private scheduleNextRelease(): void {
    if (this.queue.length === 0) return;

    // Calculate milliseconds until next token is available
    const timeToNextToken = 1 / this.refillRate;

    setTimeout(() => {
      this.refill();

      if (this.tokens >= 1 && this.queue.length > 0) {
        this.tokens -= 1;
        const resolve = this.queue.shift();
        if (resolve) {
          resolve();
        }

        // Schedule next release if queue has more requests
        if (this.queue.length > 0) {
          this.scheduleNextRelease();
        }
      }
    }, timeToNextToken);
  }

  /**
   * Get the current number of available tokens after refilling.
   *
   * This method triggers a refill and returns the current token count.
   * Useful for monitoring and debugging.
   *
   * @returns Current number of available tokens
   * @internal
   */
  getAvailableTokens(): number {
    this.refill();
    return this.tokens;
  }
}

/**
 * Rate limiter for API endpoints using the token bucket algorithm.
 *
 * Manages per-endpoint rate limiting to prevent exceeding API quotas.
 * Each endpoint key (e.g., 'products.create', 'orders.list') can have
 * independent rate limit configurations.
 *
 * Features:
 * - Automatic request queueing when rate limit reached
 * - FIFO queue processing
 * - Per-endpoint configuration
 * - Dynamic configuration updates
 * - Zero external dependencies (in-memory state)
 *
 * @example
 * ```typescript
 * import { RateLimiter } from './rate-limiter';
 *
 * // Create rate limiter with predefined limits
 * const limiter = new RateLimiter({
 *   'products.create': {
 *     requestsPerMinute: 6,
 *     intervalSeconds: 10,
 *     burstLimit: 1
 *   },
 *   'orders.list': {
 *     requestsPerMinute: 5
 *   }
 * });
 *
 * // Wait for rate limit slot before making request
 * await limiter.waitForSlot('products.create');
 * // Request proceeds when token available
 *
 * // Endpoints without configured limits are unlimited
 * await limiter.waitForSlot('general.ping'); // Returns immediately
 * ```
 *
 * @example
 * ```typescript
 * // Create empty rate limiter and configure dynamically
 * const limiter = new RateLimiter();
 *
 * // Add rate limit for specific endpoint
 * limiter.configure('products.update', {
 *   requestsPerMinute: 10,
 *   burstLimit: 5
 * });
 *
 * await limiter.waitForSlot('products.update');
 * ```
 */
export class RateLimiter {
  /**
   * Map of endpoint keys to their token buckets.
   * Buckets are created lazily when first accessed for an endpoint.
   */
  private readonly buckets = new Map<string, _TokenBucket>();

  /**
   * Rate limit configuration for each endpoint.
   * Keys are endpoint identifiers, values are rate limit configs.
   */
  private readonly config: EndpointLimits;

  /**
   * Creates a new RateLimiter instance.
   *
   * @param config - Optional initial rate limit configuration.
   *                 Can be empty and configured dynamically via configure().
   *                 Defaults to empty object (no limits).
   *
   * @example
   * ```typescript
   * // With predefined limits
   * const limiter = new RateLimiter({
   *   'api.operation': { requestsPerMinute: 10 }
   * });
   *
   * // Empty (configure later)
   * const limiter = new RateLimiter();
   * ```
   */
  constructor(config?: EndpointLimits) {
    this.config = config ?? {};
  }

  /**
   * Waits for a rate limit slot to become available for the specified endpoint.
   *
   * This method should be called before making an API request to ensure
   * the request doesn't exceed the endpoint's rate limit.
   *
   * Behavior:
   * - If no rate limit is configured for the endpoint key, returns immediately (unlimited)
   * - If tokens are available, consumes one and returns immediately
   * - If no tokens available, queues the request and waits until a token is available
   * - Queued requests are processed in FIFO order
   *
   * @param key - Endpoint identifier (e.g., 'products.create', 'orders.list')
   * @returns Promise that resolves when a rate limit slot is available
   *
   * @example
   * ```typescript
   * const limiter = new RateLimiter({
   *   'products.create': { requestsPerMinute: 6, burstLimit: 1 }
   * });
   *
   * // First request: immediate (token available)
   * await limiter.waitForSlot('products.create');
   * console.log('Request 1 can proceed');
   *
   * // Second request: queued (no tokens, waits ~10 seconds)
   * await limiter.waitForSlot('products.create');
   * console.log('Request 2 can proceed');
   *
   * // Unlimited endpoint: always immediate
   * await limiter.waitForSlot('general.ping');
   * console.log('Unlimited request proceeds immediately');
   * ```
   *
   * @example
   * ```typescript
   * // Multiple concurrent requests are queued in FIFO order
   * const promises = [
   *   limiter.waitForSlot('api.operation'),
   *   limiter.waitForSlot('api.operation'),
   *   limiter.waitForSlot('api.operation')
   * ];
   *
   * // First request proceeds immediately (token available)
   * // Second and third queue and wait in order
   * await Promise.all(promises);
   * ```
   */
  async waitForSlot(key: string): Promise<void> {
    const bucket = this.getOrCreateBucket(key);
    if (!bucket) {
      return; // No rate limit configured for this endpoint
    }

    await bucket.consume();
  }

  /**
   * Gets or creates a token bucket for the specified endpoint.
   *
   * Buckets are created lazily on first access and reused for subsequent requests.
   * If no rate limit is configured for the endpoint, returns null (unlimited).
   *
   * @param key - Endpoint identifier
   * @returns TokenBucket instance or null if unlimited
   * @private
   */
  private getOrCreateBucket(key: string): _TokenBucket | null {
    if (this.buckets.has(key)) {
      return this.buckets.get(key) ?? null;
    }

    if (!(key in this.config)) {
      return null; // No rate limit for this endpoint
    }

    const config = this.config[key];
    const bucket = new _TokenBucket(config);
    this.buckets.set(key, bucket);
    return bucket;
  }

  /**
   * Dynamically configure or update rate limit for an endpoint.
   *
   * If a bucket already exists for this endpoint, it will be reset
   * with the new configuration. Existing queued requests will continue
   * with the old bucket until completed.
   *
   * @param key - Endpoint identifier
   * @param config - Rate limit configuration
   *
   * @example
   * ```typescript
   * const limiter = new RateLimiter();
   *
   * // Add rate limit for endpoint
   * limiter.configure('products.create', {
   *   requestsPerMinute: 6,
   *   intervalSeconds: 10,
   *   burstLimit: 1
   * });
   *
   * // Update existing rate limit
   * limiter.configure('products.create', {
   *   requestsPerMinute: 10  // Increase limit
   * });
   * ```
   */
  configure(key: string, config: RateLimitConfig): void {
    this.config[key] = config;
    // Reset bucket if it exists to apply new config
    this.buckets.delete(key);
  }

  /**
   * Get the current rate limit configuration for an endpoint.
   *
   * @param key - Endpoint identifier
   * @returns Rate limit configuration or undefined if no limit configured
   *
   * @example
   * ```typescript
   * const config = limiter.getConfiguration('products.create');
   * if (config) {
   *   console.log(`Limit: ${config.requestsPerMinute} req/min`);
   * }
   * ```
   */
  getConfiguration(key: string): RateLimitConfig | undefined {
    return key in this.config ? this.config[key] : undefined;
  }

  /**
   * Check if a request can proceed immediately without queueing.
   *
   * This is a non-blocking check useful for monitoring or debugging.
   * Does NOT consume a token.
   *
   * @param key - Endpoint identifier
   * @returns true if request can proceed immediately, false if would queue
   *
   * @example
   * ```typescript
   * if (limiter.canProceed('products.create')) {
   *   console.log('Request will execute immediately');
   * } else {
   *   console.log('Request will be queued');
   * }
   *
   * // Still need to call waitForSlot before making request
   * await limiter.waitForSlot('products.create');
   * ```
   */
  canProceed(key: string): boolean {
    // Get or create bucket if configuration exists
    const bucket = this.getOrCreateBucket(key);
    if (!bucket) {
      return true; // No configuration = no limit
    }

    return bucket.getAvailableTokens() >= 1;
  }

  /**
   * Get the number of tokens currently available for an endpoint.
   *
   * This is a monitoring/debugging method. The value can change rapidly
   * as tokens are consumed and refilled.
   *
   * @param key - Endpoint identifier
   * @returns Number of available tokens, or Infinity if unlimited
   *
   * @example
   * ```typescript
   * const remaining = limiter.getRemainingTokens('products.create');
   * console.log(`${remaining} requests can execute immediately`);
   * ```
   */
  getRemainingTokens(key: string): number {
    // Get or create bucket if configuration exists
    const bucket = this.getOrCreateBucket(key);
    if (!bucket) {
      return Infinity; // No configuration = unlimited
    }

    return bucket.getAvailableTokens();
  }

  /**
   * Reset rate limiting state for an endpoint or all endpoints.
   *
   * Clears token buckets and queued requests. Use with caution as
   * queued requests will never resolve (they'll hang indefinitely).
   *
   * This is primarily a testing utility.
   *
   * @param key - Optional endpoint identifier. If omitted, resets all endpoints.
   *
   * @example
   * ```typescript
   * // Reset specific endpoint
   * limiter.reset('products.create');
   *
   * // Reset all endpoints
   * limiter.reset();
   * ```
   */
  reset(key?: string): void {
    if (key) {
      this.buckets.delete(key);
    } else {
      this.buckets.clear();
    }
  }
}
