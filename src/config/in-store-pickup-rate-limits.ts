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
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.postClickCollectOrdersClient': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.postClickCollectOrdersClientIdentity': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.clickCollectOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.checkMetaValidation': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.setCustomsDeclarationBulk': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 500,
    penaltyMultiplier: 10,
  },
  // ============================================================================
  // Batch click-collect API (task-147, since 3.17.0)
  // POST /api/marketplace/v3/click-collect/* — WB shut down single-order paths.
  // Tiers mirror the marketplace-api rate-limit convention (4XX×10 penalty):
  //   - Status write (confirm/prepare/receive/reject/cancel): 100/min, 0.6s, burst 20
  //   - Status info + meta read/details: 150/min, 0.4s, burst 20
  //   - Meta delete: 150/min, 0.4s, burst 20
  //   - Meta set (sgtin/uin/imei/gtin): 20/min, 3s, burst 500
  // ============================================================================

  'in-store-pickup.confirmBulk': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.prepareBulk': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.receiveBulk': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.rejectBulk': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.cancelBulk': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.getStatusesBulk': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.getMetaBulk': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.deleteMetaBulk': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.setSgtinBulk': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 500,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.setUinBulk': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 500,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.setImeiBulk': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 500,
    penaltyMultiplier: 10,
  },
  'in-store-pickup.setGtinBulk': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 500,
    penaltyMultiplier: 10,
  },
};
