# Wildberries API TypeScript SDK

[![CI](https://github.com/salacoste/daytona-wildberries-typescript-sdk/workflows/CI/badge.svg)](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions)
[![npm version](https://badge.fury.io/js/daytona-wildberries-typescript-sdk.svg)](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
[![Coverage](https://img.shields.io/codecov/c/github/salacoste/daytona-wildberries-typescript-sdk)](https://codecov.io/gh/salacoste/daytona-wildberries-typescript-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Full-featured TypeScript SDK providing type-safe access to all Wildberries marketplace API methods.**

Transform 11 OpenAPI specifications into a production-ready SDK with complete type safety, automatic rate limiting, retry mechanisms, and comprehensive error handling. Reduce integration time from weeks to hours.

> **Documentation Languages:** English (current) | [Русский (Russian)](docs/ru/README.md)

---

## ✨ Features

- **🔐 Complete Type Safety** - Auto-generated TypeScript types from OpenAPI specifications for all 11 API modules
- **⚡ Automatic Rate Limiting** - Built-in enforcement of per-endpoint rate limits with intelligent queuing
- **🔄 Smart Retry Logic** - Exponential backoff retry mechanism for transient failures
- **🛡️ Rich Error Handling** - Typed error hierarchy with detailed recovery guidance
- **📦 Tree-Shakeable** - Dual ESM/CommonJS builds, import only what you need (<100KB gzipped)
- **✅ Battle-Tested** - 98% test coverage with 1,200+ tests across all modules
- **📚 Comprehensive Documentation** - Complete API reference, tutorials, and working examples
- **🔧 Zero Configuration** - Works out of the box with sensible defaults, configurable for advanced use

---

## 📦 Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

### Requirements

- **Node.js:** ≥ 20.0.0 (18.x no longer supported)
- **TypeScript:** ≥ 5.0.0 (for TypeScript projects)
- **Wildberries API Key:** [Get one here](https://seller.wildberries.ru/)

### Quick Verification

```bash
# Verify installation
npm list daytona-wildberries-typescript-sdk

# Run quickstart example
npx tsx node_modules/daytona-wildberries-typescript-sdk/examples/quickstart.ts
```

---

## 🚀 Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY! // Store securely in environment variables
});

// Test connectivity
const pingResponse = await sdk.general.ping();
console.log('Connected:', pingResponse.Status); // 'OK'

// Fetch product categories
const categories = await sdk.products.getParentAll();
console.log('Categories:', categories.data?.length);

// Get new orders
const orders = await sdk.ordersFBS.getNewOrders();
console.log('New orders:', orders.length);

// Check account balance
const balance = await sdk.finances.getBalance();
console.log('Balance:', balance.for_withdraw, balance.currency);

// Get sales analytics
const salesFunnel = await sdk.analytics.getSalesFunnel({
  period: {
    begin: '2024-01-01 00:00:00',
    end: '2024-01-31 23:59:59'
  }
});
console.log('Products analyzed:', salesFunnel.data.cards.length);
```

**Time to First API Call:** <5 minutes 🚀

**👉 [Complete 5-Minute Quickstart Guide](docs/getting-started/quickstart.md)**

---

## 📚 Documentation

### Getting Started

| Resource | Description |
|----------|-------------|
| **[5-Minute Quickstart](docs/getting-started/quickstart.md)** | Get up and running in under 5 minutes |
| **[Tutorial 1: Product Catalog Sync](docs/getting-started/tutorials/product-catalog-sync.md)** | Learn product management (30 min) |
| **[Tutorial 2: Order Fulfillment](docs/getting-started/tutorials/order-fulfillment.md)** | Master order processing (45 min) |
| **[Tutorial 3: Analytics Dashboard](docs/getting-started/tutorials/analytics-dashboard.md)** | Build analytics reports (30 min) |
| **[Tutorial 4: Multi-Module Integration](docs/getting-started/tutorials/multi-module-integration.md)** | Connect all modules (60 min) |

### Guides & Best Practices

| Resource | Description |
|----------|-------------|
| **[Best Practices Guide](docs/guides/best-practices.md)** | Production-ready patterns and recommendations |
| **[Performance Tuning](docs/guides/performance.md)** | Optimize for scale and efficiency |
| **[Troubleshooting Guide](docs/guides/troubleshooting.md)** | Common issues and solutions |
| **[Security Best Practices](docs/guides/security.md)** | Secure your integration |

### Reference & Examples

| Resource | Description |
|----------|-------------|
| **[Complete API Reference](docs/api/)** | Full TypeDoc documentation for all modules |
| **[Code Examples](docs/examples/)** | Working examples for common use cases |
| **[FAQ](docs/FAQ.md)** | Frequently asked questions (35+ questions) |
| **[Glossary](docs/GLOSSARY.md)** | Wildberries terms, SDK components, and API concepts |

### Project Information

| Resource | Description |
|----------|-------------|
| **[Contributing Guide](CONTRIBUTING.md)** | How to contribute code, tests, and documentation |
| **[Code of Conduct](CODE_OF_CONDUCT.md)** | Community standards and guidelines |
| **[Security Policy](SECURITY.md)** | Vulnerability reporting and security practices |
| **[Changelog](CHANGELOG.md)** | Version history and release notes |

**📖 [Complete Documentation Hub](docs/index.md)**

---

## 🎯 Supported API Modules

All 11 Wildberries API modules are fully supported:

| Module | Status | Coverage | Description |
|--------|--------|----------|-------------|
| **General** | ✅ Complete | 100% | Ping, news, seller info, connectivity testing |
| **Products** | ✅ Complete | 100% | Categories, CRUD, media, pricing, warehouse, stock |
| **Orders FBS** | ✅ Complete | 100% | Seller fulfillment, order status, shipping, supplies |
| **Orders FBW** | ✅ Complete | 100% | WB warehouse fulfillment, supply planning |
| **Finances** | ✅ Complete | 100% | Balance, transactions, reports, payouts |
| **Analytics** | ✅ Complete | 100% | Sales funnel, search queries, stock history, CSV reports |
| **Reports** | ✅ Complete | 100% | Income reports, sales reports, data exports |
| **Communications** | ✅ Complete | 100% | Customer chat, Q&A, reviews management |
| **Promotion** | ✅ Complete | 100% | Campaigns, promo codes, advertising |
| **Tariffs** | ✅ Complete | 100% | Commission rates, fee schedules |
| **In-Store Pickup** | ✅ Complete | 100% | Pickup point orders and management |

**Total API Coverage:** 100% (all endpoints implemented and tested)

---

## 💡 Common Use Cases

### Product Management
Sync product catalogs, update pricing, manage inventory across warehouses.

→ **[Product Catalog Tutorial](docs/getting-started/tutorials/product-catalog-sync.md)**

### Order Fulfillment
Process customer orders, manage shipping, track deliveries for FBS and FBW.

→ **[Order Fulfillment Tutorial](docs/getting-started/tutorials/order-fulfillment.md)**

### Analytics & Reporting
Generate sales reports, analyze performance, export data for business intelligence.

→ **[Analytics Dashboard Tutorial](docs/getting-started/tutorials/analytics-dashboard.md)**

### Financial Management
Track account balance, reconcile transactions, manage payouts and reporting.

→ **[Finances Example](examples/finances-reports-payouts.ts)**

### Customer Support
Manage customer chat, answer Q&A, respond to reviews at scale.

→ **[Customer Support Example](examples/customer-support.ts)**

### Multi-Channel Integration
Connect products → orders → finances → analytics for complete e-commerce automation.

→ **[Multi-Module Integration Tutorial](docs/getting-started/tutorials/multi-module-integration.md)**

---

## 🔧 Configuration

### Basic Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!, // Required: Your API key
});
```

### Advanced Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Custom timeouts
  timeout: 30000, // 30 seconds (default)

  // Retry configuration
  retryConfig: {
    maxRetries: 3,        // Max retry attempts (default: 3)
    retryDelay: 1000,     // Initial delay in ms (default: 1000)
    exponentialBackoff: true // Use exponential backoff (default: true)
  },

  // Rate limiting (optional overrides)
  rateLimitConfig: {
    requestsPerSecond: 10,  // Global limit
    requestsPerMinute: 100  // Global limit
  },

  // Logging
  logLevel: 'warn' // 'debug' | 'info' | 'warn' | 'error' (default: 'warn')
});
```

**→ [Complete Configuration Guide](docs/guides/configuration.md)**

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific module tests
npm test -- products
npm test -- orders-fbs

# Run integration tests
npm run test:integration

# Type checking
npm run type-check

# Linting
npm run lint
```

**Test Coverage:** 98% (1,200+ tests)

**→ [Testing Guide](docs/guides/testing.md)**

---

## 🚀 Development

```bash
# Clone repository
git clone https://github.com/salacoste/daytona-wildberries-typescript-sdk.git
cd daytona-wildberries-typescript-sdk

# Install dependencies
npm install

# Run code generation
npm run generate

# Build
npm run build

# Watch mode (development)
npm run dev
```

**→ [Development Guide](CONTRIBUTING.md)**

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 **Bug Reports** - Found an issue? [Open an issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- 💡 **Feature Requests** - Have an idea? [Start a discussion](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)
- 📖 **Documentation** - Improve our docs with PRs
- 🧪 **Tests** - Add test coverage for edge cases
- 🔧 **Code** - Fix bugs or add features

### Quick Contribution Steps

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

**→ [Complete Contributing Guide](CONTRIBUTING.md)**

### Good First Issues

New to the project? Check out issues labeled [`good first issue`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/labels/good%20first%20issue).

---

## 📊 Project Status

| Metric | Status |
|--------|--------|
| **API Coverage** | 100% (all 11 modules complete) |
| **Test Coverage** | 98% (1,200+ tests) |
| **TypeScript** | 100% (strict mode) |
| **Documentation** | Complete (quickstart, tutorials, guides, API reference) |
| **Production Ready** | ✅ Yes (v1.0.0+) |

### Recent Updates

- **v1.0.0** - All 11 modules complete, production ready
- **Epic 4** - Promotion, Tariffs, In-Store Pickup modules
- **Epic 3** - Finances, Analytics, Reports, Communications modules
- **Epic 2** - Products, Orders FBS, Orders FBW modules
- **Epic 1** - Core infrastructure, error handling, testing framework

**→ [View Changelog](CHANGELOG.md)**

---

## 🔗 Links

- **[GitHub Repository](https://github.com/salacoste/daytona-wildberries-typescript-sdk)**
- **[npm Package](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)**
- **[Issue Tracker](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)**
- **[Discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)**
- **[Official Wildberries API Docs](https://dev.wildberries.ru/)**
- **[TypeDoc API Reference](https://salacoste.github.io/daytona-wildberries-typescript-sdk/)**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This SDK depends on:
- **Axios** (MIT License) - HTTP client
- **Development dependencies** - See [package.json](package.json) for complete list

---

## 🙏 Acknowledgments

- **Wildberries** - For providing comprehensive API documentation
- **OpenAPI Initiative** - For the OpenAPI specification standard
- **TypeScript Team** - For excellent type system and tooling
- **All Contributors** - Thank you for your contributions!

---

## 📞 Support

Need help? We're here for you:

- **📖 Documentation** - Check our [comprehensive docs](docs/index.md)
- **❓ FAQ** - Read the [frequently asked questions](docs/faq.md)
- **🐛 Bug Reports** - [Open an issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues/new?template=bug_report.md)
- **💡 Feature Requests** - [Start a discussion](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions/new)
- **💬 Community Chat** - [Join discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

### Commercial Support

Need priority support, custom features, or training? [Contact us] for commercial support options.

---

## ⚠️ Disclaimer

This is an unofficial SDK. It is not affiliated with, officially maintained by, or endorsed by Wildberries. Use at your own risk. Always refer to the [official Wildberries API documentation](https://dev.wildberries.ru/) for authoritative information.

---

**Made with ❤️ for the Wildberries developer community**

[⬆ Back to top](#wildberries-api-typescript-sdk)
