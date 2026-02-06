/**
 * Auto-generated rate limit configuration for tariffs module
 * Generated from: wildberries_api_doc/10-tariffs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/tariffs-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const tariffsRateLimits: Record<string, RateLimitConfig> = {
  'tariffs.tariffsCommission': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 2
  },
  'tariffs.tariffsBox': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5
  },
  'tariffs.tariffsPallet': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5
  },
  'tariffs.tariffsReturn': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5
  },
  'tariffs.acceptanceCoefficients': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6
  }
};
