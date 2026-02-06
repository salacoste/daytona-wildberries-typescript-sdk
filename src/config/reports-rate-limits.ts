/**
 * Auto-generated rate limit configuration for reports module
 * Generated from: wildberries_api_doc/12-reports.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/reports-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const reportsRateLimits: Record<string, RateLimitConfig> = {
  'reports.supplierIncomes': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.supplierStocks': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.supplierOrders': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.supplierSales': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.postAnalyticsExciseReport': {
    requestsPerMinute: 0,
    intervalSeconds: 1800,
    burstLimit: 10,
  },
  'reports.warehouse_remains': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 5,
  },
  'reports.warehouse_remainsTasksStatus': {
    requestsPerMinute: 12,
    intervalSeconds: 5,
    burstLimit: 5,
  },
  'reports.warehouse_remainsTasksDownload': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.analyticsWarehouseMeasurements': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 1,
  },
  'reports.analyticsAntifraudDetails': {
    requestsPerMinute: 0,
    intervalSeconds: 600,
    burstLimit: 10,
  },
  'reports.analyticsIncorrectAttachments': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  'reports.analyticsGoodsLabeling': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  // @deprecated - endpoint removed from swagger, kept for backward compatibility
  'reports.analyticsCharacteristicsChange': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  'reports.acceptance_report': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.acceptance_reportTasksStatus': {
    requestsPerMinute: 12,
    intervalSeconds: 5,
    burstLimit: 1,
  },
  'reports.acceptance_reportTasksDownload': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.paid_storage': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 5,
  },
  'reports.paid_storageTasksStatus': {
    requestsPerMinute: 12,
    intervalSeconds: 5,
    burstLimit: 5,
  },
  'reports.paid_storageTasksDownload': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.analyticsRegionSale': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 5,
  },
  'reports.analyticsBrandShareBrands': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  'reports.analyticsBrandShareParentSubjects': {
    requestsPerMinute: 12,
    intervalSeconds: 5,
    burstLimit: 20,
  },
  'reports.analyticsBrandShare': {
    requestsPerMinute: 12,
    intervalSeconds: 5,
    burstLimit: 20,
  },
  'reports.analyticsBannedProductsBlocked': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6,
  },
  'reports.analyticsBannedProductsShadowed': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 6,
  },
  'reports.analyticsGoodsReturn': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 10,
  },
  // EPIC 44: New endpoints
  'reports.measurementPenalties': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.warehouseMeasurementsV2': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'reports.deductions': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
};
