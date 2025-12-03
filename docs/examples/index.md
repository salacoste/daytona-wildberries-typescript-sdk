# Examples

Working code examples demonstrating SDK usage for common scenarios.

## By Complexity

### Basic Examples

Get started with the SDK fundamentals:

- [Hello World](basic/hello-world.md) - SDK initialization and connectivity testing
- [Single API Call](basic/single-call.md) - Make basic API requests

### Intermediate Examples

Learn essential patterns for production use:

- [Error Handling](intermediate/error-handling.md) - Handle errors gracefully with typed error classes
- [Rate Limiting](intermediate/rate-limiting.md) - Work within API rate limits
- [Batch Operations](intermediate/batch-operations.md) - Process multiple items efficiently

### Advanced Examples

Master complex scenarios and optimizations:

- [Multi-Module Workflow](advanced/multi-module.md) - Combine multiple SDK modules
- [Custom Retry Logic](advanced/custom-retry.md) - Implement advanced retry strategies
- [Performance Optimization](advanced/performance.md) - Optimize for production workloads

## By Use Case

### Product Management
- [Product Catalog Sync](use-cases/product-catalog.md) - Manage and sync your product catalog
- [Pricing Updates](use-cases/pricing-updates.md) - Update prices and discounts
- [Stock Management](use-cases/stock-management.md) - Manage warehouse inventory

### Order Fulfillment
- [Order Processing](use-cases/order-processing.md) - Complete FBS order workflow
- [Shipping Management](use-cases/shipping.md) - Create supplies and labels
- [Returns Handling](use-cases/returns.md) - Process product returns

### Analytics & Reporting
- [Sales Dashboard](use-cases/sales-dashboard.md) - Build comprehensive sales analytics
- [Inventory Reports](use-cases/inventory-reports.md) - Analyze stock levels
- [Financial Reports](use-cases/financial-reports.md) - Financial analytics and reconciliation

## Quick Reference

### SDK Initialization

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

### Available Modules

| Module | Description |
|--------|-------------|
| `sdk.general` | Ping, connectivity testing |
| `sdk.products` | Product catalog management |
| `sdk.ordersFBS` | FBS order fulfillment |
| `sdk.ordersFBW` | FBW warehouse operations |
| `sdk.finances` | Balance, transactions |
| `sdk.analytics` | Sales funnel, performance |
| `sdk.reports` | Stock, sales reports |
| `sdk.communications` | Chat, Q&A, reviews |
| `sdk.promotion` | Advertising campaigns |
| `sdk.tariffs` | Commission rates |
| `sdk.inStorePickup` | Click & collect |

### Error Types

```typescript
import {
  WBAPIError,           // Base error class
  AuthenticationError,  // 401 - Invalid API key
  ValidationError,      // 400 - Invalid request
  RateLimitError,       // 429 - Rate limit exceeded
  NetworkError          // 5xx - Server/network errors
} from 'daytona-wildberries-typescript-sdk';
```

---

[Back to Documentation Home](../index.md)
