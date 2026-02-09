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
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 3,
  },
  'general.communicationsNews': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  'general.sellerInfo': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  'general.createInvite': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'general.getUsers': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'general.updateUserAccess': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'general.deleteUser': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
  },
};
