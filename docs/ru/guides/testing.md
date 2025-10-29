---
title: Руководство по тестированию
description: Стратегии тестирования для приложений на SDK - юнит-тесты, интеграционные тесты, E2E тесты, моки и интеграция CI/CD
layout: doc
---

# Руководство по тестированию

Комплексное руководство по тестированию приложений, построенных с Wildberries TypeScript SDK.

## Содержание

- [Обзор](#обзор)
- [Стратегия тестирования](#стратегия-тестирования)
- [Юнит-тестирование](#юнит-тестирование)
- [Интеграционное тестирование](#интеграционное-тестирование)
- [End-to-End тестирование](#end-to-end-тестирование)
- [Стратегии мокирования](#стратегии-мокирования)
- [Управление тестовыми данными](#управление-тестовыми-данными)
- [Тестирование производительности](#тестирование-производительности)
- [Интеграция CI/CD](#интеграция-cicd)

## Обзор

Тестирование критично для создания надежных приложений с Wildberries SDK. Это руководство охватывает стратегии тестирования, инструменты и лучшие практики для различных сценариев тестирования.

### Пирамида тестирования

```
        /\
       /  \  E2E тесты (Мало)
      /    \
     /------\
    / Интег. \ Интеграционные тесты (Средне)
   /----------\
  /   Юнит    \ Юнит-тесты (Много)
 /--------------\
```

## Стратегия тестирования

### Целевые показатели покрытия

| Тип теста | Покрытие | Цель |
|-----------|----------|------|
| Юнит-тесты | 80%+ | Тестирование отдельных функций |
| Интеграционные тесты | 70%+ | Тестирование модулей SDK |
| E2E тесты | Критические пути | Валидация полного workflow |

### Инструменты и фреймворки

- **Test Runner**: Vitest
- **Мокирование**: MSW (Mock Service Worker)
- **Ассерты**: Vitest expect
- **Покрытие**: @vitest/coverage-v8

## Юнит-тестирование

### Базовый юнит-тест

```typescript
import { describe, it, expect, vi } from 'vitest';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

describe('WildberriesSDK', () => {
  it('должен инициализироваться с API ключом', () => {
    const sdk = new WildberriesSDK({
      apiKey: 'test-api-key'
    });

    expect(sdk).toBeDefined();
    expect(sdk.products).toBeDefined();
    expect(sdk.ordersFBS).toBeDefined();
  });

  it('должен выбрасывать ошибку без API ключа', () => {
    expect(() => {
      new WildberriesSDK({
        apiKey: ''
      });
    }).toThrow('API key is required');
  });
});
```

### Тестирование методов SDK

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

  it('должен получать список товаров', async () => {
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

  it('должен корректно обрабатывать ошибки API', async () => {
    mockClient.get = vi.fn().mockRejectedValue(
      new Error('Network error')
    );

    await expect(
      products.getProductList({ limit: 10 })
    ).rejects.toThrow('Network error');
  });
});
```

### Тестирование обработки ошибок

```typescript
import { describe, it, expect } from 'vitest';
import {
  AuthenticationError,
  RateLimitError,
  ValidationError
} from 'daytona-wildberries-typescript-sdk/errors';

describe('Обработка ошибок', () => {
  it('должен выбрасывать AuthenticationError для 401', async () => {
    mockClient.get = vi.fn().mockRejectedValue(
      new AuthenticationError('Invalid API key')
    );

    await expect(
      sdk.products.getProductList({ limit: 10 })
    ).rejects.toThrow(AuthenticationError);
  });

  it('должен выбрасывать RateLimitError для 429', async () => {
    mockClient.get = vi.fn().mockRejectedValue(
      new RateLimitError('Rate limit exceeded', 5000)
    );

    await expect(
      sdk.products.getProductList({ limit: 10 })
    ).rejects.toThrow(RateLimitError);
  });

  it('должен выбрасывать ValidationError для невалидного ввода', async () => {
    await expect(
      sdk.products.getProductCard(-1)
    ).rejects.toThrow(ValidationError);
  });
});
```

## Интеграционное тестирование

### Настройка MSW

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

// Запуск сервера перед всеми тестами
beforeAll(() => server.listen());

// Сброс обработчиков после каждого теста
afterEach(() => server.resetHandlers());

// Очистка после всех тестов
afterAll(() => server.close());
```

### Пример интеграционного теста

```typescript
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import { server } from './setup/msw';

describe('Интеграционные тесты Products', () => {
  let sdk: WildberriesSDK;

  beforeAll(() => {
    sdk = new WildberriesSDK({
      apiKey: 'test-api-key'
    });
  });

  it('должен получать список товаров из API', async () => {
    const products = await sdk.products.getProductList({ limit: 10 });

    expect(products.data).toBeDefined();
    expect(products.data).toHaveLength(1);
    expect(products.data[0].nmId).toBe(12345);
  });

  it('должен обрабатывать ограничение скорости', async () => {
    // Переопределение обработчика для этого теста
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

  it('должен повторять запросы при сетевых ошибках', async () => {
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

### Тестирование асинхронных операций

```typescript
describe('Асинхронные операции', () => {
  it('должен обрабатывать workflow генерации отчета', async () => {
    // Шаг 1: Генерация отчета
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

    // Шаг 2: Опрос для завершения
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

    // Шаг 3: Скачивание отчета
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

## End-to-End тестирование

### Настройка E2E теста

```typescript
// tests/e2e/setup.ts
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

export async function setupE2ETest() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_TEST_API_KEY!
  });

  // Создание тестовых данных
  const testProduct = await sdk.products.createProduct({
    vendorCode: `TEST-${Date.now()}`,
    title: 'E2E Test Product',
    // ... другие поля
  });

  return {
    sdk,
    testProduct,
    cleanup: async () => {
      // Очистка тестовых данных
      await sdk.products.deleteProduct(testProduct.nmId);
    }
  };
}
```

### Тест полного workflow

```typescript
describe('Полный жизненный цикл товара E2E', () => {
  let sdk: WildberriesSDK;
  let testProductId: number;

  beforeAll(async () => {
    sdk = new WildberriesSDK({
      apiKey: process.env.WB_TEST_API_KEY!
    });
  });

  it('должен завершить полный жизненный цикл товара', async () => {
    // 1. Создание товара
    const product = await sdk.products.createProduct({
      vendorCode: `TEST-${Date.now()}`,
      title: 'E2E Test Product',
      // ... другие поля
    });

    testProductId = product.nmId;
    expect(product.nmId).toBeDefined();

    // 2. Обновление цены
    await sdk.products.updatePricing([{
      nmId: testProductId,
      price: 1000
    }]);

    // 3. Обновление остатков
    await sdk.products.updateStock([{
      sku: product.vendorCode,
      amount: 100,
      warehouseId: 123
    }]);

    // 4. Получение обновленного товара
    const updated = await sdk.products.getProductCard(testProductId);
    expect(updated.nmId).toBe(testProductId);

    // 5. Удаление товара
    await sdk.products.deleteProduct(testProductId);
  });

  afterAll(async () => {
    // Очистка оставшихся тестовых данных
    if (testProductId) {
      try {
        await sdk.products.deleteProduct(testProductId);
      } catch (error) {
        // Товар уже удален
      }
    }
  });
});
```

## Стратегии мокирования

### Ручное мокирование

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

// Использование
const mockSDK = createMockSDK();
const service = new ProductService(mockSDK);
await service.syncProducts();

expect(mockSDK.products.getProductList).toHaveBeenCalled();
```

### Частичное мокирование

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

## Управление тестовыми данными

### Фабрика тестовых данных

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

// Использование
const product = ProductFactory.createProduct({ title: 'Custom Title' });
const products = ProductFactory.createProducts(10);
```

### Очистка тестовых данных

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
            await sdk.products.deleteProduct(resource.id);
            break;
          case 'order':
            // Отменить заказ если возможно
            break;
        }
      } catch (error) {
        console.warn(`Не удалось очистить ${resource.type}:${resource.id}`);
      }
    }

    this.createdResources = [];
  }
}
```

## Тестирование производительности

### Нагрузочное тестирование

```typescript
import { performance } from 'perf_hooks';

describe('Тесты производительности', () => {
  it('должен обрабатывать 100 конкурентных запросов', async () => {
    const start = performance.now();

    const requests = Array.from({ length: 100 }, () =>
      sdk.products.getProductList({ limit: 10 })
    );

    await Promise.all(requests);

    const duration = performance.now() - start;

    expect(duration).toBeLessThan(5000); // 5 секунд
  });

  it('должен поддерживать накладные расходы SDK < 200ms', async () => {
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

## Интеграция CI/CD

### Пример GitHub Actions

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

### Скрипты тестирования

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

## Лучшие практики

### ✅ Делайте

- Пишите тесты для всех публичных API методов
- Используйте MSW для мокирования HTTP запросов
- Тестируйте сценарии ошибок
- Очищайте тестовые данные после тестов
- Используйте фабрики для тестовых данных
- Запускайте тесты в CI/CD pipeline
- Поддерживайте покрытие 80%+
- Тестируйте логику повторов и ограничения скорости

### ❌ Не делайте

- Не тестируйте детали реализации
- Не используйте реальные API ключи в тестах
- Не пропускайте очистку после тестов
- Не коммитьте тестовые данные в репозиторий
- Не используйте sleep() в тестах (используйте правильное ожидание)
- Не тестируйте внутренности сторонних библиотек
- Не игнорируйте падающие тесты
- Не используйте продакшен API в тестах

## Связанная документация

- [Руководство по лучшим практикам](/ru/guides/best-practices.md)
- [Руководство по конфигурации](/ru/guides/configuration.md)
- [Руководство по устранению неполадок](/ru/guides/troubleshooting.md)
- [Примеры](/ru/examples/)

## Поддержка

По вопросам тестирования:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Документация](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)
