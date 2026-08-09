---
title: API Reference
description: Complete TypeScript API reference for Wildberries SDK with all 14 modules
layout: doc
---

# API Reference

Complete TypeScript API reference for the Wildberries SDK. Browse all modules, classes, interfaces, and type definitions.

## SDK Core

- **[WildberriesSDK](/api/classes/WildberriesSDK)** - Main SDK class aggregating all 14 modules
- **[BaseClient](/api/-internal-/classes/BaseClient)** - HTTP client with retry and timeout handling
- **[RateLimiter](/api/-internal-/classes/RateLimiter)** - Per-endpoint rate limit enforcement
- **[RetryHandler](/api/-internal-/classes/RetryHandler)** - Exponential backoff retry logic

## SDK Modules

Complete reference for all 14 API modules covering product management, orders, finances, analytics, and more.

| Module | Description | API Domain |
|--------|-------------|------------|
| **[GeneralModule](/api/classes/GeneralModule)** | Ping, news, seller information | common-api |
| **[ProductsModule](/api/classes/ProductsModule)** | Product catalog, categories, pricing, stock | content-api |
| **[OrdersFbsModule](/api/classes/OrdersFbsModule)** | Seller warehouse fulfillment orders | marketplace-api |
| **[OrdersFbwModule](/api/classes/OrdersFbwModule)** | Wildberries warehouse fulfillment | marketplace-api |
| **[OrdersDbsModule](/api/classes/OrdersDbsModule)** | Delivery by Seller (DBS) orders | marketplace-api |
| **[FinancesModule](/api/classes/FinancesModule)** | Balance, transactions, financial reports | finance-api, statistics-api |
| **[AnalyticsModule](/api/classes/AnalyticsModule)** | Sales analytics, performance metrics, CSV reports | seller-analytics-api |
| **[ReportsModule](/api/classes/ReportsModule)** | Async report generation and retrieval | statistics-api |
| **[CommunicationsModule](/api/classes/CommunicationsModule)** | Customer chat, Q&A, reviews | common-api |
| **[PromotionModule](/api/classes/PromotionModule)** | Campaigns, promo codes, advertising | advert-api |
| **[TariffsModule](/api/classes/TariffsModule)** | Commission rates, tariff info, fees | - |
| **[InStorePickupModule](/api/classes/InStorePickupModule)** | Click & collect pickup orders | - |
| **[UserManagementModule](/api/classes/UserManagementModule)** | Seller profile user & access management | common-api |
| **[ReturnsModule](/api/classes/ReturnsModule)** | Unified FBO + FBS + finance returns aggregator | aggregator |

## Configuration Interfaces

Configure the SDK for different environments and use cases:

- **[SDKConfig](/api/interfaces/SDKConfig)** - Main SDK configuration interface
- **[RetryConfig](/api/-internal-/interfaces/RetryConfig)** - Retry logic configuration
- **[RateLimitConfig](/api/interfaces/RateLimitConfig)** - Rate limiting configuration

## Error Classes

Comprehensive error hierarchy for precise error handling:

- **[WBAPIError](/api/classes/WBAPIError)** - Base error class for all SDK errors
- **[AuthenticationError](/api/classes/AuthenticationError)** - 401/403 authentication errors
- **[RateLimitError](/api/classes/RateLimitError)** - 429 rate limit errors
- **[ValidationError](/api/classes/ValidationError)** - 400/422 validation errors
- **[NetworkError](/api/classes/NetworkError)** - Network failure errors

## Common Interfaces

Frequently used interfaces across modules:

### Product Management
- **[ProductCard](/api/interfaces/ProductCard)** - Product card data structure
- **[CreateProductRequest](/api/interfaces/CreateProductRequest)** - Product creation request
- **[PricingUpdate](/api/interfaces/PricingUpdate)** - Pricing update request
- **[StockInfo](/api/-internal-/interfaces/StockInfo)** - Stock information

### Order Management
- **[Order](/api/interfaces/Order)** - Order data structure
- **[OrderStatus](/api/interfaces/OrderStatus)** - Order status information
- **[GetOrdersResponse](/api/interfaces/GetOrdersResponse)** - Orders list response

### Financial Data
- **[BalanceResponse](/api/interfaces/BalanceResponse)** - Account balance response
- **[Transaction](/api/interfaces/Transaction)** - Transaction data structure
- **[Payout](/api/interfaces/Payout)** - Payout information

### Analytics Data
- **[CardStatistics](/api/interfaces/CardStatistics)** - Product card statistics
- **[CategoryPerformanceResponse](/api/interfaces/CategoryPerformanceResponse)** - Category performance metrics

## Type Definitions

Browse complete type definitions for API requests and responses:

- **[Interfaces](/api/interfaces/)** - All interface definitions (261 total)
- **[Type Aliases](/api/type-aliases/)** - Type alias definitions (46 total)
- **[Enumerations](/api/enumerations/)** - Enum definitions (7 total)
- **[Variables](/api/variables/)** - Exported variables and constants

## Quick Start Example

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Access any of the 14 modules
const categories = await sdk.products.getParentAll();
const orders = await sdk.ordersFBS.getOrders({ limit: 10 });
const balance = await sdk.finances.getBalance();
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
