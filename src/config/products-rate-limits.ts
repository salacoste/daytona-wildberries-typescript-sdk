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
  // === Content Standard Tier: 100 req/min, 600ms interval, burst 5 ===
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
  // === Brands Tier: 1 req/sec (60 req/min), 1s interval, burst 5 ===
  'products.brands': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'products.postContentGetCardsList': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  // === Content Exceptions Tier: 10 req/min, 6s interval, burst 5 ===
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
  // === Prices & Discounts Tier ===
  // API enforces: 10 requests per 6-second window, 600ms minimum interval, burst 5
  // RateLimiter equivalent: 100 req/min (10/6s = 100/60s)
  // Server: https://discounts-prices-api.wildberries.ru
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
  // === Marketplace Tier (Stocks & Warehouses): 300 req/min, 200ms interval, burst 20 ===
  /** POST /api/v3/stocks/{warehouseId} — 409 response counts as 10 requests against rate limit */
  'products.postStocks': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  /** PUT /api/v3/stocks/{warehouseId} — 409 response counts as 10 requests against rate limit */
  'products.putStocks': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 20,
  },
  /** DELETE /api/v3/stocks/{warehouseId} — 409 response counts as 10 requests against rate limit */
  'products.deleteStocks': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 2,
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
};
