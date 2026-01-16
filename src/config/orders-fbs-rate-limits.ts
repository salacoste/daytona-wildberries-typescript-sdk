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
  'orders-fbs.passesOffices': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.passes': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postPasses': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  },
  'orders-fbs.putPasses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.deletePasses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.ordersNew': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.orders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postOrdersStatus': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.suppliesOrdersReshipment': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.patchOrdersCancel': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 20
  },
  'orders-fbs.postOrdersStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.ordersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.deleteOrdersMeta': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.putOrdersMetaSgtin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.putOrdersMetaUin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.putOrdersMetaImei': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.putOrdersMetaGtin': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.putOrdersMetaExpiration': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.putOrdersMetaCustomsDeclaration': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.postOrdersStickersCrossBorder': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postFilesOrdersExternalStickers': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5
  },
  'orders-fbs.postOrdersStatusHistory': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postOrdersClient': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.supplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postSupplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.patchSuppliesOrders': {
    requestsPerMinute: 1000,
    intervalSeconds: 0.06,
    burstLimit: 20
  },
  'orders-fbs.deleteSupplies': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.suppliesOrders': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.patchSuppliesDeliver': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.suppliesBarcode': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.suppliesTrbx': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postSuppliesTrbx': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.deleteSuppliesTrbx': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  },
  'orders-fbs.postSuppliesTrbxStickers': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20
  }
};
