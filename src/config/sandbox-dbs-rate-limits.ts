/**
 * Rate limits for the special WB DBS sandbox API.
 *
 * These limits are kept separate from production DBS limits because the
 * operation uses a distinct host and Test-scope authorization.
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const sandboxDbsRateLimits: Record<string, RateLimitConfig> = {
  /** POST /api/v3/test/dbs/orders/make — maximum one request per second. */
  'sandbox-dbs.createTestOrders': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 1,
    penaltyMultiplier: 1,
  },
};
