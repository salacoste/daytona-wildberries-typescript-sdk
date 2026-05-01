# Wildberries API TypeScript SDK v3.9.3

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
| [OrdersDbsModule](classes/OrdersDbsModule.md) | Orders DBS Module for managing Delivery by Seller orders |
| [OrdersFbsModule](classes/OrdersFbsModule.md) | - |
| [OrdersFbwModule](classes/OrdersFbwModule.md) | - |
| [ProductsModule](classes/ProductsModule.md) | - |
| [PromotionModule](classes/PromotionModule.md) | - |
| [ReportsModule](classes/ReportsModule.md) | - |
| [TariffsModule](classes/TariffsModule.md) | - |
| [UserManagementModule](classes/UserManagementModule.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [RateLimitConfig](interfaces/RateLimitConfig.md) | Configuration for rate limiting a specific endpoint. |
| [OperationMetadata](interfaces/OperationMetadata.md) | Metadata for a single SDK operation |
| [SDKConfig](interfaces/SDKConfig.md) | Configuration options for initializing the Wildberries SDK |
| [RequestOptions](interfaces/RequestOptions.md) | Per-request options that can override SDK defaults |
| [AccessItem](interfaces/AccessItem.md) | Элемент настройки доступа к разделу профиля продавца |
| [InviteeInfo](interfaces/InviteeInfo.md) | Информация о приглашении пользователя |
| [UserInfo](interfaces/UserInfo.md) | Информация о пользователе профиля продавца |
| [GetUsersResponse](interfaces/GetUsersResponse.md) | Ответ на запрос списка пользователей |
| [GetUsersParams](interfaces/GetUsersParams.md) | Параметры запроса для получения списка пользователей |
| [CreateInviteRequest](interfaces/CreateInviteRequest.md) | Запрос на создание приглашения пользователя |
| [CreateInviteResponse](interfaces/CreateInviteResponse.md) | Ответ на запрос создания приглашения |
| [UserAccess](interfaces/UserAccess.md) | Настройки доступа для конкретного пользователя |
| [UpdateUserAccessRequest](interfaces/UpdateUserAccessRequest.md) | Запрос на обновление настроек доступа пользователей |
| [UserManagementErrorResponse](interfaces/UserManagementErrorResponse.md) | Ответ с информацией об ошибке от User Management API |
| [SupplyCostInput](interfaces/SupplyCostInput.md) | Input parameters for supply cost calculation |
| [SupplyCostResult](interfaces/SupplyCostResult.md) | Result of supply cost calculation |
| [CompareTariffsInput](interfaces/CompareTariffsInput.md) | Input parameters for tariff comparison |
| [TariffData](interfaces/TariffData.md) | Tariff data from a single source |
| [TariffDifference](interfaces/TariffDifference.md) | Percentage differences between inventory and supply tariffs |
| [TariffComparison](interfaces/TariffComparison.md) | Complete tariff comparison result |
| [WbReturn](interfaces/WbReturn.md) | Unified return record across FBO and FBS sources. |
| [FbsReturnInput](interfaces/FbsReturnInput.md) | Minimal FBS return shape — what consumers should pass for FBS returns. The actual FBS return data comes from order status history; consumers shape it into this minimal record before calling enrichReturnsWithType(). |
| [BuyoutInput](interfaces/BuyoutInput.md) | Buyout record input — minimal shape derived from sdk.analytics getStocksReportProducts() output. Consumers shape their data into this before calling reconcileBuyoutsAndReturns(). |
| [ReconciliationAnomaly](interfaces/ReconciliationAnomaly.md) | Anomaly detected during reconciliation. |
| [ReconciliationResult](interfaces/ReconciliationResult.md) | Per-nmId reconciliation summary. |
| [ReconcileOptions](interfaces/ReconcileOptions.md) | Optional configuration for reconciliation. |
| [MergedCardVariant](interfaces/MergedCardVariant.md) | A single product variant within a merged card. |
| [MergedCardValidationResult](interfaces/MergedCardValidationResult.md) | Result of merged card variant validation. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [EndpointLimits](type-aliases/EndpointLimits.md) | Mapping of endpoint keys to their rate limit configurations. |
| [AccessCode](type-aliases/AccessCode.md) | Код раздела профиля продавца, к которому пользователь получит доступ. |
| [ReturnReasonCode](type-aliases/ReturnReasonCode.md) | Standardized return reason codes derived from Wildberries free-text reason strings. |
| [TariffRecommendation](type-aliases/TariffRecommendation.md) | Recommendation based on tariff comparison |

## Variables

| Variable | Description |
| ------ | ------ |
| [analyticsRateLimits](variables/analyticsRateLimits.md) | - |
| [communicationsRateLimits](variables/communicationsRateLimits.md) | - |
| [financesRateLimits](variables/financesRateLimits.md) | - |
| [generalRateLimits](variables/generalRateLimits.md) | - |
| [inStorePickupRateLimits](variables/inStorePickupRateLimits.md) | - |
| [operationMetadata](variables/operationMetadata.md) | Registry of operation metadata for all SDK operations |
| [ordersDbsRateLimits](variables/ordersDbsRateLimits.md) | - |
| [ordersFbsRateLimits](variables/ordersFbsRateLimits.md) | - |
| [ordersFbwRateLimits](variables/ordersFbwRateLimits.md) | - |
| [productsRateLimits](variables/productsRateLimits.md) | - |
| [promotionRateLimits](variables/promotionRateLimits.md) | - |
| [ALL\_RATE\_LIMITS](variables/ALL_RATE_LIMITS.md) | Aggregated rate limit configuration for all SDK modules. |
| [reportsRateLimits](variables/reportsRateLimits.md) | - |
| [tariffsRateLimits](variables/tariffsRateLimits.md) | - |
| [userManagementRateLimits](variables/userManagementRateLimits.md) | - |
| [version](variables/version.md) | SDK version |

## Functions

| Function | Description |
| ------ | ------ |
| [isOperationReadonly](functions/isOperationReadonly.md) | Check if an operation is readonly (safe to retry) |
| [getOperationCategory](functions/getOperationCategory.md) | Get the API category for an operation |
| [getOperationRateLimitKey](functions/getOperationRateLimitKey.md) | Get the rate limit key for an operation |
| [getOperationMetadata](functions/getOperationMetadata.md) | Get full metadata for an operation |
| [getOperationsByCategory](functions/getOperationsByCategory.md) | Get all operations for a specific category |
| [getReadonlyOperations](functions/getReadonlyOperations.md) | Get all readonly operations |
| [getWriteOperations](functions/getWriteOperations.md) | Get all write operations (not readonly) |
| [calculateSupplyCost](functions/calculateSupplyCost.md) | Calculates the total supply cost including acceptance, storage, and logistics |
| [classifyReturnReason](functions/classifyReturnReason.md) | Classifies a Wildberries return reason string into a standardized enum code. |
| [compareTariffs](functions/compareTariffs.md) | Compare tariffs between inventory storage (tariffs/box) and supply (acceptance/coefficients) APIs |
| [warnOnce](functions/warnOnce.md) | Emit a deprecation warning for a method, at most once per process. |
| [resetDeprecationWarnings](functions/resetDeprecationWarnings.md) | Reset all deprecation warning flags. **Test helper only.** |
| [enrichReturnsWithType](functions/enrichReturnsWithType.md) | Builds a unified WbReturn[] from FBO returns (sdk.reports.getAnalyticsGoodsReturn) and optional FBS returns (derived from sdk.ordersFBS status history). |
| [parseMoneyAmount](functions/parseMoneyAmount.md) | Parse a money amount string from v1 finance reports to a JavaScript number. |
| [reconcileBuyoutsAndReturns](functions/reconcileBuyoutsAndReturns.md) | Reconciles buyouts and returns per nmId for unified analytics. |
| [validateMergedCardVariants](functions/validateMergedCardVariants.md) | Client-side validator for merged product card variants. |
| [validateRequiredCharacteristics](functions/validateRequiredCharacteristics.md) | Validates that all mandatory characteristics are present in a card creation request. Returns the list of missing mandatory characteristics. |

## References

### default

Renames and re-exports [WildberriesSDK](classes/WildberriesSDK.md)
