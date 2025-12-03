/**
 * Auto-generated rate limit configuration for general module
 * Generated from: wildberries_api_doc/01-general.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/general-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const generalRateLimits: Record<string, RateLimitConfig> = {
  'general.ping': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'general.communicationsNews': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'general.sellerInfo': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
};
