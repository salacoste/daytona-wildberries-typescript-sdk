---
title: Руководство по настройке производительности
description: Оптимизация производительности Wildberries SDK - лимиты запросов, кеширование, пакетные операции, пул соединений и управление памятью
layout: doc
---

# Руководство по настройке производительности

Комплексное руководство по оптимизации производительности при работе с Wildberries TypeScript SDK.

## Содержание

- [Обзор](#обзор)
- [Оптимизация лимитов запросов](#оптимизация-лимитов-запросов)
- [Пул соединений](#пул-соединений)
- [Стратегии кеширования](#стратегии-кеширования)
- [Пакетные операции](#пакетные-операции)
- [Управление памятью](#управление-памятью)
- [Мониторинг и профилирование](#мониторинг-и-профилирование)

## Обзор

Wildberries SDK разработан для высокопроизводительных операций со встроенными оптимизациями для лимитов запросов, обработки повторных попыток и эффективной передачи данных. Это руководство охватывает продвинутые техники для максимизации пропускной способности и минимизации задержек.

### Целевые показатели производительности

| Метрика | Цель | Примечания |
|---------|------|------------|
| Накладные расходы SDK | <200мс | На инициализацию операции |
| Размер бандла | <100KB | Сжатый gzip основной SDK |
| Использование памяти | <50MB | В среднем на экземпляр |
| Конкурентные запросы | 100+ | С правильными лимитами запросов |

## Оптимизация лимитов запросов

### Понимание лимитов запросов

Различные модули API имеют разные лимиты запросов:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  rateLimitConfig: {
    // Глобальные лимиты (применяются ко всем эндпоинтам)
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  }
});
```

### Лимиты для конкретных модулей

```typescript
// Модуль Products: 3 запроса в минуту
// Модуль Analytics: 6 запросов в минуту
// Модуль Orders: 10 запросов в минуту
// Модуль Finances: 1000 запросов в минуту
```

### Максимизация пропускной способности

**Стратегия 1: Пакетирование запросов**

```typescript
// ❌ Плохо: Последовательные запросы
for (const productId of productIds) {
  await sdk.products.getProductCard(productId);
}

// ✅ Хорошо: Параллельные запросы с лимитами
const batchSize = 3; // Соответствие лимиту модуля
const batches = chunk(productIds, batchSize);

for (const batch of batches) {
  await Promise.all(
    batch.map(id => sdk.products.getProductCard(id))
  );
  await sleep(60000); // Ожидание окна лимита запросов
}
```

**Стратегия 2: Умное планирование**

```typescript
import { RateLimiter } from 'daytona-wildberries-typescript-sdk/client';

const limiter = new RateLimiter({
  requestsPerMinute: 100,
  intervalSeconds: 10
});

async function scheduledOperation<T>(
  operation: () => Promise<T>
): Promise<T> {
  await limiter.waitForSlot('scheduled');
  return operation();
}

// Использование для всех API-вызовов
const balance = await scheduledOperation(() =>
  sdk.finances.getBalance()
);
```

## Пул соединений

### HTTP/2 мультиплексирование

SDK использует Axios, который поддерживает HTTP/2 мультиплексирование для улучшенной производительности:

```typescript
import axios from 'axios';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpClient: axios.create({
    // Включение HTTP/2
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    // Размер пула соединений
    maxSockets: 50,
    maxFreeSockets: 10,
  })
});
```

### Конфигурация Keep-Alive

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000, // 30 секунд таймаут
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  }
});
```

## Стратегии кеширования

### Кеширование в памяти

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 минут TTL

async function getCachedCategories() {
  const cacheKey = 'categories';

  // Сначала проверка кеша
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Получение из API
  const categories = await sdk.products.getParentCategories();

  // Сохранение в кеш
  cache.set(cacheKey, categories);

  return categories;
}
```

### Кеширование через Redis

```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

async function getCachedBalance(): Promise<BalanceResponse> {
  const cacheKey = 'wb:balance';

  // Попытка получить из кеша
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Получение из API
  const balance = await sdk.finances.getBalance();

  // Кеширование на 5 минут
  await redis.setex(cacheKey, 300, JSON.stringify(balance));

  return balance;
}
```

### Умная инвалидация кеша

```typescript
class CachedSDK {
  private cache = new Map<string, { data: any; expiry: number }>();

  async getWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300000 // 5 минут
  ): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && cached.expiry > now) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, expiry: now + ttl });

    return data;
  }

  invalidate(pattern: string) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}
```

## Пакетные операции

### Массовые обновления товаров

```typescript
async function bulkUpdatePricing(
  updates: Array<{ nmId: number; price: number }>
) {
  // Группировка обновлений в пакеты
  const batchSize = 100;
  const batches = chunk(updates, batchSize);

  const results = [];

  for (const batch of batches) {
    // Обработка пакета параллельно
    const batchResults = await Promise.allSettled(
      batch.map(({ nmId, price }) =>
        sdk.products.updatePricing([{ nmId, price }])
      )
    );

    results.push(...batchResults);

    // Соблюдение лимитов запросов
    if (batches.indexOf(batch) < batches.length - 1) {
      await sleep(20000); // 20с между пакетами
    }
  }

  return results;
}
```

### Параллельная генерация отчетов

```typescript
async function generateMultipleReports(
  reports: Array<{ type: ReportType; params: any }>
) {
  // Запуск всех отчетов параллельно
  const taskIds = await Promise.all(
    reports.map(r => sdk.reports.generateReport(r.type, r.params))
  );

  // Опрос завершения параллельно
  const completed = await Promise.all(
    taskIds.map(taskId =>
      pollUntilComplete(() => sdk.reports.getReportStatus(taskId))
    )
  );

  // Скачивание всех отчетов
  return Promise.all(
    completed.map(task => sdk.reports.downloadReport(task.taskId))
  );
}
```

## Управление памятью

### Потоковая передача больших ответов

```typescript
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

async function downloadLargeReport(taskId: string, outputPath: string) {
  const response = await sdk.reports.downloadReportStream(taskId);
  const writeStream = createWriteStream(outputPath);

  await pipeline(response.data, writeStream);
}
```

### Лучшие практики пагинации

```typescript
async function* iterateAllOrders() {
  let cursor: string | undefined;

  do {
    const page = await sdk.ordersFBS.getOrders({
      limit: 1000,
      cursor
    });

    yield* page.orders;
    cursor = page.next;

    // Разрешение сборки мусора
    if (cursor) {
      await sleep(100);
    }
  } while (cursor);
}

// Использование с эффективной обработкой памяти
for await (const order of iterateAllOrders()) {
  await processOrder(order);
  // Каждый заказ обрабатывается и может быть собран GC
}
```

### Предотвращение утечек памяти

```typescript
class SDKManager {
  private sdk: WildberriesSDK;

  constructor(apiKey: string) {
    this.sdk = new WildberriesSDK({ apiKey });
  }

  async cleanup() {
    // Очистка всех кешей
    this.sdk = null as any;

    // Принудительная сборка мусора (если флаг --expose-gc)
    if (global.gc) {
      global.gc();
    }
  }
}
```

## Мониторинг и профилирование

### Измерение времени запросов

```typescript
class TimedSDK {
  private metrics = new Map<string, number[]>();

  async trackOperation<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();

    try {
      return await operation();
    } finally {
      const duration = performance.now() - start;

      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }

      this.metrics.get(name)!.push(duration);
    }
  }

  getMetrics(name: string) {
    const times = this.metrics.get(name) || [];

    return {
      count: times.length,
      avg: times.reduce((a, b) => a + b, 0) / times.length,
      min: Math.min(...times),
      max: Math.max(...times),
      p95: percentile(times, 0.95),
      p99: percentile(times, 0.99),
    };
  }
}
```

### Профилирование памяти

```typescript
import v8 from 'v8';
import { writeFileSync } from 'fs';

function takeHeapSnapshot(filename: string) {
  const snapshot = v8.writeHeapSnapshot();
  writeFileSync(filename, snapshot);
  console.log(`Снимок кучи сохранен в ${filename}`);
}

// Снимок до/после операций
takeHeapSnapshot('before.heapsnapshot');
await processLargeDataset();
takeHeapSnapshot('after.heapsnapshot');
```

### Бенчмаркинг производительности

```typescript
import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite
  .add('Последовательные запросы', {
    defer: true,
    fn: async (deferred: any) => {
      for (let i = 0; i < 10; i++) {
        await sdk.products.getProductCard(12345);
      }
      deferred.resolve();
    }
  })
  .add('Параллельные запросы', {
    defer: true,
    fn: async (deferred: any) => {
      await Promise.all(
        Array(10).fill(0).map(() =>
          sdk.products.getProductCard(12345)
        )
      );
      deferred.resolve();
    }
  })
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .on('complete', function(this: any) {
    console.log('Самый быстрый: ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
```

## Сводка лучших практик

### ✅ Делайте

- Используйте лимиты запросов для максимизации пропускной способности без достижения лимитов
- Реализуйте кеширование для часто запрашиваемых данных
- Обрабатывайте большие наборы данных с пагинацией и потоковой передачей
- Мониторьте метрики производительности в production
- Используйте пул соединений для лучшего использования ресурсов
- Пакетируйте операции когда возможно
- Профилируйте использование памяти для долгоработающих процессов

### ❌ Не делайте

- Не делайте последовательные запросы когда возможны параллельные
- Не игнорируйте лимиты запросов (вызывает блокировки API)
- Не загружайте целые большие наборы данных в память
- Не пропускайте обработку ошибок в критичных по производительности путях
- Не используйте блокирующие операции в async коде
- Не создавайте новые экземпляры SDK для каждого запроса
- Не отключайте логику повторных попыток для "улучшения скорости"

## Чеклист оптимизации производительности

- [ ] Лимиты запросов настроены правильно
- [ ] Кеширование реализовано для операций с большим количеством чтения
- [ ] Пакетные операции для массовых обновлений
- [ ] Пагинация используется для больших наборов данных
- [ ] Пул соединений включен
- [ ] Время запросов отслеживается
- [ ] Использование памяти профилируется
- [ ] Обработка ошибок не влияет на производительность
- [ ] Лимиты конкурентных запросов соблюдаются
- [ ] Экземпляры SDK переиспользуются между запросами

## Связанная документация

- [Руководство по лучшим практикам](/ru/guides/best-practices.md)
- [Руководство по устранению неполадок](/ru/guides/troubleshooting.md)
- [Справочник API](/api/)
- [Примеры](/ru/examples/)

## Поддержка

По вопросам, связанным с производительностью:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Документация Wildberries API](https://dev.wildberries.ru/)
