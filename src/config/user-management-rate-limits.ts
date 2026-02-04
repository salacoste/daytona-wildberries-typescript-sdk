/**
 * Auto-generated rate limit configuration for user-management module
 * Generated from: wildberries_api_doc/01-general.yaml (User Management endpoints)
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/user-management-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const userManagementRateLimits: Record<string, RateLimitConfig> = {
  'userManagement.createInvite': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'userManagement.getUsers': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'userManagement.updateAccess': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'userManagement.deleteUser': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10,
  },
};
