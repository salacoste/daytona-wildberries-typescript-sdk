/**
 * Aggregated Rate Limit Configuration
 *
 * Central export of all module-specific rate limit configurations.
 * This file combines auto-generated rate limits from all SDK modules for use by the RateLimiter.
 *
 * **Auto-Generation (Story 1.8):**
 * Individual module configs are automatically generated from OpenAPI specifications.
 * This aggregator imports and combines them into a single configuration object.
 *
 * **Module Structure:**
 * - Each module has its own rate limit file: `{module}-rate-limits.ts`
 * - Rate limits are parsed from OpenAPI operation descriptions (Russian rate limit tables)
 * - Conservative defaults (10 req/min, 6s interval, burst: 5) used when parsing fails
 *
 * @module config/rate-limits
 * @see {@link ../client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @see {@link https://dev.wildberries.ru/openapi Wildberries API Documentation}
 */

import type { RateLimitConfig } from '../client/rate-limiter';
import { generalRateLimits } from './general-rate-limits';
import { productsRateLimits } from './products-rate-limits';
import { ordersFbsRateLimits } from './orders-fbs-rate-limits';
import { ordersFbwRateLimits } from './orders-fbw-rate-limits';
import { ordersDbsRateLimits } from './orders-dbs-rate-limits';
import { userManagementRateLimits } from './user-management-rate-limits';
import { financesRateLimits } from './finances-rate-limits';
import { promotionRateLimits } from './promotion-rate-limits';
import { tariffsRateLimits } from './tariffs-rate-limits';
import { inStorePickupRateLimits } from './in-store-pickup-rate-limits';
import { analyticsRateLimits } from './analytics-rate-limits';
import { reportsRateLimits } from './reports-rate-limits';
import { communicationsRateLimits } from './communications-rate-limits';

/**
 * Aggregated rate limit configuration for all SDK modules.
 *
 * Combines rate limits from all generated modules into a single object.
 * Endpoint keys follow the format: `{moduleName}.{methodName}`
 *
 * **Current Modules:**
 * - general: General API endpoints (ping, news, seller info)
 * - products: Product management endpoints (categories, CRUD, media, pricing, stock)
 * - ordersFBS: FBS order retrieval and status management endpoints
 * - ordersFBW: FBW warehouse supply and acceptance endpoints
 *
 * **Future Modules (will be added as generated):**
 * - finances: Financial reporting endpoints
 * - analytics: Sales analytics endpoints
 * - reports: Async report generation endpoints
 * - communications: Chat, Q&A, reviews endpoints
 * - promotion: Marketing campaigns endpoints
 * - tariffs: Commission and fee endpoints
 * - inStorePickup: Pickup point management endpoints
 *
 * @example
 * ```typescript
 * import { ALL_RATE_LIMITS } from './config/rate-limits';
 * import { RateLimiter } from './client/rate-limiter';
 *
 * const limiter = new RateLimiter(ALL_RATE_LIMITS);
 * await limiter.waitForSlot('general.ping');
 * ```
 *
 * @example
 * ```typescript
 * // Access individual module limits
 * import { generalRateLimits } from './config/general-rate-limits';
 * console.log(generalRateLimits['general.ping']);
 * ```
 */
export const ALL_RATE_LIMITS = {
  ...generalRateLimits,
  ...productsRateLimits,
  ...ordersFbsRateLimits,
  ...ordersFbwRateLimits,
  ...ordersDbsRateLimits,
  ...userManagementRateLimits,
  ...financesRateLimits,
  ...promotionRateLimits,
  ...tariffsRateLimits,
  ...inStorePickupRateLimits,
  ...analyticsRateLimits,
  ...reportsRateLimits,
  ...communicationsRateLimits,
};

/**
 * Type representing all possible endpoint keys.
 *
 * Automatically inferred from ALL_RATE_LIMITS object.
 * Provides type safety when referencing endpoint keys in code.
 *
 * @example
 * ```typescript
 * const endpointKey: EndpointKey = 'general.ping'; // Type-safe ✓
 * const invalid: EndpointKey = 'invalid.key'; // TypeScript error ✗
 * ```
 */
export type EndpointKey = keyof typeof ALL_RATE_LIMITS;

/**
 * Legacy export for backwards compatibility.
 * @deprecated Use ALL_RATE_LIMITS instead
 */
export const DEFAULT_RATE_LIMITS = ALL_RATE_LIMITS;

/**
 * Category-level rate limit multipliers for Basic/Test tokens.
 *
 * WB enforces significantly reduced limits for Basic and Test tokens since March 30, 2026.
 * These multipliers approximate the reduction per API category.
 * WB defines limits per-endpoint, but most endpoints within a category share
 * similar ratios. Category-level multipliers are a pragmatic approximation.
 *
 * @see {@link https://dev.wildberries.ru/news/281}
 * @since 3.5.0
 */
const BASIC_TOKEN_CATEGORY_MULTIPLIERS: Record<string, number> = {
  general: 0.001, // ~1/24h vs 1/min
  products: 0.01, // ~1-10/hour vs 100/min
  'orders-fbs': 0.003, // ~10-50/hour vs 300/min
  'orders-dbw': 0.003,
  'orders-dbs': 0.003,
  'click-collect': 0.003,
  'in-store-pickup': 0.003,
  'orders-fbw': 0.01,
  promotion: 0.02, // ~1-5/hour vs 5/min
  communications: 0.05,
  tariffs: 0.01,
  analytics: 0.05, // ~1-10/hour vs 3/min
  reports: 0.01,
  documents: 0.01,
  finances: 0.01,
  'user-management': 0.01,
};

/** Default multiplier for categories not in the map */
const DEFAULT_BASIC_MULTIPLIER = 0.01;

/**
 * Applies Basic/Test token rate limit multipliers to all endpoint configs.
 *
 * For each endpoint, determines its category from the rateLimitKey prefix
 * (e.g., 'orders-fbs.xxx' → 'orders-fbs') and reduces requestsPerMinute
 * accordingly. Burst limit is set to 1 for all endpoints.
 *
 * @param limits - Original rate limit configs (for Personal/Service tokens)
 * @returns New config object with reduced limits for Basic/Test tokens
 * @since 3.5.0
 */
export function applyBasicTokenMultipliers(
  limits: Record<string, RateLimitConfig>
): Record<string, RateLimitConfig> {
  const result: Record<string, RateLimitConfig> = {};

  for (const [key, config] of Object.entries(limits)) {
    const category = key.split('.')[0];
    const multiplier = BASIC_TOKEN_CATEGORY_MULTIPLIERS[category] ?? DEFAULT_BASIC_MULTIPLIER;

    result[key] = {
      ...config,
      requestsPerMinute: Math.max(1, Math.ceil(config.requestsPerMinute * multiplier)),
      burstLimit: 1,
    };
  }

  return result;
}
