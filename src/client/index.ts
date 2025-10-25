/**
 * HTTP Client Infrastructure Module
 *
 * This module exports the core HTTP client used by all SDK modules
 * to communicate with the Wildberries API.
 *
 * The BaseClient provides:
 * - Automatic authentication via Bearer token
 * - Automatic rate limiting per endpoint
 * - Automatic retry with exponential backoff
 * - Configurable timeouts and retry logic
 * - Typed error transformation
 * - Debug logging with PII sanitization
 *
 * @packageDocumentation
 */

export { BaseClient } from './base-client';
export { RateLimiter } from './rate-limiter';
export { RetryHandler } from './retry-handler';
export type { RateLimitConfig, EndpointLimits } from './rate-limiter';
export type { RetryConfig, RetryContext } from './retry-handler';
