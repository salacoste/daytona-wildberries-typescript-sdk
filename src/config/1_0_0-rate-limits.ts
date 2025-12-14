/**
 * Auto-generated rate limit configuration for 1_0_0 module
 * Generated from: wildberries_api_doc/99-supplemental.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/1_0_0-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const var100RateLimits: Record<string, RateLimitConfig> = {
  '1_0_0.contentTags': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  },
  '1_0_0.advAdvert': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  },
  '1_0_0.postAdvFullstats': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  },
  '1_0_0.advFullstats': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  },
  '1_0_0.calendarPromotions': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  }
};
