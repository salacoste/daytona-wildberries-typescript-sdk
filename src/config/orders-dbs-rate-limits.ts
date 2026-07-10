/**
 * Rate limit configuration for orders-dbs module
 * Source: wildberries_api_doc/04-orders-dbs/ (OpenAPI operation descriptions)
 *
 * This file contains rate limit configurations for all DBS (Delivery by Seller)
 * endpoints. Rate limits are enforced by the RateLimiter (Story 1.4) using
 * the token bucket algorithm.
 *
 * DBS API uses a 4-tier rate limit system:
 *
 * | Tier | Name             | RPM     | Interval | Burst | Entries |
 * |------|------------------|---------|----------|-------|---------|
 * | T1   | Assembly Read    | 300/min | 200ms    | 20    | 6       |
 * | T2   | Status Write     | 60/min  | 1s       | 10    | 10      |
 * | T3   | Meta Read/Delete | 150/min | 400ms    | 20    | 2       |
 * | T4   | Meta Set         | 500/min | 120ms    | 20    | 1       |
 *
 * Total entries: 19
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/orders-dbs-rate-limits
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const ordersDbsRateLimits: Record<string, RateLimitConfig> = {
  // ============================================================================
  // T1: Assembly Read (300 req/min, 200ms interval, burst 20)
  // Core read operations, status queries, B2B info
  // ============================================================================

  /** Get new DBS orders awaiting delivery */
  'orders-dbs.getNewOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Get completed DBS orders with pagination */
  'orders-dbs.getOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Get customer contact information */
  'orders-dbs.getClientInfo': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Get status info for multiple orders (bulk) */
  'orders-dbs.getStatusesBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Get order statuses (legacy, deprecated 13.04.2026) */
  'orders-dbs.getStatuses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Get B2B buyer information */
  'orders-dbs.getB2BInfo': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // ============================================================================
  // T2: Status Write (60 req/min, 1s interval, burst 10)
  // Bulk and legacy status mutation operations
  // ============================================================================

  /** Confirm multiple orders (bulk) */
  'orders-dbs.confirmBulk': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Mark multiple orders as delivered (bulk) */
  'orders-dbs.deliverBulk': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Complete handover for multiple orders (bulk) */
  'orders-dbs.receiveBulk': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Reject multiple orders (bulk) */
  'orders-dbs.rejectBulk': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Cancel multiple orders (bulk) */
  'orders-dbs.cancelBulk': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Confirm single order (legacy, deprecated 13.04.2026) */
  'orders-dbs.confirm': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Mark single order as delivered (legacy, deprecated 13.04.2026) */
  'orders-dbs.deliver': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Complete handover for single order (legacy, deprecated 13.04.2026) */
  'orders-dbs.receive': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Reject single order (legacy, deprecated 13.04.2026) */
  'orders-dbs.reject': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  /** Cancel single order (legacy, deprecated 13.04.2026) */
  'orders-dbs.cancel': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
    penaltyMultiplier: 10,
  },

  // ============================================================================
  // T3: Meta Read/Delete (150 req/min, 400ms interval, burst 20)
  // Metadata retrieval and deletion operations
  // ============================================================================

  /** Get order metadata */
  'orders-dbs.getMeta': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Delete order metadata */
  'orders-dbs.deleteMeta': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // ============================================================================
  // T4: Meta Set (500 req/min, 120ms interval, burst 20)
  // Shared key for all metadata set operations:
  //   setSgtin, setUin, setImei, setGtin, setCustomsDeclaration
  // ============================================================================

  /** Set order metadata (shared key for sgtin, uin, imei, gtin, customs declaration) */
  'orders-dbs.setMeta': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // ============================================================================
  // T5: New Info Endpoints (300 req/min, 200ms interval, burst 20) - Story 26.1
  // ============================================================================

  /** Get paid delivery groups info */
  'orders-dbs.getGroupsInfo': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Get delivery dates for orders */
  'orders-dbs.getDeliveryDates': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // ============================================================================
  // T6: Bulk Metadata Read/Delete (150 req/min, 400ms interval, burst 20) - Story 26.2
  // ============================================================================

  /** Delete metadata bulk */
  'orders-dbs.deleteMetaBulk': {
    requestsPerMinute: 150,
    intervalSeconds: 0.4,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // ============================================================================
  // T7: Bulk Metadata Set (500 req/min, 120ms interval, burst 20) - Story 26.2
  // ============================================================================

  /** Set SGTIN bulk */
  'orders-dbs.setSgtinBulk': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Set UIN bulk */
  'orders-dbs.setUinBulk': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Set IMEI bulk */
  'orders-dbs.setImeiBulk': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Set GTIN bulk */
  'orders-dbs.setGtinBulk': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** Set customs declaration bulk */
  'orders-dbs.setCustomsDeclarationBulk': {
    requestsPerMinute: 500,
    intervalSeconds: 0.12,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** Check marking-metadata validation (meta/details) — mirrors deliver/status bucket */
  'orders-dbs.checkMetaValidation': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  /** POST /api/marketplace/v3/dbs/orders/stickers - DBS assembly-order stickers (mirrors FBS stickers) */
  'orders-dbs.createOrdersStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
};
