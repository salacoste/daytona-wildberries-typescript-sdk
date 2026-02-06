/**
 * Auto-generated rate limit configuration for analytics module
 * Generated from: wildberries_api_doc/11-analytics.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/analytics-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const analyticsRateLimits: Record<string, RateLimitConfig> = {
  /**
   * @deprecated v2 endpoint is dead (404). Wrapper delegates to postSalesFunnelProducts.
   */
  'analytics.postNmReportDetail': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  /**
   * @deprecated v2 endpoint is dead (404). Wrapper delegates to postSalesFunnelProductsHistory.
   */
  'analytics.postNmReportDetailHistory': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  /**
   * @deprecated v2 endpoint is dead (404). Wrapper delegates to postSalesFunnelGroupedHistory.
   */
  'analytics.postNmReportGroupedHistory': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.nmReportDownloads': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postNmReportDownloads': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postNmReportDownloadsRetry': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.nmReportDownloadsFile': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSearchReportReport': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSearchReportTableGroups': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSearchReportTableDetails': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSearchReportProductSearchTexts': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSearchReportProductOrders': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postStocksReportProductsGroups': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postStocksReportProductsProducts': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postStocksReportProductsSizes': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postStocksReportOffices': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  // v3 Sales Funnel endpoints
  'analytics.postSalesFunnelProducts': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSalesFunnelProductsHistory': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
  'analytics.postSalesFunnelGroupedHistory': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 3,
  },
};
