/**
 * SDK Configuration Module
 *
 * This module exports configuration interfaces for initializing and customizing
 * the Wildberries API TypeScript SDK.
 *
 * @packageDocumentation
 */

export type { SDKConfig, RequestOptions } from './sdk-config';
export { ALL_RATE_LIMITS } from './rate-limits';
export { generalRateLimits } from './general-rate-limits';
export { ordersFbsRateLimits } from './orders-fbs-rate-limits';
export { ordersFbwRateLimits } from './orders-fbw-rate-limits';
export { promotionRateLimits } from './promotion-rate-limits';
export { tariffsRateLimits } from './tariffs-rate-limits';
export { inStorePickupRateLimits } from './in-store-pickup-rate-limits';
export { ordersDbsRateLimits } from './orders-dbs-rate-limits';
export { userManagementRateLimits } from './user-management-rate-limits';
export type { RateLimitConfig, EndpointLimits } from '../client/rate-limiter';
