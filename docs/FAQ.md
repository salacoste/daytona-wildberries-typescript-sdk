---
title: FAQ
description: Frequently asked questions about the Wildberries SDK - installation, authentication, API usage, error handling, and troubleshooting
layout: doc
---

# Frequently Asked Questions (FAQ)

**Quick Navigation:** [Getting Started](#getting-started) | [Authentication](#authentication--configuration) | [API Usage](#api-usage) | [Error Handling](#error-handling) | [Rate Limiting](#rate-limiting--performance) | [Advanced](#advanced-topics) | [Troubleshooting](#troubleshooting)

---

## Getting Started

### 1. How do I install the Wildberries SDK?

Install via npm:

```bash
npm install @daytona/wildberries-typescript-sdk
```

For TypeScript projects, ensure you have TypeScript ≥5.0 installed:

```bash
npm install --save-dev typescript@^5.0.0
```

**See also:** [Quickstart Guide](getting-started/quickstart.md)

---

### 2. What are the minimum requirements to use the SDK?

- **Node.js:** 18.x, 20.x, or 22.x LTS
- **TypeScript:** 5.0+ (for TypeScript projects)
- **Wildberries API Key:** Required for authentication

**Compatibility:** Works with both ESM and CommonJS module systems.

---

### 3. How do I get a Wildberries API key?

1. Log in to your Wildberries Seller account
2. Navigate to **Settings** → **API Access**
3. Generate a new API key with required permissions
4. Copy and securely store your API key

**⚠️ Security:** Never commit API keys to version control. Use environment variables or secure vaults.

**See also:** [Authentication Guide](getting-started/quickstart.md#authentication)

---

### 4. How do I initialize the SDK?

```typescript
import { WildberriesSDK } from '@daytona/wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY // or your API key
});

// Test connection
const ping = await sdk.general.ping();
console.log(ping); // { success: true }
```

**Best Practice:** Store API keys in environment variables, not source code.

**See also:** [Quickstart Guide](getting-started/quickstart.md#initialization)

---

### 5. Can I use the SDK with JavaScript (without TypeScript)?

Yes! The SDK works with plain JavaScript:

```javascript
const { WildberriesSDK } = require('@daytona/wildberries-typescript-sdk');

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});
```

**Note:** You'll lose TypeScript autocomplete and type safety, but all functionality works.

---

## Authentication & Configuration

### 6. How do I configure custom timeouts?

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  timeout: 60000 // 60 seconds (default: 30000)
});
```

**See also:** [SDKConfig Reference](guides/best-practices.md#configuration)

---

### 7. Can I override base URLs for different environments?

Yes, you can override base URLs per module:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  baseUrls: {
    products: 'https://staging-content-api.wildberries.ru',
    ordersFBS: 'https://staging-marketplace-api.wildberries.ru'
  }
});
```

**Use Case:** Testing with sandbox/staging environments.

---

### 8. How do I configure retry logic?

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  retryConfig: {
    maxRetries: 5,          // Default: 3
    retryDelay: 2000,       // Default: 1000ms
    exponentialBackoff: true // Default: true
  }
});
```

**See also:** [Error Handling Guide](guides/troubleshooting.md#retry-logic)

---

### 9. How do I enable debug logging?

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  logLevel: 'debug' // 'debug' | 'info' | 'warn' | 'error'
});
```

**Production:** Use `'warn'` or `'error'` to reduce noise.

**See also:** [Troubleshooting Guide](guides/troubleshooting.md#debugging)

---

### 10. Can I use multiple API keys for different modules?

No, the SDK uses a single API key for all modules. If you need multiple accounts, create separate SDK instances:

```typescript
const sellerAccount1 = new WildberriesSDK({ apiKey: KEY_1 });
const sellerAccount2 = new WildberriesSDK({ apiKey: KEY_2 });
```

---

## API Usage

### 11. How do I fetch product categories?

```typescript
const categories = await sdk.products.getParentCategories();
console.log(categories.data); // Array of category objects
```

**See also:** [Product Management Example](../examples/products-crud.ts)

---

### 12. How do I create a new product?

```typescript
import type { CreateProductRequest } from '@daytona/wildberries-typescript-sdk';

const newProduct: CreateProductRequest = {
  brandName: 'MyBrand',
  categoryId: '12345',
  title: 'Product Name',
  description: 'Product description',
  characteristics: [
    { id: 'size', value: 'L' },
    { id: 'color', value: 'Red' }
  ]
};

const result = await sdk.products.createProduct(newProduct);
console.log(result.nmId); // New product ID
```

**Note:** Product creation has strict rate limits (1 request per 10 seconds).

**See also:** [Complete Product Workflow](../examples/complete-product-workflow.ts)

---

### 13. How do I fetch new orders (FBS)?

```typescript
const orders = await sdk.ordersFBS.getOrdersNew();

for (const order of orders.orders) {
  console.log(`Order ${order.orderId}: ${order.status}`);
}
```

**See also:** [Order Fulfillment Example](../examples/README.md#order-fulfillment-fbs)

---

### 14. How do I update order status?

```typescript
await sdk.ordersFBS.confirmOrder({ orderId: '12345' });
```

**Available statuses:** `new` → `confirmed` → `assembled` → `shipped` → `delivered`

**See also:** [Order Status Workflow](guides/best-practices.md#order-management)

---

### 15. How do I check my account balance?

```typescript
const balance = await sdk.finances.getBalance();
console.log(`Current balance: ${balance.amount} RUB`);
```

**See also:** [Financial Operations Example](../examples/finances-balance-transactions.ts)

---

### 16. How do I fetch sales analytics?

```typescript
const analytics = await sdk.analytics.getSalesFunnel({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});

console.log(`Conversion rate: ${analytics.conversionRate}%`);
```

**See also:** [Analytics Dashboard Example](../examples/README.md#analytics-dashboard)

---

### 17. How do I generate and download reports?

Reports use an async pattern (request → poll → download):

```typescript
// Step 1: Request report generation
const task = await sdk.reports.generateReport({
  reportType: 'sales',
  dateFrom: '2024-01-01',
  dateTo: '2024-12-31'
});

// Step 2: Poll for completion
let report = await sdk.reports.getReportStatus(task.taskId);
while (report.status === 'processing') {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
  report = await sdk.reports.getReportStatus(task.taskId);
}

// Step 3: Download completed report
if (report.status === 'completed') {
  const data = await sdk.reports.downloadReport(task.taskId);
  console.log(data); // Report data
}
```

**See also:** [Reports Example](../examples/finances-reports-payouts.ts)

---

### 18. How do I work with customer communications (reviews, Q&A)?

```typescript
// Fetch unanswered questions
const questions = await sdk.communications.getQuestions({
  state: 'unanswered'
});

// Answer a question
await sdk.communications.answerQuestion({
  questionId: '12345',
  answer: 'Thank you for your question...'
});

// Fetch reviews
const reviews = await sdk.communications.getReviews({
  state: 'active'
});
```

**See also:** [Customer Engagement Example](../examples/communications-customer-engagement.ts)

---

### 19. Can I use the SDK with async/await or Promises?

Yes, all SDK methods return Promises and work with async/await:

```typescript
// Async/await (recommended)
const balance = await sdk.finances.getBalance();

// Promise chains
sdk.finances.getBalance()
  .then(balance => console.log(balance))
  .catch(error => console.error(error));
```

---

### 20. How do I handle pagination?

Different APIs use different pagination methods:

**Offset-based:**
```typescript
const products = await sdk.products.getProductList({
  limit: 100,
  offset: 0
});

console.log(`Total: ${products.total}, Has more: ${products.hasMore}`);
```

**Cursor-based:**
```typescript
const orders = await sdk.ordersFBS.getOrders({
  cursor: response.cursor // From previous response
});
```

**See also:** [Pagination Patterns](guides/best-practices.md#pagination)

---

## Error Handling

### 21. How do I handle errors in the SDK?

Use TypeScript error classes with `instanceof`:

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from '@daytona/wildberries-typescript-sdk';

try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Invalid data:', error.fieldErrors);
  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  }
}
```

**See also:** [Error Handling Guide](guides/troubleshooting.md#error-handling)

---

### 22. What does "AuthenticationError: Invalid API key" mean?

**Causes:**
- API key is incorrect or expired
- API key doesn't have required permissions
- API key is not properly formatted

**Solutions:**
1. Verify API key in Wildberries Seller portal
2. Check environment variables are loaded correctly
3. Ensure API key has required scopes
4. Regenerate API key if expired

**See also:** [Authentication Troubleshooting](guides/troubleshooting.md#authentication-errors)

---

### 23. How do I debug "ValidationError: Missing required field"?

Check the `fieldErrors` property for specific field issues:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Field errors:', error.fieldErrors);
    // Example: { brandName: 'Required field missing' }
  }
}
```

**See also:** [Validation Error Guide](guides/troubleshooting.md#validation-errors)

---

### 24. What happens when I hit rate limits?

The SDK automatically handles rate limits:

1. **Detection:** SDK detects 429 response
2. **Wait:** Automatically waits for retry period
3. **Retry:** Retries request after delay
4. **Throw:** If max retries exceeded, throws `RateLimitError`

**Manual Handling:**
```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Wait ${error.retryAfter}ms before retrying`);
  }
}
```

**See also:** [Rate Limiting Guide](#rate-limiting--performance)

---

## Rate Limiting & Performance

### 25. What are the rate limits for different APIs?

Rate limits vary by endpoint:

| API Module | Typical Limit | Notes |
|------------|---------------|-------|
| Products (create) | 1 req/10s | Strictest limit |
| Products (read) | 3 req/min | Category queries |
| Orders | 5 req/min | FBS/FBW order fetching |
| Finances | 10 req/min | Balance, transactions |
| Analytics | 5 req/min | Performance queries |
| Reports (CSV export) | 1 req/2min | Large data exports |

**See also:** [Performance Guide](guides/performance-tuning.md#rate-limits)

---

### 26. How can I optimize SDK performance?

**Best Practices:**

1. **Batch Operations:** Group multiple operations where possible
2. **Caching:** Cache frequently accessed data (categories, tariffs)
3. **Pagination:** Use appropriate page sizes (50-100 items)
4. **Concurrent Requests:** Use `Promise.all()` for independent calls
5. **Connection Pooling:** Reuse SDK instance across requests

**Example:**
```typescript
// ❌ Bad: Sequential requests
const categories = await sdk.products.getParentCategories();
const balance = await sdk.finances.getBalance();

// ✅ Good: Parallel requests
const [categories, balance] = await Promise.all([
  sdk.products.getParentCategories(),
  sdk.finances.getBalance()
]);
```

**See also:** [Performance Tuning Guide](guides/performance-tuning.md)

---

### 27. Does the SDK support connection pooling?

Yes, the SDK reuses HTTP connections automatically via Axios's built-in connection pooling. Simply reuse the same SDK instance:

```typescript
// ✅ Good: Reuse instance
const sdk = new WildberriesSDK({ apiKey });

for (const order of orders) {
  await sdk.ordersFBS.confirmOrder({ orderId: order.id });
}

// ❌ Bad: Creating new instance per request
for (const order of orders) {
  const sdk = new WildberriesSDK({ apiKey }); // Don't do this!
  await sdk.ordersFBS.confirmOrder({ orderId: order.id });
}
```

---

## Advanced Topics

### 28. Can I use the SDK in serverless environments (AWS Lambda, Vercel)?

Yes! The SDK works in serverless environments:

```typescript
// AWS Lambda handler
export const handler = async (event) => {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY,
    timeout: 25000 // Lambda timeout - 5s buffer
  });

  const orders = await sdk.ordersFBS.getOrdersNew();
  return { statusCode: 200, body: JSON.stringify(orders) };
};
```

**Tip:** Warm up connections by initializing SDK outside handler for better performance.

---

### 29. How do I mock the SDK for testing?

Use dependency injection and mock the SDK instance:

```typescript
// jest.mock() or Vitest mock
import { vi } from 'vitest';

const mockSDK = {
  products: {
    getProductList: vi.fn().mockResolvedValue({ data: [], total: 0 })
  }
};

// In your test
const result = await mockSDK.products.getProductList();
expect(result.data).toEqual([]);
```

**See also:** [Testing Best Practices](guides/best-practices.md#testing)

---

### 30. Can I extend the SDK with custom functionality?

Yes, you can extend modules or wrap the SDK:

```typescript
class CustomProductsService {
  constructor(private sdk: WildberriesSDK) {}

  async createProductWithRetry(data: CreateProductRequest, maxAttempts = 3) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await this.sdk.products.createProduct(data);
      } catch (error) {
        if (i === maxAttempts - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
}
```

---

### 31. How do I handle webhook events from Wildberries?

The SDK doesn't include webhook handling (it's HTTP request-based). For webhooks, use a web framework:

```typescript
import express from 'express';

const app = express();

app.post('/webhooks/wildberries', async (req, res) => {
  const event = req.body;

  // Verify webhook signature (implement based on WB docs)
  // Process event
  if (event.type === 'order.created') {
    const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });
    await sdk.ordersFBS.confirmOrder({ orderId: event.orderId });
  }

  res.status(200).send('OK');
});
```

---

## Troubleshooting

### 32. Why am I getting "Network timeout" errors?

**Causes:**
- Slow network connection
- Wildberries API experiencing high load
- Timeout configured too low

**Solutions:**
1. Increase timeout in SDK config:
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY,
     timeout: 60000 // 60 seconds
   });
   ```
2. Check network connectivity
3. Retry with exponential backoff (SDK handles this automatically)

**See also:** [Network Errors](guides/troubleshooting.md#network-errors)

---

### 33. My requests are very slow. How can I diagnose the issue?

Enable debug logging to see request/response timing:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  logLevel: 'debug'
});

await sdk.products.getProductList(); // Check console for timing logs
```

**Common Causes:**
- Rate limiting (SDK waiting for slots)
- Large response payloads
- Network latency
- Server-side processing time

**See also:** [Performance Diagnostics](guides/performance-tuning.md#diagnostics)

---

### 34. How do I report bugs or request features?

1. **Check existing issues:** [GitHub Issues](https://github.com/daytona/wildberries-typescript-sdk/issues)
2. **Create new issue:** Use issue templates
3. **Provide details:**
   - SDK version
   - Node.js version
   - Code snippet reproducing issue
   - Error messages and stack traces

**See also:** [Contributing Guide](../CONTRIBUTING.md)

---

### 35. Where can I find complete code examples?

- **Examples Directory:** [examples/](../examples/)
- **Quickstart:** [getting-started/quickstart.md](getting-started/quickstart.md)
- **Integration Examples:**
  - [Product CRUD](../examples/products-crud.ts)
  - [Order Fulfillment](../examples/README.md#order-fulfillment-fbs)
  - [Financial Operations](../examples/finances-balance-transactions.ts)
  - [Customer Communications](../examples/communications-customer-engagement.ts)

---

## Additional Resources

- **[Quickstart Guide](getting-started/quickstart.md)** - Get started in 5 minutes
- **[API Reference](api/)** - Complete TypeDoc documentation
- **[Best Practices](guides/best-practices.md)** - Production-ready patterns
- **[Troubleshooting Guide](guides/troubleshooting.md)** - Common issues and solutions
- **[Performance Guide](guides/performance-tuning.md)** - Optimization techniques
- **[Glossary](GLOSSARY.md)** - Wildberries and SDK terminology

---

**Need more help?**
- 📖 [Documentation](README.md)
- 🐛 [Report an Issue](https://github.com/daytona/wildberries-typescript-sdk/issues)
- 💬 [Discussions](https://github.com/daytona/wildberries-typescript-sdk/discussions)
