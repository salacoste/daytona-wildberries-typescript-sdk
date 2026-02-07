---
title: Glossary
description: Comprehensive glossary of Wildberries marketplace terms, SDK components, API concepts, and technical terminology
layout: doc
---

# Glossary

**Quick Navigation:** [Wildberries Terms](#wildberries-marketplace-terms) | [SDK Components](#sdk-components--architecture) | [API Concepts](#api-concepts--patterns) | [Technical Terms](#technical-terms) | [Acronyms](#acronyms--abbreviations)

---

## Wildberries Marketplace Terms

### Account Balance
Current funds available in seller's Wildberries account. Includes sales revenue minus commissions, fees, and other charges.

**Related:** [Finances Module](api/classes/FinancesModule.html), [Financial Operations Example](../examples/finances-balance-transactions.ts)

---

### Barcode
Product identifier used for inventory management and order fulfillment. Wildberries supports multiple barcode types: EAN-13, UPC, ITF-14, GTIN.

**Types:**
- **EAN-13:** European Article Number (13 digits)
- **UPC:** Universal Product Code
- **ITF-14:** Interleaved 2 of 5 (14 digits)
- **GTIN:** Global Trade Item Number

**Related:** [Products Module](api/classes/ProductsModule.html)

---

### Brand Name
Official brand name of a product. Required field for product creation in Wildberries marketplace.

**Example:** "Nike", "Adidas", "Samsung"

**Related:** [Product Creation Guide](guides/best-practices.md#product-management)

---

### Category
Hierarchical product classification in Wildberries marketplace. Categories define required and optional characteristics for products.

**Structure:**
- **Parent Categories:** Top-level (e.g., "Electronics", "Clothing")
- **Subcategories:** Nested levels (e.g., "Electronics" → "Smartphones")
- **Leaf Categories:** Final level where products are created

**Related:** [Category API](api/classes/ProductsModule.html#getParentCategories)

---

### Characteristic
Product attribute defining specific properties (size, color, material, etc.). Categories define required and optional characteristics.

**Examples:**
- Size: "S", "M", "L", "XL"
- Color: "Red", "Blue", "Black"
- Material: "Cotton", "Polyester", "Wool"

**Related:** [Product Characteristics](guides/best-practices.md#characteristics)

---

### Commission
Fee charged by Wildberries for selling products on the marketplace. Commission rates vary by category and are calculated as a percentage of sale price.

**Calculation:** `Commission = Sale Price × Commission Rate`

**Related:** [Tariffs Module](api/classes/TariffsModule.html), [Commission Rates](api/interfaces/Commission.html)

---

### Customer
End user purchasing products from Wildberries marketplace. Customer information includes delivery address, contact details, and order preferences.

**Related:** [Order Management](guides/best-practices.md#order-management)

---

### FBS (Fulfillment by Seller)
Order fulfillment model where **seller** handles storage, packaging, and shipping. Seller is responsible for delivering orders to customers or pickup points.

**Responsibilities:**
- Product storage at seller warehouse
- Order packaging and labeling
- Shipping to customer or pickup point
- Handling returns and customer service

**Related:** [OrdersFBS Module](api/classes/OrdersFbsModule.html), [FBS Order Fulfillment Example](../examples/README.md#order-fulfillment-fbs)

---

### FBW (Fulfillment by Wildberries)
Order fulfillment model where **Wildberries** handles storage, packaging, and shipping. Seller sends products to WB warehouses, and WB manages fulfillment.

**Responsibilities:**
- **Seller:** Send products to WB warehouse, manage inventory levels
- **Wildberries:** Storage, packaging, shipping, returns, customer service

**Benefits:** Faster delivery, Prime eligibility, reduced seller logistics burden

**Related:** [OrdersFBW Module](api/classes/OrdersFbwModule.html)

---

### NM ID (Nomenclature ID)
Unique product identifier in Wildberries system. Automatically assigned when creating a new product card. Used for tracking products across APIs.

**Format:** Numeric string (e.g., "12345678")

**Related:** [Product Management](guides/best-practices.md#product-ids)

---

### Order
Customer purchase requiring fulfillment. Orders contain product items, quantities, delivery address, and payment information.

**Order Lifecycle:** `new` → `confirmed` → `assembled` → `shipped` → `delivered`

**Types:**
- **FBS Orders:** Fulfilled by seller
- **FBW Orders:** Fulfilled by Wildberries

**Related:** [Order Module](api/classes/OrdersFBSModule.html), [Order Workflow](guides/best-practices.md#order-workflow)

---

### Payout
Transfer of funds from Wildberries account to seller's bank account. Payouts occur on scheduled intervals (weekly, bi-weekly, or monthly).

**Components:**
- Sales revenue
- Minus commissions and fees
- Minus refunds and returns
- Transfer to bank account

**Related:** [Finances Module](api/classes/FinancesModule.html), [Payout Interface](api/interfaces/Payout.html)

---

### Pickup Point
Physical location where customers collect FBS orders. Sellers can manage pickup point inventory and order assignment.

**Types:**
- Wildberries branded pickup points
- Partner pickup points (e.g., post offices)

**Related:** [InStorePickup Module](api/classes/InStorePickupModule.html)

---

### Pricing
Product sale price configuration. Includes base price, discounts, and promotional pricing.

**Components:**
- **Base Price:** Original product price
- **Discount:** Percentage or fixed amount reduction
- **Final Price:** Price shown to customers

**Related:** [Products Module - Pricing](api/classes/ProductsModule.html), [Pricing Interface](api/interfaces/PricingInfo.html)

---

### Product Card
Complete product listing in Wildberries marketplace. Contains all product information: title, description, images, pricing, characteristics, and inventory.

**Required Fields:**
- Brand name
- Category
- Title and description
- At least one characteristic
- Pricing information

**Related:** [Product Card Interface](api/interfaces/ProductCard.html), [Product Creation Example](../examples/products-crud.ts)

---

### Promotion/Campaign
Marketing activity offering discounts or special pricing. Campaigns can be time-limited and apply to specific products or categories.

**Types:**
- Percentage discounts
- Fixed amount discounts
- Bundle offers
- Flash sales

**Related:** [Promotion Module](api/classes/PromotionModule.html)

---

### Return
Customer-initiated product return. Returns impact account balance and inventory levels.

**Process:** Customer requests return → Seller approves/rejects → Product returned → Refund processed

**Related:** [Order Returns](guides/best-practices.md#handling-returns)

---

### Review
Customer product review including rating (1-5 stars), text comment, and optional photos/videos.

**Seller Actions:**
- Read reviews
- Respond to reviews
- Track review metrics

**Related:** [Communications Module](api/classes/CommunicationsModule.html), [Reviews Interface](api/interfaces/Review.html)

---

### Sales Funnel
Analytics showing conversion from product views to purchases. Key metrics: views, add-to-cart, purchases, conversion rate.

**Formula:** `Conversion Rate = (Purchases / Views) × 100`

**Related:** [Analytics Module](api/classes/AnalyticsModule.html), [Sales Funnel Interface](api/interfaces/SalesFunnel.html)

---

### Seller
Merchant selling products on Wildberries marketplace. Sellers manage product catalog, inventory, orders, and customer communications.

**Responsibilities:**
- Product listing and catalog management
- Inventory management
- Order fulfillment (FBS) or warehouse shipping (FBW)
- Customer service and communications

---

### Stock/Inventory
Product quantity available for sale. Stock levels tracked per warehouse for FBW or per seller location for FBS.

**Stock States:**
- **Available:** Ready for sale
- **Reserved:** Allocated to pending orders
- **In Transit:** Moving between warehouses

**Related:** [Stock Management](guides/best-practices.md#stock-management), [Stock Interface](api/interfaces/StockInfo.html)

---

### Supply
Batch of products sent to Wildberries warehouse (FBW only). Supplies must be created and labeled before shipping inventory to WB.

**Process:** Create supply → Add products → Generate labels → Ship to warehouse → WB receives and stores

**Related:** [OrdersFBW Module - Supplies](api/classes/OrdersFBWModule.html)

---

### Tariff
Pricing structure for Wildberries services. Includes commission rates, fulfillment fees, storage fees, and other charges.

**Types:**
- **Commission Tariffs:** Percentage of sale price
- **Fulfillment Tariffs:** Per-item picking and packing
- **Storage Tariffs:** Monthly storage fees (FBW)
- **Return Tariffs:** Handling returned products

**Related:** [Tariffs Module](api/classes/TariffsModule.html)

---

### Transaction
Financial record of money movement in seller account. Includes sales, refunds, commissions, fees, and payouts.

**Types:**
- **Credit:** Sales revenue
- **Debit:** Commissions, fees, refunds
- **Payout:** Transfer to bank account

**Related:** [Finances Module](api/classes/FinancesModule.html), [Transaction Interface](api/interfaces/Transaction.html)

---

### Warehouse
Storage facility for products. Wildberries operates multiple warehouses across regions for FBW fulfillment.

**Related:** [Warehouse Interface](api/interfaces/Warehouse.html)

---

## SDK Components & Architecture

### AuthManager
SDK component responsible for API key validation and authentication header injection. Validates API key format on initialization and adds `Authorization` header to all requests.

**Location:** `src/client/auth-manager.ts`

**Related:** [Authentication Guide](guides/best-practices.md#authentication)

---

### BaseClient
Core HTTP client providing centralized request handling. All API modules delegate to BaseClient for HTTP operations (GET, POST, PUT, PATCH, DELETE).

**Features:**
- Authentication header injection
- Timeout management
- Error transformation
- Rate limiting integration
- Retry logic integration

**Location:** `src/client/base-client.ts`

**Related:** [Architecture Document](architecture.md#component-2-baseclient)

---

### Error Classes
Typed error hierarchy for handling API failures. All errors extend `WBAPIError` base class.

**Hierarchy:**
```
Error (native)
  └── WBAPIError
        ├── AuthenticationError (401, 403)
        ├── RateLimitError (429)
        ├── ValidationError (400, 422)
        └── NetworkError (timeouts, 5xx)
```

**Location:** `src/errors/`

**Related:** [Error Handling Guide](guides/troubleshooting.md#error-handling)

---

### Modules
API endpoint groups organized by functionality. SDK includes 11 modules corresponding to Wildberries API domains.

**Available Modules:**
- `general` - Utilities (ping, news, seller info)
- `products` - Product catalog management
- `ordersFBS` - Seller fulfillment orders
- `ordersFBW` - Wildberries fulfillment orders
- `finances` - Account balance and transactions
- `analytics` - Sales performance metrics
- `reports` - Async report generation
- `communications` - Customer interactions (chat, Q&A, reviews)
- `promotion` - Marketing campaigns
- `tariffs` - Commission and fee information
- `inStorePickup` - Pickup point management

**Location:** `src/modules/[module]/`

**Related:** [API Modules](guides/best-practices.md#module-organization)

---

### RateLimiter
Component enforcing per-endpoint rate limits using token bucket algorithm. Prevents API rate limit violations by queuing requests.

**Algorithm:** Token Bucket - tokens refill at fixed rate, requests consume tokens

**Location:** `src/client/rate-limiter.ts`

**Related:** [Rate Limiting Guide](guides/performance-tuning.md#rate-limiting)

---

### RetryHandler
Component implementing exponential backoff retry logic for transient failures. Automatically retries failed requests with increasing delays.

**Retry Conditions:**
- Network timeouts
- 5xx server errors
- 429 rate limit errors

**No Retry:**
- 4xx client errors (except 429)
- Authentication errors
- Validation errors

**Location:** `src/client/retry-handler.ts`

**Related:** [Retry Logic Guide](guides/troubleshooting.md#retry-logic)

---

### SDKConfig
Configuration object passed to SDK constructor. Defines API key, timeouts, retry behavior, rate limits, and logging.

**Required:** `apiKey`

**Optional:** `timeout`, `retryConfig`, `rateLimitConfig`, `logLevel`, `baseUrls`

**Type:** [SDKConfig Interface](api/interfaces/SDKConfig.html)

**Related:** [Configuration Guide](guides/best-practices.md#configuration)

---

### Type Definitions
TypeScript interfaces auto-generated from OpenAPI schemas. Provides full type safety for request/response data.

**Location:** `src/types/[module].types.ts`

**Related:** [Type Safety Guide](guides/best-practices.md#type-safety)

---

### WildberriesSDK
Main SDK class serving as entry point and module aggregator. Exposes all 11 API modules as properties.

**Usage:**
```typescript
const sdk = new WildberriesSDK({ apiKey });
sdk.products.getProductList();
sdk.ordersFBS.getOrdersNew();
```

**Location:** `src/index.ts`

**Related:** [SDK Initialization](getting-started/quickstart.md#initialization)

---

## API Concepts & Patterns

### Async/Await
Modern JavaScript pattern for handling asynchronous operations. All SDK methods return Promises and work with async/await.

**Example:**
```typescript
const balance = await sdk.finances.getBalance();
```

**Related:** [Async Programming Guide](guides/best-practices.md#async-patterns)

---

### Authentication
Process of verifying API key and authorizing requests. SDK uses Bearer token authentication via HTTP header.

**Header:** `Authorization: Bearer {api_key}`

**Related:** [Authentication Guide](getting-started/quickstart.md#authentication)

---

### Base URL
Root URL for API endpoints. Different Wildberries APIs use different base URLs (e.g., `content-api.wildberries.ru`, `marketplace-api.wildberries.ru`).

**Configuration:** Can be overridden per module in `SDKConfig.baseUrls`

**Related:** [API Domains](architecture.md#external-apis)

---

### Exponential Backoff
Retry strategy where delay between retries increases exponentially. Prevents overwhelming servers during failures.

**Formula:** `delay = baseDelay × 2^(attemptNumber)`

**Example:** 1s → 2s → 4s → 8s

**Related:** [Retry Logic](guides/troubleshooting.md#exponential-backoff)

---

### HTTP Methods
Request types for API operations:
- **GET:** Retrieve data (read-only)
- **POST:** Create new resources
- **PUT:** Replace existing resources
- **PATCH:** Update specific fields
- **DELETE:** Remove resources

**Related:** [RESTful API Design](guides/best-practices.md#http-methods)

---

### JSON (JavaScript Object Notation)
Data format for API requests and responses. Human-readable text format representing objects and arrays.

**Example:**
```json
{
  "brandName": "Nike",
  "categoryId": "12345"
}
```

---

### Pagination
Pattern for retrieving large datasets in smaller chunks. Wildberries APIs use offset-based or cursor-based pagination.

**Offset-based:**
```typescript
{ limit: 100, offset: 0 }
```

**Cursor-based:**
```typescript
{ cursor: 'eyJpZCI6MTIzfQ==' }
```

**Related:** [Pagination Guide](guides/best-practices.md#pagination)

---

### Rate Limiting
Restriction on number of API requests within a time period. Prevents abuse and ensures fair resource allocation.

**Format:** "X requests per Y time period" (e.g., "3 requests per minute")

**Related:** [Rate Limiting Guide](guides/performance-tuning.md#rate-limiting)

---

### Request/Response
Communication pattern between client and server:
- **Request:** Client sends HTTP request with method, URL, headers, body
- **Response:** Server returns HTTP response with status code, headers, body

**Related:** [HTTP Basics](guides/best-practices.md#http-basics)

---

### REST (Representational State Transfer)
Architectural style for APIs using HTTP methods and URLs. Wildberries APIs follow REST principles.

**Principles:**
- Stateless communication
- Resource-based URLs
- Standard HTTP methods
- JSON data format

---

### Retry Logic
Automatic re-execution of failed requests. SDK retries transient failures (timeouts, 5xx errors, 429 rate limits).

**Default:** Max 3 retries with exponential backoff

**Related:** [Retry Handler](#retryhandler)

---

### Timeout
Maximum time allowed for API request to complete. Prevents indefinite waiting for unresponsive servers.

**Default:** 30 seconds

**Configuration:** `SDKConfig.timeout`

**Related:** [Timeout Configuration](guides/best-practices.md#timeouts)

---

### Token Bucket Algorithm
Rate limiting algorithm using tokens representing request capacity. Tokens refill at fixed rate, requests consume tokens.

**Behavior:**
- Bucket holds maximum tokens (burst capacity)
- Tokens refill at constant rate
- Request consumes 1 token
- If no tokens available, request waits

**Related:** [Rate Limiter](#ratelimiter)

---

### Type Safety
TypeScript feature ensuring compile-time type checking. SDK provides full type safety through auto-generated interfaces.

**Benefits:**
- Catch errors at compile time
- IDE autocomplete and IntelliSense
- Self-documenting code
- Refactoring safety

**Related:** [Type Definitions](#type-definitions)

---

## Technical Terms

### API (Application Programming Interface)
Set of endpoints and protocols for interacting with Wildberries marketplace programmatically.

---

### API Key
Secret token authenticating SDK requests. Obtained from Wildberries Seller portal.

**Security:** Never commit API keys to version control. Use environment variables.

**Related:** [Authentication](#authentication)

---

### Axios
Promise-based HTTP client for Node.js and browsers. Used internally by SDK for HTTP requests.

**Website:** [axios-http.com](https://axios-http.com)

---

### CommonJS (CJS)
JavaScript module system using `require()` and `module.exports`. SDK provides CommonJS build for legacy compatibility.

**Related:** [Module Systems](#module-system)

---

### Dependency Injection
Design pattern where dependencies are provided to components rather than created internally. SDK uses dependency injection for BaseClient.

---

### ESM (ECMAScript Modules)
Modern JavaScript module system using `import` and `export`. SDK primary build format.

**Related:** [Module Systems](#module-system)

---

### Generic Types
TypeScript feature allowing type parameters for reusable code. SDK uses generics extensively for type-safe APIs.

**Example:**
```typescript
async get<T>(url: string): Promise<T>
```

---

### HTTP (Hypertext Transfer Protocol)
Protocol for transmitting data over the internet. All SDK requests use HTTPS (secure HTTP).

---

### IDE (Integrated Development Environment)
Software for writing and debugging code. Examples: VS Code, WebStorm, IntelliJ IDEA.

---

### Interface
TypeScript construct defining object shape. SDK uses interfaces for request/response types.

**Example:**
```typescript
interface ProductCard {
  id: string;
  brandName: string;
  categoryId: string;
}
```

---

### JSON Schema
Format for describing JSON data structure. Wildberries OpenAPI specs use JSON Schema for request/response validation.

---

### Module System
JavaScript feature for organizing code into reusable modules. SDK supports both ESM and CommonJS.

**Related:** [ESM](#esm-ecmascript-modules), [CommonJS](#commonjs-cjs)

---

### Node.js
JavaScript runtime for server-side development. SDK requires Node.js 18.x, 20.x, or 22.x LTS.

**Website:** [nodejs.org](https://nodejs.org)

---

### npm (Node Package Manager)
Package manager for JavaScript. SDK distributed via npm registry.

**Command:** `npm install daytona-wildberries-typescript-sdk`

---

### OpenAPI (Swagger)
Specification format for describing RESTful APIs. Wildberries provides 11 OpenAPI YAML files.

**Related:** [API Specification](architecture.md#external-apis)

---

### Promise
JavaScript object representing eventual completion or failure of async operation. All SDK methods return Promises.

**Related:** [Async/Await](#asyncawait)

---

### SDK (Software Development Kit)
Library providing tools and interfaces for interacting with a platform. This SDK simplifies Wildberries API integration.

---

### Tree Shaking
Build optimization removing unused code. SDK modules are tree-shakeable for minimal bundle size.

---

### TypeScript
Typed superset of JavaScript adding static type checking. SDK written in TypeScript with strict mode enabled.

**Website:** [typescriptlang.org](https://typescriptlang.org)

---

### UUID (Universally Unique Identifier)
128-bit identifier guaranteed to be unique. SDK uses UUIDs for correlation IDs in logging.

---

## Acronyms & Abbreviations

| Acronym | Full Term | Description |
|---------|-----------|-------------|
| **AC** | Acceptance Criteria | Conditions for story completion |
| **API** | Application Programming Interface | Programmatic interface for services |
| **CI/CD** | Continuous Integration/Continuous Deployment | Automated testing and deployment pipeline |
| **CJS** | CommonJS | JavaScript module system |
| **CSV** | Comma-Separated Values | File format for data export |
| **DoD** | Definition of Done | Checklist for task completion |
| **ESM** | ECMAScript Modules | Modern JavaScript module system |
| **FBS** | Fulfillment by Seller | Seller-managed order fulfillment |
| **FBW** | Fulfillment by Wildberries | WB-managed order fulfillment |
| **GTIN** | Global Trade Item Number | International product identifier |
| **HTTP** | Hypertext Transfer Protocol | Web communication protocol |
| **HTTPS** | HTTP Secure | Encrypted HTTP |
| **IDE** | Integrated Development Environment | Code editor with debugging tools |
| **ISO** | International Organization for Standardization | Standards body (e.g., ISO 8601 dates) |
| **JSON** | JavaScript Object Notation | Data interchange format |
| **LTS** | Long-Term Support | Stable Node.js releases |
| **MSW** | Mock Service Worker | HTTP mocking library for tests |
| **NM ID** | Nomenclature ID | Wildberries product identifier |
| **npm** | Node Package Manager | JavaScript package registry |
| **P95** | 95th Percentile | Performance metric (95% of requests faster than this) |
| **PII** | Personally Identifiable Information | Private customer data |
| **PRD** | Product Requirements Document | Project specifications |
| **REST** | Representational State Transfer | API architectural style |
| **SDK** | Software Development Kit | Developer integration library |
| **TDD** | Test-Driven Development | Write tests before implementation |
| **TTL** | Time To Live | Cache expiration duration |
| **TypeDoc** | TypeScript Documentation Generator | API docs from JSDoc comments |
| **UUID** | Universally Unique Identifier | Unique 128-bit identifier |
| **YAML** | YAML Ain't Markup Language | Human-readable data format |

---

## See Also

- **[FAQ](FAQ.md)** - Frequently asked questions
- **[Quickstart Guide](getting-started/quickstart.md)** - Get started in 5 minutes
- **[API Reference](api/)** - Complete TypeDoc documentation
- **[Best Practices](guides/best-practices.md)** - Production-ready patterns
- **[Architecture Document](architecture.md)** - System design overview

---

**Last Updated:** 2026-02-07
**SDK Version:** 3.0.0
