/**
 * Auto-generated rate limit configuration for in-store-pickup module
 * Generated from: wildberries_api_doc/06-in-store-pickup.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/in-store-pickup-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const inStorePickupRateLimits: Record<string, RateLimitConfig> = {
  'in-store-pickup.clickCollectOrdersNew': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'in-store-pickup.patchClickCollectOrdersConfirm': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20
  },
  'in-store-pickup.patchClickCollectOrdersPrepare': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20
  },
  'in-store-pickup.postClickCollectOrdersClient': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'in-store-pickup.postClickCollectOrdersClientIdentity': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 20
  },
  'in-store-pickup.patchClickCollectOrdersReceive': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20
  },
  'in-store-pickup.patchClickCollectOrdersReject': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20
  },
  'in-store-pickup.postClickCollectOrdersStatus': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'in-store-pickup.clickCollectOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'in-store-pickup.patchClickCollectOrdersCancel': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20
  },
  'in-store-pickup.clickCollectOrdersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'in-store-pickup.deleteClickCollectOrdersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'in-store-pickup.putClickCollectOrdersMetaSgtin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'in-store-pickup.putClickCollectOrdersMetaUin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'in-store-pickup.putClickCollectOrdersMetaImei': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'in-store-pickup.putClickCollectOrdersMetaGtin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  }
};
