---
title: Руководство по настройке производительности
description: Комплексное руководство по оптимизации производительности для промышленного развертывания - лимиты запросов, кэширование, мониторинг и бенчмаркинг
layout: doc
---

# Руководство по настройке производительности

Комплексное руководство по оптимизации производительности Wildberries SDK для промышленного развертывания.

---

## Содержание

1. [Введение](#введение)
2. [Философия производительности](#философия-производительности)
3. [Базовые метрики производительности](#базовые-метрики-производительности)
4. [Оптимизация лимитов запросов](#оптимизация-лимитов-запросов)
5. [Паттерны пакетных операций](#паттерны-пакетных-операций)
6. [Стратегии кэширования](#стратегии-кэширования)
7. [Пулинг соединений](#пулинг-соединений)
8. [Управление памятью](#управление-памятью)
9. [Мониторинг производительности](#мониторинг-производительности)
10. [Скрипты бенчмаркинга](#скрипты-бенчмаркинга)
11. [Чек-лист производительности](#чек-лист-производительности)
12. [Устранение проблем производительности](#устранение-проблем-производительности)

---

## Введение

Это руководство предоставляет комплексные стратегии для оптимизации производительности Wildberries SDK в промышленных средах. Оно охватывает бенчмаркинг, техники оптимизации, мониторинг и устранение неполадок.

**Целевая аудитория**: Backend-разработчики, DevOps-инженеры, инженеры по производительности

**Предварительные требования**:
- Wildberries SDK установлен и настроен
- Node.js ≥ 20.0.0
- Базовое понимание паттернов async/await
- Доступ к инструментам мониторинга (Prometheus, Grafana) для продакшена

**Что вы узнаете**:
- Как измерять и улучшать производительность SDK
- Стратегии максимизации пропускной способности API в рамках лимитов запросов
- Лучшие практики кэширования и пулинга соединений
- Управление памятью и предотвращение утечек
- Настройка мониторинга производительности и алертов

---

## Философия производительности

### Основные принципы

**1. Сначала измеряйте, затем оптимизируйте**
- Всегда устанавливайте базовые метрики перед оптимизацией
- Используйте решения на основе данных, а не предположений
- Профилируйте до и после изменений для валидации улучшений

**2. Оптимизируйте под реальные ограничения**
- Лимиты запросов API — основное узкое место (не CPU/память)
- Сетевая задержка варьируется (типично 50-300ms)
- Фокусируйтесь на оптимизации пропускной способности в рамках ограничений лимитов

**3. Прогрессивное улучшение**
- Начинайте с простой, работающей реализации
- Добавляйте оптимизации инкрементально
- Валидируйте влияние каждой оптимизации метриками

**4. Баланс производительности и поддерживаемости**
- Не жертвуйте ясностью кода ради микрооптимизаций
- Фокусируйтесь на высокоэффективных оптимизациях (правило 80/20)
- Документируйте компромиссы и критичные для производительности секции

### Целевые показатели производительности

| Метрика | Целевое значение | Критический порог | Примечания |
|---------|------------------|-------------------|------------|
| **Задержка API вызова (p50)** | <200ms | <500ms | Медианное время ответа |
| **Задержка API вызова (p95)** | <500ms | <1000ms | 95-й процентиль |
| **Задержка API вызова (p99)** | <1000ms | <2000ms | 99-й процентиль (толерантность к пикам) |
| **Пропускная способность** | >100 req/s | >50 req/s | Запросов в секунду |
| **Использование памяти (простой)** | <50MB | <100MB | Размер резидентного набора |
| **Использование памяти (нагрузка)** | <200MB | <500MB | При 100 конкурентных запросах |
| **Уровень ошибок** | <0.1% | <1% | Неудачные запросы / всего запросов |
| **Коэффициент попаданий в кэш** | >80% | >50% | Для кэшируемых эндпоинтов |

**Понимание метрик производительности**:

- **p50 (медиана)**: Половина запросов выполняется быстрее этого значения
- **p95**: 95% запросов выполняются быстрее (фильтрует выбросы)
- **p99**: 99% запросов выполняются быстрее (ловит tail latency)
- **Пропускная способность**: Общее количество обработанных запросов в секунду
- **Уровень ошибок**: Процент неудачных запросов (исключая лимиты запросов)

---

## Базовые метрики производительности

Перед оптимизацией установите базовые показатели производительности для измерения улучшений.

### Бенчмаркинг накладных расходов SDK

SDK вносит минимальные накладные расходы (<10ms) на:
- Сериализацию запроса/ответа
- Валидацию типов
- Обработку ошибок
- Проверку лимитов запросов

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import { performance } from 'perf_hooks';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Измерение времени инициализации SDK
const initStart = performance.now();
const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
const initEnd = performance.now();
console.log(`Инициализация SDK: ${(initEnd - initStart).toFixed(2)}ms`);

// Ожидается: <20ms
```

### Бенчмаркинг задержки API вызовов

Измерение end-to-end задержки включая сеть, обработку API и накладные расходы SDK:

```typescript
async function benchmarkLatency(
  operation: () => Promise<any>,
  iterations: number = 100
): Promise<LatencyMetrics> {
  const latencies: number[] = [];
  const errors: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    try {
      await operation();
      const end = performance.now();
      latencies.push(end - start);
    } catch (error) {
      errors.push(i);
    }
  }

  latencies.sort((a, b) => a - b);

  return {
    p50: latencies[Math.floor(latencies.length * 0.5)],
    p95: latencies[Math.floor(latencies.length * 0.95)],
    p99: latencies[Math.floor(latencies.length * 0.99)],
    avg: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    min: latencies[0],
    max: latencies[latencies.length - 1],
    errorRate: (errors.length / iterations) * 100
  };
}

// Бенчмарк модуля Products
const productsMetrics = await benchmarkLatency(
  () => sdk.products.getParentAll(),
  100
);

console.log('Метрики Products.getParentAll():');
console.log(`  p50: ${productsMetrics.p50.toFixed(2)}ms`);
console.log(`  p95: ${productsMetrics.p95.toFixed(2)}ms`);
console.log(`  p99: ${productsMetrics.p99.toFixed(2)}ms`);
console.log(`  avg: ${productsMetrics.avg.toFixed(2)}ms`);
console.log(`  уровень ошибок: ${productsMetrics.errorRate.toFixed(2)}%`);

// Ожидаемые результаты (пример):
// p50: 180ms, p95: 450ms, p99: 850ms, avg: 220ms
```

### Бенчмаркинг пропускной способности

Измерение максимальной устойчивой пропускной способности в рамках лимитов запросов:

```typescript
async function benchmarkThroughput(
  operation: () => Promise<any>,
  durationMs: number = 10000
): Promise<ThroughputMetrics> {
  const startTime = Date.now();
  let requests = 0;
  let errors = 0;
  const latencies: number[] = [];

  while (Date.now() - startTime < durationMs) {
    const reqStart = performance.now();
    try {
      await operation();
      const reqEnd = performance.now();
      latencies.push(reqEnd - reqStart);
      requests++;
    } catch (error) {
      errors++;
    }
  }

  const elapsedSeconds = (Date.now() - startTime) / 1000;
  latencies.sort((a, b) => a - b);

  return {
    requestsPerSecond: requests / elapsedSeconds,
    totalRequests: requests,
    totalErrors: errors,
    errorRate: (errors / (requests + errors)) * 100,
    avgLatency: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    p95Latency: latencies[Math.floor(latencies.length * 0.95)]
  };
}

// Бенчмарк устойчивой пропускной способности
const throughput = await benchmarkThroughput(
  () => sdk.general.ping(),
  10000 // 10 секунд
);

console.log('Устойчивая пропускная способность:');
console.log(`  ${throughput.requestsPerSecond.toFixed(2)} req/s`);
console.log(`  ${throughput.totalRequests} всего запросов`);
console.log(`  ${throughput.errorRate.toFixed(2)}% уровень ошибок`);
console.log(`  ${throughput.avgLatency.toFixed(2)}ms средняя задержка`);

// Ожидается: 50-150 req/s в зависимости от лимитов эндпоинта
```

### Бенчмаркинг использования памяти

Мониторинг потребления памяти при различных паттернах нагрузки:

```typescript
function getMemoryStats() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024), // Размер резидентного набора (MB)
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024)
  };
}

async function benchmarkMemory(
  operation: () => Promise<any>,
  iterations: number = 1000
) {
  // Принудительный GC перед тестом (требует флаг --expose-gc)
  if (global.gc) global.gc();

  const memBefore = getMemoryStats();
  console.log('Память до:', memBefore);

  // Выполнение операций
  for (let i = 0; i < iterations; i++) {
    await operation();
  }

  const memAfter = getMemoryStats();
  console.log('Память после:', memAfter);

  const memDelta = {
    rss: memAfter.rss - memBefore.rss,
    heapUsed: memAfter.heapUsed - memBefore.heapUsed
  };

  console.log('Разница памяти:', memDelta);
  console.log(`Накладные расходы на запрос: ${(memDelta.heapUsed / iterations).toFixed(2)}KB`);

  // Принудительный GC после теста
  if (global.gc) global.gc();

  const memAfterGC = getMemoryStats();
  console.log('Память после GC:', memAfterGC);

  return {
    before: memBefore,
    after: memAfter,
    delta: memDelta,
    afterGC: memAfterGC,
    perRequest: memDelta.heapUsed / iterations
  };
}

// Запуск с: node --expose-gc benchmark-memory.js
const memMetrics = await benchmarkMemory(
  () => sdk.products.getParentAll(),
  1000
);

// Ожидается: <1KB накладных расходов на запрос, нет утечек памяти после GC
```

### Бенчмаркинг конкурентных запросов

Тестирование производительности при конкурентной нагрузке:

```typescript
async function benchmarkConcurrency(
  operation: () => Promise<any>,
  concurrency: number,
  totalRequests: number
): Promise<ConcurrencyMetrics> {
  const results: Array<{ latency: number; error: boolean }> = [];
  const startTime = performance.now();

  // Создание пакетов конкурентных запросов
  for (let i = 0; i < totalRequests; i += concurrency) {
    const batch = Array(Math.min(concurrency, totalRequests - i))
      .fill(null)
      .map(async () => {
        const reqStart = performance.now();
        try {
          await operation();
          const reqEnd = performance.now();
          results.push({ latency: reqEnd - reqStart, error: false });
        } catch (error) {
          results.push({ latency: 0, error: true });
        }
      });

    await Promise.all(batch);
  }

  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // секунды

  const latencies = results
    .filter(r => !r.error)
    .map(r => r.latency)
    .sort((a, b) => a - b);

  const errors = results.filter(r => r.error).length;

  return {
    concurrency,
    totalRequests,
    totalTime,
    throughput: totalRequests / totalTime,
    errorRate: (errors / totalRequests) * 100,
    p50: latencies[Math.floor(latencies.length * 0.5)],
    p95: latencies[Math.floor(latencies.length * 0.95)],
    p99: latencies[Math.floor(latencies.length * 0.99)]
  };
}

// Тестирование различных уровней конкурентности
const concurrencyLevels = [1, 5, 10, 25, 50, 100];

for (const concurrency of concurrencyLevels) {
  const metrics = await benchmarkConcurrency(
    () => sdk.general.ping(),
    concurrency,
    1000 // 1000 всего запросов
  );

  console.log(`\nКонкурентность: ${concurrency}`);
  console.log(`  Пропускная способность: ${metrics.throughput.toFixed(2)} req/s`);
  console.log(`  p95 задержка: ${metrics.p95.toFixed(2)}ms`);
  console.log(`  Уровень ошибок: ${metrics.errorRate.toFixed(2)}%`);
}

// Найти оптимальный уровень конкурентности (наибольшая пропускная способность при <1% ошибках)
```

### Шаблон базового отчета

После выполнения бенчмарков задокументируйте базовые метрики:

```markdown
# Отчет о базовой производительности SDK

**Дата**: 2025-10-26
**Версия SDK**: 1.0.0
**Версия Node.js**: 20.10.0
**Окружение**: Продакшен
**Длительность теста**: 10 минут на модуль

## Сводка

| Модуль | p50 задержка | p95 задержка | Пропускная способность | Уровень ошибок |
|--------|--------------|--------------|------------------------|----------------|
| General | 150ms | 380ms | 125 req/s | 0.05% |
| Products | 220ms | 510ms | 95 req/s | 0.08% |
| Orders | 280ms | 650ms | 75 req/s | 0.12% |
| Finances | 310ms | 720ms | 60 req/s | 0.15% |

## Использование памяти

- **Простой**: 42MB RSS, 25MB heap
- **Под нагрузкой (100 конкурентных)**: 185MB RSS, 140MB heap
- **Накладные расходы на запрос**: ~0.8KB
- **Утечки памяти**: Не обнаружены после 10,000 запросов

## Наблюдения по лимитам запросов

- Эндпоинты Products: типично 3-5 req/min лимиты
- Эндпоинты Orders: типично 10 req/min лимиты
- Эндпоинты General: типично 20 req/min лимиты
- Ошибки лимитов: <0.01% (механизм повтора SDK работает)

## Рекомендации

1. **Модуль Products**: Реализовать кэширование (TTL 5 минут) для getParentAll()
2. **Модуль Orders**: Использовать пакетные операции для обработки >10 заказов
3. **Память**: Текущее использование в пределах лимитов, оптимизация не требуется
4. **Пропускная способность**: Узкое место — лимиты API, не производительность SDK
```

---

## Оптимизация лимитов запросов

Лимиты запросов API — основное ограничение производительности. Этот раздел охватывает стратегии максимизации пропускной способности в рамках этих лимитов.

### Понимание лимитов запросов

Каждый эндпоинт Wildberries API имеет специфические лимиты запросов, определяемые как:

```
Лимит: X запросов за Период с интервалами Y секунд
Всплеск: Z запросов
```

Пример из Products API:
```
Лимит: 3 запроса за 1 минуту с интервалами 20 секунд
Всплеск: 3 запроса
```

**Интерпретация**:
- Максимум 3 запроса в минуту
- Минимум 20 секунд между запросами
- Можно отправить 3 запроса немедленно (всплеск), затем ждать 20с между последующими запросами

### Стратегия 1: Параллельные запросы к разным эндпоинтам

**Принцип**: Лимиты запросов применяются к каждому эндпоинту, а не глобально. Вызывайте разные эндпоинты параллельно для максимизации пропускной способности.

```typescript
// ❌ ПЛОХО: Последовательные запросы (медленно)
async function getProductDataSlow(productId: string) {
  const details = await sdk.products.getCardByIMT({ imtID: productId });
  const pricing = await sdk.products.getPriceInfo({ nmID: productId });
  const stock = await sdk.products.getStockByWarehouse({ nmID: productId });

  return { details, pricing, stock };
}
// Общее время: ~600ms (200ms × 3 последовательно)

// ✅ ХОРОШО: Параллельные запросы (быстро)
async function getProductDataFast(productId: string) {
  const [details, pricing, stock] = await Promise.all([
    sdk.products.getCardByIMT({ imtID: productId }),  // Разный лимит
    sdk.products.getPriceInfo({ nmID: productId }),   // Разный лимит
    sdk.products.getStockByWarehouse({ nmID: productId }) // Разный лимит
  ]);

  return { details, pricing, stock };
}
// Общее время: ~200ms (все параллельно, ограничено самым медленным)

// Выигрыш в производительности: в 3 раза быстрее
```

**Когда использовать**:
- Получение связанных данных из нескольких эндпоинтов
- Начальная загрузка данных (дашборд, отчеты)
- Пакетная обработка, где каждый элемент требует нескольких API вызовов

**Ограничения**:
- Работает только для эндпоинтов с независимыми лимитами запросов
- Требуется обработка ошибок для частичных сбоев

```typescript
// Улучшенное параллельное получение с обработкой ошибок
async function getProductDataRobust(productId: string) {
  const results = await Promise.allSettled([
    sdk.products.getCardByIMT({ imtID: productId }),
    sdk.products.getPriceInfo({ nmID: productId }),
    sdk.products.getStockByWarehouse({ nmID: productId })
  ]);

  return {
    details: results[0].status === 'fulfilled' ? results[0].value : null,
    pricing: results[1].status === 'fulfilled' ? results[1].value : null,
    stock: results[2].status === 'fulfilled' ? results[2].value : null,
    errors: results
      .map((r, i) => r.status === 'rejected' ? { index: i, error: r.reason } : null)
      .filter(Boolean)
  };
}
```

### Стратегия 2: Пакетирование запросов

**Принцип**: Некоторые эндпоинты принимают массивы элементов, сокращая API вызовы с N до N/batchSize.

```typescript
// ❌ ПЛОХО: Индивидуальные обновления (медленно, превышают лимиты)
async function updateProductsSlow(products: ProductUpdate[]) {
  const results = [];
  for (const product of products) {
    const result = await sdk.products.updateCard(product);
    results.push(result);
  }
  return results;
}
// 100 товаров = 100 API вызовов = ошибки лимитов

// ✅ ХОРОШО: Пакетные обновления (быстро, эффективно)
async function updateProductsBatch(products: ProductUpdate[]) {
  const batchSize = 50; // API поддерживает 50 элементов на запрос
  const batches = [];

  for (let i = 0; i < products.length; i += batchSize) {
    batches.push(products.slice(i, i + batchSize));
  }

  const results = await Promise.all(
    batches.map(batch => sdk.products.updateCards(batch))
  );

  return results.flat();
}
// 100 товаров = 2 API вызова = нет проблем с лимитами

// Выигрыш в производительности: в 50 раз меньше API вызовов
```

**Эндпоинты с поддержкой пакетирования**:

| Модуль | Эндпоинт | Размер пакета | Лимит запросов |
|--------|----------|---------------|----------------|
| Products | `updateCards` | 50 элементов | 3 req/min |
| Orders | `cancelOrders` | 100 элементов | 10 req/min |
| Finances | `getTransactions` | 1000 элементов | 5 req/min |

**Паттерн пакетной обработки**:

```typescript
class BatchProcessor<T, R> {
  constructor(
    private batchSize: number,
    private processBatch: (batch: T[]) => Promise<R[]>,
    private onProgress?: (processed: number, total: number) => void
  ) {}

  async process(items: T[]): Promise<R[]> {
    const results: R[] = [];
    const total = items.length;

    for (let i = 0; i < items.length; i += this.batchSize) {
      const batch = items.slice(i, i + this.batchSize);
      const batchResults = await this.processBatch(batch);
      results.push(...batchResults);

      if (this.onProgress) {
        this.onProgress(Math.min(i + this.batchSize, total), total);
      }
    }

    return results;
  }
}

// Использование
const processor = new BatchProcessor(
  50, // размер пакета
  (batch) => sdk.products.updateCards(batch),
  (processed, total) => {
    console.log(`Прогресс: ${processed}/${total} (${((processed/total)*100).toFixed(0)}%)`);
  }
);

const results = await processor.process(allProducts);
```

### Стратегия 3: Интеллектуальная очередь запросов

**Принцип**: Ставьте запросы в очередь и обрабатывайте их с оптимальной скоростью для избежания ошибок лимитов при максимизации пропускной способности.

```typescript
class RateLimitedQueue<T> {
  private queue: Array<{
    fn: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (error: any) => void;
  }> = [];
  private processing = false;
  private requestsPerSecond: number;
  private minIntervalMs: number;

  constructor(requestsPerSecond: number) {
    this.requestsPerSecond = requestsPerSecond;
    this.minIntervalMs = 1000 / requestsPerSecond;
  }

  async enqueue(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const { fn, resolve, reject } = this.queue.shift()!;
      const startTime = Date.now();

      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }

      // Обеспечение минимального интервала между запросами
      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, this.minIntervalMs - elapsed);
      if (waitTime > 0) {
        await this.sleep(waitTime);
      }
    }

    this.processing = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  size(): number {
    return this.queue.length;
  }
}

// Использование: Создание очереди для эндпоинта с специфическим лимитом
const productsQueue = new RateLimitedQueue<any>(3 / 60); // 3 req за 60 секунд

// Постановка запросов в очередь (неблокирующе)
const promises = products.map(product =>
  productsQueue.enqueue(() => sdk.products.updateCard(product))
);

console.log(`В очереди ${promises.length} запросов`);

// Ожидание завершения всех
const results = await Promise.all(promises);

console.log(`Завершено ${results.length} запросов`);
```

**Продвинуто: Приоритетная очередь с ограничением скорости**

```typescript
class PriorityRateLimitQueue<T> {
  private queue: Array<{
    fn: () => Promise<T>;
    priority: number;
    resolve: (value: T) => void;
    reject: (error: any) => void;
  }> = [];
  private processing = false;
  private requestsPerSecond: number;
  private minIntervalMs: number;

  constructor(requestsPerSecond: number) {
    this.requestsPerSecond = requestsPerSecond;
    this.minIntervalMs = 1000 / requestsPerSecond;
  }

  async enqueue(
    fn: () => Promise<T>,
    priority: number = 0
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, priority, resolve, reject });
      // Сортировка по приоритету (высокий приоритет первым)
      this.queue.sort((a, b) => b.priority - a.priority);
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const { fn, resolve, reject } = this.queue.shift()!;
      const startTime = Date.now();

      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        // Обработка ошибок лимитов с экспоненциальной задержкой
        if (error instanceof RateLimitError) {
          const waitMs = error.retryAfter || 5000;
          console.log(`Превышен лимит, ожидание ${waitMs}ms`);
          await this.sleep(waitMs);
          // Повторная постановка запроса в очередь
          this.queue.unshift({ fn, priority: 10, resolve, reject });
          continue;
        }
        reject(error);
      }

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, this.minIntervalMs - elapsed);
      if (waitTime > 0) {
        await this.sleep(waitTime);
      }
    }

    this.processing = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Использование с приоритетами
const queue = new PriorityRateLimitQueue<any>(5 / 60); // 5 req в минуту

// Высокий приоритет: срочные обновления заказов
await queue.enqueue(
  () => sdk.orders.updateStatus({ orderId: '123', status: 'shipped' }),
  10
);

// Нормальный приоритет: обновления товаров
await queue.enqueue(
  () => sdk.products.updateCard(product),
  5
);

// Низкий приоритет: аналитика
await queue.enqueue(
  () => sdk.analytics.getSales({ from: '2025-01-01', to: '2025-12-31' }),
  1
);
```

### Стратегия 4: Дедупликация запросов

**Принцип**: Избегайте избыточных API вызовов для идентичных запросов в короткий временной промежуток.

```typescript
class RequestDeduplicator<T> {
  private cache = new Map<string, Promise<T>>();
  private ttlMs: number;

  constructor(ttlMs: number = 1000) {
    this.ttlMs = ttlMs;
  }

  async deduplicate(
    key: string,
    fn: () => Promise<T>
  ): Promise<T> {
    // Проверка, выполняется ли уже запрос
    if (this.cache.has(key)) {
      console.log(`Дедупликация запроса: ${key}`);
      return this.cache.get(key)!;
    }

    // Выполнение запроса
    const promise = fn();
    this.cache.set(key, promise);

    // Очистка кэша после TTL
    setTimeout(() => {
      this.cache.delete(key);
    }, this.ttlMs);

    return promise;
  }
}

// Использование
const dedup = new RequestDeduplicator<any>(1000); // TTL 1 секунда

// Несколько одновременных запросов одного товара
const requests = Array(10).fill(null).map(() =>
  dedup.deduplicate(
    'products:details:12345',
    () => sdk.products.getCardByIMT({ imtID: '12345' })
  )
);

const results = await Promise.all(requests);
// Сделан только 1 фактический API вызов, 9 запросов дедуплицированы
```

### Мониторинг лимитов запросов

Отслеживайте использование лимитов для оптимизации паттернов запросов:

```typescript
class RateLimitMonitor {
  private limits = new Map<string, {
    requestsPerMinute: number;
    requests: number[];
  }>();

  trackRequest(endpoint: string, limit: number) {
    if (!this.limits.has(endpoint)) {
      this.limits.set(endpoint, {
        requestsPerMinute: limit,
        requests: []
      });
    }

    const now = Date.now();
    const data = this.limits.get(endpoint)!;

    // Удаление запросов старше 1 минуты
    data.requests = data.requests.filter(ts => now - ts < 60000);

    // Добавление текущего запроса
    data.requests.push(now);
  }

  getUtilization(endpoint: string): number {
    const data = this.limits.get(endpoint);
    if (!data) return 0;

    const now = Date.now();
    const recentRequests = data.requests.filter(ts => now - ts < 60000);
    return (recentRequests.length / data.requestsPerMinute) * 100;
  }

  getReport(): Record<string, { used: number; limit: number; utilization: string }> {
    const report: Record<string, any> = {};

    for (const [endpoint, data] of this.limits) {
      const now = Date.now();
      const recentRequests = data.requests.filter(ts => now - ts < 60000);

      report[endpoint] = {
        used: recentRequests.length,
        limit: data.requestsPerMinute,
        utilization: `${((recentRequests.length / data.requestsPerMinute) * 100).toFixed(1)}%`
      };
    }

    return report;
  }
}

// Использование
const monitor = new RateLimitMonitor();

// Обертка SDK вызовов для отслеживания использования
async function trackedCall<T>(
  endpoint: string,
  limit: number,
  fn: () => Promise<T>
): Promise<T> {
  monitor.trackRequest(endpoint, limit);
  return fn();
}

// Выполнение отслеживаемых вызовов
await trackedCall('products.getParentAll', 3, () =>
  sdk.products.getParentAll()
);

// Получение отчета об использовании
console.log('Использование лимитов запросов:');
console.log(monitor.getReport());
// Вывод: { 'products.getParentAll': { used: 2, limit: 3, utilization: '66.7%' } }
```

---

## Паттерны пакетных операций

Пакетные операции драматически сокращают API вызовы и улучшают пропускную способность для массовой обработки.

### Идентификация операций с поддержкой пакетирования

**Проверьте документацию API**: Ищите эндпоинты, которые принимают массивы:

```typescript
// Одиночное обновление (1 API вызов на элемент)
await sdk.products.updateCard(product);

// Пакетное обновление (1 API вызов на 50 элементов)
await sdk.products.updateCards(products); // Массив до 50 элементов
```

**Распространенные пакетные операции**:

| Модуль | Операция | Размер пакета | Случай использования |
|--------|----------|---------------|----------------------|
| Products | Обновление карточек | 50 | Массовое обновление цен/остатков |
| Products | Удаление карточек | 100 | Массовое удаление товаров |
| Orders | Отмена заказов | 100 | Массовая отмена заказов |
| Orders | Отправка заказов | 50 | Массовое обновление доставки |
| Finances | Получение транзакций | 1000 | Массовое получение транзакций |

### Оптимизация размера пакета

**Поиск оптимального размера пакета**:

```typescript
async function findOptimalBatchSize(
  items: any[],
  batchSizes: number[],
  processFunc: (batch: any[]) => Promise<any>
) {
  const results: Array<{
    batchSize: number;
    totalTime: number;
    throughput: number;
    errorRate: number;
  }> = [];

  for (const batchSize of batchSizes) {
    const startTime = performance.now();
    let errors = 0;

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      try {
        await processFunc(batch);
      } catch (error) {
        errors++;
      }
    }

    const endTime = performance.now();
    const totalTime = (endTime - startTime) / 1000;

    results.push({
      batchSize,
      totalTime,
      throughput: items.length / totalTime,
      errorRate: (errors / Math.ceil(items.length / batchSize)) * 100
    });
  }

  return results;
}

// Тестирование различных размеров пакетов
const testItems = Array(500).fill({}).map((_, i) => ({ id: i, price: 1000 + i }));
const batchSizes = [10, 25, 50, 100];

const optimization = await findOptimalBatchSize(
  testItems,
  batchSizes,
  (batch) => sdk.products.updateCards(batch)
);

console.log('Результаты оптимизации размера пакета:');
optimization.forEach(({ batchSize, totalTime, throughput, errorRate }) => {
  console.log(`  Размер ${batchSize}: ${throughput.toFixed(2)} элементов/с, ` +
              `${totalTime.toFixed(2)}с всего, ${errorRate.toFixed(2)}% ошибок`);
});

// Ожидаемый вывод:
// Размер 10: 45 элементов/с, 11.1с всего, 0% ошибок
// Размер 25: 78 элементов/с, 6.4с всего, 0% ошибок
// Размер 50: 95 элементов/с, 5.3с всего, 0% ошибок   ← Оптимально
// Размер 100: 85 элементов/с, 5.9с всего, 2.5% ошибок (слишком большой, вызывает ошибки)
```

### Пример массового обновления товаров

```typescript
interface ProductPriceUpdate {
  nmID: number;
  price: number;
}

async function bulkUpdatePrices(
  updates: ProductPriceUpdate[],
  batchSize: number = 50
): Promise<BulkUpdateResult> {
  const batches: ProductPriceUpdate[][] = [];
  for (let i = 0; i < updates.length; i += batchSize) {
    batches.push(updates.slice(i, i + batchSize));
  }

  console.log(`Обработка ${updates.length} обновлений в ${batches.length} пакетах`);

  const results: Array<{ success: boolean; batch: number; error?: any }> = [];
  let processed = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    try {
      await sdk.products.updatePrices(batch);
      results.push({ success: true, batch: i });
      processed += batch.length;

      console.log(`Пакет ${i + 1}/${batches.length}: ${processed}/${updates.length} элементов ` +
                  `(${((processed / updates.length) * 100).toFixed(1)}%)`);
    } catch (error) {
      console.error(`Пакет ${i + 1} неудачен:`, error);
      results.push({ success: false, batch: i, error });
    }
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  return {
    total: updates.length,
    successful: successful * batchSize,
    failed: failed * batchSize,
    successRate: (successful / results.length) * 100
  };
}

// Использование
const priceUpdates: ProductPriceUpdate[] = [
  { nmID: 12345, price: 1500 },
  { nmID: 67890, price: 2000 },
  // ... еще 500 элементов
];

const result = await bulkUpdatePrices(priceUpdates);

console.log(`\nМассовое обновление завершено:`);
console.log(`  Всего: ${result.total}`);
console.log(`  Успешно: ${result.successful}`);
console.log(`  Неудачно: ${result.failed}`);
console.log(`  Успешность: ${result.successRate.toFixed(2)}%`);
```

### Обработка ошибок пакетов

Обработка частичных сбоев корректно:

```typescript
async function robustBatchProcess<T, R>(
  items: T[],
  batchSize: number,
  processBatch: (batch: T[]) => Promise<R[]>,
  options: {
    retryFailedBatches?: boolean;
    maxRetries?: number;
    onProgress?: (processed: number, total: number, errors: number) => void;
  } = {}
): Promise<BatchProcessResult<R>> {
  const {
    retryFailedBatches = true,
    maxRetries = 3,
    onProgress
  } = options;

  const results: R[] = [];
  const errors: Array<{ batch: T[]; error: any; retries: number }> = [];
  const failedItems: T[] = [];

  // Разбиение на пакеты
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  // Обработка каждого пакета
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    let retries = 0;
    let success = false;

    while (!success && retries <= maxRetries) {
      try {
        const batchResults = await processBatch(batch);
        results.push(...batchResults);
        success = true;

        if (onProgress) {
          onProgress(results.length, items.length, errors.length);
        }
      } catch (error) {
        retries++;

        if (retries > maxRetries) {
          errors.push({ batch, error, retries });
          failedItems.push(...batch);
          console.error(`Пакет ${i + 1} неудачен после ${maxRetries} попыток:`, error);
        } else if (retryFailedBatches) {
          console.log(`Повтор пакета ${i + 1} (попытка ${retries}/${maxRetries})`);
          await sleep(1000 * retries); // Экспоненциальная задержка
        }
      }
    }
  }

  return {
    successful: results,
    failed: failedItems,
    errors,
    totalProcessed: results.length,
    totalFailed: failedItems.length,
    successRate: (results.length / items.length) * 100
  };
}

// Использование с отслеживанием прогресса
const result = await robustBatchProcess(
  allProducts,
  50,
  (batch) => sdk.products.updateCards(batch),
  {
    retryFailedBatches: true,
    maxRetries: 3,
    onProgress: (processed, total, errors) => {
      const progress = ((processed / total) * 100).toFixed(1);
      console.log(`Прогресс: ${processed}/${total} (${progress}%) - Ошибок: ${errors}`);
    }
  }
);

console.log(`\nПакетная обработка завершена:`);
console.log(`  Успешно: ${result.totalProcessed}`);
console.log(`  Неудачно: ${result.totalFailed}`);
console.log(`  Успешность: ${result.successRate.toFixed(2)}%`);

// Повтор неудачных элементов индивидуально
if (result.failed.length > 0) {
  console.log(`\nПовтор ${result.failed.length} неудачных элементов индивидуально...`);
  // Обработка неудачных элементов по одному с более агрессивным повтором
}
```

### Сравнение производительности: Пакетная vs Последовательная

```typescript
async function comparePerformance(items: any[], batchSize: number) {
  console.log(`Сравнение производительности для ${items.length} элементов:\n`);

  // Последовательная обработка
  const seqStart = performance.now();
  for (const item of items) {
    await sdk.products.updateCard(item);
  }
  const seqEnd = performance.now();
  const seqTime = (seqEnd - seqStart) / 1000;

  console.log(`Последовательная обработка:`);
  console.log(`  Время: ${seqTime.toFixed(2)}с`);
  console.log(`  Пропускная способность: ${(items.length / seqTime).toFixed(2)} элементов/с`);
  console.log(`  API вызовов: ${items.length}`);

  // Пакетная обработка
  const batchStart = performance.now();
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await sdk.products.updateCards(batch);
  }
  const batchEnd = performance.now();
  const batchTime = (batchEnd - batchStart) / 1000;

  console.log(`\nПакетная обработка (размер=${batchSize}):`);
  console.log(`  Время: ${batchTime.toFixed(2)}с`);
  console.log(`  Пропускная способность: ${(items.length / batchTime).toFixed(2)} элементов/с`);
  console.log(`  API вызовов: ${Math.ceil(items.length / batchSize)}`);

  const speedup = seqTime / batchTime;
  console.log(`\nУскорение: в ${speedup.toFixed(2)}x быстрее`);
  console.log(`Время сэкономлено: ${(seqTime - batchTime).toFixed(2)}с`);
  console.log(`API вызовы сокращены: ${items.length - Math.ceil(items.length / batchSize)} ` +
              `(${(((items.length - Math.ceil(items.length / batchSize)) / items.length) * 100).toFixed(1)}%)`);
}

// Выполнение сравнения
const testProducts = Array(100).fill({}).map((_, i) => ({
  nmID: 10000 + i,
  price: 1000 + i * 10
}));

await comparePerformance(testProducts, 50);

// Ожидаемый вывод:
// Последовательная: 25.3с, 3.95 элементов/с, 100 API вызовов
// Пакетная: 1.2с, 83.33 элементов/с, 2 API вызова
// Ускорение: в 21.08x быстрее, Время сэкономлено: 24.1с, API вызовы сокращены: 98 (98%)
```

---

## Стратегии кэширования

Кэширование сокращает API вызовы, улучшает время отклика и снижает нагрузку на серверы Wildberries.

### Идентификация кэшируемых ответов

**Хорошие кандидаты для кэширования**:
- ✅ **Справочные данные**: Категории, тарифы, списки складов (редко изменяются)
- ✅ **Детали товаров**: Карточки товаров, описания (изменяются максимум раз в день)
- ✅ **Конфигурация**: Настройки API, лимиты запросов (статичные)

**Плохие кандидаты для кэширования**:
- ❌ **Данные реального времени**: Статусы заказов, уровни остатков (часто изменяются)
- ❌ **Пользовательские данные**: Балансы, транзакции (требуют свежих данных)
- ❌ **Чувствительные ко времени**: Аналитика, отчеты (могут устареть)

**Рекомендации по TTL кэша**:

| Тип данных | TTL | Обоснование |
|------------|-----|-------------|
| **Категории** | 24 часа | Редко изменяются |
| **Карточки товаров** | 1 час | Периодически обновляются |
| **Цены** | 15 минут | Могут меняться для акций |
| **Уровни остатков** | 5 минут | Инвентарь реального времени |
| **Статус заказа** | 30 секунд | Часто обновляется |
| **Тарифы** | 7 дней | Очень стабильны |

### Кэширование в памяти

Лучше всего для развертывания на одном сервере с умеренным объемом данных.

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 300, // По умолчанию 5 минут
  checkperiod: 60, // Проверка истекших ключей каждые 60 секунд
  useClones: false // Возврат ссылок (быстрее, но осторожно с мутациями)
});

// Базовая обертка кэширования
async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Сначала проверить кэш
  const cached = cache.get<T>(key);
  if (cached !== undefined) {
    console.log(`Cache HIT: ${key}`);
    return cached;
  }

  // Промах кэша - получить из API
  console.log(`Cache MISS: ${key}`);
  const data = await fetcher();
  cache.set(key, data, ttl);
  return data;
}

// Примеры использования
async function getCategories() {
  return withCache(
    'categories:all',
    () => sdk.products.getParentAll(),
    86400 // 24 часа
  );
}

async function getProductDetails(nmID: string) {
  return withCache(
    `product:${nmID}`,
    () => sdk.products.getCardByNM({ nmID }),
    3600 // 1 час
  );
}

async function getProductPrice(nmID: string) {
  return withCache(
    `price:${nmID}`,
    () => sdk.products.getPriceInfo({ nmID }),
    900 // 15 минут
  );
}
```

### Кэширование Redis

Лучше всего для распределенных систем, нескольких серверов или больших объемов данных.

```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

// Обертка кэша Redis с JSON сериализацией
async function withRedisCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number
): Promise<T> {
  // Проверить кэш Redis
  const cached = await redis.get(key);
  if (cached) {
    console.log(`Redis HIT: ${key}`);
    return JSON.parse(cached);
  }

  // Промах кэша - получить из API
  console.log(`Redis MISS: ${key}`);
  const data = await fetcher();

  // Сохранить в Redis с TTL
  await redis.setex(key, ttlSeconds, JSON.stringify(data));

  return data;
}

// Использование с пространствами имен
const CACHE_PREFIX = 'wb:sdk:v1';

async function getCategoriesRedis() {
  return withRedisCache(
    `${CACHE_PREFIX}:categories:all`,
    () => sdk.products.getParentAll(),
    86400 // 24 часа
  );
}

async function getProductDetailsRedis(nmID: string) {
  return withRedisCache(
    `${CACHE_PREFIX}:product:${nmID}`,
    () => sdk.products.getCardByNM({ nmID }),
    3600 // 1 час
  );
}
```

### Стратегии инвалидации кэша

**Истечение по времени (TTL)**:
- Простейший подход: кэш истекает после TTL
- Не требуется ручная инвалидация
- Может отдавать устаревшие данные до истечения TTL

**Инвалидация на основе событий**:
- Инвалидация кэша при изменении данных
- Требует отслеживания мутаций

```typescript
class SmartCache {
  private cache = new NodeCache();

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    const cached = this.cache.get<T>(key);
    if (cached !== undefined) return cached;

    const data = await fetcher();
    this.cache.set(key, data, ttl);
    return data;
  }

  // Инвалидация конкретного ключа
  invalidate(key: string): void {
    this.cache.del(key);
  }

  // Инвалидация по паттерну (совпадение префикса)
  invalidatePattern(pattern: string): void {
    const keys = this.cache.keys();
    const matchingKeys = keys.filter(k => k.includes(pattern));
    matchingKeys.forEach(k => this.cache.del(k));
  }

  // Очистка всего кэша
  clear(): void {
    this.cache.flushAll();
  }
}

const smartCache = new SmartCache();

// Получение товара (с кэшированием)
const product = await smartCache.get(
  `product:${nmID}`,
  () => sdk.products.getCardByNM({ nmID }),
  3600
);

// Обновление товара (инвалидация кэша)
await sdk.products.updateCard({ nmID, price: newPrice });
smartCache.invalidate(`product:${nmID}`);
smartCache.invalidate(`price:${nmID}`); // Также инвалидировать кэш цен

// Массовое обновление (инвалидация всех товаров)
await sdk.products.updateCards(products);
smartCache.invalidatePattern('product:'); // Инвалидировать все кэши товаров
```

### Прогрев кэша

Предварительная загрузка часто используемых данных для избежания промахов кэша:

```typescript
async function warmCache() {
  console.log('Прогрев кэша...');

  // Предварительная загрузка категорий
  await smartCache.get(
    'categories:all',
    () => sdk.products.getParentAll(),
    86400
  );

  // Предварительная загрузка топ 100 товаров
  const topProductIds = await getTopProductIds(); // Из аналитики
  await Promise.all(
    topProductIds.map(nmID =>
      smartCache.get(
        `product:${nmID}`,
        () => sdk.products.getCardByNM({ nmID }),
        3600
      )
    )
  );

  // Предварительная загрузка тарифов
  await smartCache.get(
    'tariffs:box',
    () => sdk.tariffs.getBoxTariffs(),
    604800 // 7 дней
  );

  console.log('Прогрев кэша завершен');
}

// Запуск при старте приложения
warmCache().catch(console.error);

// Периодический прогрев кэша
setInterval(() => {
  warmCache().catch(console.error);
}, 3600000); // Каждый час
```

### Мониторинг коэффициента попаданий в кэш

Отслеживание эффективности кэша:

```typescript
class MonitoredCache {
  private cache = new NodeCache();
  private hits = 0;
  private misses = 0;

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    const cached = this.cache.get<T>(key);

    if (cached !== undefined) {
      this.hits++;
      return cached;
    }

    this.misses++;
    const data = await fetcher();
    this.cache.set(key, data, ttl);
    return data;
  }

  getStats() {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      total,
      hitRate: total > 0 ? (this.hits / total) * 100 : 0,
      cacheSize: this.cache.keys().length
    };
  }

  resetStats() {
    this.hits = 0;
    this.misses = 0;
  }
}

const monitoredCache = new MonitoredCache();

// Использование кэша
await monitoredCache.get('key1', fetcher1, 300);
await monitoredCache.get('key2', fetcher2, 300);
await monitoredCache.get('key1', fetcher1, 300); // Попадание в кэш

// Получение статистики
const stats = monitoredCache.getStats();
console.log('Статистика кэша:');
console.log(`  Попадания: ${stats.hits}`);
console.log(`  Промахи: ${stats.misses}`);
console.log(`  Коэффициент попаданий: ${stats.hitRate.toFixed(2)}%`);
console.log(`  Размер кэша: ${stats.cacheSize} ключей`);

// Цель: >80% коэффициент попаданий для продакшен нагрузок
```

### HTTP заголовки кэша

Некоторые эндпоинты поддерживают HTTP кэширование через заголовки `Cache-Control`:

```typescript
// Настройка SDK для учета заголовков кэша
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  cacheOptions: {
    respectCacheHeaders: true,
    defaultTTL: 300
  }
});

// SDK автоматически кэширует ответы с соответствующими заголовками Cache-Control
const categories = await sdk.products.getParentAll();
// Заголовки ответа: Cache-Control: public, max-age=86400

// Последующие вызовы в течение 24 часов будут использовать кэшированный ответ
const categoriesAgain = await sdk.products.getParentAll(); // Кэшировано
```

---

## Пулинг соединений

HTTP пулинг соединений снижает задержку, переиспользуя TCP соединения вместо создания новых для каждого запроса.

### Понимание накладных расходов соединения

**Без Keep-Alive** (новое соединение на запрос):
- TCP handshake: ~50-100ms
- TLS handshake: ~100-200ms
- Общие накладные расходы: ~150-300ms на запрос

**С Keep-Alive** (переиспользование соединения):
- Первый запрос: ~150-300ms (установка соединения)
- Последующие запросы: ~50-100ms (переиспользование соединения)
- **Экономия**: ~100-200ms на запрос (на 50-67% быстрее)

### Конфигурация HTTP Agent

```typescript
import http from 'http';
import https from 'https';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Создание кастомных агентов с оптимизированными настройками
const httpAgent = new http.Agent({
  keepAlive: true, // Переиспользование соединений
  keepAliveMsecs: 30000, // Поддержка соединения 30 секунд
  maxSockets: 50, // Максимум конкурентных соединений
  maxFreeSockets: 10, // Максимум простаивающих соединений для хранения
  timeout: 60000, // Таймаут соединения (60 секунд)
  scheduling: 'fifo' // Планирование сокетов first-in-first-out
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 60000,
  scheduling: 'fifo'
});

// Настройка SDK с кастомными агентами
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpAgent,
  httpsAgent
});

// Теперь все запросы SDK будут использовать пулинг соединений
```

### Определение размера пула соединений

**Формула**:
```
maxSockets = (ожидаемые конкурентные запросы) × (коэффициент безопасности)
maxFreeSockets = maxSockets / 5
```

**Примеры**:

| Случай использования | Конкурентные запросы | maxSockets | maxFreeSockets |
|----------------------|---------------------|------------|----------------|
| **Легкий** (один пользователь) | 5-10 | 20 | 4 |
| **Средний** (API интеграция) | 20-50 | 100 | 20 |
| **Тяжелый** (массовая обработка) | 100-200 | 300 | 60 |
| **Очень тяжелый** (синхронизация данных) | 500+ | 1000 | 200 |

```typescript
// Конфигурация для легкого использования
const lightAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 20,
  maxFreeSockets: 4
});

// Конфигурация для тяжелого использования
const heavyAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 300,
  maxFreeSockets: 60,
  keepAliveMsecs: 60000 // Дольше хранить соединения
});

// Выбор на основе вашей нагрузки
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpsAgent: heavyAgent // Для массовой обработки
});
```

### Мониторинг соединений

Отслеживание использования пула соединений:

```typescript
import { performance } from 'perf_hooks';

class ConnectionMonitor {
  private activeConnections = 0;
  private totalRequests = 0;
  private reuseCount = 0;

  trackRequest(reused: boolean) {
    this.totalRequests++;
    if (reused) {
      this.reuseCount++;
    } else {
      this.activeConnections++;
    }
  }

  releaseConnection() {
    this.activeConnections--;
  }

  getStats() {
    return {
      active: this.activeConnections,
      totalRequests: this.totalRequests,
      reuseRate: (this.reuseCount / this.totalRequests) * 100
    };
  }
}

const monitor = new ConnectionMonitor();

// Обертка SDK клиента для отслеживания соединений
const originalRequest = sdk.client.request;
sdk.client.request = async function(...args) {
  const socket = this.getActiveSocket(); // Проверка переиспользования существующего соединения
  monitor.trackRequest(socket !== null);

  try {
    const result = await originalRequest.apply(this, args);
    return result;
  } finally {
    if (!socket) {
      monitor.releaseConnection();
    }
  }
};

// Периодическая проверка статистики
setInterval(() => {
  const stats = monitor.getStats();
  console.log(`Соединения: ${stats.active} активных, ` +
              `${stats.totalRequests} всего запросов, ` +
              `${stats.reuseRate.toFixed(1)}% переиспользование`);

  // Цель: >90% коэффициент переиспользования для стабильных нагрузок
}, 60000); // Каждую минуту
```

### Обнаружение утечек соединений

Обнаружение и исправление утечек соединений:

```typescript
class ConnectionLeakDetector {
  private sockets = new Map<any, { createdAt: number; stack: string }>();
  private maxAge = 300000; // 5 минут

  registerSocket(socket: any) {
    this.sockets.set(socket, {
      createdAt: Date.now(),
      stack: new Error().stack || ''
    });
  }

  unregisterSocket(socket: any) {
    this.sockets.delete(socket);
  }

  detectLeaks(): Array<{ age: number; stack: string }> {
    const now = Date.now();
    const leaks: Array<{ age: number; stack: string }> = [];

    for (const [socket, info] of this.sockets) {
      const age = now - info.createdAt;
      if (age > this.maxAge) {
        leaks.push({ age, stack: info.stack });
        console.warn(`Обнаружена потенциальная утечка соединения: ${age}ms старости`);
      }
    }

    return leaks;
  }
}

const detector = new ConnectionLeakDetector();

// Мониторинг утечек каждую минуту
setInterval(() => {
  const leaks = detector.detectLeaks();
  if (leaks.length > 0) {
    console.error(`⚠️  Обнаружено ${leaks.length} утечек соединений!`);
    leaks.forEach((leak, i) => {
      console.error(`  Утечка ${i + 1}: ${leak.age}ms старости`);
      console.error(`  Трассировка стека:\n${leak.stack}`);
    });
  }
}, 60000);
```

---

## Управление памятью

Правильное управление памятью предотвращает утечки, снижает давление сборки мусора и обеспечивает стабильную долгосрочную производительность.

### Профилирование памяти

Мониторинг использования памяти в продакшене:

```typescript
function getMemoryStats() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024), // Размер резидентного набора (MB)
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024),
    arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024)
  };
}

// Периодическое логирование использования памяти
setInterval(() => {
  const stats = getMemoryStats();
  console.log(`Память: RSS=${stats.rss}MB, Heap=${stats.heapUsed}/${stats.heapTotal}MB`);

  // Алерт при высоком использовании памяти
  if (stats.heapUsed > 400) {
    console.warn('⚠️  Обнаружено высокое использование памяти!');
  }
}, 60000); // Каждую минуту
```

### Настройка сборки мусора

Оптимизация сборки мусора для вашей нагрузки:

```bash
# Увеличение размера heap для приложений с высоким использованием памяти
node --max-old-space-size=4096 app.js  # heap 4GB

# Оптимизация GC для низкой задержки (более частые, короткие паузы)
node --optimize-for-size --max-old-space-size=2048 app.js

# Включение логирования GC для анализа поведения
node --trace-gc app.js

# Продвинуто: Настройка параметров GC
node --max-old-space-size=4096 \
     --initial-old-space-size=2048 \
     --max-semi-space-size=128 \
     app.js
```

**Мониторинг GC**:

```typescript
// Экспорт статистики GC (требует флаг --expose-gc)
if (global.gc) {
  let gcCount = 0;
  let gcTime = 0;

  const originalGC = global.gc;
  global.gc = function() {
    const start = performance.now();
    originalGC();
    const end = performance.now();

    gcCount++;
    gcTime += (end - start);

    console.log(`GC #${gcCount}: ${(end - start).toFixed(2)}ms ` +
                `(всего: ${gcTime.toFixed(2)}ms)`);
  };
}

// Запуск ручной GC после тяжелых операций
async function processBulkData() {
  // ... тяжелая обработка ...

  if (global.gc) {
    console.log('Запуск ручной GC после массовой обработки');
    global.gc();
  }
}
```

### Предотвращение утечек памяти

Распространенные паттерны утечек памяти и исправления:

#### 1. Утечки слушателей событий

```typescript
// ❌ ПЛОХО: Слушатели событий никогда не удаляются
class BadService {
  constructor(private sdk: WildberriesSDK) {
    // Утечка: слушатель никогда не удаляется
    sdk.on('request', () => {
      console.log('Запрос выполнен');
    });
  }
}

// ✅ ХОРОШО: Очистка слушателей событий
class GoodService {
  private listener: () => void;

  constructor(private sdk: WildberriesSDK) {
    this.listener = () => console.log('Запрос выполнен');
    sdk.on('request', this.listener);
  }

  destroy() {
    this.sdk.off('request', this.listener);
  }
}
```

#### 2. Утечки таймеров

```typescript
// ❌ ПЛОХО: Таймеры никогда не очищаются
function badPolling() {
  const data = new Array(1000000).fill('leak');
  setInterval(() => {
    console.log(data.length); // Держит `data` в памяти навсегда
  }, 1000);
}

// ✅ ХОРОШО: Очистка таймеров когда закончили
class GoodPolling {
  private interval: NodeJS.Timeout | null = null;

  start() {
    this.interval = setInterval(() => {
      // ... логика опроса ...
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
```

#### 3. Утечки замыканий

```typescript
// ❌ ПЛОХО: Замыкание держит большие данные
function badClosure() {
  const largeData = new Array(1000000).fill('data');

  return function() {
    console.log(largeData.length); // Держит largeData навсегда
  };
}

// ✅ ХОРОШО: Замыкание только над необходимым
function goodClosure() {
  const largeData = new Array(1000000).fill('data');
  const length = largeData.length; // Извлечь только необходимое

  return function() {
    console.log(length); // Держит только `length`, не весь массив
  };
}
```

#### 4. Утечки кэша

```typescript
// ❌ ПЛОХО: Неограниченный рост кэша
const badCache = new Map();

async function badGetData(key: string) {
  if (!badCache.has(key)) {
    const data = await fetchData(key);
    badCache.set(key, data); // Никогда не вытесняется!
  }
  return badCache.get(key);
}

// ✅ ХОРОШО: LRU кэш с ограничением размера
import LRU from 'lru-cache';

const goodCache = new LRU({
  max: 500, // Максимум 500 элементов
  maxSize: 100 * 1024 * 1024, // Максимум 100MB
  sizeCalculation: (value) => JSON.stringify(value).length,
  ttl: 1000 * 60 * 5 // 5 минут
});

async function goodGetData(key: string) {
  let data = goodCache.get(key);
  if (!data) {
    data = await fetchData(key);
    goodCache.set(key, data);
  }
  return data;
}
```

### Обнаружение утечек памяти

Использование снимков heap для обнаружения утечек:

```typescript
import v8 from 'v8';
import fs from 'fs';

function takeHeapSnapshot(filename: string) {
  const snapshotStream = v8.writeHeapSnapshot(filename);
  console.log(`Снимок heap записан в ${filename}`);
  return snapshotStream;
}

// Снятие снимков до и после операций
takeHeapSnapshot('before.heapsnapshot');

// ... запуск вашего кода ...

takeHeapSnapshot('after.heapsnapshot');

// Сравнение снимков в Chrome DevTools:
// 1. Открыть Chrome DevTools
// 2. Перейти на вкладку Memory
// 3. Загрузить оба снимка
// 4. Сравнить для поиска удерживаемых объектов
```

### Лучшие практики

1. **Использование потоков для больших данных**
```typescript
// ❌ ПЛОХО: Загрузка всего ответа в память
const data = await sdk.reports.downloadLarge();
processData(data); // Может вызвать OOM

// ✅ ХОРОШО: Потоковая передача больших ответов
const stream = await sdk.reports.downloadLargeStream();
stream.pipe(processStream);
```

2. **Ограничение конкурентных операций**
```typescript
// ❌ ПЛОХО: Обработка всех элементов конкурентно (скачок памяти)
await Promise.all(
  items.map(item => processItem(item))
);

// ✅ ХОРОШО: Обработка пакетами (контролируемое использование памяти)
for (let i = 0; i < items.length; i += 10) {
  const batch = items.slice(i, i + 10);
  await Promise.all(batch.map(item => processItem(item)));
}
```

3. **Очистка ссылок когда закончили**
```typescript
// ❌ ПЛОХО: Сохранение ссылок после использования
let cachedData = await fetchLargeData();
// ... использование данных ...
// cachedData всё еще в памяти

// ✅ ХОРОШО: Очистка ссылок
let cachedData = await fetchLargeData();
// ... использование данных ...
cachedData = null; // Разрешить GC собрать
```

---

## Мониторинг производительности

Комплексная настройка мониторинга для промышленных развертываний.

### Метрики Prometheus

Экспорт метрик SDK для скрейпинга Prometheus:

```typescript
import { Registry, Histogram, Counter, Gauge } from 'prom-client';
import express from 'express';

// Создание реестра Prometheus
const register = new Registry();

// Определение метрик
const httpRequestDuration = new Histogram({
  name: 'wb_sdk_http_request_duration_seconds',
  help: 'Длительность HTTP запроса в секундах',
  labelNames: ['method', 'endpoint', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Кастомные корзины
  registers: [register]
});

const httpRequestTotal = new Counter({
  name: 'wb_sdk_http_requests_total',
  help: 'Всего HTTP запросов',
  labelNames: ['method', 'endpoint', 'status'],
  registers: [register]
});

const httpRequestErrors = new Counter({
  name: 'wb_sdk_http_request_errors_total',
  help: 'Всего ошибок HTTP запросов',
  labelNames: ['method', 'endpoint', 'error_type'],
  registers: [register]
});

const activeConnections = new Gauge({
  name: 'wb_sdk_active_connections',
  help: 'Количество активных HTTP соединений',
  registers: [register]
});

const cacheHitRate = new Gauge({
  name: 'wb_sdk_cache_hit_rate',
  help: 'Процент попаданий в кэш',
  labelNames: ['cache_type'],
  registers: [register]
});

const rateLimitUtilization = new Gauge({
  name: 'wb_sdk_rate_limit_utilization',
  help: 'Процент использования лимита запросов',
  labelNames: ['endpoint'],
  registers: [register]
});

// Инструментирование запросов SDK
sdk.on('request', ({ method, url, startTime }) => {
  activeConnections.inc();

  sdk.on('response', ({ method, url, status, startTime }) => {
    const duration = (Date.now() - startTime) / 1000;

    httpRequestDuration.observe({ method, endpoint: url, status }, duration);
    httpRequestTotal.inc({ method, endpoint: url, status });
    activeConnections.dec();
  });

  sdk.on('error', ({ method, url, error }) => {
    httpRequestErrors.inc({ method, endpoint: url, error_type: error.name });
    activeConnections.dec();
  });
});

// Экспорт эндпоинта метрик
const app = express();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(9090, () => {
  console.log('Сервер метрик слушает на порту 9090');
  console.log('Метрики доступны на http://localhost:9090/metrics');
});
```

### Дашборд Grafana

Создание дашборда Grafana для метрик SDK:

```json
{
  "dashboard": {
    "title": "Производительность Wildberries SDK",
    "tags": ["wildberries", "sdk", "performance"],
    "timezone": "browser",
    "panels": [
      {
        "title": "Задержка API запросов (p95)",
        "type": "graph",
        "gridPos": { "x": 0, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum(rate(wb_sdk_http_request_duration_seconds_bucket[5m])) by (le, endpoint))",
            "legendFormat": "{{endpoint}} p95"
          }
        ],
        "yaxes": [
          { "format": "s", "label": "Задержка" }
        ],
        "alert": {
          "conditions": [
            {
              "evaluator": { "params": [1], "type": "gt" },
              "query": { "params": ["A", "5m", "now"] },
              "type": "query"
            }
          ],
          "frequency": "1m",
          "handler": 1,
          "message": "Задержка API p95 превысила 1 секунду",
          "name": "Высокая задержка API"
        }
      },
      {
        "title": "Скорость запросов",
        "type": "graph",
        "gridPos": { "x": 12, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "sum(rate(wb_sdk_http_requests_total[5m])) by (endpoint)",
            "legendFormat": "{{endpoint}}"
          }
        ],
        "yaxes": [
          { "format": "reqps", "label": "Запросов/сек" }
        ]
      },
      {
        "title": "Уровень ошибок",
        "type": "graph",
        "gridPos": { "x": 0, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "sum(rate(wb_sdk_http_request_errors_total[5m])) by (error_type)",
            "legendFormat": "{{error_type}}"
          }
        ],
        "yaxes": [
          { "format": "short", "label": "Ошибок/сек" }
        ],
        "alert": {
          "conditions": [
            {
              "evaluator": { "params": [10], "type": "gt" },
              "query": { "params": ["A", "5m", "now"] },
              "type": "query"
            }
          ],
          "frequency": "1m",
          "handler": 1,
          "message": "Обнаружен высокий уровень ошибок",
          "name": "Высокий уровень ошибок"
        }
      },
      {
        "title": "Коэффициент попаданий в кэш",
        "type": "graph",
        "gridPos": { "x": 12, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "wb_sdk_cache_hit_rate",
            "legendFormat": "{{cache_type}}"
          }
        ],
        "yaxes": [
          { "format": "percent", "label": "Коэффициент попаданий %" }
        ]
      },
      {
        "title": "Активные соединения",
        "type": "graph",
        "gridPos": { "x": 0, "y": 16, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "wb_sdk_active_connections",
            "legendFormat": "Активные"
          }
        ],
        "yaxes": [
          { "format": "short", "label": "Соединения" }
        ]
      },
      {
        "title": "Использование лимита запросов",
        "type": "graph",
        "gridPos": { "x": 12, "y": 16, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "wb_sdk_rate_limit_utilization",
            "legendFormat": "{{endpoint}}"
          }
        ],
        "yaxes": [
          { "format": "percent", "label": "Использование %" }
        ],
        "alert": {
          "conditions": [
            {
              "evaluator": { "params": [90], "type": "gt" },
              "query": { "params": ["A", "5m", "now"] },
              "type": "query"
            }
          ],
          "frequency": "1m",
          "handler": 1,
          "message": "Использование лимита запросов выше 90%",
          "name": "Высокое использование лимита запросов"
        }
      }
    ]
  }
}
```

### Правила алертинга

Определение правил алертинга Prometheus:

```yaml
# prometheus-alerts.yml
groups:
  - name: wildberries_sdk
    interval: 1m
    rules:
      # Алерт высокой задержки
      - alert: HighAPILatency
        expr: histogram_quantile(0.95, rate(wb_sdk_http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Обнаружена высокая задержка API"
          description: "Задержка p95 составляет {{ $value }}с (порог: 1с)"

      # Алерт высокого уровня ошибок
      - alert: HighErrorRate
        expr: rate(wb_sdk_http_request_errors_total[5m]) > 10
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Обнаружен высокий уровень ошибок"
          description: "Уровень ошибок {{ $value }} ошибок/сек (порог: 10/сек)"

      # Низкий коэффициент попаданий в кэш
      - alert: LowCacheHitRate
        expr: wb_sdk_cache_hit_rate < 50
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Низкий коэффициент попаданий в кэш"
          description: "Коэффициент попаданий в кэш {{ $value }}% (порог: 50%)"

      # Высокое использование лимита запросов
      - alert: HighRateLimitUsage
        expr: wb_sdk_rate_limit_utilization > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Высокое использование лимита запросов"
          description: "Использование лимита {{ $value }}% для {{ $labels.endpoint }}"

      # Алерт использования памяти
      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes > 500 * 1024 * 1024
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Высокое использование памяти"
          description: "Использование памяти {{ $value | humanize }}B (порог: 500MB)"
```

### Мониторинг производительности приложений (APM)

Интеграция с инструментами APM для детальной информации:

```typescript
// Интеграция New Relic
import newrelic from 'newrelic';

sdk.on('request', ({ method, url }) => {
  newrelic.startWebTransaction(url, async () => {
    // Транзакция автоматически отслеживается
  });
});

// Интеграция DataDog
import tracer from 'dd-trace';
tracer.init();

const span = tracer.startSpan('wb.sdk.request');
span.setTag('method', method);
span.setTag('endpoint', url);

// ... выполнение запроса ...

span.finish();

// Интеграция Sentry для отслеживания ошибок
import * as Sentry from '@sentry/node';

sdk.on('error', ({ error, context }) => {
  Sentry.captureException(error, {
    extra: context
  });
});
```

---

## Скрипты бенчмаркинга

Комплексный набор для бенчмаркинга для тестирования производительности SDK.

### Установка

Создание скриптов бенчмаркинга в директории `scripts/`:

```bash
# Установка зависимостей
npm install --save-dev autocannon clinic
```

### Базовый бенчмарк задержки

```typescript
// scripts/benchmark-latency.ts
import { WildberriesSDK } from '../src';
import { performance } from 'perf_hooks';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

interface LatencyResult {
  p50: number;
  p95: number;
  p99: number;
  avg: number;
  min: number;
  max: number;
}

async function benchmarkLatency(
  name: string,
  operation: () => Promise<any>,
  iterations: number = 100
): Promise<LatencyResult> {
  console.log(`\n📊 Бенчмаркинг: ${name}`);
  console.log(`   Итераций: ${iterations}`);

  const latencies: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await operation();
    const end = performance.now();
    latencies.push(end - start);

    if ((i + 1) % 10 === 0) {
      process.stdout.write(`\r   Прогресс: ${i + 1}/${iterations}`);
    }
  }

  console.log(); // Новая строка

  latencies.sort((a, b) => a - b);

  const result = {
    p50: latencies[Math.floor(iterations * 0.5)],
    p95: latencies[Math.floor(iterations * 0.95)],
    p99: latencies[Math.floor(iterations * 0.99)],
    avg: latencies.reduce((a, b) => a + b, 0) / iterations,
    min: latencies[0],
    max: latencies[latencies.length - 1]
  };

  console.log(`   Результаты:`);
  console.log(`     p50: ${result.p50.toFixed(2)}ms`);
  console.log(`     p95: ${result.p95.toFixed(2)}ms`);
  console.log(`     p99: ${result.p99.toFixed(2)}ms`);
  console.log(`     avg: ${result.avg.toFixed(2)}ms`);
  console.log(`     min: ${result.min.toFixed(2)}ms`);
  console.log(`     max: ${result.max.toFixed(2)}ms`);

  return result;
}

async function main() {
  console.log('🚀 Бенчмарки задержки SDK\n');
  console.log(`Версия SDK: ${sdk.version}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Платформа: ${process.platform} ${process.arch}`);

  const results: Record<string, LatencyResult> = {};

  // Бенчмарк модуля General
  results.ping = await benchmarkLatency(
    'General.ping()',
    () => sdk.general.ping(),
    100
  );

  // Бенчмарк модуля Products
  results.getCategories = await benchmarkLatency(
    'Products.getParentAll()',
    () => sdk.products.getParentAll(),
    50
  );

  // Бенчмарк модуля Orders
  results.getNewOrders = await benchmarkLatency(
    'OrdersFBS.getNewOrders()',
    () => sdk.ordersFBS.getNewOrders(),
    50
  );

  console.log('\n📈 Сводка:');
  console.log('\n| Эндпоинт | p50 | p95 | p99 | avg |');
  console.log('|----------|-----|-----|-----|-----|');
  Object.entries(results).forEach(([name, result]) => {
    console.log(`| ${name} | ${result.p50.toFixed(0)}ms | ${result.p95.toFixed(0)}ms | ${result.p99.toFixed(0)}ms | ${result.avg.toFixed(0)}ms |`);
  });

  console.log('\n✅ Бенчмарки завершены!');
}

main().catch(console.error);
```

### Бенчмарк пропускной способности

```typescript
// scripts/benchmark-throughput.ts
import { WildberriesSDK } from '../src';
import { performance } from 'perf_hooks';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

interface ThroughputResult {
  duration: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  requestsPerSecond: number;
  avgLatency: number;
  p95Latency: number;
}

async function benchmarkThroughput(
  name: string,
  operation: () => Promise<any>,
  durationMs: number = 10000
): Promise<ThroughputResult> {
  console.log(`\n📊 Бенчмарк пропускной способности: ${name}`);
  console.log(`   Длительность: ${durationMs / 1000}с`);

  const startTime = Date.now();
  const latencies: number[] = [];
  let successful = 0;
  let failed = 0;

  while (Date.now() - startTime < durationMs) {
    const reqStart = performance.now();
    try {
      await operation();
      const reqEnd = performance.now();
      latencies.push(reqEnd - reqStart);
      successful++;
    } catch (error) {
      failed++;
    }

    if ((successful + failed) % 10 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r   Прошло: ${elapsed}с, Запросов: ${successful + failed}`);
    }
  }

  console.log(); // Новая строка

  const actualDuration = Date.now() - startTime;
  const totalRequests = successful + failed;

  latencies.sort((a, b) => a - b);

  const result = {
    duration: actualDuration / 1000,
    totalRequests,
    successfulRequests: successful,
    failedRequests: failed,
    requestsPerSecond: totalRequests / (actualDuration / 1000),
    avgLatency: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    p95Latency: latencies[Math.floor(latencies.length * 0.95)]
  };

  console.log(`   Результаты:`);
  console.log(`     Пропускная способность: ${result.requestsPerSecond.toFixed(2)} req/s`);
  console.log(`     Всего запросов: ${result.totalRequests}`);
  console.log(`     Успешных: ${result.successfulRequests}`);
  console.log(`     Неудачных: ${result.failedRequests}`);
  console.log(`     Уровень ошибок: ${((failed / totalRequests) * 100).toFixed(2)}%`);
  console.log(`     Средняя задержка: ${result.avgLatency.toFixed(2)}ms`);
  console.log(`     p95 задержка: ${result.p95Latency.toFixed(2)}ms`);

  return result;
}

async function main() {
  console.log('🚀 Бенчмарки пропускной способности SDK\n');

  const results: Record<string, ThroughputResult> = {};

  // Бенчмарк устойчивой пропускной способности
  results.ping = await benchmarkThroughput(
    'General.ping()',
    () => sdk.general.ping(),
    10000 // 10 секунд
  );

  console.log('\n✅ Бенчмарки пропускной способности завершены!');
}

main().catch(console.error);
```

### Бенчмарк памяти

```typescript
// scripts/benchmark-memory.ts
import { WildberriesSDK } from '../src';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

function getMemoryMB() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024),
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024)
  };
}

async function benchmarkMemory(
  name: string,
  operation: () => Promise<any>,
  iterations: number = 1000
) {
  console.log(`\n📊 Бенчмарк памяти: ${name}`);
  console.log(`   Итераций: ${iterations}`);

  // Принудительный GC перед тестом (требует флаг --expose-gc)
  if (global.gc) {
    console.log('   Принудительный GC перед тестом...');
    global.gc();
  }

  const memBefore = getMemoryMB();
  console.log(`   Память до: ${memBefore.heapUsed}MB heap, ${memBefore.rss}MB RSS`);

  // Выполнение операций
  for (let i = 0; i < iterations; i++) {
    await operation();

    if ((i + 1) % 100 === 0) {
      process.stdout.write(`\r   Прогресс: ${i + 1}/${iterations}`);
    }
  }

  console.log(); // Новая строка

  const memAfter = getMemoryMB();
  console.log(`   Память после: ${memAfter.heapUsed}MB heap, ${memAfter.rss}MB RSS`);

  const memDelta = {
    heapUsed: memAfter.heapUsed - memBefore.heapUsed,
    rss: memAfter.rss - memBefore.rss
  };

  console.log(`   Разница памяти: ${memDelta.heapUsed}MB heap, ${memDelta.rss}MB RSS`);
  console.log(`   Накладные расходы на запрос: ${((memDelta.heapUsed * 1024) / iterations).toFixed(2)}KB`);

  // Принудительный GC после теста
  if (global.gc) {
    console.log('   Принудительный GC после теста...');
    global.gc();
  }

  const memAfterGC = getMemoryMB();
  console.log(`   Память после GC: ${memAfterGC.heapUsed}MB heap, ${memAfterGC.rss}MB RSS`);

  const recovered = memAfter.heapUsed - memAfterGC.heapUsed;
  console.log(`   Восстановлено GC: ${recovered}MB (${((recovered / memAfter.heapUsed) * 100).toFixed(1)}%)`);

  if (memAfterGC.heapUsed > memBefore.heapUsed + 10) {
    console.warn(`   ⚠️  Обнаружена потенциальная утечка памяти! ${memAfterGC.heapUsed - memBefore.heapUsed}MB не восстановлено`);
  }
}

async function main() {
  console.log('🚀 Бенчмарки памяти SDK\n');
  console.log('⚠️  Запуск с: node --expose-gc scripts/benchmark-memory.js\n');

  await benchmarkMemory(
    'General.ping()',
    () => sdk.general.ping(),
    1000
  );

  await benchmarkMemory(
    'Products.getParentAll()',
    () => sdk.products.getParentAll(),
    500
  );

  console.log('\n✅ Бенчмарки памяти завершены!');
}

main().catch(console.error);
```

### Запуск бенчмарков

```bash
# Бенчмарки задержки
npm run benchmark:latency

# Бенчмарки пропускной способности
npm run benchmark:throughput

# Бенчмарки памяти (требует --expose-gc)
npm run benchmark:memory

# Запуск всех бенчмарков
npm run benchmark:all
```

Добавить в `package.json`:

```json
{
  "scripts": {
    "benchmark:latency": "tsx scripts/benchmark-latency.ts",
    "benchmark:throughput": "tsx scripts/benchmark-throughput.ts",
    "benchmark:memory": "node --expose-gc --loader tsx scripts/benchmark-memory.ts",
    "benchmark:all": "npm run benchmark:latency && npm run benchmark:throughput && npm run benchmark:memory"
  }
}
```

---

## Чек-лист производительности

Используйте этот чек-лист для обеспечения оптимальной производительности SDK в продакшене.

### Валидация производительности перед развертыванием

- [ ] **Базовые бенчмарки завершены**
  - [ ] Бенчмарки задержки выполнены для всех критических модулей
  - [ ] Бенчмарки пропускной способности завершены
  - [ ] Профилирование памяти выполнено
  - [ ] Утечки памяти не обнаружены
  - [ ] Результаты задокументированы и проверены

- [ ] **Целевые показатели производительности определены**
  - [ ] Целевая задержка p50: `__________ms`
  - [ ] Целевая задержка p95: `__________ms`
  - [ ] Целевая пропускная способность: `__________req/s`
  - [ ] Целевое использование памяти: `__________MB`
  - [ ] Целевой уровень ошибок: `__________%`

- [ ] **Нагрузочное тестирование выполнено**
  - [ ] Тест устойчивой нагрузки (10+ минут)
  - [ ] Тест пиковой нагрузки (внезапное увеличение трафика)
  - [ ] Стресс-тест (за пределами нормальной мощности)
  - [ ] Тест длительности (продолжительность 24+ часа)
  - [ ] Результаты соответствуют целевым показателям

### Конфигурация продакшена

- [ ] **Пулинг соединений включен**
  - [ ] HTTP/HTTPS агенты настроены с keep-alive
  - [ ] `maxSockets` размер под ожидаемую нагрузку
  - [ ] `maxFreeSockets` настроен подходящим образом
  - [ ] Таймаут соединения установлен (рекомендуется 60с)

- [ ] **Стратегия кэширования реализована**
  - [ ] Кэшируемые эндпоинты идентифицированы
  - [ ] TTL кэша настроен для каждого типа эндпоинта
  - [ ] Стратегия инвалидации кэша определена
  - [ ] Коэффициент попаданий в кэш мониторится (цель: >80%)
  - [ ] Прогрев кэша реализован для критических данных

- [ ] **Оптимизация лимитов запросов применена**
  - [ ] Лимиты запросов задокументированы для каждого эндпоинта
  - [ ] Очередь запросов реализована где подходит
  - [ ] Пакетные операции используются для массовой обработки
  - [ ] Параллельные запросы к разным эндпоинтам
  - [ ] Мониторинг лимитов запросов активен

- [ ] **Управление памятью настроено**
  - [ ] Размер heap подходит для нагрузки
  - [ ] Настройка GC применена если необходимо
  - [ ] Обнаружение утечек памяти включено
  - [ ] Мониторинг памяти активен
  - [ ] Автоматические механизмы очистки на месте

### Настройка мониторинга

- [ ] **Сбор метрик активен**
  - [ ] Метрики Prometheus экспортируются
  - [ ] Задержка запросов отслеживается (p50, p95, p99)
  - [ ] Пропускная способность мониторится
  - [ ] Уровень ошибок отслеживается
  - [ ] Использование памяти мониторится
  - [ ] Коэффициент попаданий в кэш отслеживается
  - [ ] Использование лимитов запросов мониторится

- [ ] **Дашборды настроены**
  - [ ] Дашборд Grafana создан
  - [ ] Метрики реального времени видимы
  - [ ] Исторические тренды доступны
  - [ ] Команда имеет доступ к дашбордам

- [ ] **Правила алертинга определены**
  - [ ] Алерт высокой задержки (p95 > 1с)
  - [ ] Алерт высокого уровня ошибок (>1%)
  - [ ] Алерт низкого коэффициента попаданий в кэш (<50%)
  - [ ] Алерт высокого использования лимита запросов (>90%)
  - [ ] Алерт высокого использования памяти (>500MB)
  - [ ] Маршрутизация алертов настроена (email, Slack, PagerDuty)

### Постоянная оптимизация

- [ ] **Регулярные проверки производительности**
  - [ ] Месячные отчеты о производительности
  - [ ] Сравнение бенчмарков (версия к версии)
  - [ ] Идентификация регрессий производительности
  - [ ] Документирование возможностей оптимизации

- [ ] **Оптимизация кэша**
  - [ ] Тренд коэффициента попаданий в кэш
  - [ ] Корректировки TTL по необходимости
  - [ ] Мониторинг размера кэша
  - [ ] Эффективность стратегии инвалидации

- [ ] **Оптимизация лимитов запросов**
  - [ ] Отслеживание использования лимитов запросов
  - [ ] Идентификация узких мест эндпоинтов
  - [ ] Оптимизация паттернов запросов
  - [ ] Рассмотрение повышения лимитов при необходимости

- [ ] **Управление памятью**
  - [ ] Регулярное профилирование памяти
  - [ ] Проверки обнаружения утечек
  - [ ] Корректировки настройки GC
  - [ ] Анализ трендов памяти

---

## Устранение проблем производительности

Распространенные проблемы производительности и решения.

### Проблема: Высокая задержка API

**Симптомы**:
- Задержка p95 > 1000ms
- Медленное время отклика
- Жалобы пользователей на производительность

**Диагностика**:
```typescript
// 1. Измерение задержки по эндпоинтам
const metrics = await measureEndpointLatency();
console.log(metrics);

// 2. Проверка задержки сети
const ping = await sdk.general.ping();
// Если ping медленный, проблема может быть в сети

// 3. Проверка на ограничения скорости
// Поиск 429 ошибок в логах
```

**Решения**:
1. **Включить кэширование** для часто используемых эндпоинтов
2. **Использовать пулинг соединений** для снижения накладных расходов соединения
3. **Реализовать параллельные запросы** для независимых данных
4. **Оптимизировать размеры пакетов** для массовых операций
5. **Проверить сетевую связность** и разрешение DNS
6. **Проверить лимиты запросов API** - может потребоваться более высокий тариф

### Проблема: Низкая пропускная способность

**Симптомы**:
- Запросов в секунду ниже целевого
- Медленная пакетная обработка
- Длительное время в очереди

**Диагностика**:
```typescript
// Проверка использования лимита запросов
const utilization = rateLimitMonitor.getReport();
console.log(utilization);

// Если >90%, лимиты запросов — узкое место
```

**Решения**:
1. **Оптимизировать использование лимита запросов**:
   - Использовать пакетные операции
   - Параллельные запросы к разным эндпоинтам
   - Реализовать интеллектуальную очередь

2. **Увеличить конкурентность**:
   - Настроить `maxSockets` в HTTP агенте
   - Обрабатывать больше элементов параллельно

3. **Снизить накладные расходы на запрос**:
   - Включить пулинг соединений
   - Реализовать кэширование
   - Использовать дедупликацию запросов

### Проблема: Утечки памяти

**Симптомы**:
- Использование памяти растет со временем
- Сбои приложения (OOM)
- GC занимает увеличивающееся время

**Диагностика**:
```typescript
// Создание снимков heap
import v8 from 'v8';
v8.writeHeapSnapshot('before.heapsnapshot');
// ... выполнение операций ...
v8.writeHeapSnapshot('after.heapsnapshot');
// Сравнение в Chrome DevTools
```

**Решения**:
1. **Проверить распространенные паттерны утечек**:
   - Слушатели событий не удалены
   - Таймеры не очищены
   - Замыкания держат большие объекты
   - Неограниченный рост кэша

2. **Реализовать очистку**:
```typescript
// Очистка ресурсов
process.on('exit', () => {
  sdk.destroy(); // Закрыть соединения, очистить кэши
});
```

3. **Использовать ограниченные кэши**:
```typescript
import LRU from 'lru-cache';
const cache = new LRU({ max: 500 }); // Ограничение размера
```

### Проблема: Высокий уровень ошибок

**Симптомы**:
- Уровень ошибок > 1%
- Частые ошибки лимита запросов (429)
- Ошибки аутентификации (401)

**Диагностика**:
```typescript
// Анализ типов ошибок
const errorStats = await getErrorStatistics();
console.log(errorStats);

// Проверка логов на паттерны
```

**Решения**:
1. **Ошибки лимита запросов (429)**:
   - Реализовать очередь запросов
   - Снизить скорость запросов
   - Использовать пакетные операции
   - Проверить мониторинг лимитов запросов

2. **Ошибки аутентификации (401)**:
   - Проверить действительность API ключа
   - Проверить разрешения ключа
   - Ротировать ключи если скомпрометированы

3. **Сетевые ошибки**:
   - Реализовать логику повтора
   - Проверить сетевую связность
   - Увеличить значения таймаутов

---

## Дополнительные ресурсы

- **Документация SDK**: [/docs/api/README.md](/ru/api/README.md)
- **Руководство по лучшим практикам**: [/docs/guides/best-practices.md](/ru/guides/best-practices.md)
- **Примеры**: [/examples/](../../examples/)
- **Документация API Wildberries**: https://dev.wildberries.ru/

---

**Последнее обновление**: 2025-10-26
**Версия**: 1.0.0
**Сопровождающие**: Команда SDK
