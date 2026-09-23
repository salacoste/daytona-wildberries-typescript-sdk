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
    burstLimit: 6,
  },
  'orders-fbw.postAcceptanceOptions': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6,
  },
  'orders-fbw.warehouses': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6,
  },
  'orders-fbw.transitTariffs': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 10,
  },
  'orders-fbw.postSupplies': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  'orders-fbw.supplies': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  'orders-fbw.suppliesGoods': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  'orders-fbw.suppliesPackage': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // GET /api/supplies/v1/discrepancies/{supplyId} — supply acceptance discrepancies.
  // Strictest limit in the module: 1 request per 1 min interval, no burst — never batch.
  'orders-fbw.supplyDiscrepancies': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  // Supply drafts (task-193 — WB news 2026-09): POST /api/supplies/v1/drafts — create empty draft
  'orders-fbw.draftCreate': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // Supply drafts: GET /api/supplies/v1/drafts — list drafts
  'orders-fbw.draftsList': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // Supply drafts: DELETE /api/supplies/v1/drafts/{draftId} — delete draft
  'orders-fbw.draftDelete': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // Supply drafts: POST /api/supplies/v1/drafts/{draftId}/items — add items (atomic)
  'orders-fbw.draftItemsAdd': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // Supply drafts: GET /api/supplies/v1/drafts/{draftId}/items — list draft items
  'orders-fbw.draftItemsList': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // Supply drafts: DELETE /api/supplies/v1/drafts/{draftId}/items — delete items (no SKU validation)
  'orders-fbw.draftItemsDelete': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 10,
  },
  // POST /api/marketplace/v3/dbw/orders/client — buyer info for DBW orders
  // Note: 409 response counts as 10 requests (penaltyMultiplier)
  'orders-fbw.getClientInfo': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // DBW bulk endpoints — defaults inherited from `orders-fbw.getClientInfo` (the existing DBW
  // endpoint), NOT from DBS bulk endpoints (which use 60/1/10). These are best-effort estimates
  // pending the WB swagger update by task-15.5; regenerate this section when canonical limits
  // are published.
  // 409 response counts as 10 requests (penaltyMultiplier)
  'orders-fbw.deleteMetaBulkDBW': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  // 409 response counts as 10 requests (penaltyMultiplier)
  'orders-fbw.setSgtinBulkDBW': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  // 409 response counts as 10 requests (penaltyMultiplier)
  'orders-fbw.deliverBulkDBW': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  // POST /api/marketplace/v3/dbw/orders/meta/details — pre-flight metadata validation
  // 409 response counts as 10 requests (penaltyMultiplier — same as deliverBulk DBW)
  'orders-fbw.checkMetaValidationDBW': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
};
