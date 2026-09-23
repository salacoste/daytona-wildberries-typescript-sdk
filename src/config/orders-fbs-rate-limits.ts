/**
 * Auto-generated rate limit configuration for orders-fbs module
 * Generated from: wildberries_api_doc/03-orders-fbs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/orders-fbs-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const ordersFbsRateLimits: Record<string, RateLimitConfig> = {
  // === Tier 1: General FBS — 300 req/min, 200ms interval, burst 20 (409 = 10 requests) ===
  'orders-fbs.ordersNew': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.orders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postOrdersStatus': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.suppliesOrdersReshipment': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postOrdersStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postOrdersStickersCrossBorder': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postOrdersStatusHistory': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postOrdersClient': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.ordersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.deleteOrdersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.supplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postSupplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.getSupply': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.deleteSupplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.suppliesOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.patchSuppliesDeliver': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.suppliesBarcode': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.suppliesTrbx': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postSuppliesTrbx': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.deleteSuppliesTrbx': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.postSuppliesTrbxStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.passesOffices': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.passes': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.putPasses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.deletePasses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.patchSuppliesOrders': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** PATCH /api/marketplace/v3/supplies/{supplyId}/orders — Add assembly tasks to supply (bulk) */
  'orders-fbs.patchMarketplaceSuppliesOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** GET /api/marketplace/v3/supplies/{supplyId}/order-ids — Get supply order IDs */
  'orders-fbs.getMarketplaceSuppliesOrderIds': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // === Tier 2: Cancel Order — 100 req/min, 600ms interval, burst 20 (409 = 10 requests) ===
  'orders-fbs.patchOrdersCancel': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // === Tier 3: Meta Attachment — 1000 req/min, 60ms interval, burst 20 (409 = 10 requests) ===
  'orders-fbs.putOrdersMetaSgtin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.putOrdersMetaUin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.putOrdersMetaImei': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.putOrdersMetaGtin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.putOrdersMetaExpiration': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  'orders-fbs.putOrdersMetaCustomsDeclaration': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** POST /api/marketplace/v3/orders/meta — Get metadata for assembly tasks (bulk)
   * Same rate limit group as GET/DELETE metadata operations */
  'orders-fbs.postMarketplaceOrdersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // === Tier 4: Create Pass — 1 req/10min (409 = 10 requests) ===
  'orders-fbs.postPasses': {
    requestsPerMinute: 0.1,
    intervalSeconds: 600,
    burstLimit: 1,
    penaltyMultiplier: 10,
  },
  /** GET /api/marketplace/v3/fbs/orders/archive — Archived FBS assembly orders (paginated) */
  'orders-fbs.ordersArchive': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // === SPOT (EAEU road imports) — 300 req/min, 200ms interval, burst 20 (4XX = 10 requests) ===
  /** GET /api/marketplace/v3/fbs/dictionaries/countries/oksm — OKSM country list for SPOT */
  'orders-fbs.getSpotCountries': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** PUT /api/marketplace/v3/fbs/supplies/{supplyId}/spot — Add SPOT data to supply */
  'orders-fbs.putSupplySpot': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** POST /api/marketplace/v3/fbs/supplies/spot/list — Get SPOT data for supply list */
  'orders-fbs.postSuppliesSpotList': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** GET /api/marketplace/v3/fbs/supplies/{supplyId}/stickers/spot — Get supply SPOT QR code */
  'orders-fbs.getSupplySpotStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },

  // === SHIPPING (supply shipping parameters) — 300 req/min, 200ms interval, burst 20 (4XX = 10 requests) ===
  /** GET /api/marketplace/v3/fbs/shipping-points — List supply shipping points */
  'orders-fbs.getShippingPoints': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
  /** PATCH /api/marketplace/v3/fbs/supplies/shipping-method — Set supply shipping method */
  'orders-fbs.patchSuppliesShippingMethod': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
    penaltyMultiplier: 10,
  },
};
