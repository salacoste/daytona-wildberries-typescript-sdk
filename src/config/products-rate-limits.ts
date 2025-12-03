/**
 * Auto-generated rate limit configuration for products module
 * Generated from: wildberries_api_doc/02-products.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/products-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const productsRateLimits: Record<string, RateLimitConfig> = {
  'products.contentObjectParentAll': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentObjectAll': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentObjectCharcs': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentDirectoryColors': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentDirectoryKinds': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentDirectoryCountries': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentDirectorySeasons': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentDirectoryVat': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentDirectoryTnved': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentTags': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentTag': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.patchContentTag': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.deleteContentTag': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentTagNomenclatureLink': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentGetCardsList': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentCardsErrorList': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'products.postContentCardsUpdate': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'products.postContentCardsMoveNm': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentCardsDeleteTrash': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentCardsRecover': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentGetCardsTrash': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.contentCardsLimits': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentBarcodes': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentCardsUpload': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'products.postContentCardsUploadAdd': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'products.postContentMediaFile': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postContentMediaSave': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postUploadTask': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postUploadTaskSize': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postUploadTaskClubDiscount': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.historyTasks': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.historyGoodsTask': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.bufferTasks': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.bufferGoodsTask': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.listGoodsFilter': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postListGoodsFilter': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.listGoodsSizeNm': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.quarantineGoods': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.postStocks': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.putStocks': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.deleteStocks': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.offices': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.warehouses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.postWarehouses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.putWarehouses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.deleteWarehouses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.dbwWarehousesContacts': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.putDbwWarehousesContacts': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },

  // ============================================================================
  // Media Management Rate Limits (Story 2.3)
  // ============================================================================
  // Content API limits: 100 requests/minute, 600ms interval
  'products.uploadMediaFile': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'products.uploadMediaByURLs': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },

  // ============================================================================
  // Pricing Management Rate Limits (Story 2.3)
  // ============================================================================
  // Pricing API limits: 10 requests per 6 seconds (STRICTER than Content API)
  'products.updatePricing': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'products.getPricing': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'products.getPricingTaskStatus': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },

  // ============================================================================
  // Warehouse and Stock Management Rate Limits (Story 2.4)
  // ============================================================================
  // Warehouse/Stock API limits: 300 requests/minute, 200ms interval, 20 burst
  // NOTE: 409 errors count as 5 requests!
  'products.getWBOffices': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.getWarehouses': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.createWarehouse': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.updateWarehouse': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.deleteWarehouse': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.getStock': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.updateStock': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  'products.deleteStock': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
};
