/**
 * Rate limit configurations for In-Store Pickup API endpoints
 * Extracted from wildberries_api_doc/06-in-store-pickup.yaml
 *
 * IMPORTANT: 409 responses count as 5 requests toward rate limit
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const inStorePickupRateLimits: Record<string, RateLimitConfig> = {
  // Assembly task operations - 300 req/min (1 request every 0.2s)
  'inStorePickup.getNewOrders': {
    requestsPerMinute: 300,
    burstLimit: 20,
  },
  'inStorePickup.getOrders': {
    requestsPerMinute: 300,
    burstLimit: 20,
  },
  'inStorePickup.getOrderStatuses': {
    requestsPerMinute: 300,
    burstLimit: 20,
  },
  'inStorePickup.getCustomerInfo': {
    requestsPerMinute: 300,
    burstLimit: 20,
  },

  // State change operations - 100 req/min (1 request every 0.6s)
  'inStorePickup.confirmOrder': {
    requestsPerMinute: 100,
    burstLimit: 20,
  },
  'inStorePickup.prepareOrder': {
    requestsPerMinute: 100,
    burstLimit: 20,
  },
  'inStorePickup.receiveOrder': {
    requestsPerMinute: 100,
    burstLimit: 20,
  },
  'inStorePickup.rejectOrder': {
    requestsPerMinute: 100,
    burstLimit: 20,
  },
  'inStorePickup.cancelOrder': {
    requestsPerMinute: 100,
    burstLimit: 20,
  },

  // Identity verification - 30 req/min (most restrictive - 1 request every 2s)
  'inStorePickup.verifyCustomerIdentity': {
    requestsPerMinute: 30,
    intervalSeconds: 2,
    burstLimit: 20,
  },

  // Metadata get/delete - 300 req/min
  'inStorePickup.getOrderMetadata': {
    requestsPerMinute: 300,
    burstLimit: 20,
  },
  'inStorePickup.deleteOrderMetadata': {
    requestsPerMinute: 300,
    burstLimit: 20,
  },

  // Metadata set operations - 1000 req/min (most permissive - 1 request every 0.06s)
  'inStorePickup.setSGTINCode': {
    requestsPerMinute: 1000,
    burstLimit: 20,
  },
  'inStorePickup.setUINCode': {
    requestsPerMinute: 1000,
    burstLimit: 20,
  },
  'inStorePickup.setIMEICode': {
    requestsPerMinute: 1000,
    burstLimit: 20,
  },
  'inStorePickup.setGTINCode': {
    requestsPerMinute: 1000,
    burstLimit: 20,
  },
};
