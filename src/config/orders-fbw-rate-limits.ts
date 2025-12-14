/**
 * Auto-generated rate limit configuration for orders-fbw module
 * Generated from: wildberries_api_doc/07-orders-fbw.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/orders-fbw-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const ordersFbwRateLimits: Record<string, RateLimitConfig> = {
  'orders-fbw.acceptanceCoefficients': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6
  },
  'orders-fbw.postAcceptanceOptions': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6
  },
  'orders-fbw.warehouses': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6
  },
  'orders-fbw.transitTariffs': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 10
  },
  'orders-fbw.postSupplies': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10
  },
  'orders-fbw.supplies': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10
  },
  'orders-fbw.suppliesGoods': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10
  },
  'orders-fbw.suppliesPackage': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10
  }
};
