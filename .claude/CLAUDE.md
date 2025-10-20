# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Wildberries API TypeScript SDK** - Full-featured SDK providing type-safe access to all Wildberries marketplace API methods.

**Core Purpose**: Transform 11 OpenAPI/Swagger specifications into production-ready TypeScript SDK with modular architecture, complete type safety, automatic rate limiting, retry mechanisms, and comprehensive error handling.

**Target Users**: E-commerce developers, ERP/CRM integrators, analytics platform builders working with Wildberries marketplace (100,000+ active sellers).

### Critical Context

- **Source Truth**: `wildberries_api_doc/*.yaml` - 11 OpenAPI 3.0.1 specifications
- **Architecture Reference**: `pre_product.md` - Complete requirements and design decisions
- **Authentication**: Header-based API Key (`HeaderApiKey` security scheme)
- **Multi-Domain**: Different base URLs per API category (common-api, content-api, marketplace-api, seller-analytics-api, finance-api, statistics-api)
- **Rate Limits**: Variable limits per API category, requiring intelligent rate limiting implementation

---

## 🚨 MANDATORY: Context7 MCP Server Usage

**CRITICAL REQUIREMENT**: Before planning or writing ANY code in this project, you MUST use Context7 MCP server to retrieve up-to-date documentation and best practices.

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
// Use mcp__context7__get-library-docs with the resolved ID
get-library-docs({
  context7CompatibleLibraryID: "/microsoft/TypeScript",
  topic: "utility types and generics",
  tokens: 5000
})

get-library-docs({
  context7CompatibleLibraryID: "/vitest-dev/vitest",
  topic: "mocking and testing async code",
  tokens: 5000
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

### Module Mapping (Swagger → SDK)

| Priority | Swagger File | Module Name | Domain | Key Features |
|----------|--------------|-------------|---------|--------------|
| CRITICAL | `02-products.yaml` | `products` | content-api | Categories, product cards, media, pricing, warehouse, stock |
| CRITICAL | `03-orders-fbs.yaml` | `ordersFBS` | marketplace-api | Seller warehouse fulfillment, order status, shipping |
| CRITICAL | `13-finances.yaml` | `finances` | finance-api/statistics-api | Balance, financial reports, transactions, payouts |
| HIGH | `01-general.yaml` | `general` | common-api | Ping, news, seller info, auth utilities |
| HIGH | `07-orders-fbw.yaml` | `ordersFBW` | marketplace-api | WB warehouse fulfillment |
| HIGH | `09-communications.yaml` | `communications` | - | Customer chat, Q&A, reviews |
| HIGH | `11-analytics.yaml` | `analytics` | seller-analytics-api | Sales funnel, search queries, stock history, CSV reports |
| HIGH | `12-reports.yaml` | `reports` | - | Report generation and retrieval |
| MEDIUM | `08-promotion.yaml` | `promotion` | - | Campaigns, promo codes, advertising |
| MEDIUM | `10-tariffs.yaml` | `tariffs` | - | Tariff info, commission rates |
| MEDIUM | `06-in-store-pickup.yaml` | `inStorePickup` | - | Pickup point management |

### Implementation Priority Order

1. **Foundation First**: `general` module (authentication, connectivity testing)
2. **Core Business**: `products`, `ordersFBS`, `finances` (parallel development possible)
3. **Extended Operations**: `ordersFBW`, `communications`, `analytics`, `reports`
4. **Supporting Features**: `promotion`, `tariffs`, `inStorePickup`

---

## Project Structure (Target)

```
wb-api-sdk/
├── src/
│   ├── client/                 # Core infrastructure
│   │   ├── base-client.ts     # HTTP client with retry & timeout
│   │   ├── rate-limiter.ts    # Per-endpoint rate limit enforcement
│   │   ├── retry-handler.ts   # Exponential backoff retry logic
│   │   └── auth-manager.ts    # API key management & validation
│   │
│   ├── modules/               # Generated from Swagger (11 modules)
│   │   ├── general/
│   │   ├── products/
│   │   ├── orders-fbs/
│   │   ├── orders-fbw/
│   │   ├── promotion/
│   │   ├── communications/
│   │   ├── analytics/
│   │   ├── reports/
│   │   ├── finances/
│   │   ├── tariffs/
│   │   └── in-store-pickup/
│   │
│   ├── types/                 # Generated TypeScript types
│   │   ├── general.types.ts
│   │   ├── products.types.ts
│   │   └── [module].types.ts
│   │
│   ├── errors/                # Custom error hierarchy
│   │   ├── base-error.ts      # WBAPIError
│   │   ├── auth-error.ts      # AuthenticationError
│   │   ├── rate-limit-error.ts
│   │   ├── validation-error.ts
│   │   └── network-error.ts
│   │
│   ├── utils/                 # Shared utilities
│   ├── config.ts              # SDKConfig interface
│   └── index.ts               # Main SDK export
│
├── tools/                     # Build & code generation
│   └── generate-sdk.ts        # Swagger → TypeScript generator
│
├── tests/                     # Test suites
│   ├── unit/                  # Unit tests per module
│   ├── integration/           # Integration tests with MSW
│   └── fixtures/              # Mock data from Swagger examples
│
├── examples/                  # Usage examples per module
├── docs/                      # Generated TypeDoc
└── wildberries_api_doc/       # Source Swagger files (DO NOT MODIFY)
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
class OrdersFBSModule { ... }           // Match camelCase in main SDK

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
      'https://content-api.wildberries.ru/content/v2/object/parent/all'
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

```typescript
// src/config.ts
export interface SDKConfig {
  apiKey: string;                                    // Required
  baseUrls?: Partial<Record<APIModule, string>>;   // Override per module
  timeout?: number;                                 // Default: 30000ms
  retryConfig?: {
    maxRetries?: number;                           // Default: 3
    retryDelay?: number;                           // Default: 1000ms
    exponentialBackoff?: boolean;                  // Default: true
  };
  rateLimitConfig?: {
    requestsPerSecond?: number;                    // Global limit
    requestsPerMinute?: number;                    // Global limit
  };
  logLevel?: 'debug' | 'info' | 'warn' | 'error'; // Default: 'warn'
}

// src/index.ts - Main SDK class
export class WildberriesSDK {
  public readonly general: GeneralModule;
  public readonly products: ProductsModule;
  public readonly ordersFBS: OrdersFBSModule;
  public readonly ordersFBW: OrdersFBWModule;
  public readonly finances: FinancesModule;
  public readonly analytics: AnalyticsModule;
  public readonly reports: ReportsModule;
  public readonly communications: CommunicationsModule;
  public readonly promotion: PromotionModule;
  public readonly tariffs: TariffsModule;
  public readonly inStorePickup: InStorePickupModule;

  constructor(config: SDKConfig) {
    const client = new BaseClient(config);

    this.general = new GeneralModule(client);
    this.products = new ProductsModule(client);
    // ... initialize all modules
  }
}
```

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

**Solution Pattern**:
```typescript
// src/client/rate-limiter.ts
class RateLimiter {
  private limits = new Map<string, {
    requestsPerMinute: number;
    intervalSeconds: number;
    burstLimit: number;
  }>();

  async waitForSlot(key: string): Promise<void> {
    // Token bucket or sliding window algorithm
    // Extract limits from Swagger 'description' fields
  }
}
```

**Extract from Swagger**:
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

**Solution**: Extract from Swagger `servers` field per path:
```typescript
// Auto-detect from: paths['/api/v1/balance'].servers[0].url
const domainMap = {
  general: 'https://common-api.wildberries.ru',
  products: 'https://content-api.wildberries.ru',
  analytics: 'https://seller-analytics-api.wildberries.ru',
  finances: 'https://finance-api.wildberries.ru',
  // Some modules have multiple domains per operation
};
```

### 3. Error Handling Hierarchy

```typescript
// src/errors/base-error.ts
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

// src/errors/rate-limit-error.ts
export class RateLimitError extends WBAPIError {
  constructor(
    message: string,
    public readonly retryAfter: number // milliseconds
  ) {
    super(message, 429);
  }
}

// Usage in BaseClient
catch (error) {
  if (error.response?.status === 429) {
    const retryAfter = parseRetryAfter(error.response.headers);
    throw new RateLimitError('Rate limit exceeded', retryAfter);
  }
  if (error.response?.status === 401) {
    throw new AuthenticationError('Invalid API key');
  }
  // ... handle other status codes
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

        // Don't retry on auth errors or validation errors
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

// Run for all 11 Swagger files
const swaggerFiles = [
  '01-general.yaml',
  '02-products.yaml',
  '03-orders-fbs.yaml',
  '06-in-store-pickup.yaml',
  '07-orders-fbw.yaml',
  '08-promotion.yaml',
  '09-communications.yaml',
  '10-tariffs.yaml',
  '11-analytics.yaml',
  '12-reports.yaml',
  '13-finances.yaml'
];

swaggerFiles.forEach(file =>
  generateFromSwagger(`wildberries_api_doc/${file}`)
);
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

## Testing Strategy

**⚠️ BEFORE writing tests, query Context7 for:**
- `/vitest-dev/vitest` - "mocking, async testing, describe/it patterns"
- `/mswjs/msw` - "mock service worker setup, request handlers"
- `/microsoft/TypeScript` - "type testing, generic constraints in tests"

### Unit Tests (Vitest)

**Context7 Reference**: Query `/vitest-dev/vitest` for mocking and testing patterns before implementation.

**Per-module structure**:
```typescript
// tests/unit/modules/products.test.ts
import { describe, it, expect, vi } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import { BaseClient } from '../../../src/client/base-client';

describe('ProductsModule', () => {
  const mockClient = {
    get: vi.fn(),
    post: vi.fn(),
  } as unknown as BaseClient;

  const products = new ProductsModule(mockClient);

  it('should fetch parent categories', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Electronics' }] };
    mockClient.get.mockResolvedValue(mockResponse);

    const result = await products.getParentCategories();

    expect(mockClient.get).toHaveBeenCalledWith(
      'https://content-api.wildberries.ru/content/v2/object/parent/all'
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle rate limit errors', async () => {
    mockClient.post.mockRejectedValue(new RateLimitError('Limited', 5000));

    await expect(products.createProduct({ ... }))
      .rejects
      .toThrow(RateLimitError);
  });
});
```

### Integration Tests (MSW - Mock Service Worker)

**Context7 Reference**: Query `/mswjs/msw` for "setupServer, http handlers, request mocking" patterns.

```typescript
// tests/integration/products.integration.test.ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';

const server = setupServer(
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      data: [{ id: 1, name: 'Electronics' }]
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Products Integration', () => {
  it('should successfully fetch categories', async () => {
    const sdk = new WildberriesSDK({ apiKey: 'test-key' });
    const categories = await sdk.products.getParentCategories();

    expect(categories.data).toHaveLength(1);
    expect(categories.data[0].name).toBe('Electronics');
  });
});
```

### Coverage Requirements

- **Critical Paths**: ≥80% coverage (products, orders, finances)
- **Core Infrastructure**: ≥90% coverage (BaseClient, RateLimiter, RetryHandler)
- **Generated Modules**: Focus on integration tests over line coverage

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

```json
// typedoc.json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "plugin": ["typedoc-plugin-markdown"],
  "excludePrivate": true,
  "excludeProtected": true,
  "readme": "README.md"
}
```

Generate with: `npx typedoc`

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies (when package.json exists)
npm install

# Generate SDK from Swagger files
npm run generate

# Build TypeScript
npm run build

# Run tests
npm test

# Type check
npm run type-check

# Lint
npm run lint
```

### Code Generation Workflow

```bash
# Generate all modules from Swagger
npm run generate

# Generate specific module
npm run generate:products

# Validate generated types
npm run type-check

# Update if Swagger files change
npm run generate && npm run type-check && npm test
```

### Testing Workflow

```bash
# Run all tests
npm test

# Run specific module tests
npm test products

# Run with coverage
npm run test:coverage

# Run integration tests only
npm run test:integration

# Watch mode during development
npm run test:watch
```

### Release Process

```bash
# Version bump
npm version patch|minor|major

# Build production bundle
npm run build

# Publish to npm
npm publish

# Tag release in git
git push --tags
```

---

## Quality Standards

### TypeScript Configuration

```json
// tsconfig.json (strict mode required)
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist"
  }
}
```

### Performance Budgets

- **SDK Overhead**: <200ms per operation
- **Bundle Size**: <100KB gzipped (core SDK without modules)
- **Memory**: Minimal footprint, no memory leaks
- **Type Generation**: <30s for all 11 modules

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
- **Documentation**: Comprehensive JSDoc + TypeDoc

### 4. Reliability

- **Retry on Transient Errors**: Network issues, 5xx errors
- **No Retry on Permanent Errors**: 4xx errors except 429
- **Rate Limit Compliance**: Automatic enforcement
- **Graceful Degradation**: Meaningful errors when API unavailable

### 5. Extensibility

- **Module Independence**: Each module can be used standalone
- **Custom Configuration**: Override defaults per use case
- **Interceptors**: Support for request/response middleware
- **Event Hooks**: Allow logging, monitoring, debugging

---

## Swagger-Specific Implementation Notes

### Authentication Extraction

All endpoints use:
```yaml
security:
  - HeaderApiKey: []
```

Implement as:
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

Parse `servers[0].url` per path, fall back to module default.

### Rate Limit Parsing

Extract from `description` field:
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

### ❌ DON'T

- Hardcode base URLs (extract from Swagger)
- Ignore rate limits (causes API blocks)
- Suppress errors silently
- Use callbacks (async/await only)
- Modify Swagger files in `wildberries_api_doc/`
- Mix generated and manual code in same file
- Skip type generation (manual types get outdated)
- Commit API keys or tokens

---

## Future Extensibility Points

### Model Context Protocol (MCP) Server

Potential integration to expose SDK via MCP for AI agents:

```typescript
// Future: src/mcp/server.ts
import { WildberriesSDK } from '../index';

export class WildberriesMCPServer {
  constructor(private sdk: WildberriesSDK) {}

  async handleToolCall(tool: string, args: any) {
    // Map MCP tool calls to SDK methods
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
wb-cli analytics sales --from 2024-01-01 --to 2024-12-31
```

### Webhook Support

```typescript
// Future: Event-driven architecture
class WebhookHandler {
  onOrderCreated(callback: (order: Order) => void);
  onProductUpdated(callback: (product: Product) => void);
}
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
- [ ] All endpoints implemented with correct HTTP method
- [ ] Rate limits extracted and enforced
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

**Last Updated**: 2024-10-19
**SDK Version Target**: 1.0.0
**OpenAPI Version**: 3.0.1
