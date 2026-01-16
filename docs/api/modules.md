# Wildberries API TypeScript SDK v2.5.0

Wildberries API TypeScript SDK
Main entry point

## Modules

| Module | Description |
| ------ | ------ |
| [\<internal\>](-internal-/modules.md) | - |

## Classes

| Class | Description |
| ------ | ------ |
| [BaseClient](classes/BaseClient.md) | Base HTTP client for all Wildberries API modules |
| [AuthenticationError](classes/AuthenticationError.md) | Authentication error thrown when API key is invalid or lacks permissions. |
| [WBAPIError](classes/WBAPIError.md) | Base error class for all Wildberries SDK errors. |
| [PickupOrderNotFoundError](classes/PickupOrderNotFoundError.md) | Error thrown when a pickup order is not found |
| [InvalidOrderStateError](classes/InvalidOrderStateError.md) | Error thrown when an order state transition is invalid |
| [CustomerVerificationError](classes/CustomerVerificationError.md) | Error thrown when customer identity verification fails |
| [MetadataValidationError](classes/MetadataValidationError.md) | Error thrown when product metadata validation fails |
| [NetworkError](classes/NetworkError.md) | Network error thrown for connection failures, timeouts, and server errors. |
| [CampaignNotFoundError](classes/CampaignNotFoundError.md) | Error thrown when a campaign is not found by its ID. |
| [InvalidBidError](classes/InvalidBidError.md) | Error thrown when bid amount is invalid or below minimum. |
| [BudgetExceededError](classes/BudgetExceededError.md) | Error thrown when campaign budget is exceeded or insufficient. |
| [InvalidCampaignStateError](classes/InvalidCampaignStateError.md) | Error thrown when attempting invalid campaign state transitions. |
| [RateLimitError](classes/RateLimitError.md) | Rate limit error thrown when API rate limits are exceeded. |
| [ValidationError](classes/ValidationError.md) | Validation error thrown when request data fails validation. |
| [WildberriesSDK](classes/WildberriesSDK.md) | Main SDK class providing access to all Wildberries API modules. |
| [AnalyticsModule](classes/AnalyticsModule.md) | - |
| [CommunicationsModule](classes/CommunicationsModule.md) | - |
| [FinancesModule](classes/FinancesModule.md) | - |
| [GeneralModule](classes/GeneralModule.md) | - |
| [InStorePickupModule](classes/InStorePickupModule.md) | - |
| [OrdersFbsModule](classes/OrdersFbsModule.md) | - |
| [OrdersFbwModule](classes/OrdersFbwModule.md) | - |
| [ProductsModule](classes/ProductsModule.md) | - |
| [PromotionModule](classes/PromotionModule.md) | - |
| [ReportsModule](classes/ReportsModule.md) | - |
| [TariffsModule](classes/TariffsModule.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [RateLimitConfig](interfaces/RateLimitConfig.md) | Configuration for rate limiting a specific endpoint. |
| [SDKConfig](interfaces/SDKConfig.md) | Configuration options for initializing the Wildberries SDK |
| [RequestOptions](interfaces/RequestOptions.md) | Per-request options that can override SDK defaults |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [EndpointLimits](type-aliases/EndpointLimits.md) | Mapping of endpoint keys to their rate limit configurations. |

## Variables

| Variable | Description |
| ------ | ------ |
| [generalRateLimits](variables/generalRateLimits.md) | - |
| [ordersFbsRateLimits](variables/ordersFbsRateLimits.md) | - |
| [ordersFbwRateLimits](variables/ordersFbwRateLimits.md) | - |
| [promotionRateLimits](variables/promotionRateLimits.md) | - |
| [ALL\_RATE\_LIMITS](variables/ALL_RATE_LIMITS.md) | Aggregated rate limit configuration for all SDK modules. |
| [tariffsRateLimits](variables/tariffsRateLimits.md) | - |
| [version](variables/version.md) | SDK version |

## References

### default

Renames and re-exports [WildberriesSDK](classes/WildberriesSDK.md)
