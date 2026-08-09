# Wildberries API TypeScript SDK Architecture Document

**Document Version**: 2.0 | **Date**: 2026-08-09 | **Status**: Maintained — reflects v4.1.0

---

## Introduction

This document outlines the overall project architecture for **Wildberries API TypeScript SDK**, including backend systems, shared services, and non-UI specific concerns. It is a living internal architecture reference that reflects the **shipped v4.1.0** system, kept in sync with the code as the SDK evolves.

**Relationship to Frontend Architecture:**
This is a **TypeScript library/SDK project** with no UI components. This document serves as the complete architectural specification for the SDK's internal structure, code generation framework, HTTP client infrastructure, and developer experience design.

### Project Foundation

- **TypeScript 5.x** with strict mode
- **Node.js ≥ 20** (engines: `>=20.0.0`)
- **ESM package** (`"type": "module"`) with **Vite** dual ESM/CJS build (`vite-plugin-dts`)
- **Vitest 4** + `@vitest/coverage-v8` for testing; **MSW 2** for integration (jsdom)
- **Custom code generator** (`tools/generate-sdk.ts`) transforms the OpenAPI specifications in `wildberries_api_doc/` into TypeScript

**Approach (no starter template):** The SDK was built from scratch with no starter template. Rationale: code generation from OpenAPI specs is highly specialized (no template covers it), a custom Vite configuration gives full control over tree-shakeable dual ESM/CJS builds, the type-generation pipeline required bespoke architecture, and an SDK benefits from a lean dependency tree. The result is a custom generator tailored to Wildberries API structure with maximum control over bundle size and type safety.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-08-09 | 2.0 | Refreshed to shipped reality: 14 public modules, v4.1.0, real core infra/config/errors, removed non-existent SuppliesModule, updated test/build stack | System |
| 2026-01-25 | 1.2 | Added SuppliesModule and extended Tariffs architecture documentation | System |
| 2025-12-25 | 1.1 | Added Promotion API deprecation documentation | System |
| 2025-10-19 | 1.0 | Initial architecture document from PRD | Winston (Architect Agent) |

---

## High Level Architecture

### Technical Summary

The Wildberries API TypeScript SDK employs a **layered library architecture** with automated code generation at its core. The system transforms the OpenAPI 3.0.1 specifications in `wildberries_api_doc/` into production-ready TypeScript modules using a custom generator, while providing centralized HTTP infrastructure through a shared BaseClient. It ships **14 public SDK modules** (general, products, ordersFBS, ordersFBW, ordersDBS, finances, analytics, communications, reports, promotion, tariffs, inStorePickup, userManagement, returns) plus a supplemental `1_0_0` legacy module. The architecture prioritizes **type safety** (TypeScript strict mode), **developer experience** (full IDE autocomplete), **reliability** (automatic retry with exponential backoff), and **bundle efficiency** (tree-shakeable dual ESM/CJS build). Core architectural patterns include code generation, dependency injection, interceptor-based middleware, token bucket rate limiting, and a typed error hierarchy, all supporting the goal of reducing integration time from weeks to hours while maintaining zero critical security vulnerabilities.

### High Level Overview

**Architectural Style:** **Modular Library Architecture with Code Generation**

**Repository Structure:** **Monorepo** (single npm package: `daytona-wildberries-typescript-sdk`)
- Rationale: Single package simplifies dependency management and enables atomic releases while tree-shaking ensures consumers only bundle used modules

**Service Architecture:** **TypeScript SDK Library** with 4-layer design:

1. **Core Infrastructure Layer** (`src/client/`)
   - `BaseClient`: Axios-based HTTP client; injects the `Authorization` header, applies configurable timeout, and transforms responses into typed errors (including RFC 7807 `problem+json`, `BidOutOfRange`, and `406 WarehouseStocksUpdateBlock`). Auth-key validation and header injection are handled here (no separate `AuthManager` class).
   - `RateLimiter`: Per-endpoint token bucket enforcing per-endpoint rate limits; `basic`/`test` token multipliers applied via `applyBasicTokenMultipliers`.
   - `RetryHandler`: Exponential backoff for transient failures (network errors, 5xx, 429); does **not** retry 401/403/422.

2. **Generated Type Layer** (`src/types/`)
   - TypeScript interfaces auto-generated from OpenAPI `components.schemas`
   - Request/response type pairs per endpoint
   - Enum types for API values (OrderStatus, ReportType, etc.)
   - Generic utility types for pagination, filters, date ranges

3. **API Module Layer** (14 public modules + supplemental `1_0_0`)
   - Each module delegates to BaseClient
   - Typed methods generated from OpenAPI `paths`
   - Module-specific rate limit configuration
   - Independent imports for tree-shaking

4. **SDK Aggregator Layer**
   - `WildberriesSDK` class exposing all modules as properties
   - Single configuration object shared across modules
   - Unified error handling and logging

**Primary User Interaction Flow:**

```
Developer → WildberriesSDK({ apiKey })
    → sdk.products.createProduct(data)
        → ProductsModule.createProduct()
            → RateLimiter.waitForSlot('products.create')
                → BaseClient.post() [with auth header, timeout, retry]
                    → RetryHandler.executeWithRetry()
                        → Axios HTTP request
                            ← API Response
                        ← Transform to ProductResponse type
                    ← Return typed response or throw typed error
```

**Key Architectural Decisions:**

1. **Code Generation over Manual Implementation**
   - Rationale: Dozens of APIs with hundreds of endpoints would be impossible to maintain manually; the OpenAPI specs in `wildberries_api_doc/` are the single source of truth, preventing drift

2. **Shared BaseClient with Dependency Injection**
   - Rationale: Consistent auth, typed error transformation, retry, and rate-limiting logic across all modules

3. **Token Bucket Rate Limiting**
   - Rationale: Prevents API bans by enforcing per-endpoint limits extracted from OpenAPI descriptions, with reduced multipliers for `basic`/`test` tokens

4. **Dual Build (ESM + CommonJS)**
   - Rationale: Maximum compatibility with both modern and legacy Node.js projects

5. **Minimal Runtime Dependencies**
   - Rationale: Only `axios` and `dotenv` ship at runtime, minimizing the security surface area and bundle size

### High Level Project Diagram

```mermaid
graph TB
    subgraph "Developer Application"
        DEV[Developer Code]
    end

    subgraph "Wildberries SDK - Public API"
        SDK[WildberriesSDK Class]
        SDK --> GEN[GeneralModule]
        SDK --> PROD[ProductsModule]
        SDK --> OFBS[OrdersFBSModule]
        SDK --> OFBW[OrdersFBWModule]
        SDK --> ODBS[OrdersDbsModule]
        SDK --> FIN[FinancesModule]
        SDK --> ANAL[AnalyticsModule]
        SDK --> COMM[CommunicationsModule]
        SDK --> REP[ReportsModule]
        SDK --> PROM[PromotionModule]
        SDK --> TAR[TariffsModule]
        SDK --> ISP[InStorePickupModule]
        SDK --> UMGT[UserManagementModule]
        SDK --> RET[ReturnsModule<br/>aggregator]
    end

    subgraph "Core Infrastructure Layer"
        BC[BaseClient<br/>HTTP + Auth + Typed Errors]
        RL[RateLimiter<br/>Token Bucket]
        RH[RetryHandler<br/>Exponential Backoff]
    end

    subgraph "Code Generation System"
        GEN_TOOL[tools/generate-sdk.ts]
        SWAGGER[OpenAPI YAML Files]
        TYPE_GEN[Type Generator]
        MODULE_GEN[Module Generator]
        RATE_GEN[Rate Limit Parser]
    end

    subgraph "External Wildberries APIs"
        API_COMMON[common-api.wildberries.ru]
        API_CONTENT[content-api.wildberries.ru]
        API_MARKET[marketplace-api.wildberries.ru]
        API_ANALYTICS[seller-analytics-api.wildberries.ru]
        API_FINANCE[finance-api.wildberries.ru]
        API_STATS[statistics-api.wildberries.ru]
        API_ADVERT[advert-api.wildberries.ru]
    end

    DEV --> SDK
    GEN --> BC
    PROD --> BC
    OFBS --> BC
    OFBW --> BC
    ODBS --> BC
    FIN --> BC
    ANAL --> BC
    COMM --> BC
    REP --> BC
    PROM --> BC
    TAR --> BC
    ISP --> BC
    UMGT --> BC
    RET --> BC

    BC --> RL
    BC --> RH
    BC --> ERRORS[Error Classes]

    BC --> API_COMMON
    BC --> API_CONTENT
    BC --> API_MARKET
    BC --> API_ANALYTICS
    BC --> API_FINANCE
    BC --> API_STATS
    BC --> API_ADVERT

    SWAGGER --> GEN_TOOL
    GEN_TOOL --> TYPE_GEN
    GEN_TOOL --> MODULE_GEN
    GEN_TOOL --> RATE_GEN
    TYPE_GEN -.generates.-> PROD
    MODULE_GEN -.generates.-> PROD
    RATE_GEN -.generates.-> RL

    style SDK fill:#4CAF50
    style BC fill:#2196F3
    style GEN_TOOL fill:#FF9800
```

### Architectural and Design Patterns

#### Pattern 1: Code Generation Strategy
- **Recommendation:** Custom Generator
- **Description:** Bespoke tool using js-yaml and TypeScript AST for transforming OpenAPI → TypeScript
- **Rationale:** Wildberries APIs have unique patterns (Russian rate limit tables, multi-domain URLs). Full control over type mapping, JSDoc extraction, and rate limit parsing.

#### Pattern 2: Module Organization Pattern
- **Recommendation:** Facade Pattern with Delegation
- **Description:** Modules delegate to shared BaseClient
- **Rationale:** Clean separation, testability, consistency across all modules

#### Pattern 3: Rate Limiting Strategy
- **Recommendation:** Token Bucket Algorithm
- **Description:** Track tokens per endpoint with refill rate
- **Rationale:** Handles burst limits naturally, aligns with Wildberries API rate limit format

#### Pattern 4: Error Handling Pattern
- **Recommendation:** Typed Error Hierarchy
- **Description:** A base `WBAPIError` extended by ~16 specialized classes: `AuthenticationError`, `RateLimitError`, `ValidationError`, `NetworkError`, plus domain-specific errors (`CampaignNotFoundError`, `InvalidBidError`, `BudgetExceededError`, `InvalidCampaignStateError`, `BidOutOfRangeError`, `PickupOrderNotFoundError`, `InvalidOrderStateError`, `CustomerVerificationError`, `MetadataValidationError`, `MetaValidationFailError`, `WarehouseStocksUpdateBlockError`). Several ship with parse helpers (e.g. `parseBidOutOfRangeDetail`, `parseMetaValidationFail`).
- **Rationale:** TypeScript-native with `instanceof` checks, rich context, preserves stack traces, and maps API-specific failure modes (RFC 7807 `problem+json`, `BidOutOfRange`, `406` warehouse blocks) to actionable types

#### Pattern 5: HTTP Client Pattern
- **Recommendation:** Interceptor Pattern with Axios
- **Description:** Request/response interceptors for auth/logging/retry
- **Rationale:** Battle-tested, mature ecosystem, excellent TypeScript support

#### Pattern 6: Configuration Management
- **Recommendation:** Constructor Injection with Environment Fallback
- **Description:** Pass SDKConfig object to constructor, fallback to process.env
- **Rationale:** Explicit, testable, flexible, type-safe

#### Pattern 7: Type Generation Strategy
- **Recommendation:** Schema-First with Mapped Types
- **Description:** OpenAPI schemas → TypeScript interfaces
- **Rationale:** Single source of truth, automatic updates, guarantees 100% API coverage

#### Pattern 8: Testing Strategy
- **Recommendation:** MSW for Integration + Vitest Mocks for Unit
- **Description:** MSW intercepts HTTP at network level, Vitest mocks for fast unit tests
- **Rationale:** Realistic HTTP flow validation, reusable handlers, fast isolated testing

---

## Tech Stack

### Cloud Infrastructure

**N/A - This is a TypeScript SDK library**

Supporting infrastructure:
- **Package Registry:** npm (public registry)
- **Documentation Hosting:** GitHub Pages (static site hosting)
- **Repository:** GitHub (public, open-source)
- **CI/CD:** GitHub Actions (cloud-hosted runners)

### Technology Stack Table

| **Category** | **Technology** | **Version** | **Purpose** | **Rationale** |
|--------------|----------------|-------------|-------------|---------------|
| **Language** | TypeScript | 5.3.3 | Primary development language | Strong typing eliminates runtime errors, excellent IDE support, strict mode enforces type safety |
| **Runtime** | Node.js | ≥ 20 (`engines`) | JavaScript runtime environment | Pinned to ≥20 in `package.json`; the SDK is an ESM package (`"type": "module"`) |
| **Module System** | ESM + CommonJS | Dual build | Module formats | ESM for modern projects (tree-shaking), CommonJS for legacy compatibility |
| **Build Tool** | Vite | 6.x | Fast builds & optimization | Native ESM, optimal code splitting, `vite-plugin-dts` emits `.d.ts`; 10-100x faster than Webpack |
| **HTTP Client** | Axios | 1.6.7 | HTTP request library | Mature ecosystem, excellent TypeScript support, foundation for BaseClient |
| **Env Loading** | dotenv | 17.x | Load `.env` for examples/scripts | Runtime dependency used by example scripts |
| **Code Generation** | Custom Generator | N/A | Transform OpenAPI → TypeScript | Bespoke tool (`tools/generate-sdk.ts`) for Wildberries-specific patterns (rate limits, multi-domain URLs) |
| **YAML Parser** | js-yaml | 4.1.0 | Parse OpenAPI specs | Industry standard for YAML parsing, required for code generator |
| **Test Framework** | Vitest | 4.x | Unit & integration testing | TypeScript-native, Vite-compatible, built-in coverage via `@vitest/coverage-v8` |
| **HTTP Mocking** | MSW | 2.12.9 | Integration test mocking | Intercepts network requests at fetch/Axios level, realistic HTTP testing (jsdom env) |
| **Linting** | ESLint | 8.56.0 | Code quality enforcement | TypeScript-specific rules, no-any enforcement, catches common mistakes |
| **Formatting** | Prettier | 3.2.4 | Code style consistency | Zero-config, integrates with ESLint, ensures uniform code style |
| **Documentation** | TypeDoc | 0.28.x | API reference generation | TypeScript-native, converts JSDoc → static site; VitePress builds the docs site |
| **CI/CD** | GitHub Actions | N/A | Automated testing & publishing | Free for public repos, matrix testing, automated npm publishing |
| **Package Manager** | npm | 10.x | Dependency management | Default Node.js package manager, native to npm registry |
| **Version Control** | Git + GitHub | N/A | Source control | Industry standard, GitHub integrations (Actions, Pages, Releases) |
| **License** | SEE LICENSE IN LICENSE | N/A | Personal Use license | See `LICENSE` in the repository for terms |

### Development-Time Tools

| **Category** | **Technology** | **Version** | **Purpose** | **Rationale** |
|--------------|----------------|-------------|-------------|---------------|
| **MCP Integration** | Context7 MCP Server | N/A | Library documentation lookup | **MANDATORY** for retrieving up-to-date patterns. Development-time only, NOT runtime dependency |
| **Code Coverage** | @vitest/coverage-v8 | 4.x | Test coverage reporting | Native Vitest integration, enforces ≥90% core, ≥80% module coverage thresholds |
| **Type Checker** | tsc | 5.3.3 | Type validation | Standalone type checking, runs in CI, ensures strict mode compliance |

### Dependency Philosophy

**Runtime Dependencies:** MINIMAL (Axios + dotenv only)
- Every dependency increases security surface area and bundle size

**Development Dependencies:** SELECTIVE (Build/test tools only)
- Dev dependencies don't affect bundle size

**Security Policy:**
- npm audit runs in CI on every commit
- Automated Dependabot updates for security patches
- Zero tolerance for high/critical vulnerabilities

---

## Data Models

Core TypeScript interfaces representing Wildberries API entities, auto-generated from OpenAPI schemas.

### Model 1: ProductCard

**Purpose:** Product listing in Wildberries marketplace catalog

**Key Attributes:**
- `id: string` - Unique product identifier
- `brandName: string` - Product brand (required)
- `categoryId: string` - Category classification
- `title: string` - Product display name
- `description: string` - Product description
- `characteristics: Characteristic[]` - Product attributes (size, color, material)
- `mediaUrls: string[]` - Product image URLs
- `pricing: PricingInfo` - Current price and discount
- `stock: StockInfo[]` - Inventory levels per warehouse
- `status: ProductStatus` - Enum: 'active' | 'draft' | 'archived'
- `createdAt: string` - ISO 8601 timestamp
- `updatedAt: string` - ISO 8601 timestamp

**Relationships:**
- Belongs to Category (many-to-one)
- Has many Characteristics (one-to-many)
- Has many StockInfo entries (one-to-many)
- Referenced by Orders (many-to-many)

### Model 2: Order

**Purpose:** Customer purchase order requiring fulfillment

**Key Attributes:**
- `orderId: string` - Unique order identifier
- `type: OrderType` - Enum: 'FBS' | 'FBW'
- `status: OrderStatus` - Enum: 'new' | 'confirmed' | 'assembled' | 'shipped' | 'delivered' | 'cancelled'
- `items: OrderItem[]` - Ordered products with quantities
- `totalAmount: number` - Total order value in rubles
- `customerInfo: CustomerInfo` - Delivery address and contact
- `shippingInfo?: ShippingInfo` - Tracking number, carrier, label URL (FBS)
- `warehouseId?: string` - Warehouse assignment (FBW)
- `createdAt: string` - Order creation timestamp
- `deliveryDeadline: string` - Required delivery date

**Relationships:**
- Has many OrderItems (one-to-many)
- References ProductCard via OrderItem (many-to-many)
- May have ShippingInfo (one-to-one, FBS only)
- May have Return (one-to-one)

### Model 3: Category

**Purpose:** Product taxonomy node for marketplace organization

**Key Attributes:**
- `id: string` - Category identifier
- `name: string` - Category display name
- `parentId: string | null` - Parent category ID
- `level: number` - Hierarchy depth
- `requiredCharacteristics: CharacteristicDefinition[]` - Mandatory attributes
- `optionalCharacteristics: CharacteristicDefinition[]` - Optional attributes

**Relationships:**
- Has many Categories (tree structure)
- Has many ProductCards (one-to-many)
- Defines CharacteristicDefinitions (one-to-many)

### Model 4: Transaction

**Purpose:** Financial record of money movement in seller account

**Key Attributes:**
- `transactionId: string` - Unique identifier
- `type: TransactionType` - Enum: 'sale' | 'refund' | 'commission_fee' | 'payout'
- `amount: number` - Amount in rubles
- `currency: string` - Always 'RUB'
- `orderId?: string` - Related order ID
- `description: string` - Human-readable description
- `balanceAfter: number` - Account balance after transaction
- `timestamp: string` - ISO 8601 timestamp

**Relationships:**
- May reference Order (many-to-one)
- Belongs to Balance (many-to-one)

### Model 5: SalesFunnel

**Purpose:** Conversion analytics from product view to purchase

**Key Attributes:**
- `productId: string` - Product being analyzed
- `dateRange: DateRange` - Analysis period
- `views: number` - Total product page views
- `addToCarts: number` - Items added to cart
- `purchases: number` - Completed purchases
- `conversionRate: number` - Purchases / views percentage
- `revenue: number` - Total revenue generated
- `averageOrderValue: number` - Revenue / purchases
- `returnRate: number` - Percentage of orders returned

**Relationships:**
- References ProductCard (many-to-one)
- Aggregated from Orders (derived data)

### Additional Models

- **Model 6: Chat** - Customer support conversation thread
- **Model 7: Campaign** - Promotional marketing campaign with discount rules
- **Model 8: Report** - Asynchronous report generation job and result

### Shared Value Objects

- `DateRange: { from: string; to: string }`
- `PaginationParams: { limit?: number; offset?: number }`
- `PaginatedResponse<T>: { data: T[]; total: number; hasMore: boolean }`
- `ApiResponse<T>: { data: T; cursor?: string; error?: null }`

---

## Components

Major logical components organized into 4 architectural layers.

### Component 1: WildberriesSDK (Main SDK Class)

**Responsibility:** Primary entry point, aggregates all 14 public SDK modules

**Key Interfaces:**
```typescript
class WildberriesSDK {
  constructor(config: SDKConfig)
  readonly general: GeneralModule
  readonly products: ProductsModule
  readonly ordersFBS: OrdersFbsModule
  readonly ordersFBW: OrdersFbwModule
  readonly ordersDBS: OrdersDbsModule
  readonly finances: FinancesModule
  readonly analytics: AnalyticsModule
  readonly communications: CommunicationsModule
  readonly reports: ReportsModule
  readonly promotion: PromotionModule
  readonly tariffs: TariffsModule
  readonly inStorePickup: InStorePickupModule
  readonly userManagement: UserManagementModule
  readonly returns: ReturnsModule
  static readonly version: string
}
```

**Dependencies:** BaseClient, all 14 modules (the `returns` aggregator additionally depends on `reports`, `ordersFBS`, and `finances`)
**Technology Stack:** TypeScript 5.3.3 class with dependency injection
**Location:** `src/index.ts`

### Component 2: BaseClient (HTTP Infrastructure)

**Responsibility:** Centralized HTTP client with auth, timeouts, error transformation

**Key Interfaces:**
```typescript
class BaseClient {
  get<T>(url: string, options?: RequestOptions): Promise<T>
  post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>
  put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>
  patch<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>
  delete<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>
}
```

**Dependencies:** Axios, RateLimiter, RetryHandler, `ALL_RATE_LIMITS` + `applyBasicTokenMultipliers`, the typed error classes (including `BidOutOfRangeError`, `WarehouseStocksUpdateBlockError`, `MetaValidationFailError`)
**Technology Stack:** Axios instance with interceptors, generic TypeScript methods, PII-sanitized debug logging
**Location:** `src/client/base-client.ts`

### Component 3: RateLimiter (Rate Limit Enforcement)

**Responsibility:** Token bucket algorithm for per-endpoint rate limits

**Key Interfaces:**
```typescript
class RateLimiter {
  async waitForSlot(key: string): Promise<void>
  canProceed(key: string): boolean
  consumeToken(key: string): void
}
```

**Dependencies:** None (pure in-memory state)
**Technology Stack:** Token bucket algorithm, async queue using Promises
**Location:** `src/client/rate-limiter.ts`

### Component 4: RetryHandler (Retry Logic)

**Responsibility:** Exponential backoff retry for transient failures

**Key Interfaces:**
```typescript
class RetryHandler {
  async executeWithRetry<T>(operation: () => Promise<T>, context: RetryContext): Promise<T>
}
```

**Dependencies:** Error classes
**Technology Stack:** Generic async wrapper, exponential backoff formula
**Location:** `src/client/retry-handler.ts`

### Component 5: Authentication (handled by WildberriesSDK + BaseClient)

**Responsibility:** API key validation and authentication header injection

**Note:** There is no standalone `AuthManager` class in the shipped code. API-key presence is validated up front in the `WildberriesSDK` constructor (throws `AuthenticationError` on a missing/blank key), and the `Authorization: Bearer <apiKey>` header is injected by `BaseClient` on every request. A `tokenType` on `SDKConfig` (`personal` | `service` | `basic` | `test`) selects rate-limit multipliers; `basic`/`test` tokens emit a one-time reduced-limits warning at construction.

**Dependencies:** AuthenticationError, BaseClient
**Location:** `src/index.ts` (validation), `src/client/base-client.ts` (header injection)

### Components 6-19: API Modules (14 public modules + supplemental `1_0_0`)

**Pattern:** Each module follows identical structure — delegate to BaseClient with typed request/response

**Public modules** (`sdk.*` properties on `WildberriesSDK`, defined in `src/index.ts`):

| # | Property | Class | Domain | Methods (~) |
|---|----------|-------|--------|-------------|
| 1 | `sdk.general` | GeneralModule | common-api | 10 |
| 2 | `sdk.products` | ProductsModule | content-api | 51 |
| 3 | `sdk.ordersFBS` | OrdersFbsModule | marketplace-api | 35 |
| 4 | `sdk.ordersFBW` | OrdersFbwModule | marketplace-api | 12 |
| 5 | `sdk.ordersDBS` | OrdersDbsModule | marketplace-api | 20 |
| 6 | `sdk.finances` | FinancesModule | finance-api / statistics-api | 11 |
| 7 | `sdk.analytics` | AnalyticsModule | seller-analytics-api | 19 |
| 8 | `sdk.communications` | CommunicationsModule | common-api | 25 |
| 9 | `sdk.reports` | ReportsModule | statistics-api | 25 |
| 10 | `sdk.promotion` | PromotionModule | advert-api | 45 |
| 11 | `sdk.tariffs` | TariffsModule | common-api | 5 |
| 12 | `sdk.inStorePickup` | InStorePickupModule | common-api (click & collect) | 18 |
| 13 | `sdk.userManagement` | UserManagementModule | common-api | 4 |
| 14 | `sdk.returns` | ReturnsModule | aggregator (since v3.10.0) | 3 |

**Total: 283 public methods across the 14 modules.**

**Supplemental (not a public `sdk.*` property):** `src/modules/1_0_0/` holds 5 legacy methods (`getContentTags`, `getAdvAdvert`, `createAdvFullstat`, `getAdvFullstats`, `getCalendarPromotions`) retained for backward compatibility.

**Module responsibilities:**
1. GeneralModule — Ping, server time, news, seller info
2. ProductsModule — Categories, product cards, media, pricing, stock, trash
3. OrdersFbsModule — Seller-fulfillment orders, status, shipping labels, metadata
4. OrdersFbwModule — WB-fulfillment supplies, acceptance coefficients, transit tariffs, warehouses
5. OrdersDbsModule — Delivery-by-Seller orders (bulk status ops, metadata, B2B buyer info)
6. FinancesModule — Balance, realization reports, documents, payouts
7. AnalyticsModule — Sales funnel v3, search-query analysis, stock history, CSV exports
8. CommunicationsModule — Chat, product Q&A, reviews (incl. pinned reviews)
9. ReportsModule — Async report generation, incomes/stocks/sales, warehouse-remains downloads
10. PromotionModule — Campaigns, auction bids, budgets, statistics (type 8 deprecated in favor of type 9 — see `docs/guides/migration-v4.md`)
11. TariffsModule — Commission rates, box/pallet storage, return tariffs
12. InStorePickupModule — Click & collect order lifecycle, customer verification, regulated-goods metadata
13. UserManagementModule — Invitations, user listing, access updates, deletion
14. ReturnsModule — Aggregates FBO + FBS + finance returns with partial-failure tolerance

**Location:** `src/modules/[module]/index.ts`

### Tariffs & Supply-Logistics — Extended Architecture

The SDK exposes tariff and supply-logistics data from **two distinct surfaces**, each serving different business purposes. Storage/commission tariffs live in `TariffsModule`, while supply-side acceptance coefficients, transit tariffs, and warehouse listings live in `OrdersFBWModule` (WB-fulfillment logistics).

#### Two Sources of Cost Data

##### 1. TariffsModule (Storage & Commission Tariffs)
**Domain:** `common-api.wildberries.ru`
**Purpose:** Fees for product storage and return operations, plus sales commissions

| Method | Description |
|--------|-------------|
| `getTariffsBox(date)` | Storage tariffs for boxes (per unit/day) |
| `getTariffsPallet(date)` | Storage tariffs for pallets (per unit/day) |
| `getTariffsReturn(date)` | Return processing tariffs |
| `getTariffsCommission()` | Commission rates by category |

**Use Cases:**
- Calculate expected storage costs for inventory planning
- Compare commission rates across product categories
- Budget for return processing fees

##### 2. OrdersFBWModule (Supply-Side Logistics)
**Domain:** `marketplace-api.wildberries.ru` (WB-fulfillment logistics)
**Purpose:** Acceptance coefficients, supply options, transit (cross-dock) tariffs, and warehouse listings for delivering goods to WB warehouses

| Method | Description |
|--------|-------------|
| `getAcceptanceCoefficients(...)` | Acceptance coefficients forecast (14 days) |
| `createAcceptanceOption(goods)` | Available acceptance options for goods |
| `getTransitTariffs()` / transit endpoints | Transit (cross-dock) delivery tariffs |
| `warehouses()` | List of WB warehouses with acceptance info |

**Use Cases:**
- Plan supply deliveries based on acceptance forecasts
- Optimize delivery timing using coefficient predictions
- Calculate cross-dock shipping costs

> Note: Earlier drafts referenced a standalone `SuppliesModule` backed by a `supplies-api.wildberries.ru` domain. That module and domain do not exist in the shipped SDK — supply-logistics operations are part of `OrdersFBWModule`.

#### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      WildberriesSDK                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────┐   ┌───────────────────────────┐ │
│  │      TariffsModule        │   │     OrdersFBWModule       │ │
│  │ (Storage & Commission)    │   │   (Supply-Side Logistics) │ │
│  │                           │   │                           │ │
│  │  • getTariffsBox()        │   │  • getAcceptanceCoeffs()  │ │
│  │  • getTariffsPallet()     │   │  • createAcceptanceOption │ │
│  │  • getTariffsReturn()     │   │  • transit tariffs        │ │
│  │  • getTariffsCommission() │   │  • warehouses()           │ │
│  └─────────────┬─────────────┘   └─────────────┬─────────────┘ │
│                │                               │               │
│                ▼                               ▼               │
│  ┌───────────────────────────┐   ┌───────────────────────────┐ │
│  │  common-api.wildberries.ru│   │marketplace-api.wildberries│ │
│  │  (Tariffs & Settings)     │   │   (WB Supply Logistics)   │ │
│  └───────────────────────────┘   └───────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Business Logic Separation

The split across two modules reflects the WB API's own domain boundaries:

| Aspect | TariffsModule | OrdersFBWModule |
|--------|---------------|-----------------|
| **Focus** | Ongoing storage costs & commissions | One-time supply logistics |
| **Time Frame** | Point-in-time rates | 14-day forecasts |
| **Granularity** | Category-level | Warehouse-level |
| **Update Frequency** | Daily | Hourly |
| **Primary Users** | Finance teams | Logistics teams |

#### Integration Example

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Storage costs (TariffsModule)
const storageTariffs = await sdk.tariffs.getTariffsBox('2024-01-15');
const commissions = await sdk.tariffs.getTariffsCommission();

// Supply planning (OrdersFBWModule)
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
const warehouses = await sdk.ordersFBW.warehouses();
```

### Component 17: Error Classes

**Hierarchy:** A base `WBAPIError` extended by ~16 specialized classes, organized by domain:
- **Core:** `WBAPIError`, `AuthenticationError` (401/403), `RateLimitError` (429), `ValidationError` (400/422), `NetworkError` (timeouts, 5xx)
- **Promotion:** `CampaignNotFoundError`, `InvalidBidError`, `BudgetExceededError`, `InvalidCampaignStateError`, `BidOutOfRangeError`
- **In-store pickup / orders:** `PickupOrderNotFoundError`, `InvalidOrderStateError`, `CustomerVerificationError`, `MetadataValidationError`
- **Marking codes / warehouse:** `MetaValidationFailError`, `WarehouseStocksUpdateBlockError`

**Parse helpers (exported alongside their errors):** `parseBidOutOfRangeDetail`, `parseMetaValidationFail`.

**Location:** `src/errors/`

### Component 18: Type Definitions

**Auto-generated TypeScript interfaces** from OpenAPI schemas
**Location:** `src/types/`

### Component 19: Code Generator

**Build-time tool** for transforming OpenAPI → TypeScript
**Location:** `tools/generate-sdk.ts`

---

## External APIs

This SDK integrates with the Wildberries API across multiple domains (common-api, content-api, marketplace-api, finance-api, statistics-api, seller-analytics-api, advert-api).

### Common Integration Patterns

**Authentication:** All APIs use `Authorization: Bearer {api_key}`
**Rate Limiting:** Per-endpoint limits vary (1 req/10s to 10 req/min)
**Error Responses:** HTTP status codes + JSON error bodies
**Date Formats:** ISO 8601 strings with timezone
**Pagination:** Mix of offset/limit and cursor-based
**Async Operations:** Reports use poll-for-completion pattern

### Wildberries Content API

**Purpose:** Product catalog management
**Base URL:** `https://content-api.wildberries.ru`
**Rate Limits:** STRICT - 1 req/10s for product creation, 3 req/min for categories
**Key Endpoints:** Product CRUD, categories, media upload, pricing, stock

### Wildberries Marketplace API

**Purpose:** Order management (FBS and FBW)
**Base URL:** `https://marketplace-api.wildberries.ru`
**Rate Limits:** 5 req/min for orders, 10 req/min for status updates
**Key Endpoints:** Order retrieval, status updates, shipping labels, returns

### Wildberries Finance API

**Purpose:** Account balance and financial reporting
**Base URL:** `https://finance-api.wildberries.ru`
**Rate Limits:** 10 req/min for balance, 5 req/min for transactions
**Key Endpoints:** Balance, transactions, reports, payouts

### Wildberries Analytics API

**Purpose:** Sales performance analytics
**Base URL:** `https://seller-analytics-api.wildberries.ru`
**Rate Limits:** 5 req/min for queries, 1 req/2min for CSV exports
**Key Endpoints:** Sales funnel, product performance, search queries, CSV exports

### Wildberries Marketplace API — Supply Logistics (OrdersFBWModule)

**Purpose:** WB-fulfillment supply management: acceptance coefficients, transit tariffs, warehouse operations
**Base URL:** `https://marketplace-api.wildberries.ru`
**Key Surfaces (exposed via `sdk.ordersFBW`):**
- Acceptance coefficients (14-day forecast)
- Available acceptance options for goods
- Transit (cross-dock) delivery tariffs
- Warehouse listings with acceptance info

**Relationship to Tariffs API:**
Marketplace supply-logistics complements the Common API tariffs endpoints:
- Common API (`/api/v1/tariffs/*`) → Storage tariffs (boxes, pallets, returns) and commissions
- Marketplace API (acceptance/transit/warehouses) → Supply delivery logistics

### Additional APIs

- **Common API:** General utilities (ping, news, seller info), storage tariffs, user management, in-store pickup, communications
- **Statistics API:** Extended financial/operational statistics and reports
- **Promotion (Advert) API:** Marketing campaigns, auction bids, and advertising
- **Reports API:** Async report generation, incomes/stocks/sales

### SDK Integration Strategy

- BaseClient handles all domains via configurable baseUrls map
- Rate limits extracted from Swagger during code generation
- Retry logic applies uniformly (5xx, 429, network errors)
- Error transformation maps status codes to typed errors
- No external API client libraries required (Axios sufficient)

### ⚠️ API Deprecation History — Type 8 Campaigns

Wildberries deprecated its type 8 (standard bid) campaign methods in favor of type 9 (custom/standard bid) campaigns. The SDK tracked this across releases:

- **v2.4** — The type 8 methods (`getAutoGetnmtoadd`, `createAutoUpdatenm`, `getAutoStatWords`, `createAutoSetExcluded`) were marked `@deprecated`, with migration guidance in `docs/guides/migration-v2.4-promotion-deprecation.md` and `docs/guides/migration-type8-to-type9.md`.
- **v4.0.0 (2026-07-11)** — As a **BREAKING major**, the SDK removed all WB-dead/sunset deprecated surface, including these 7 promotion methods. Each removed symbol is now a compile error pointing at its type 9 replacement. See `docs/guides/migration-v4.md`.

**Reason:** Wildberries transitioned from type 8 (standard bid) campaigns to type 9 campaigns for improved flexibility and control.

**Reference:** [Wildberries Release Notes #429](https://dev.wildberries.ru/en/release-notes?id=429)

---

## Core Workflows

Critical user journeys demonstrating component collaboration.

### Workflow 1: SDK Initialization and First API Call

Shows complete initialization flow demonstrating <30 minute time-to-first-call goal.

**Flow:** Developer creates SDK → Auth validation → Module initialization → Ping endpoint call → Success

### Workflow 2: Product Creation with Rate Limiting and Retry

Demonstrates strict rate limit enforcement (1 req/10s) and retry logic for transient failures.

**Flow:** First request (immediate) → Second request (queued 10s) → Transient 500 error → Retry succeeds

### Workflow 3: Order Fulfillment (FBS) - Happy Path

Multi-step business workflow across multiple endpoints.

**Flow:** Fetch orders → Confirm order → Generate shipping label → Update tracking → Mark shipped

### Workflow 4: Error Handling Flow

How different error scenarios are handled and surfaced.

**Scenarios:**
- Authentication error (401) → AuthenticationError
- Validation error (400) → ValidationError with field errors
- Rate limit error (429) → Automatic retry with delay
- Network timeout → Retry with exponential backoff

### Workflow 5: Async Report Generation

Async operation pattern for long-running reports.

**Flow:** Request report → Poll status (pending/processing) → Download completed report

---

## Source Tree

```
wb-api-sdk/
├── .github/workflows/          # CI/CD pipelines
├── docs/                       # Documentation
│   ├── prd.md
│   ├── architecture.md
│   └── api-reference/          # Generated TypeDoc
├── examples/                   # Usage examples
│   ├── quickstart.ts
│   ├── products-crud.ts
│   └── [module].ts
├── src/                        # TypeScript source
│   ├── index.ts                # Main SDK export
│   ├── client/                 # Core infrastructure
│   │   ├── base-client.ts      # HTTP + auth + typed errors
│   │   ├── rate-limiter.ts     # Token bucket + token multipliers
│   │   └── retry-handler.ts    # Exponential backoff
│   ├── modules/                # 14 public API modules + supplemental 1_0_0
│   │   ├── general/
│   │   ├── products/
│   │   ├── orders-fbs/
│   │   ├── orders-fbw/
│   │   ├── orders-dbs/
│   │   ├── finances/
│   │   ├── analytics/
│   │   ├── communications/
│   │   ├── reports/
│   │   ├── promotion/
│   │   ├── tariffs/
│   │   ├── in-store-pickup/
│   │   ├── user-management/
│   │   ├── returns/            # Aggregator module
│   │   └── 1_0_0/              # Legacy supplemental methods
│   ├── types/                  # Type definitions (GENERATED)
│   │   ├── general.types.ts
│   │   ├── products.types.ts
│   │   └── [module].types.ts
│   ├── errors/                 # ~16 typed error classes + parse helpers
│   │   ├── base-error.ts
│   │   ├── auth-error.ts
│   │   └── [error].ts
│   ├── config/                 # Configuration + per-module rate-limit files
│   └── utils/                  # Shared utility helpers
├── tools/                      # Code generation
│   ├── generate-sdk.ts
│   └── generators/
├── tests/                      # Test suites
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── wildberries_api_doc/        # Source OpenAPI specs
│   ├── 01-general.yaml
│   └── [module].yaml
├── dist/                       # Build output (NOT committed)
│   ├── esm/
│   └── cjs/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

**Key Directories:**
- `src/client/` - Hand-written core infrastructure
- `src/modules/` - Auto-generated API modules
- `src/types/` - Auto-generated TypeScript interfaces
- `tools/` - Build-time code generator (NOT in bundle)
- `wildberries_api_doc/` - Source of truth (DO NOT MODIFY)

---

## Infrastructure and Deployment

### Infrastructure as Code

**Tool:** GitHub Actions (YAML configuration)
**Location:** `.github/workflows/`
**Approach:** Declarative workflow definitions

**N/A for Cloud Infrastructure:** SDK is npm library, not cloud service

### Deployment Strategy

**Strategy:** Continuous Delivery with Tag-Based Releases
**CI/CD Platform:** GitHub Actions

**Workflow:**
1. Developer pushes code → CI pipeline runs (test, lint, build)
2. Developer creates git tag (e.g. v4.1.0) → Release pipeline triggers
3. Release pipeline: Build → Publish to npm → Deploy docs to GitHub Pages → Create GitHub Release

### CI Pipeline

**Triggers:** Push to main, pull requests
**Jobs:**
- Install dependencies
- Lint (ESLint)
- Type check (tsc --noEmit)
- Run tests (unit + integration)
- Generate coverage report
- Build SDK
- Bundle size check
- Matrix test: Node.js ≥ 20 (per `engines`)

**Performance Target:** <5 minutes execution

### Release Pipeline

**Triggers:** Git tag push (v*)
**Jobs:**
- Run full CI pipeline
- Build production bundle (dual ESM/CJS via Vite + `vite-plugin-dts`)
- Publish to npm
- Generate TypeDoc API reference and build the VitePress docs site
- Deploy docs to GitHub Pages
- Create GitHub Release

### Environments

1. **Development:** Local developer workstations
2. **CI:** GitHub Actions runners (Ubuntu)
3. **Production:** npm registry + GitHub Pages

### Rollback Strategy

**Primary Method:** npm deprecation + version pin

**Trigger Conditions:**
- Security vulnerability (CVSS ≥7.0)
- Breaking changes not documented
- Build errors reported by >3 users within 24h
- Bundle size regression >20%

**Recovery Time Objective:** <2 hours

### Secrets Management

**Development:** `.env.local` file (gitignored)
**CI/CD:** GitHub Secrets (NPM_TOKEN, CODECOV_TOKEN)
**Production:** Developer provides API key via SDKConfig

---

## Error Handling Strategy

### General Approach

**Error Model:** Typed Error Hierarchy with Rich Context

**Exception Hierarchy:**
```
Error (native)
  └── WBAPIError (base SDK error)
        ├── AuthenticationError (401, 403)
        ├── RateLimitError (429)
        ├── ValidationError (400, 422)
        ├── NetworkError (timeouts, 5xx)
        ├── CampaignNotFoundError, InvalidBidError,
        │   BudgetExceededError, InvalidCampaignStateError,
        │   BidOutOfRangeError            (promotion)
        ├── PickupOrderNotFoundError, InvalidOrderStateError,
        │   CustomerVerificationError, MetadataValidationError (orders/pickup)
        ├── MetaValidationFailError       (FBS marking codes)
        └── WarehouseStocksUpdateBlockError (406, retryable)
```

**Error Propagation:** Fail-fast with typed exceptions

### Error Class Specifications

**WBAPIError (Base):**
- Properties: message, statusCode, response, requestId
- Method: getUserMessage() - Human-readable with recovery guidance

**AuthenticationError:**
- Thrown on: 401, 403, invalid API key validation
- Recovery: Verify API key, check permissions

**RateLimitError:**
- Thrown on: 429 Too Many Requests
- Property: retryAfter (milliseconds)
- Recovery: SDK automatically retries with delay

**ValidationError:**
- Thrown on: 400, 422 validation failures
- Property: fieldErrors (field → error message map)
- Recovery: Check field-level errors, fix request data

**NetworkError:**
- Thrown on: Timeouts, connection failures, 5xx errors
- Property: cause (original error), isTimeout (boolean)
- Recovery: SDK automatically retries (max 3 attempts)

### Logging Standards

**Library:** Custom lightweight logger (no external dependency)
**Format:** Structured JSON
**Levels:** debug, info, warn, error

**Required Context:**
- Correlation ID (UUID v4 per request)
- Service context (service: 'WildberriesSDK', version)
- User context (module, method, endpoint)

**Logging Rules:**
- ✅ Log: HTTP status, error messages (sanitized), request URLs, correlation IDs
- ❌ NEVER log: API keys, tokens, PII, full request/response bodies

**Default:** warn level in production, debug in development

### Error Handling Patterns

**External API Errors:**
- Retry policy: 429, 500, 502, 503, 504 (max 3 retries)
- Timeout: 30 seconds default
- Error transformation: Axios errors → Typed SDK errors

**Business Logic Errors:**
- Validation errors for client-side failures
- Type errors caught at compile-time

**Developer Guidelines:**
```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof AuthenticationError) { /* Handle auth */ }
  if (error instanceof ValidationError) { /* Handle validation */ }
  if (error instanceof RateLimitError) { /* Already retried */ }
  if (error instanceof NetworkError) { /* Network issue */ }
}
```

---

## Coding Standards

**⚠️ CRITICAL: These standards directly control AI agent behavior**

### Core Standards

**Languages:** TypeScript 5.3.3 with strict mode
**Linting:** ESLint 8.56.0 with @typescript-eslint
**Formatting:** Prettier 3.2.4
**Testing:** Vitest 4.x

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Classes | PascalCase | `BaseClient`, `ProductsModule` |
| Interfaces/Types | PascalCase | `SDKConfig`, `ProductCard` |
| Functions/Methods | camelCase | `createProduct()`, `waitForSlot()` |
| Variables | camelCase | `apiKey`, `retryDelay` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |
| Files | kebab-case | `base-client.ts`, `products.types.ts` |
| Directories | kebab-case | `orders-fbs/`, `in-store-pickup/` |

### Critical Rules (MANDATORY)

1. **Zero `any` Types** - Never use `any` except controlled error handling
2. **All API Responses Use Generated Types** - Never manual type definitions
3. **No Direct Axios Usage in Modules** - Delegate to BaseClient only
4. **All Logging Must Use Logger Utility** - No console.log in src/
5. **Never Hardcode API Base URLs** - Use SDKConfig or OpenAPI servers
6. **All Public Methods Require JSDoc** - With @param, @returns, @throws, @example
7. **Errors Must Be Typed** - Never throw strings or plain objects
8. **Test Files Must Follow AAA Pattern** - Arrange, Act, Assert
9. **No Secrets in Code** - Use configuration or environment variables
10. **Generated Code Must Not Be Manually Modified** - Re-run generator instead

---

## Test Strategy and Standards

### Testing Philosophy

**Approach:** TDD for core infrastructure, test-after for generated modules

**Current state:** The default Vitest config runs **~2,376 tests across 80 test files** (core + modules + integration). TDD red-phase tests live under `tests/tdd/` and are excluded from the default run; execute them separately via `npm run test:tdd` (~39 files). Integration tests use MSW 2 under a jsdom environment.

**Coverage Goals (enforced as thresholds in `vitest.config.ts`):**
- ≥90% for `src/client/` (core infrastructure)
- ≥80% for `src/modules/` (API modules, statements/branches)
- 100% for critical paths (auth, retry, rate limiting)

**Test Pyramid:**
- 70% Unit Tests - Fast, isolated
- 25% Integration Tests - MSW HTTP layer
- 5% E2E Tests - Optional real API validation

### Test Types

**Unit Tests (Vitest):**
- Location: `tests/unit/[component]/`
- Mock all dependencies
- Follow AAA pattern
- Coverage: ≥90% core, ≥80% modules

**Integration Tests (MSW):**
- Location: `tests/integration/`
- MSW intercepts HTTP at network level
- Validate request/response flow
- Test error transformation

**E2E Tests (Optional):**
- Real Wildberries sandbox API
- Manual execution only
- Before major releases

### Test Data Management

**Fixtures:** Static test data from OpenAPI examples
**Factories:** Generate test data with variations
**Cleanup:** N/A (SDK has no state)

### Continuous Testing

**CI Integration:**
- Run unit tests
- Run integration tests
- Generate coverage report
- Validate coverage thresholds (≥90% core, ≥80% modules)
- npm audit for security

**Performance Targets:**
- Unit tests: <2 seconds
- Integration tests: <3 seconds
- Full suite: <5 seconds

---

## Security

**MANDATORY security requirements enforced at all levels**

### Input Validation

**Validation Library:** TypeScript Type System + Runtime Validation
**Location:** API boundary (before HTTP request)

**Rules:**
1. All external inputs validated before API calls
2. Validation at API boundary before processing
3. Whitelist approach preferred

**Example:**
```typescript
if (!data.brandName || data.brandName.trim() === '') {
  throw new ValidationError('brandName is required');
}
```

### Authentication & Authorization

**Auth Method:** Bearer Token (API Key) via HTTP header

**Implementation:**
- API key validated on SDK initialization (`WildberriesSDK` constructor throws `AuthenticationError` if missing/blank)
- `BaseClient` injects the `Authorization: Bearer {key}` header on every request
- `tokenType` (`personal` | `service` | `basic` | `test`) selects rate-limit multipliers; `basic`/`test` warn about reduced limits at construction

**Security:**
- Never log or expose API key
- Fail fast on missing/blank key
- PII-sanitized logging (keys, tokens, and PII are stripped from debug output)

### Secrets Management

**Development:** `.env.local` (gitignored)
**Production:** Environment variables or config management

**Rules:**
1. NEVER hardcode secrets
2. Access via configuration only
3. No secrets in logs or error messages

**Git Pre-Commit Hook:** Detect potential secrets before commit

### API Security

**Rate Limiting:** Token bucket algorithm via RateLimiter
**HTTPS Enforcement:** All requests must use HTTPS (HTTP rejected)
**Security Headers:** `Authorization`, `Content-Type`, `User-Agent`

**MANDATORY:** HTTPS only, no HTTP allowed

### Data Protection

**Encryption at Rest:** N/A (no persistent storage)
**Encryption in Transit:** TLS 1.2+ (HTTPS)

**PII Handling:**
1. Never log PII fields (names, addresses, emails)
2. Pass PII through without modification
3. Exclude PII from error messages

**Logging Restrictions:**
- ❌ NEVER log: API keys, tokens, PII, payment info, full bodies
- ✅ Safe to log: Status codes, error messages (sanitized), URLs, IDs, timestamps

### Dependency Security

**Scanning Tool:** npm audit (built-in)
**Update Policy:**
- Security patches: Apply within 24h
- Minor/patch: Weekly review (Dependabot)
- Major: Quarterly review

**CI Enforcement:**
```bash
npm audit --audit-level=high --production
```

**Lock File:** package-lock.json committed for reproducible builds

### Security Testing

**SAST Tool:** ESLint with security plugins
**DAST Tool:** N/A (library, not service)
**Penetration Testing:** Not required (no attack surface)

**CI Security:**
- ESLint security checks
- npm audit (production dependencies)
- Check for hardcoded secrets

**Vulnerability Disclosure:**
- Channel: GitHub Security Advisories
- Response: <72h critical, <7d high
- Patch: <48h for critical

### Security Checklist

- [ ] Validate all user inputs
- [ ] Never log API keys, tokens, or PII
- [ ] Use HTTPS for all requests
- [ ] Inject auth via BaseClient
- [ ] Sanitize error messages
- [ ] Use TypeScript strict mode
- [ ] Validate file uploads
- [ ] Apply rate limiting
- [ ] Run npm audit
- [ ] Test error scenarios
- [ ] Never hardcode secrets

---

## Status

This architecture is **implemented and shipped** as v4.1.0. The core infrastructure (`BaseClient`, `RateLimiter`, `RetryHandler`), the typed error hierarchy, the code generator, all 14 public modules, and the supplemental `1_0_0` module are live, with ~2,376 tests across 80 files. Backlog.md tracking is complete (223 tasks Done). This document is maintained alongside the code; when the SDK changes, update the facts here rather than treating it as a frozen spec.

**Reference Documents:**
- PRD: `docs/prd.md` - Product requirements
- OpenAPI Specs: `wildberries_api_doc/*.yaml` - API contracts (DO NOT MODIFY)
- CHANGELOG: `CHANGELOG.md` - Version history (source of truth for releases)
- Migration guides: `docs/guides/migration-v4.md`, `docs/guides/migration-v2.4-promotion-deprecation.md`, `docs/guides/migration-type8-to-type9.md`
- CLAUDE.md: `.claude/CLAUDE.md` - Development guidelines

---

**Architecture Status:** ✅ Implemented & Maintained (v4.1.0)
