# Frequently Asked Questions (FAQ)

Common questions about the Wildberries API TypeScript SDK.

---

## General Questions

### What is this SDK?

The Wildberries API TypeScript SDK is a production-ready TypeScript library that provides type-safe access to all Wildberries marketplace API methods. It covers all 11 API modules (Products, Orders, Finances, Analytics, Communications, Reports, Promotion, Tariffs, In-Store Pickup).

### Is this an official Wildberries SDK?

No, this is a community-developed SDK. It is built from official Wildberries OpenAPI specifications and follows their API documentation.

### What Node.js versions are supported?

- ✅ Node.js 20.x (LTS)
- ✅ Node.js 22.x (Current)
- ❌ Node.js 18.x (no longer supported as of v1.0)

### Is TypeScript required?

No, you can use this SDK with JavaScript. However, TypeScript is **highly recommended** to get full IntelliSense and type safety benefits.

**JavaScript Usage:**
```javascript
const { WildberriesSDK } = require('daytona-wildberries-typescript-sdk');

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });
const products = await sdk.products.getParentAll();
```

---

## Installation & Setup

### How do I get a Wildberries API key?

1. Log in to your Wildberries seller account
2. Navigate to Settings → API Keys
3. Generate a new API key with required permissions
4. Copy the key securely (it won't be shown again)

**Documentation**: https://dev.wildberries.ru/

### Installation fails with "not found" error

**Error:**
```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/daytona-wildberries-typescript-sdk
```

**Solution:**
Check the exact package name. Make sure you're using:
```bash
npm install daytona-wildberries-typescript-sdk
```

If the package is not yet published to npm, install from GitHub:
```bash
npm install github:salacoste/daytona-wildberries-typescript-sdk
```

### How do I securely store my API key?

**Development:**
```bash
# Create .env file (add to .gitignore)
echo "WB_API_KEY=your_api_key_here" > .env
```

```typescript
import { config } from 'dotenv';
config();

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

**Production:**
Use a secret management service (AWS Secrets Manager, Azure Key Vault, etc.)

See [SECURITY.md](SECURITY.md) for best practices.

---

## API & Rate Limiting

### What happens when I hit a rate limit?

The SDK automatically enforces rate limits to prevent violations. When you exceed a limit:

1. SDK queues your request
2. Waits for rate limit window to reset
3. Automatically retries the request

**You don't need to handle rate limiting manually.**

### Can I disable rate limiting?

**No, and you shouldn't.** Rate limiting protects your account from being suspended by Wildberries. The SDK enforces limits automatically based on API documentation.

### How many retries does the SDK perform?

**Default retry configuration:**
- Max retries: 3
- Initial delay: 1000ms
- Exponential backoff: Yes

**Retries on:**
- 5xx server errors
- Network failures
- 429 rate limit errors

**Does NOT retry on:**
- 4xx client errors (except 429)
- Authentication errors (401)
- Validation errors (400)

### How do I customize retry behavior?

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  retryConfig: {
    maxRetries: 5,           // Increase max retries
    retryDelay: 2000,        // 2 second initial delay
    exponentialBackoff: true // Keep exponential backoff
  }
});
```

---

## Error Handling

### How do I handle errors?

The SDK provides typed error classes:

```typescript
import {
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

try {
  const result = await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter);
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof ValidationError) {
    console.error('Invalid data:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('Network issue:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### What does "Authentication failed" mean?

**Possible causes:**
1. Invalid API key
2. Expired API key
3. API key doesn't have required permissions
4. API key was revoked

**Solution:**
1. Verify API key is correct
2. Generate a new API key in Wildberries seller account
3. Ensure key has necessary permissions
4. Check for trailing spaces or special characters

### What does "Validation error" mean?

The request data doesn't match required schema. Common issues:

**Missing required fields:**
```typescript
// ❌ BAD: Missing required 'brand'
await sdk.products.createProduct({
  subjectID: 105,
  variants: [{
    vendorCode: 'SKU-001',
    title: 'Product Name'
    // Missing: brand
  }]
});

// ✅ GOOD: All required fields
await sdk.products.createProduct({
  subjectID: 105,
  variants: [{
    vendorCode: 'SKU-001',
    title: 'Product Name',
    brand: 'Brand Name' // Added
  }]
});
```

**Check error message for specific field that failed validation.**

---

## Modules & Features

### Which modules are available?

All 11 Wildberries API modules:

| Module | Description | Status |
|--------|-------------|--------|
| `general` | Ping, seller info, news | ✅ Available |
| `products` | Product catalog, CRUD, media, pricing | ✅ Available |
| `ordersFBS` | Seller warehouse fulfillment | ✅ Available |
| `ordersFBW` | WB warehouse fulfillment | ✅ Available |
| `finances` | Balance, transactions, reports | ✅ Available |
| `analytics` | Sales funnel, performance tracking | ✅ Available |
| `reports` | Income, stock, sales reports | ✅ Available |
| `communications` | Customer chat, Q&A, reviews | ✅ Available |
| `promotion` | Campaigns, advertising | ✅ Available |
| `tariffs` | Commission rates, storage fees | ✅ Available |
| `inStorePickup` | Pickup point management | ✅ Available |

### How do I create a product?

```typescript
const product = await sdk.products.createCardsUpload([{
  subjectID: 105,          // Category ID (get from getParentAll)
  variants: [{
    vendorCode: 'SKU-001', // Your internal SKU
    brand: 'Brand Name',
    title: 'Product Title',
    description: 'Product description',
    dimensions: {
      length: 10,          // cm
      width: 5,            // cm
      height: 3,           // cm
      weightBrutto: 200    // grams
    },
    sizes: [{
      techSize: 'M',       // Size
      wbSize: 'M',         // WB size mapping
      price: 2999,         // Price in rubles
      skus: ['BARCODE123456789'] // Barcode
    }],
    characteristics: [{
      id: 1,               // Characteristic ID
      value: 'Red'         // Value
    }]
  }]
}]);

console.log('Created product:', product.data);
```

**See full example:** [examples/complete-product-workflow.ts](examples/complete-product-workflow.ts)

### How do I process FBS orders?

```typescript
// Get new orders
const newOrders = await sdk.ordersFBS.getNewOrders();

for (const order of newOrders) {
  console.log('Order ID:', order.id);
  console.log('Total:', order.totalPrice);

  // Confirm order
  await sdk.ordersFBS.confirmOrder(order.id);

  // Create shipping label
  const label = await sdk.ordersFBS.createShippingLabel({
    orderId: order.id,
    warehouseId: 123
  });
}
```

**See full example:** [examples/orders-fbs-fulfillment.ts](examples/orders-fbs-fulfillment.ts)

### How do I check my balance?

```typescript
const balance = await sdk.finances.getBalance();

console.log('Available balance:', balance.for_withdraw, balance.currency);
console.log('Pending:', balance.pending);
console.log('Total:', balance.total);
```

---

## Performance & Optimization

### How can I improve SDK performance?

**1. Use batch operations when available:**
```typescript
// ✅ GOOD: Single batch request
await sdk.products.createCardsUpload([product1, product2, product3]);

// ❌ BAD: Multiple individual requests
await sdk.products.createCardsUpload([product1]);
await sdk.products.createCardsUpload([product2]);
await sdk.products.createCardsUpload([product3]);
```

**2. Reuse SDK instance:**
```typescript
// ✅ GOOD: Single instance
const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
// Use sdk throughout application

// ❌ BAD: Multiple instances
const sdk1 = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
const sdk2 = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
```

**3. Set appropriate timeout:**
```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 10000 // 10 seconds (default: 30s)
});
```

### Is the SDK production-ready?

**Yes.** The SDK is designed for production use with:
- Automatic rate limiting
- Exponential backoff retries
- Comprehensive error handling
- Full type safety
- 1500+ tests (100% passing)
- CI/CD validation

---

## Troubleshooting

### SDK is slow / requests timeout

**Possible causes:**
1. Network latency
2. Wildberries API slowness
3. Rate limiting delays
4. Large data transfers

**Solutions:**
1. Increase timeout:
```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000 // 60 seconds
});
```

2. Use batch operations to reduce number of requests
3. Enable debug logging to identify bottlenecks

### "Date range too large" error

Some API endpoints limit date ranges (e.g., Analytics API: max 31 days).

**Solution:**
Split into smaller date ranges:
```typescript
const dates = [
  { begin: '2024-01-01', end: '2024-01-31' },
  { begin: '2024-02-01', end: '2024-02-28' },
  { begin: '2024-03-01', end: '2024-03-31' }
];

for (const period of dates) {
  const data = await sdk.analytics.getSalesFunnel({
    period: {
      begin: `${period.begin} 00:00:00`,
      end: `${period.end} 23:59:59`
    }
  });
  // Process data
}
```

### TypeScript errors about missing types

**Error:**
```
Cannot find module 'daytona-wildberries-typescript-sdk' or its corresponding type declarations.
```

**Solution:**
1. Install TypeScript definitions:
```bash
npm install --save-dev @types/node
```

2. Ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### "Module not found" in production

**Possible causes:**
1. Package not installed in production dependencies
2. Build step missing
3. Import path incorrect

**Solution:**
1. Ensure package is in `dependencies` (not `devDependencies`):
```json
{
  "dependencies": {
    "daytona-wildberries-typescript-sdk": "^1.0.0"
  }
}
```

2. Run `npm install --production` in production
3. Check import syntax:
```typescript
// ✅ GOOD: ESM
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// ✅ GOOD: CommonJS
const { WildberriesSDK } = require('daytona-wildberries-typescript-sdk');
```

---

## Contributing

### How can I contribute?

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code contribution guidelines
- Testing requirements
- Pull request process
- Code of conduct

### I found a bug. What should I do?

1. Check existing [Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
2. If not reported, create a new issue with:
   - SDK version
   - Node.js version
   - Steps to reproduce
   - Expected vs actual behavior
   - Code snippet

### I have a feature request. Where do I submit it?

Create a [Feature Request](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues/new?template=feature_request.md) on GitHub with:
- Use case and motivation
- Proposed solution
- Impact on existing functionality

---

## Support

### Where can I get help?

1. **Documentation**: [README.md](README.md)
2. **Examples**: [examples/](examples/)
3. **GitHub Issues**: [Report issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
4. **GitHub Discussions**: [Ask questions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

### Is there a Slack/Discord community?

Not currently. We use GitHub Discussions for community questions and support.

### Can I hire someone to help with integration?

This is a community project with no official commercial support. You may:
- Post job listings on relevant platforms
- Reach out to contributors (check GitHub Insights)
- Hire freelance developers familiar with TypeScript and Wildberries API

---

## Still Have Questions?

If your question isn't answered here:

1. Check [GitHub Discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)
2. Search [closed Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues?q=is%3Aissue+is%3Aclosed)
3. Ask a new question in [Discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions/new)

**Last Updated**: 2025-10-25
