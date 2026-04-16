/**
 * Auto-generated rate limit configuration for finances module
 * Generated from: wildberries_api_doc/13-finances.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/finances-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const financesRateLimits: Record<string, RateLimitConfig> = {
  'finances.accountBalance': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'finances.supplierReportDetailByPeriod': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'finances.documentsCategories': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 5,
  },
  'finances.documentsList': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 5,
  },
  'finances.documentsDownload': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 5,
  },
  'finances.createDownloadAll': {
    requestsPerMinute: 1,
    intervalSeconds: 300,
    burstLimit: 5,
  },
  // v1 Sales Reports (since v3.7.0) — 1 req/min per WB spec
  'finances.salesReportsList': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'finances.salesReportsDetailed': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'finances.salesReportsDetailedByReportId': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  // v1 Acquiring Reports (since v3.7.0) — RU-only, 1 req/min per WB spec
  'finances.acquiringReportsList': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'finances.acquiringReportsDetailed': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'finances.acquiringReportsDetailedByReportId': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
};
