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

import { generalRateLimits } from './general-rate-limits';
import { productsRateLimits } from './products-rate-limits';
import { ordersFBSRateLimits } from './orders-fbs-rate-limits';
import { ordersFBWRateLimits } from './orders-fbw-rate-limits';
// Import additional module rate limits here as they are generated:
// import { financesRateLimits } from './finances-rate-limits';
// import { analyticsRateLimits } from './analytics-rate-limits';
// import { reportsRateLimits } from './reports-rate-limits';
// import { communicationsRateLimits } from './communications-rate-limits';
// import { promotionRateLimits } from './promotion-rate-limits';
// import { tariffsRateLimits } from './tariffs-rate-limits';
// import { inStorePickupRateLimits } from './in-store-pickup-rate-limits';

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
  ...ordersFBSRateLimits,
  ...ordersFBWRateLimits,
  // Spread additional module rate limits here as they are generated:
  // ...financesRateLimits,
  // ...analyticsRateLimits,
  // ...reportsRateLimits,
  // ...communicationsRateLimits,
  // ...promotionRateLimits,
  // ...tariffsRateLimits,
  // ...inStorePickupRateLimits,
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
