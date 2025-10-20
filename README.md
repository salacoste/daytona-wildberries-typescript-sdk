# Wildberries API TypeScript SDK

[![CI](https://github.com/yourusername/wb-api-sdk/workflows/CI/badge.svg)](https://github.com/yourusername/wb-api-sdk/actions)
[![npm version](https://badge.fury.io/js/daytona-wildberries-typescript-sdk.svg)](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Full-featured TypeScript SDK providing type-safe access to all Wildberries marketplace API methods.**

Transform 11 OpenAPI specifications into a production-ready SDK with complete type safety, automatic rate limiting, retry mechanisms, and comprehensive error handling. Reduce integration time from weeks to hours.

---

## Features

✅ **Complete API Coverage** - All 11 Wildberries API modules (Products, Orders, Finances, Analytics, etc.)
✅ **Full Type Safety** - Auto-generated TypeScript types from OpenAPI specifications
✅ **Automatic Rate Limiting** - Built-in enforcement of per-endpoint rate limits
✅ **Smart Retry Logic** - Exponential backoff for transient failures
✅ **Rich Error Handling** - Typed error classes with recovery guidance
✅ **Tree-Shakeable** - Dual ESM/CommonJS builds, import only what you need
✅ **Zero Config** - Works out of the box with sensible defaults

---

## Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

**Requirements:**
- Node.js 18.x, 20.x, or 22.x
- TypeScript 5.x (for TypeScript projects)

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize the SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

// Fetch product categories
const categories = await sdk.products.getParentCategories();
console.log(categories);

// Get order list
const orders = await sdk.ordersFBS.getOrders({
  dateFrom: '2024-01-01',
  dateTo: '2024-12-31'
});
console.log(orders);
```

---

## Usage

### Configuration

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: 'your-api-key',          // Required
  timeout: 30000,                  // Optional: request timeout in ms (default: 30000)
  retryConfig: {
    maxRetries: 3,                 // Optional: max retry attempts (default: 3)
    retryDelay: 1000,              // Optional: initial retry delay in ms (default: 1000)
    exponentialBackoff: true       // Optional: use exponential backoff (default: true)
  },
  logLevel: 'info'                 // Optional: 'debug' | 'info' | 'warn' | 'error' (default: 'warn')
});
```

### API Modules

The SDK exposes 11 API modules:

- **`sdk.general`** - General utilities (ping, news, seller info)
- **`sdk.products`** - Product catalog management
- **`sdk.ordersFBS`** - Seller fulfillment orders
- **`sdk.ordersFBW`** - Wildberries fulfillment orders
- **`sdk.finances`** - Account balance and transactions
- **`sdk.analytics`** - Sales performance analytics
- **`sdk.reports`** - Async report generation
- **`sdk.communications`** - Customer chat, Q&A, reviews
- **`sdk.promotion`** - Marketing campaigns and advertising
- **`sdk.tariffs`** - Commission rates and fees
- **`sdk.inStorePickup`** - Pickup point management

### Error Handling

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

try {
  const product = await sdk.products.createProduct(productData);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Validation failed:', error.fieldErrors);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded, retry after:', error.retryAfter);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  }
}
```

---

## Documentation

- **[API Reference](https://yourusername.github.io/wb-api-sdk/)** - Complete API documentation
- **[Examples](./examples/)** - Usage examples for each module
- **[Architecture](./docs/architecture.md)** - Technical architecture and design decisions
- **[PRD](./docs/prd.md)** - Product requirements and specifications

---

## Development

### Prerequisites

- Node.js 20.x LTS
- npm 10.x

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/wb-api-sdk.git
cd wb-api-sdk

# Install dependencies
npm install

# Run tests
npm test

# Build SDK
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

### Scripts

- `npm run build` - Build ESM and CommonJS bundles
- `npm test` - Run test suite
- `npm run test:coverage` - Generate coverage report
- `npm run type-check` - TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/wb-api-sdk/issues)
- **Documentation**: [API Reference](https://yourusername.github.io/wb-api-sdk/)
- **Email**: support@example.com

---

## Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Powered by [Vite](https://vitejs.dev/)
- Tested with [Vitest](https://vitest.dev/)
- API specifications provided by [Wildberries](https://dev.wildberries.ru/)

---

**Made with ❤️ for the Wildberries developer community**
