# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Wildberries API TypeScript SDK** — Production-ready, full-featured SDK providing type-safe access to all Wildberries marketplace API methods.

- **Package**: `daytona-wildberries-typescript-sdk`
- **Version**: **4.1.0** (production-ready; 223 Backlog.md tasks completed, board cleared)
- **Module**: ESM (`"type": "module"`), Node **≥20**, dual ESM/CJS build via Vite
- **License**: Personal Use (`SEE LICENSE IN LICENSE`)
- **Repo**: `github.com/salacoste/daytona-wildberries-typescript-sdk`
- **Docs site**: `salacoste.github.io/daytona-wildberries-typescript-sdk` (VitePress + TypeDoc, bilingual EN/RU)

**Core Purpose**: Transform the Wildberries OpenAPI 3.0.1 specifications into a production-ready TypeScript SDK with modular architecture, complete type safety, automatic per-endpoint rate limiting, retry mechanisms, typed error hierarchy, and an aggregator module for unified return analytics.

**Target Users**: E-commerce developers, ERP/CRM integrators, analytics platform builders working with the Wildberries marketplace (100,000+ active sellers).

### Critical Context

- **Source Truth**: `wildberries_api_doc/*.yaml` — **14 OpenAPI 3.0.1 specification files** (DO NOT MODIFY). The SDK historically *leads* WB announcements rather than trailing them.
- **Authentication**: Header-based API Key (`Authorization: Bearer <apiKey>`, `HeaderApiKey` security scheme), injected automatically by `BaseClient`.
- **Multi-Domain**: Different base URLs per API category — `common-api`, `content-api`, `marketplace-api`, `finance-api`, `statistics-api`, `seller-analytics-api`, `advert-api`.
- **Rate Limits**: Variable limits per API category AND per token type (`personal` / `service` / `basic` / `test`); enforced by a token-bucket `RateLimiter`.

---

## 🚨 MANDATORY: Context7 MCP Server Usage

> **This is an active project policy.** It is enforced regardless of SDK maturity. Do not gut this section.

**CRITICAL REQUIREMENT**: Before planning or writing ANY code in this project, you MUST use the Context7 MCP server to retrieve up-to-date documentation and best practices.

### When to Use Context7 (ALWAYS)

**Before ANY of these activities:**
1. **TypeScript Development**: Type definitions, interfaces, generics, utility types
2. **OpenAPI/Swagger Processing**: Schema parsing, code generation patterns, type mapping
3. **HTTP Client Implementation**: Axios, fetch, retry logic, interceptors
4. **Testing Strategy**: Vitest configuration, MSW setup, test patterns
5. **Error Handling**: Custom error classes, error hierarchies, TypeScript error patterns
6. **Rate Limiting**: Implementation algorithms, token bucket, sliding window
7. **SDK Architecture**: Module patterns, dependency injection, configuration management
8. **Documentation**: JSDoc standards, TypeDoc configuration, API documentation

### How to Use Context7 MCP Server

**Step 1: Resolve Library ID**
```typescript
// Use mcp__context7__resolve-library-id to find the correct library
// Example:
resolve-library-id("typescript")
resolve-library-id("vitest")
resolve-library-id("axios")
resolve-library-id("openapi-typescript")
```

**Step 2: Get Library Documentation**
```typescript
// Use mcp__context7__query-docs with the resolved ID
query-docs({
  libraryId: "/microsoft/TypeScript",
  query: "utility types and generics",
})

query-docs({
  libraryId: "/vitest-dev/vitest",
  query: "mocking and testing async code",
})
```

### Context7 Integration Points

| Development Phase | Required Context7 Queries |
|------------------|---------------------------|
| **Type Generation** | TypeScript utility types, type narrowing, conditional types |
| **HTTP Client** | Axios interceptors, retry mechanisms, timeout handling |
| **Testing** | Vitest mocking patterns, MSW server setup, async testing |
| **Error Handling** | TypeScript error types, custom error classes, error boundaries |
| **Rate Limiting** | Algorithm implementations, async queue patterns |
| **Documentation** | JSDoc best practices, TypeDoc configuration, markdown generation |

### MCP Server Configuration

**Location**: `.mcp.json` and `.claude/mcp.json`

**Available MCP Servers**:
- `context7`: Documentation lookup (MANDATORY for all development)

**Additional Resources**:
- Setup guide: `.claude/MCP_SETUP.md`
- Usage patterns: `.claude/CONTEXT7_USAGE.md`

### Workflow Example

```markdown
BEFORE writing code:
1. Identify the libraries/frameworks needed (e.g., TypeScript, Vitest, Axios)
2. Use Context7 to retrieve latest patterns and best practices
3. Review the documentation for breaking changes or new features
4. Implement following the retrieved patterns
5. Reference Context7 docs in code comments when using advanced patterns

EXAMPLE:
Task: Implement retry logic with exponential backoff
→ Query Context7 for: axios retry interceptors, exponential backoff patterns
→ Review retrieved documentation
→ Implement based on official patterns
→ Add JSDoc referencing the pattern source
```

### Non-Negotiable Rules

❌ **NEVER** write code based on assumptions or outdated knowledge
❌ **NEVER** implement patterns without checking Context7 first
❌ **NEVER** skip Context7 lookup for "simple" tasks

✅ **ALWAYS** query Context7 before implementing ANY feature
✅ **ALWAYS** use latest patterns from official documentation
✅ **ALWAYS** reference Context7 sources in comments for complex patterns

### Performance Note

Context7 queries are fast (<2s) and prevent:
- Hours debugging outdated patterns
- Type errors from incorrect TypeScript usage
- Breaking changes from API mismatches
- Test failures from wrong mocking patterns

**Time investment**: 2 seconds per query
**Time saved**: Hours of debugging and refactoring

---

## API Modules Architecture

The SDK exposes **14 public modules** on the `WildberriesSDK` instance (`sdk.*`), plus one supplemental internal module (`src/modules/1_0_0/`). Approximate public method counts are verified from `src/modules/*/index.ts`.

### Module Mapping (Swagger → SDK)

| # | `sdk.*` property | Module class | Domain | Methods (~) | Key Features |
|---|---|---|---|---|---|
| 1 | `sdk.general` | `GeneralModule` | common-api | 10 | Ping, server time, news, seller info, auth utilities |
| 2 | `sdk.products` | `ProductsModule` | content-api | 51 | Categories, product cards, characteristics, media, pricing, warehouse, stock |
| 3 | `sdk.ordersFBS` | `OrdersFbsModule` | marketplace-api | 35 | Seller-warehouse (FBS) fulfillment, order status, shipping, marking codes |
| 4 | `sdk.ordersFBW` | `OrdersFbwModule` | marketplace-api | 12 | WB-warehouse (FBO/FBW) supply, acceptance coefficients, transit tariffs |
| 5 | `sdk.ordersDBS` | `OrdersDbsModule` | marketplace-api | 20 | Delivery-by-Seller orders, bulk status ops, B2B, marking metadata |
| 6 | `sdk.finances` | `FinancesModule` | finance-api / statistics-api | 11 | Balance, realization reports, documents (list/download) |
| 7 | `sdk.analytics` | `AnalyticsModule` | seller-analytics-api | 19 | Sales funnel v3, search queries, stock history, CSV reports, item rating v2 |
| 8 | `sdk.communications` | `CommunicationsModule` | common-api | 25 | Customer chat, product Q&A, reviews, pinned reviews |
| 9 | `sdk.reports` | `ReportsModule` | statistics-api | 25 | Incomes, stocks, sales/returns, excise, async warehouse-remains reports |
| 10 | `sdk.promotion` | `PromotionModule` | advert-api | 45 | Campaigns, auction/manual bids, budgets, statistics |
| 11 | `sdk.tariffs` | `TariffsModule` | — | 5 | Commission rates, box/pallet storage, return tariffs, acceptance coefficients |
| 12 | `sdk.inStorePickup` | `InStorePickupModule` | — (click & collect) | 18 | Pickup order lifecycle, customer verification, SGTIN/UIN/IMEI/GTIN metadata |
| 13 | `sdk.userManagement` | `UserManagementModule` | common-api | 4 | Invitations, user listing, access rights, deletion |
| 14 | `sdk.returns` | `ReturnsModule` | aggregator (since v3.10.0) | 3 | Unified FBO+FBS+Finance return analytics, partial-failure tolerant |

**Total: 283 public methods across the 14 modules.**

**Supplemental module (NOT a public `sdk.*` property):** `src/modules/1_0_0/` — 5 legacy methods (`getContentTags`, `getAdvAdvert`, `createAdvFullstat`, `getAdvFullstats`, `getCalendarPromotions`) retained for backward compatibility.

**Domain base URLs in use:** `common-api`, `content-api`, `marketplace-api`, `finance-api`, `statistics-api`, `seller-analytics-api`, `advert-api`.

> **Known doc gap:** `docs/modules/` has 13 pages — there is **no `user-management.md`** page (user-management was added later). Do not invent one unless explicitly tasked.

### Implementation Notes

- The SDK historically *leads* WB announcements: source-spec drift may exist where the SDK already reflects a WB news item not yet present in the local YAML.
- v4.0.0 was a **BREAKING major** that removed all WB-dead/sunset deprecated surface (7 promotion methods, 12 in-store-pickup shims, v5 finance report, orders-dbs meta, etc.). Each removed symbol is a compile error pointing at its replacement → see `docs/guides/migration-v4.md`.

---

## Project Structure (actual `src/`)

```
daytona-wildberries-typescript-sdk/
├── src/
│   ├── client/                       # Core infrastructure
│   │   ├── base-client.ts            # Axios HTTP client: auth, timeout, typed error transformation, PII-sanitized logging
│   │   ├── rate-limiter.ts           # Per-endpoint token-bucket rate limiter (basic/test multipliers)
│   │   ├── retry-handler.ts          # Exponential backoff (retries net/5xx/429; NOT 401/403/422)
│   │   └── index.ts
│   │
│   ├── modules/                      # 14 public modules + 1 supplemental
│   │   ├── general/  products/  orders-fbs/  orders-fbw/  orders-dbs/
│   │   ├── finances/  analytics/  communications/  reports/
│   │   ├── promotion/  tariffs/  in-store-pickup/
│   │   ├── user-management/          # Seller-profile user/access management
│   │   ├── returns/                  # Aggregator (reports + ordersFBS + finances), since v3.10.0
│   │   ├── 1_0_0/                    # Supplemental legacy methods (internal)
│   │   └── index.ts
│   │
│   ├── types/                        # Generated TypeScript types (one file per module)
│   │   ├── general.types.ts  products.types.ts  orders-fbs.types.ts
│   │   ├── orders-fbw.types.ts  orders-dbs.types.ts  finances.types.ts
│   │   ├── analytics.types.ts  communications.types.ts  reports.types.ts
│   │   ├── promotion.types.ts  tariffs.types.ts  in-store-pickup.types.ts
│   │   ├── user-management.types.ts  returns.types.ts
│   │   └── (communications.types.ts.backup — local artifact, not shipped)
│   │
│   ├── errors/                       # Typed error hierarchy (~16 classes)
│   │   ├── base-error.ts             # WBAPIError (base)
│   │   ├── auth-error.ts             # AuthenticationError
│   │   ├── rate-limit-error.ts       # RateLimitError
│   │   ├── validation-error.ts       # ValidationError
│   │   ├── network-error.ts          # NetworkError
│   │   ├── promotion-errors.ts       # CampaignNotFound/InvalidBid/BudgetExceeded/InvalidCampaignState
│   │   ├── bid-out-of-range-error.ts # BidOutOfRangeError + parseBidOutOfRangeDetail
│   │   ├── in-store-pickup-errors.ts # PickupOrderNotFound/InvalidOrderState/CustomerVerification/MetadataValidation
│   │   ├── meta-validation-fail-error.ts    # MetaValidationFailError + parseMetaValidationFail
│   │   ├── warehouse-stocks-update-block-error.ts # 406 WarehouseStocksUpdateBlockError
│   │   └── index.ts
│   │
│   ├── utils/                        # Exported utility helpers
│   │   ├── calculateSupplyCost.ts  compareTariffs.ts  parseMoneyAmount.ts
│   │   ├── validateRequiredCharacteristics.ts  validateMergedCardVariants.ts
│   │   ├── classifyReturnReason.ts  enrichReturnsWithType.ts
│   │   ├── reconcileBuyoutsAndReturns.ts  classifyFbsReturnCategory.ts
│   │   ├── bid-validation.ts        # validateBid, clampBid, extractBidRange
│   │   ├── roas.ts                  # computeROAS
│   │   ├── deprecation.ts           # warnOnce, resetDeprecationWarnings
│   │   ├── parseMetaValidationFail.ts
│   │   └── index.ts
│   │
│   ├── config/                       # Configuration & rate-limit registry
│   │   ├── sdk-config.ts             # SDKConfig + RequestOptions (authoritative shape)
│   │   ├── rate-limits.ts            # ALL_RATE_LIMITS aggregate
│   │   ├── operation-metadata.ts     # x-readonly-method / x-category from Swagger
│   │   ├── index.ts
│   │   └── *-rate-limits.ts          # One per module (general, products, orders-fbs/fbw/dbs,
│   │                                 #   user-management, finances, promotion, tariffs,
│   │                                 #   in-store-pickup, analytics, communications, reports, 1_0_0)
│   │
│   └── index.ts                      # Main SDK entry: WildberriesSDK + all exports
│
├── tools/                            # Build & code generation
│   └── generate-sdk.ts               # Swagger → TypeScript generator
│
├── tests/                            # Vitest 4 + @vitest/coverage-v8 + MSW 2 (jsdom)
│   ├── unit/                         # Unit tests per module (~2,376 tests / 80 files)
│   ├── integration/                  # Integration tests with MSW
│   ├── tdd/                          # TDD specs (run via npm run test:tdd)
│   └── fixtures/                     # Mock data from Swagger examples
│
├── examples/                         # Usage examples per module
├── docs/                             # VitePress site + TypeDoc API reference
└── wildberries_api_doc/              # 14 source Swagger files (DO NOT MODIFY)
```

---

## TypeScript Architecture & Conventions

### Type Generation Strategy

**From Swagger schemas → TypeScript interfaces**:
- Parse `components/schemas` from each YAML
- Generate interfaces with JSDoc from `description` fields
- Handle nested objects, arrays, enums, unions
- Preserve optional properties (`required` array in schema)
- Generate request/response type pairs per endpoint

**Naming Conventions**:
```typescript
// Types from schemas
interface ProductCard { ... }           // PascalCase from schema name
interface CreateProductRequest { ... }  // [Operation][Schema]Request
interface ProductListResponse { ... }   // [Schema]Response

// Module classes
class ProductsModule { ... }            // [Module]Module
class OrdersFbsModule { ... }           // Match camelCase property on the SDK instance

// Error classes
class WBAPIError extends Error { ... }  // WB prefix for Wildberries
class RateLimitError extends WBAPIError { ... }

// Enums from API
enum OrderStatus {                      // PascalCase
  NEW = 'new',                         // SCREAMING_SNAKE = 'api_value'
  CONFIRMED = 'confirmed'
}
```

### Module Implementation Pattern

Each module follows this structure:

```typescript
// src/modules/products/index.ts
import { BaseClient } from '../../client/base-client';
import type {
  GetCategoriesResponse,
  CreateProductRequest,
  CreateProductResponse
} from '../../types/products.types';

export class ProductsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get all parent categories for product creation
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki}
   * @returns List of parent categories (e.g., Electronics, Household chemicals)
   */
  async getParentCategories(): Promise<GetCategoriesResponse> {
    return this.client.get<GetCategoriesResponse>(
      'https://content-api.wildberries.ru/content/v2/object/parent/all',
      { rateLimitKey: 'products.getParentAll' }
    );
  }

  /**
   * Create new product card
   * Rate limit: 1 request per 10 seconds
   */
  async createProduct(data: CreateProductRequest): Promise<CreateProductResponse> {
    return this.client.post<CreateProductResponse>(
      'https://content-api.wildberries.ru/content/v2/cards',
      data,
      { rateLimitKey: 'products.create' }
    );
  }
}
```

### Configuration & Initialization

The authoritative config shape lives in `src/config/sdk-config.ts` (`SDKConfig` and `RequestOptions`).

```typescript
// src/config/sdk-config.ts
export interface SDKConfig {
  apiKey: string;                                       // Required — injected as `Authorization: Bearer <apiKey>`
  baseUrls?: Partial<Record<string, string>>;           // Per-module base URL overrides (e.g. for testing)
  timeout?: number;                                     // Default: 30000 (ms)
  retryConfig?: {
    maxRetries?: number;                               // Default: 3
    retryDelay?: number;                               // Default: 1000 (ms)
    exponentialBackoff?: boolean;                      // Default: true
  };
  rateLimitConfig?: {
    requestsPerSecond?: number;                        // Global limit
    requestsPerMinute?: number;                        // Global limit
  };
  logLevel?: 'debug' | 'info' | 'warn' | 'error';      // Default: 'warn'
  tokenType?: 'personal' | 'service' | 'basic' | 'test'; // Default: 'personal'
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  rateLimitKey?: string;        // Format: `module.method`
  timeout?: number;             // Per-request timeout override
  responseType?: 'json' | 'blob' | 'text' | 'arraybuffer' | 'document' | 'stream';
}
```

> **`tokenType` (since 2026-03-30):** `basic` and `test` tokens get **reduced rate limits** (enforced via `applyBasicTokenMultipliers` in the `RateLimiter`). The SDK constructor emits a one-time `console.warn` for these token types. See [WB news/281](https://dev.wildberries.ru/news/281).

```typescript
// src/index.ts — main SDK class (14 public module properties)
export class WildberriesSDK {
  public readonly general: GeneralModule;
  public readonly products: ProductsModule;
  public readonly ordersFBS: OrdersFbsModule;
  public readonly ordersFBW: OrdersFbwModule;
  public readonly ordersDBS: OrdersDbsModule;
  public readonly finances: FinancesModule;
  public readonly analytics: AnalyticsModule;
  public readonly communications: CommunicationsModule;
  public readonly reports: ReportsModule;
  public readonly promotion: PromotionModule;
  public readonly tariffs: TariffsModule;
  public readonly inStorePickup: InStorePickupModule;
  public readonly userManagement: UserManagementModule;
  public readonly returns: ReturnsModule;           // initialized last — depends on reports/ordersFBS/finances

  constructor(config: SDKConfig) { /* ... */ }
}
```

### BaseClient Method Signatures

```
get<T>(url, options?: RequestOptions): Promise<T>
post<T>(url, data?, options?: RequestOptions): Promise<T>
put<T>(url, data?, options?: RequestOptions): Promise<T>
patch<T>(url, data?, options?: RequestOptions): Promise<T>
delete<T>(url, data?, options?: RequestOptions): Promise<T>
```

- GET: 2 args (url, options with `params` + `rateLimitKey`)
- POST/PUT/PATCH/DELETE: 3 args (url, data, options with `rateLimitKey`)
- `BaseClient` injects `Authorization`, applies per-request `timeout`/`responseType`, and transforms errors into the typed hierarchy (including RFC 7807 `problem+json`, `BidOutOfRange`, and 406 `WarehouseStocksUpdateBlock`).

---

## Core Infrastructure

### BaseClient (`src/client/base-client.ts`)
Axios-based. Injects `Authorization: Bearer <apiKey>`; configurable timeout; **typed error transformation** (RFC 7807 `problem+json`, `BidOutOfRange`, 406 `WarehouseStocksUpdateBlock`); PII-sanitized debug logging. All modules receive it via dependency injection.

### RateLimiter (`src/client/rate-limiter.ts`)
Per-endpoint **token-bucket**; limits extracted from Swagger `description` fields into per-module `src/config/*-rate-limits.ts` files (merged into `ALL_RATE_LIMITS`). `RateLimitConfig = { requestsPerMinute, intervalSeconds?, burstLimit?, penaltyMultiplier? }`. Keys MUST exactly match the `rateLimitKey` values used in module methods. Multipliers are applied for `basic`/`test` tokens via `applyBasicTokenMultipliers`.

### RetryHandler (`src/client/retry-handler.ts`)
Exponential backoff. **Retries**: network errors, 5xx, 429. **Does NOT retry**: 401, 403, 422.

---

## Errors (exported from `src/index.ts`)

~16 classes plus parse helpers:

- `WBAPIError` (base, `src/errors/base-error.ts`)
- `AuthenticationError`, `RateLimitError`, `ValidationError`, `NetworkError`
- `CampaignNotFoundError`, `InvalidBidError`, `BudgetExceededError`, `InvalidCampaignStateError` (promotion)
- `BidOutOfRangeError` (+ `parseBidOutOfRangeDetail`)
- `PickupOrderNotFoundError`, `InvalidOrderStateError`, `CustomerVerificationError`, `MetadataValidationError` (in-store-pickup)
- `MetaValidationFailError` (+ `parseMetaValidationFail`) — FBS marking-code validation
- `WarehouseStocksUpdateBlockError` — 406 WB warehouse maintenance (stocks PUT retryable)

```typescript
// Base error shape
export class WBAPIError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Rate-limit error carries retry-after
export class RateLimitError extends WBAPIError {
  constructor(message: string, public readonly retryAfter: number) {
    super(message, 429);
  }
}
```

---

## Utility Helpers (exported from `src/index.ts`)

All helpers are exported from the main entry (`./utils`):

- **Supply/tariffs**: `calculateSupplyCost`, `compareTariffs`, `parseMoneyAmount`
- **Product validation**: `validateRequiredCharacteristics`, `validateMergedCardVariants`
- **Returns analytics**: `classifyReturnReason`, `enrichReturnsWithType`, `reconcileBuyoutsAndReturns`, `classifyFbsReturnCategory`
- **Bidding/promotion**: `validateBid`, `clampBid`, `extractBidRange`, `computeROAS`
- **Deprecation**: `warnOnce`, `resetDeprecationWarnings`
- **FBS marking**: `parseMetaValidationFail`

The **`returns` aggregator module** (`sdk.returns`) unifies FBO + FBS + Finance return data: it fetches FBO returns via `sdk.reports.getAnalyticsGoodsReturn()`, enriches them with financial amounts from `sdk.finances.getSalesReportsDetailed()`, and is **partial-failure tolerant** (one source failing does not abort the response — see `result.partialFailures` and `result._meta.sources`).

---

## Critical Implementation Requirements

### 0. Context7 Documentation Lookup (MANDATORY FIRST STEP)

**Challenge**: Implementing SDK features with outdated patterns or incorrect TypeScript usage leads to bugs, type errors, and hours of debugging.

**Solution**: ALWAYS use Context7 MCP server BEFORE implementing any feature.

**Required Context7 Queries by Feature**:

```typescript
// Rate Limiting Implementation
→ Query: "axios interceptors rate limiting"
→ Query: "token bucket algorithm typescript"
→ Library: /axios/axios

// Type Generation from OpenAPI
→ Query: "openapi typescript code generation"
→ Query: "typescript utility types mapped types"
→ Library: /microsoft/TypeScript

// HTTP Client with Retry Logic
→ Query: "axios retry exponential backoff"
→ Query: "axios interceptors error handling"
→ Library: /axios/axios

// Testing Setup
→ Query: "vitest mocking async functions"
→ Query: "msw server setup integration tests"
→ Library: /vitest-dev/vitest
→ Library: /mswjs/msw

// Error Handling
→ Query: "typescript custom error classes"
→ Query: "error handling async await patterns"
→ Library: /microsoft/TypeScript
```

**Enforcement**:
- ❌ Code reviews will REJECT implementations without Context7 documentation references
- ✅ All complex patterns MUST include JSDoc comment with Context7 source
- ✅ PRs MUST reference Context7 queries used during implementation

**Example Implementation with Context7**:
```typescript
/**
 * Implements exponential backoff retry logic for failed HTTP requests.
 *
 * Pattern based on Context7 documentation:
 * @see Context7: /axios/axios - "Retry interceptors with exponential backoff"
 * @see Context7: /microsoft/TypeScript - "Generic retry function types"
 */
export class RetryHandler {
  // Implementation following Context7 patterns...
}
```

### 1. Rate Limiting

**Challenge**: Each endpoint has unique rate limits (e.g., "3 requests per minute with 20s intervals").

**Solution Pattern** (implemented in `src/client/rate-limiter.ts`):
```typescript
class RateLimiter {
  private limits = new Map<string, RateLimitConfig>();
  // RateLimitConfig = { requestsPerMinute, intervalSeconds?, burstLimit?, penaltyMultiplier? }

  async waitForSlot(key: string): Promise<void> {
    // Token-bucket algorithm; limits sourced from src/config/*-rate-limits.ts
    // applyBasicTokenMultipliers() reduces capacity for basic/test tokens
  }
}
```

**Extract from Swagger** (rate limits live in the `description` field):
```yaml
description: |
  <div class="description_limit">
  Лимит запросов на один аккаунт продавца:
  | Период | Лимит | Интервал | Всплеск |
  | 1 минута | 3 запроса | 20 секунд | 3 запроса |
  </div>
```

### 2. Multi-Domain Base URLs

**Challenge**: Different modules use different base URLs.

**Solution**: Each method encodes its full URL (extracted from Swagger `servers`), with per-module overrides via `SDKConfig.baseUrls`:
```typescript
const domainMap = {
  general: 'https://common-api.wildberries.ru',
  products: 'https://content-api.wildberries.ru',
  analytics: 'https://seller-analytics-api.wildberries.ru',
  finances: 'https://finance-api.wildberries.ru',
  statistics: 'https://statistics-api.wildberries.ru',
  marketplace: 'https://marketplace-api.wildberries.ru',
  advert: 'https://advert-api.wildberries.ru',
};
```

### 3. Error Handling Hierarchy

See the [Errors](#errors-exported-from-srcindexts) section above for the full exported list. In `BaseClient`:

```typescript
catch (error) {
  if (error.response?.status === 429) {
    const retryAfter = parseRetryAfter(error.response.headers);
    throw new RateLimitError('Rate limit exceeded', retryAfter);
  }
  if (error.response?.status === 401) {
    throw new AuthenticationError('Invalid API key');
  }
  // ... RFC 7807 problem+json, BidOutOfRange, 406 WarehouseStocksUpdateBlock, etc.
}
```

### 4. Retry Logic with Exponential Backoff

```typescript
// src/client/retry-handler.ts
export class RetryHandler {
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        // Don't retry on auth errors (401/403) or validation errors (422)
        if (error instanceof AuthenticationError ||
            error instanceof ValidationError) {
          throw error;
        }

        if (attempt < config.maxRetries) {
          const delay = config.exponentialBackoff
            ? config.retryDelay * Math.pow(2, attempt)
            : config.retryDelay;

          await sleep(delay);
        }
      }
    }

    throw lastError;
  }
}
```

---

## Code Generation Workflow

**⚠️ BEFORE starting code generation, query Context7 for:**
- `/microsoft/TypeScript` - "mapped types, utility types, conditional types"
- `/drwpow/openapi-typescript` - "openapi typescript generation patterns"
- `/js-yaml/js-yaml` - "yaml parsing best practices"

### 1. Swagger Parsing

```typescript
// tools/generate-sdk.ts
import { parse } from 'yaml';
import { readFileSync, writeFileSync } from 'fs';
import { generateTypes, generateModule } from './generators';

/**
 * Generate SDK code from Swagger/OpenAPI specification
 *
 * CONTEXT7 REFERENCES:
 * - TypeScript type generation: /microsoft/TypeScript
 * - OpenAPI parsing: /drwpow/openapi-typescript
 * - YAML parsing: /js-yaml/js-yaml
 */
async function generateFromSwagger(swaggerPath: string) {
  const swagger = parse(readFileSync(swaggerPath, 'utf8'));
  const moduleName = swagger.info['x-file-name'] ||
                     swagger.info.version;

  // 1. Generate types from schemas
  const types = generateTypes(swagger.components?.schemas || {}, moduleName);
  writeFileSync(`src/types/${moduleName}.types.ts`, types);

  // 2. Generate module class with methods
  const module = generateModule(swagger.paths, moduleName);
  writeFileSync(`src/modules/${moduleName}/index.ts`, module);

  // 3. Extract rate limits for configuration
  const rateLimits = extractRateLimits(swagger.paths);
  appendToConfig(rateLimits, moduleName);
}

// The source spec directory contains 14 OpenAPI files under wildberries_api_doc/.
// Run the generator per-file via: npm run generate[:types-only|:general]
```

### 2. Type Generation Details

**Handle OpenAPI types → TypeScript**:
```typescript
function mapOpenAPIType(schema: any): string {
  if (schema.type === 'string') {
    if (schema.enum) return schema.enum.map(v => `'${v}'`).join(' | ');
    if (schema.format === 'date-time') return 'string'; // or Date if parsing
    return 'string';
  }
  if (schema.type === 'integer' || schema.type === 'number') return 'number';
  if (schema.type === 'boolean') return 'boolean';
  if (schema.type === 'array') return `${mapOpenAPIType(schema.items)}[]`;
  if (schema.type === 'object') return generateInterface(schema);
  if (schema.$ref) return resolveRef(schema.$ref);
  return 'unknown';
}
```

### 3. Method Generation Pattern

```typescript
function generateMethod(path: string, method: string, operation: any) {
  const methodName = operation.operationId || generateMethodName(path, method);
  const params = extractParameters(operation.parameters);
  const requestType = extractRequestBodyType(operation.requestBody);
  const responseType = extractResponseType(operation.responses['200']);

  return `
  /**
   * ${operation.summary}
   * ${operation.description || ''}
   * @see {@link https://dev.wildberries.ru${operation.externalDocs?.url || ''}}
   */
  async ${methodName}(${params}${requestType ? `, data: ${requestType}` : ''}): Promise<${responseType}> {
    return this.client.${method}<${responseType}>(
      '${getFullUrl(path, operation)}',
      ${requestType ? 'data' : ''}
    );
  }
  `;
}
```

---

## Build, Exports & Tests

### Build & Exports

- **Build tooling:** Vite (dual **ESM/CJS**) + `vite-plugin-dts`; TypeDoc API reference + VitePress site.
- **Main entry:** `./dist/cjs/index.cjs` (CJS) / `./dist/esm/index.js` (ESM); types from `./dist/esm/index.d.ts`.
- **Subpath exports** (so module types import without clashing with global `Error`/`Date`):
  - `.` (root)
  - `./finances`, `./analytics`, `./communications`, `./reports`
- Modules without subpath exports (`products`, `orders-fbs`, `orders-fbw`, `orders-dbs`, `promotion`, `tariffs`, `in-store-pickup`, `general`, `user-management`) currently have no public type-only import path — tracked as **WL-4**.

### Tests

- **Framework:** Vitest 4 + `@vitest/coverage-v8`; **MSW 2** for integration (jsdom/happy-dom).
- **Scale:** ~**2,376 tests across 80 test files** in the default config; TDD specs (~39 files) run separately via `npm run test:tdd`.
- **Coverage thresholds:** ≥90% core infrastructure (`src/client/`); ≥80% modules.

### npm scripts (highlights)

| Purpose | Command |
|---|---|
| Build | `npm run build` (Vite) |
| Type check | `npm run type-check` (`tsc --noEmit`) |
| Tests | `npm test` (`vitest run`) |
| Coverage | `npm run test:coverage` |
| TDD specs | `npm run test:tdd` |
| Integration | `npm run test:integration` |
| Lint / format | `npm run lint` / `npm run format` |
| Generate SDK | `npm run generate` (or `:types-only` / `:general`) |
| Docs | `npm run docs` (TypeDoc) / `npm run docs:dev` (VitePress) |

---

## Documentation Standards

### JSDoc Requirements

**All public methods must include**:
```typescript
/**
 * Brief one-line summary (matches Swagger `summary`)
 *
 * Detailed description from Swagger `description` field.
 * Include rate limit information if present.
 *
 * @param {ParamType} paramName - Parameter description
 * @returns {Promise<ReturnType>} Description of return value
 * @throws {RateLimitError} When rate limit exceeded
 * @throws {AuthenticationError} When API key invalid
 * @throws {ValidationError} When request data invalid
 *
 * @see {@link https://dev.wildberries.ru/...} - Official API documentation
 *
 * @example
 * ```typescript
 * const categories = await sdk.products.getParentCategories();
 * console.log(categories.data);
 * ```
 */
```

### TypeDoc Configuration

Generate with: `npm run docs` (TypeDoc) or `npm run docs:build` (TypeDoc + VitePress). Entry point is `src/index.ts`; output is the API reference under `docs/api/`.

---

## Development Workflow

### Initial Setup

```bash
npm install
npm run generate      # (re)generate from Swagger if specs changed
npm run build         # Vite build (ESM + CJS + dts)
npm test              # vitest run
npm run type-check    # tsc --noEmit
npm run lint
```

### Code Generation Workflow

```bash
npm run generate            # Generate all modules from Swagger
npm run generate:types      # Types only
npm run generate:general    # Single module
npm run type-check          # Validate generated types
npm run generate && npm run type-check && npm test   # Full loop after spec changes
```

### Testing Workflow

```bash
npm test                # Default suite (~2,376 tests / 80 files)
npm run test:coverage   # With coverage (≥90% client, ≥80% modules)
npm run test:tdd        # TDD specs (separate config)
npm run test:integration
npm run test:watch
```

### Release Process

```bash
npm version patch|minor|major   # Version bump
npm run build                   # Production build
npm publish                     # Publish (manual)
git push --tags
```

> See `RELEASE_NOTES_v1.0.md` and `CHANGELOG.md` (source of truth for version history) for release conventions.

---

## Quality Standards

### Performance Budgets

- **SDK Overhead**: <200ms per operation
- **Bundle Size**: <100KB gzipped (core SDK without modules)
- **Memory**: Minimal footprint, no memory leaks
- **Type Generation**: <30s for all 14 modules

### Error Messages (User-Friendly)

```typescript
// Bad
throw new Error('Invalid request');

// Good
throw new ValidationError(
  'Product creation failed: Missing required field "brandName". ' +
  'Please provide a valid brand name for the product.',
  { field: 'brandName', received: undefined }
);
```

---

## Key Design Principles

### 1. Type Safety First
- Generate types directly from Swagger schemas
- No `any` types except in controlled error handling
- Strict TypeScript mode enforced
- Runtime validation for critical inputs

### 2. Separation of Concerns
- **BaseClient**: HTTP operations, auth, error handling
- **RateLimiter**: Rate limit enforcement (isolated)
- **RetryHandler**: Retry logic (isolated)
- **Modules**: Business logic only, delegate to BaseClient
- **Types**: Pure interfaces, no logic

### 3. Developer Experience
- **Autocomplete**: Full IDE support via TypeScript
- **Error Messages**: Clear, actionable, with context
- **Examples**: Working code for every module
- **Documentation**: Comprehensive JSDoc + TypeDoc + VitePress site

### 4. Reliability
- **Retry on Transient Errors**: Network issues, 5xx errors, 429
- **No Retry on Permanent Errors**: 401/403/422
- **Rate Limit Compliance**: Automatic per-endpoint enforcement (with token-type multipliers)
- **Graceful Degradation**: Meaningful errors when API unavailable (e.g., `returns` aggregator partial-failure tolerance)

### 5. Extensibility
- **Module Independence**: Each module can be used standalone
- **Custom Configuration**: Override base URLs / timeouts per use case
- **Aggregation**: Cross-module helpers (`returns`, `reconcileBuyoutsAndReturns`, `computeROAS`) compose module outputs

---

## Swagger-Specific Implementation Notes

### Authentication Extraction

All endpoints use:
```yaml
security:
  - HeaderApiKey: []
```

Implemented in `BaseClient` as:
```typescript
headers: {
  'Authorization': `Bearer ${this.config.apiKey}`
}
```

### Base URL Extraction

```yaml
paths:
  /api/v1/balance:
    servers:
      - url: https://finance-api.wildberries.ru
```

`BaseClient` uses the full URL encoded per method; `SDKConfig.baseUrls` provides per-module overrides.

### Rate Limit Parsing

Extract from the `description` field into per-module `src/config/*-rate-limits.ts`:
```typescript
const rateLimitRegex = /Период[\s|]*Лимит[\s|]*Интервал[\s|]*Всплеск[\s|]*\n[\s|]*---[\s|]*---[\s|]*---[\s|]*---[\s|]*\n[\s|]*(\d+)\s+(\w+)[\s|]*(\d+)\s+(\w+)/;

function parseRateLimit(description: string): RateLimitConfig {
  const match = description.match(rateLimitRegex);
  if (!match) return null;

  return {
    period: `${match[1]} ${match[2]}`,    // "1 минута"
    limit: parseInt(match[3]),            // 3
    interval: `${match[4]}`,              // "20 секунд"
  };
}
```

### Response Schema Handling

```yaml
responses:
  '200':
    description: Успешно
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ProductResponse'
```

Resolve `$ref` to component schema, generate interface.

### Examples for Testing

```yaml
examples:
  SuccessResponse:
    value:
      data: [{ id: 1, name: 'Test' }]
```

Extract and use in integration test fixtures.

---

## Common Patterns & Anti-Patterns

### ✅ DO
- Use generated types for all request/response data
- Implement retry logic for network errors
- Validate API key format before first request
- Cache rate limit state per endpoint
- Provide clear error messages with recovery suggestions
- Use async/await consistently
- Export all error classes from main index
- Document rate limits in method JSDoc
- Add a `rateLimitKey` to every module method
- Reset static deprecation-warning flags in tests (`beforeEach`)

### ❌ DON'T
- Hardcode base URLs (extract from Swagger)
- Ignore rate limits (causes API blocks)
- Suppress errors silently
- Use callbacks (async/await only)
- Modify Swagger files in `wildberries_api_doc/`
- Mix generated and manual code in the same file
- Skip type generation (manual types get outdated)
- Commit API keys or tokens
- Pass `undefined` as a body to PATCH/DELETE assertions expecting `expect.anything()` (use `{}` instead)

---

## Testing Notes & Gotchas

- **Static deprecation flags in tests:** warn-once static fields (e.g. `_coefficientsDeprecationWarned`) must be reset in `beforeEach`. Add `eslint-disable @typescript-eslint/no-explicit-any` and set `(ModuleClass as any)._flag = false`.
- **`expect.anything()` does NOT match `undefined`/`null`:** for PATCH/DELETE methods with an empty body, pass `{}` rather than `undefined`.
- **TDD test execution:** `tests/tdd/**` is excluded from the default vitest config — run via `npm run test:tdd`.
- **Interfaces are erased at runtime:** `Object.keys(types)` cannot see TypeScript interfaces; verify structurally with `import type` + mock objects instead.

---

## Future Extensibility Points

### Model Context Protocol (MCP) Server

Potential integration to expose the SDK via MCP for AI agents (not yet shipped):

```typescript
// Future: src/mcp/server.ts
import { WildberriesSDK } from '../index';

export class WildberriesMCPServer {
  constructor(private sdk: WildberriesSDK) {}

  async handleToolCall(tool: string, args: any) {
    switch(tool) {
      case 'get_products':
        return await this.sdk.products.getProductList(args);
      // ... other tools
    }
  }
}
```

### CLI Tool

```bash
# Future: Command-line interface
wb-cli products list --limit 10
wb-cli orders status --id 123456
wb-cli analytics sales --from 2026-01-01 --to 2026-12-31
```

---

## Reference Links

- **Wildberries API Documentation**: https://dev.wildberries.ru/
- **OpenAPI 3.0.1 Specification**: https://swagger.io/specification/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Vitest Documentation**: https://vitest.dev/
- **MSW Documentation**: https://mswjs.io/

---

## Critical Implementation Checklist

Before marking any module complete:

- [ ] Types generated from Swagger schemas
- [ ] All endpoints implemented with the correct HTTP method
- [ ] Rate limits extracted into `src/config/*-rate-limits.ts` and enforced (`rateLimitKey` on every method)
- [ ] Retry logic implemented for transient errors
- [ ] Error handling with typed error classes
- [ ] JSDoc comments with examples
- [ ] Unit tests for all methods
- [ ] Integration tests with MSW
- [ ] Example usage in `examples/` directory
- [ ] TypeDoc documentation generated
- [ ] No TypeScript errors in strict mode
- [ ] Bundle size within budget (<100KB gzipped)

---

**Last Updated**: 2026-08-09
**SDK Version**: 4.1.0
**OpenAPI Version**: 3.0.1
**Status**: Production-ready · 14 public modules · 223 Backlog.md tasks done
