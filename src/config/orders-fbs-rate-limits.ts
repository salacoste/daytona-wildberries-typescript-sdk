/**
 * Rate limit configuration for orders-fbs module
 * Source: wildberries_api_doc/03-orders-fbs.yaml
 *
 * This file contains rate limit configurations for FBS (Fulfillment by Seller) order endpoints.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * **Shared Rate Limit Pool:**
 * All FBS orders, supplies, and passes methods share the same 300 req/min rate limit pool.
 * Be mindful of total request volume across all FBS operations.
 *
 * **Important:**
 * 409 errors count as 5 requests toward rate limit (for supply operations)
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/orders-fbs-rate-limits
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const ordersFBSRateLimits: Record<string, RateLimitConfig> = {
  // ============================================================================
  // Orders FBS - Order Retrieval and Status Management (Story 2.5)
  // ============================================================================
  // Marketplace API limits: 300 requests/minute, 200ms interval, 20 burst
  // Note: All FBS orders, supplies, and passes methods share this limit pool

  /**
   * GET /api/v3/orders/new - Get new FBS orders awaiting processing
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.getNewOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * GET /api/v3/orders - Get FBS orders with filters and pagination
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.getOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * POST /api/v3/orders/status - Get order statuses
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.getOrderStatuses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // Orders FBS - Supply Management (Story 2.6)
  // ============================================================================
  // Standard FBS limits: 300 requests/minute, 200ms interval, 20 burst
  // Exception: addOrderToSupply has higher limit (1000 req/min)
  // Note: 409 errors count as 5 requests for supply operations

  /**
   * POST /api/v3/supplies - Create new supply
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.createSupply': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * GET /api/v3/supplies - Get supplies with pagination
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.getSupplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * GET /api/v3/supplies/{supplyId} - Get supply details
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.getSupply': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * PATCH /api/v3/supplies/{supplyId}/orders/{orderId} - Add order to supply
   * Rate limit: 1000 req/min, 60ms interval, 20 burst (HIGHER than other endpoints)
   * Note: 409 errors count as 5 requests
   */
  'ordersFBS.addOrderToSupply': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
  },

  /**
   * PATCH /api/v3/supplies/{supplyId}/deliver - Mark supply as delivered
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   * Note: 409 errors count as 5 requests
   */
  'ordersFBS.deliverSupply': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * DELETE /api/v3/supplies/{supplyId} - Delete empty supply
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   * Note: 409 errors count as 5 requests
   */
  'ordersFBS.deleteSupply': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // Orders FBS - Shipping Labels and Barcodes (Story 2.6)
  // ============================================================================

  /**
   * POST /api/v3/orders/stickers - Get order shipping label stickers
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   */
  'ordersFBS.getOrderStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * GET /api/v3/supplies/{supplyId}/barcode - Get supply QR code
   * Rate limit: 300 req/min, 200ms interval, 20 burst
   * Note: 409 errors count as 5 requests
   */
  'ordersFBS.getSupplyBarcode': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /**
   * PATCH /api/v3/orders/{orderId}/cancel - Cancel FBS order
   * Rate limit: 100 req/min, 600ms interval, 20 burst (LOWER than other endpoints)
   * Note: 409 errors count as 5 requests
   */
  'ordersFBS.cancelOrder': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
  },
};
