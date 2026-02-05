---
title: Testing Guide
description: Testing strategies for SDK applications - unit tests, integration tests, E2E tests, mocking, and CI/CD integration
layout: doc
---

# Testing Guide

Comprehensive guide to testing applications built with the Wildberries TypeScript SDK.

## Table of Contents

- [Overview](#overview)
- [Testing Strategy](#testing-strategy)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Mocking Strategies](#mocking-strategies)
- [Test Data Management](#test-data-management)
- [Performance Testing](#performance-testing)
- [CI/CD Integration](#cicd-integration)

## Overview

Testing is crucial for building reliable applications with the Wildberries SDK. This guide covers testing strategies, tools, and best practices for different testing scenarios.

### Testing Pyramid

```
        /\
       /  \  E2E Tests (Few)
      /    \
     /------\
    / Integ. \ Integration Tests (Some)
   /----------\
  /    Unit    \ Unit Tests (Many)
 /--------------\
```

## Testing Strategy

### Test Coverage Targets

| Test Type | Coverage | Purpose |
|-----------|----------|---------|
| Unit Tests | 80%+ | Individual function testing |
| Integration Tests | 70%+ | SDK module testing |
| E2E Tests | Critical paths | Full workflow validation |

### Tools & Frameworks

- **Test Runner**: Vitest
- **Mocking**: MSW (Mock Service Worker)
- **Assertions**: Vitest expect
- **Coverage**: @vitest/coverage-v8

## Unit Testing

### Basic Unit Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

describe('WildberriesSDK', () => {
  it('should initialize with API key', () => {
    const sdk = new WildberriesSDK({
      apiKey: 'test-api-key'
    });

    expect(sdk).toBeDefined();
    expect(sdk.products).toBeDefined();
    expect(sdk.ordersFBS).toBeDefined();
  });

  it('should throw error without API key', () => {
    expect(() => {
      new WildberriesSDK({
        apiKey: ''
      });
    }).toThrow('API key is required');
  });
});
```

### Testing SDK Methods

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductsModule } from 'daytona-wildberries-typescript-sdk';
import type { BaseClient } from 'daytona-wildberries-typescript-sdk/client';

describe('ProductsModule', () => {
  let mockClient: BaseClient;
  let products: ProductsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as unknown as BaseClient;

    products = new ProductsModule(mockClient);
  });

  it('should fetch product list', async () => {
    const mockResponse = {
      cursor: { total: 100, limit: 10 },
      data: [{ nmId: 12345, vendorCode: 'TEST-001' }]
    };

    mockClient.get = vi.fn().mockResolvedValue(mockResponse);

    const result = await products.getProductList({ limit: 10 });

    expect(mockClient.get).toHaveBeenCalledWith(
      expect.stringContaining('/content/v2/get/cards/list'),
      expect.objectContaining({ params: { limit: 10 } })
    );

    expect(result).toEqual(mockResponse);
    expect(result.data).toHaveLength(1);
  });

  it('should handle API errors gracefully', async () => {
    mockClient.get = vi.fn().mockRejectedValue(
      new Error('Network error')
    );

    await expect(
      products.getProductList({ limit: 10 })
    ).rejects.toThrow('Network error');
  });
});
```

### Testing Error Handling

```typescript
import { describe, it, expect } from 'vitest';
import {
  AuthenticationError,
  RateLimitError,
  ValidationError
} from 'daytona-wildberries-typescript-sdk/errors';

describe('Error Handling', () => {
  it('should throw AuthenticationError for 401', async () => {
    mockClient.get = vi.fn().mockRejectedValue(
      new AuthenticationError('Invalid API key')
    );

    await expect(
      sdk.products.getProductList({ limit: 10 })
    ).rejects.toThrow(AuthenticationError);
  });

  it('should throw RateLimitError for 429', async () => {
    mockClient.get = vi.fn().mockRejectedValue(
      new RateLimitError('Rate limit exceeded', 5000)
    );

    await expect(
      sdk.products.getProductList({ limit: 10 })
    ).rejects.toThrow(RateLimitError);
  });

  it('should throw ValidationError for invalid input', async () => {
    await expect(
      sdk.products.getProductCard(-1)
    ).rejects.toThrow(ValidationError);
  });
});
```

## Integration Testing

### MSW Setup

```typescript
// tests/setup/msw.ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  // Products API
  http.get('https://content-api.wildberries.ru/content/v2/get/cards/list', () => {
    return HttpResponse.json({
      cursor: { total: 1, limit: 10 },
      data: [
        {
          nmId: 12345,
          vendorCode: 'TEST-001',
          title: 'Test Product'
        }
      ]
    });
  }),

  // Finances API
  http.get('https://finance-api.wildberries.ru/api/v1/balance', () => {
    return HttpResponse.json({
      balance: 100000,
      currency: 'RUB'
    });
  })
);

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
```

### Integration Test Example

```typescript
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import { server } from './setup/msw';

describe('Products Integration Tests', () => {
  let sdk: WildberriesSDK;

  beforeAll(() => {
    sdk = new WildberriesSDK({
      apiKey: 'test-api-key'
    });
  });

  it('should fetch product list from API', async () => {
    const products = await sdk.products.getProductList({ limit: 10 });

    expect(products.data).toBeDefined();
    expect(products.data).toHaveLength(1);
    expect(products.data[0].nmId).toBe(12345);
  });

  it('should handle rate limiting', async () => {
    // Override handler for this test
    server.use(
      http.get(
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        () => {
          return new HttpResponse(null, {
            status: 429,
            headers: {
              'Retry-After': '60'
            }
          });
        }
      )
    );

    await expect(
      sdk.products.getProductList({ limit: 10 })
    ).rejects.toThrow('Rate limit exceeded');
  });

  it('should retry on network errors', async () => {
    let attemptCount = 0;

    server.use(
      http.get(
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        () => {
          attemptCount++;

          if (attemptCount < 3) {
            return new HttpResponse(null, { status: 500 });
          }

          return HttpResponse.json({
            cursor: { total: 1, limit: 10 },
            data: [{ nmId: 12345 }]
          });
        }
      )
    );

    const result = await sdk.products.getProductList({ limit: 10 });

    expect(attemptCount).toBe(3);
    expect(result.data).toHaveLength(1);
  });
});
```

### Testing Async Operations

```typescript
describe('Async Operations', () => {
  it('should handle report generation workflow', async () => {
    // Step 1: Generate report
    server.use(
      http.post(
        'https://statistics-api.wildberries.ru/api/v1/reports/generate',
        () => {
          return HttpResponse.json({
            taskId: 'task-123',
            status: 'processing'
          });
        }
      )
    );

    const task = await sdk.reports.generateReport('sales', {
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31'
    });

    expect(task.taskId).toBe('task-123');

    // Step 2: Poll for completion
    server.use(
      http.get(
        'https://statistics-api.wildberries.ru/api/v1/reports/task-123/status',
        () => {
          return HttpResponse.json({
            taskId: 'task-123',
            status: 'completed',
            downloadUrl: 'https://example.com/report.csv'
          });
        }
      )
    );

    const status = await sdk.reports.getReportStatus('task-123');
    expect(status.status).toBe('completed');

    // Step 3: Download report
    server.use(
      http.get(
        'https://example.com/report.csv',
        () => {
          return new HttpResponse('SKU,Sales,Revenue\nTEST-001,10,1000');
        }
      )
    );

    const report = await sdk.reports.downloadReport('task-123');
    expect(report).toContain('SKU,Sales,Revenue');
  });
});
```

## End-to-End Testing

### E2E Test Setup

```typescript
// tests/e2e/setup.ts
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

export async function setupE2ETest() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_TEST_API_KEY!
  });

  // Create test data
  const testProduct = await sdk.products.createCardsUpload({
    vendorCode: `TEST-${Date.now()}`,
    title: 'E2E Test Product',
    // ... other fields
  });

  return {
    sdk,
    testProduct,
    cleanup: async () => {
      // Clean up test data
      await sdk.products.createDeleteTrash(testProduct.nmId);
    }
  };
}
```

### Complete Workflow Test

```typescript
describe('Complete Product Lifecycle E2E', () => {
  let sdk: WildberriesSDK;
  let testProductId: number;

  beforeAll(async () => {
    sdk = new WildberriesSDK({
      apiKey: process.env.WB_TEST_API_KEY!
    });
  });

  it('should complete full product lifecycle', async () => {
    // 1. Create product
    const product = await sdk.products.createCardsUpload({
      vendorCode: `TEST-${Date.now()}`,
      title: 'E2E Test Product',
      // ... other fields
    });

    testProductId = product.nmId;
    expect(product.nmId).toBeDefined();

    // 2. Update pricing
    await sdk.products.updatePricing([{
      nmId: testProductId,
      price: 1000
    }]);

    // 3. Update stock
    await sdk.products.updateStock([{
      sku: product.vendorCode,
      amount: 100,
      warehouseId: 123
    }]);

    // 4. Fetch updated product
    const updated = await sdk.products.getProductCard(testProductId);
    expect(updated.nmId).toBe(testProductId);

    // 5. Delete product
    await sdk.products.createDeleteTrash(testProductId);
  });

  afterAll(async () => {
    // Cleanup any remaining test data
    if (testProductId) {
      try {
        await sdk.products.createDeleteTrash(testProductId);
      } catch (error) {
        // Product already deleted
      }
    }
  });
});
```

## Mocking Strategies

### Manual Mocking

```typescript
// tests/mocks/sdk.ts
export function createMockSDK() {
  return {
    products: {
      getProductList: vi.fn().mockResolvedValue({
        data: [{ nmId: 12345 }]
      }),
      getProductCard: vi.fn(),
      createProduct: vi.fn(),
    },
    ordersFBS: {
      getOrders: vi.fn().mockResolvedValue({
        orders: []
      }),
    },
    finances: {
      getBalance: vi.fn().mockResolvedValue({
        balance: 100000
      }),
    },
  };
}

// Usage
const mockSDK = createMockSDK();
const service = new ProductService(mockSDK);
await service.syncProducts();

expect(mockSDK.products.getProductList).toHaveBeenCalled();
```

### Partial Mocking

```typescript
import { vi } from 'vitest';
import * as sdk from 'daytona-wildberries-typescript-sdk';

vi.mock('daytona-wildberries-typescript-sdk', async () => {
  const actual = await vi.importActual('daytona-wildberries-typescript-sdk');

  return {
    ...actual,
    WildberriesSDK: vi.fn(() => ({
      products: {
        getProductList: vi.fn().mockResolvedValue({
          data: [{ nmId: 12345 }]
        })
      }
    }))
  };
});
```

## Test Data Management

### Test Data Factory

```typescript
// tests/factories/product.factory.ts
export class ProductFactory {
  static createProduct(overrides = {}) {
    return {
      nmId: 12345,
      vendorCode: 'TEST-001',
      title: 'Test Product',
      description: 'Test Description',
      brand: 'Test Brand',
      ...overrides
    };
  }

  static createProducts(count: number) {
    return Array.from({ length: count }, (_, i) =>
      this.createProduct({ nmId: 12345 + i })
    );
  }
}

// Usage
const product = ProductFactory.createProduct({ title: 'Custom Title' });
const products = ProductFactory.createProducts(10);
```

### Test Data Cleanup

```typescript
class TestDataManager {
  private createdResources: Array<{
    type: string;
    id: number;
  }> = [];

  async track(type: string, id: number) {
    this.createdResources.push({ type, id });
  }

  async cleanup(sdk: WildberriesSDK) {
    for (const resource of this.createdResources) {
      try {
        switch (resource.type) {
          case 'product':
            await sdk.products.createDeleteTrash(resource.id);
            break;
          case 'order':
            // Cancel order if possible
            break;
        }
      } catch (error) {
        console.warn(`Failed to cleanup ${resource.type}:${resource.id}`);
      }
    }

    this.createdResources = [];
  }
}
```

## Performance Testing

### Load Testing

```typescript
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  it('should handle 100 concurrent requests', async () => {
    const start = performance.now();

    const requests = Array.from({ length: 100 }, () =>
      sdk.products.getProductList({ limit: 10 })
    );

    await Promise.all(requests);

    const duration = performance.now() - start;

    expect(duration).toBeLessThan(5000); // 5 seconds
  });

  it('should maintain SDK overhead < 200ms', async () => {
    const times: number[] = [];

    for (let i = 0; i < 10; i++) {
      const start = performance.now();
      await sdk.products.getProductList({ limit: 1 });
      times.push(performance.now() - start);
    }

    const avg = times.reduce((a, b) => a + b) / times.length;
    expect(avg).toBeLessThan(200);
  });
});
```

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x, 22.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Generate coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

### Test Scripts

```json
// package.json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:unit": "vitest run tests/unit",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "vitest run tests/e2e"
  }
}
```

## Best Practices

### ✅ Do

- Write tests for all public API methods
- Use MSW for mocking HTTP requests
- Test error scenarios
- Clean up test data after tests
- Use factories for test data
- Run tests in CI/CD pipeline
- Maintain 80%+ test coverage
- Test retry and rate limiting logic

### ❌ Don't

- Test implementation details
- Use real API keys in tests
- Skip cleanup after tests
- Commit test data to repository
- Use sleep() in tests (use proper waiting)
- Test third-party library internals
- Ignore failing tests
- Use production API in tests

## Related Documentation

- [Best Practices Guide](./best-practices.md)
- [Configuration Guide](./configuration.md)
- [Troubleshooting Guide](./troubleshooting.md)
- [Examples](../../examples/)

## Support

For testing questions:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)
