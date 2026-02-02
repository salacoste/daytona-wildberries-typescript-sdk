/**
 * Auto-generated rate limit configuration for orders-dbs module
 * Generated from: wildberries_api_doc/04-orders-dbs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * DBS (Delivery by Seller) API Rate Limits:
 * - Most endpoints: 300 req/min, 200ms interval, 20 burst
 * - Same limits apply for both bulk and legacy methods
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/orders-dbs-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const ordersDbsRateLimits: Record<string, RateLimitConfig> = {
  // ============================================================================
  // Core Operations (Story 12.1)
  // ============================================================================

  /** Get new DBS orders awaiting delivery */
  'orders-dbs.getNewOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Get completed DBS orders with pagination */
  'orders-dbs.getOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Get customer contact information */
  'orders-dbs.getClientInfo': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // Bulk Status Operations (Story 12.2) - New API from 14.01.2026
  // ============================================================================

  /** Get status info for multiple orders */
  'orders-dbs.getStatusInfoBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Confirm multiple orders (bulk) */
  'orders-dbs.confirmOrdersBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Mark multiple orders as delivered (bulk) */
  'orders-dbs.deliverOrdersBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Complete handover for multiple orders (bulk) */
  'orders-dbs.receiveOrdersBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Reject multiple orders (bulk) */
  'orders-dbs.rejectOrdersBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Cancel multiple orders (bulk) */
  'orders-dbs.cancelOrdersBulk': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // Legacy Status Operations (Story 12.2) - Deprecated, disabled 13.04.2026
  // ============================================================================

  /** @deprecated Get order statuses (legacy) */
  'orders-dbs.getStatusLegacy': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** @deprecated Confirm single order (legacy) */
  'orders-dbs.confirmOrderLegacy': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** @deprecated Mark single order as delivered (legacy) */
  'orders-dbs.deliverOrderLegacy': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** @deprecated Complete handover for single order (legacy) */
  'orders-dbs.receiveOrderLegacy': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** @deprecated Reject single order (legacy) */
  'orders-dbs.rejectOrderLegacy': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** @deprecated Cancel single order (legacy) */
  'orders-dbs.cancelOrderLegacy': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // Metadata Operations (Story 12.3)
  // ============================================================================

  /** Get order metadata */
  'orders-dbs.getOrderMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Add metadata to order */
  'orders-dbs.addOrderMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Update order metadata */
  'orders-dbs.updateOrderMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Delete order metadata */
  'orders-dbs.deleteOrderMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Set SGTIN codes */
  'orders-dbs.setSGTIN': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Set UIN code */
  'orders-dbs.setUIN': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  /** Set IMEI code */
  'orders-dbs.setIMEI': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // B2B Operations (Story 12.4)
  // ============================================================================

  /** Get B2B buyer information */
  'orders-dbs.getB2BInfo': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
};
