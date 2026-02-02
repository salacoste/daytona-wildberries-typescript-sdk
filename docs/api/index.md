---
title: API Reference
description: Complete TypeScript API reference for Wildberries SDK with all 11 modules
layout: doc
---

# API Reference

Complete TypeScript API reference for the Wildberries SDK. Browse all modules, classes, interfaces, and type definitions.

## SDK Core

- **[WildberriesSDK](classes/WildberriesSDK.md)** - Main SDK class aggregating all 11 modules
- **[BaseClient](classes/BaseClient.md)** - HTTP client with retry and timeout handling
- **[RateLimiter](-internal-/classes/RateLimiter.md)** - Per-endpoint rate limit enforcement
- **[RetryHandler](-internal-/classes/RetryHandler.md)** - Exponential backoff retry logic

## SDK Modules

Complete reference for all 11 API modules covering product management, orders, finances, analytics, and more.

| Module | Description | API Domain |
|--------|-------------|------------|
| **[GeneralModule](classes/GeneralModule.md)** | Ping, news, seller information | common-api |
| **[ProductsModule](classes/ProductsModule.md)** | Product catalog, categories, pricing, stock | content-api |
| **[OrdersFbsModule](classes/OrdersFbsModule.md)** | Seller warehouse fulfillment orders | marketplace-api |
| **[OrdersFbwModule](classes/OrdersFbwModule.md)** | Wildberries warehouse fulfillment | marketplace-api |
| **[OrdersDbsModule](classes/OrdersDbsModule.md)** | Delivery by Seller - direct customer delivery | marketplace-api |
| **[FinancesModule](classes/FinancesModule.md)** | Balance, transactions, financial reports | finance-api, statistics-api |
| **[AnalyticsModule](classes/AnalyticsModule.md)** | Sales analytics, performance metrics, CSV reports | seller-analytics-api |
| **[ReportsModule](classes/ReportsModule.md)** | Async report generation and retrieval | - |
| **[CommunicationsModule](classes/CommunicationsModule.md)** | Customer chat, Q&A, reviews | - |
| **[PromotionModule](classes/PromotionModule.md)** | Campaigns, promo codes, advertising | - |
| **[TariffsModule](classes/TariffsModule.md)** | Commission rates, tariff info, fees | - |
| **[InStorePickupModule](classes/InStorePickupModule.md)** | Pickup point management | - |

## Configuration Interfaces

Configure the SDK for different environments and use cases:

- **[SDKConfig](interfaces/SDKConfig.md)** - Main SDK configuration interface
- **[RetryConfig](-internal-/interfaces/RetryConfig.md)** - Retry logic configuration
- **[RateLimitConfig](interfaces/RateLimitConfig.md)** - Rate limiting configuration

## Error Classes

Comprehensive error hierarchy for precise error handling:

- **[WBAPIError](classes/WBAPIError.md)** - Base error class for all SDK errors
- **[AuthenticationError](classes/AuthenticationError.md)** - 401/403 authentication errors
- **[RateLimitError](classes/RateLimitError.md)** - 429 rate limit errors
- **[ValidationError](classes/ValidationError.md)** - 400/422 validation errors
- **[NetworkError](classes/NetworkError.md)** - Network failure errors

## Common Interfaces

Frequently used interfaces are available in the internal module documentation. Browse by domain:

### Order Management
- **[Order](-internal-/interfaces/Order.md)** - Order data structure
- **[ApiOrderStatus](-internal-/interfaces/ApiOrderStatus.md)** - Order status information
- **[ApiOrders](-internal-/interfaces/ApiOrders.md)** - Orders list response

### Supply & Warehouse
- **[ModelsAcceptanceCoefficient](-internal-/interfaces/ModelsAcceptanceCoefficient.md)** - Acceptance coefficients for FBW
- **[ModelsSupply](-internal-/interfaces/ModelsSupply.md)** - Supply data structure
- **[ModelsWarehousesResultItems](-internal-/interfaces/ModelsWarehousesResultItems.md)** - Warehouse information

### Analytics & Reports
- **[NmReportDetailResponse](-internal-/interfaces/NmReportDetailResponse.md)** - Product report details
- **[TableGroupResponse](-internal-/interfaces/TableGroupResponse.md)** - Analytics table response
- **[SalesFunnelProductReq](-internal-/interfaces/SalesFunnelProductReq.md)** - Sales funnel request

## Type Definitions

Browse complete type definitions for API requests and responses:

- **[Public Interfaces](modules.md#interfaces)** - Public configuration interfaces (SDKConfig, RateLimitConfig, RequestOptions)
- **[Internal Module](-internal-/modules.md)** - Complete internal types reference (all API interfaces)
- **[Type Aliases](modules.md#type-aliases)** - Type alias definitions (EndpointLimits)
- **[Variables](modules.md#variables)** - Exported variables and constants (rate limits, version)
- **[Functions](modules.md#functions)** - Utility functions (calculateSupplyCost, compareTariffs)

## Quick Start Example

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Access any of the 12 modules
const categories = await sdk.products.getParentAll();
const orders = await sdk.ordersFBS.getOrders({ limit: 10 });
const balance = await sdk.finances.getBalance();

// DBS (Delivery by Seller) - direct customer delivery
const dbsOrders = await sdk.ordersDBS.getNewOrders();
const clientInfo = await sdk.ordersDBS.getClientInfo([123456]);
```

## Error Handling Example

```typescript
import {
  WBAPIError,
  RateLimitError,
  AuthenticationError,
  ValidationError
} from 'daytona-wildberries-typescript-sdk';

try {
  const result = await sdk.products.getParentAll();
} catch (error) {
  if (error instanceof RateLimitError) {
    // SDK automatically retries, log for monitoring
    console.warn('Rate limit hit', { retryAfter: error.retryAfter });
  } else if (error instanceof AuthenticationError) {
    // Don't retry - fix API key
    console.error('Invalid API key');
  } else if (error instanceof ValidationError) {
    // Fix request data
    console.error('Validation error', { message: error.message });
  } else if (error instanceof WBAPIError) {
    // Other API errors
    console.error('API error', { statusCode: error.statusCode });
  }
}
```

## Getting Started

New to the SDK? Check out these resources:

- **[Quick Start Guide](/getting-started/quickstart)** - Get up and running in 5 minutes
- **[Configuration Guide](/guides/configuration)** - Configure SDK for your environment
- **[Best Practices](/guides/best-practices)** - Production-ready patterns and error handling
- **[Examples](https://github.com/salacoste/daytona-wildberries-typescript-sdk/tree/main/examples)** - Working code examples

## Support & Resources

- **[GitHub Repository](https://github.com/salacoste/daytona-wildberries-typescript-sdk)** - Source code and issue tracking
- **[Official Wildberries API Documentation](https://dev.wildberries.ru/)** - Wildberries API reference
- **[npm Package](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)** - Package on npm registry

---

**Tip:** Use your IDE's autocomplete with TypeScript to explore all available methods and properties. The SDK is fully typed for excellent developer experience.
