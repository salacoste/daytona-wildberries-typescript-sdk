# Performance Optimization

Optimize SDK usage for production workloads.

## Description

This example covers performance optimization techniques for high-throughput production environments.

## Connection Pooling and Keep-Alive

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// The SDK uses axios which maintains connection pooling by default
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000 // Reasonable timeout
});

// Reuse the same SDK instance across your application
export { sdk };
```

## Request Deduplication

```typescript
class RequestDeduplicator {
  private pending: Map<string, Promise<unknown>> = new Map();

  async dedupe<T>(
    key: string,
    operation: () => Promise<T>
  ): Promise<T> {
    // Return existing promise if same request is in flight
    if (this.pending.has(key)) {
      return this.pending.get(key) as Promise<T>;
    }

    // Create new request
    const promise = operation().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);
    return promise;
  }
}

const deduplicator = new RequestDeduplicator();

// Multiple calls with same key will only make one request
const [balance1, balance2] = await Promise.all([
  deduplicator.dedupe('balance', () => sdk.finances.getBalance()),
  deduplicator.dedupe('balance', () => sdk.finances.getBalance())
]);
// Only ONE API call is made
```

## Response Caching

```typescript
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class ResponseCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs
    });
  }

  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const data = await fetcher();
    this.set(key, data, ttlMs);
    return data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new ResponseCache();

// Cache categories for 1 hour (they rarely change)
const categories = await cache.getOrFetch(
  'categories',
  () => sdk.products.getParentAll(),
  60 * 60 * 1000
);

// Cache commission rates for 24 hours
const commissions = await cache.getOrFetch(
  'commissions',
  () => sdk.tariffs.getTariffsCommission(),
  24 * 60 * 60 * 1000
);
```

## Parallel Processing with Controlled Concurrency

```typescript
class ConcurrencyPool {
  private running = 0;
  private queue: Array<() => void> = [];

  constructor(private maxConcurrency: number) {}

  async run<T>(operation: () => Promise<T>): Promise<T> {
    // Wait if at capacity
    if (this.running >= this.maxConcurrency) {
      await new Promise<void>(resolve => {
        this.queue.push(resolve);
      });
    }

    this.running++;
    try {
      return await operation();
    } finally {
      this.running--;
      // Release next waiting operation
      const next = this.queue.shift();
      if (next) next();
    }
  }
}

// Process up to 10 concurrent requests
const pool = new ConcurrencyPool(10);

async function processProducts(productIds: number[]) {
  return Promise.all(
    productIds.map(id =>
      pool.run(() => sdk.products.getNmId(id))
    )
  );
}

// All 100 products processed with max 10 concurrent requests
const products = await processProducts(Array.from({ length: 100 }, (_, i) => i + 1));
```

## Streaming Large Datasets

```typescript
async function* streamOrders(
  dateFrom: number,
  pageSize = 1000
): AsyncGenerator<Order> {
  let next = 0;

  while (true) {
    const response = await sdk.ordersFBS.getOrders({
      dateFrom,
      limit: pageSize,
      next
    });

    if (!response.orders?.length) break;

    for (const order of response.orders) {
      yield order;
    }

    next = response.next ?? 0;
    if (response.orders.length < pageSize) break;
  }
}

// Process orders one at a time without loading all into memory
async function processOrdersStream(dateFrom: number) {
  let count = 0;

  for await (const order of streamOrders(dateFrom)) {
    // Process each order
    console.log(`Processing order ${order.id}`);
    count++;

    // Memory efficient - only one order at a time
  }

  console.log(`Processed ${count} orders`);
}
```

## Lazy Loading Modules

```typescript
// Only load modules when needed
class LazySDK {
  private _sdk: WildberriesSDK | null = null;

  private get sdk(): WildberriesSDK {
    if (!this._sdk) {
      this._sdk = new WildberriesSDK({
        apiKey: process.env.WB_API_KEY!
      });
    }
    return this._sdk;
  }

  // Expose only what you need
  get products() { return this.sdk.products; }
  get orders() { return this.sdk.ordersFBS; }
  get finances() { return this.sdk.finances; }
}

export const lazySdk = new LazySDK();
```

## Batch Request Aggregator

```typescript
class BatchAggregator<T, R> {
  private batch: T[] = [];
  private resolvers: Array<{
    resolve: (value: R) => void;
    reject: (error: Error) => void;
  }> = [];
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private processor: (items: T[]) => Promise<R[]>,
    private maxBatchSize = 100,
    private maxWaitMs = 50
  ) {}

  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.batch.push(item);
      this.resolvers.push({ resolve, reject });

      // Flush if batch is full
      if (this.batch.length >= this.maxBatchSize) {
        this.flush();
        return;
      }

      // Set timer for delayed flush
      if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.maxWaitMs);
      }
    });
  }

  private async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const batch = this.batch;
    const resolvers = this.resolvers;
    this.batch = [];
    this.resolvers = [];

    try {
      const results = await this.processor(batch);
      resolvers.forEach((r, i) => r.resolve(results[i]));
    } catch (error) {
      resolvers.forEach(r => r.reject(error as Error));
    }
  }
}

// Batch order status checks
const statusBatcher = new BatchAggregator(
  async (orderIds: number[]) => {
    const response = await sdk.ordersFBS.getOrderStatuses(orderIds);
    return response.orders;
  },
  100,
  50
);

// These will be batched together
const statuses = await Promise.all([
  statusBatcher.add(1),
  statusBatcher.add(2),
  statusBatcher.add(3)
]);
```

## Performance Monitoring

```typescript
interface PerformanceMetrics {
  requestCount: number;
  totalDuration: number;
  averageDuration: number;
  slowestRequest: number;
  errorCount: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();

  async track<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    let hasError = false;

    try {
      return await operation();
    } catch (error) {
      hasError = true;
      throw error;
    } finally {
      const duration = performance.now() - start;
      this.record(name, duration, hasError);
    }
  }

  private record(name: string, duration: number, hasError: boolean) {
    const existing = this.metrics.get(name) ?? {
      requestCount: 0,
      totalDuration: 0,
      averageDuration: 0,
      slowestRequest: 0,
      errorCount: 0
    };

    existing.requestCount++;
    existing.totalDuration += duration;
    existing.averageDuration = existing.totalDuration / existing.requestCount;
    existing.slowestRequest = Math.max(existing.slowestRequest, duration);
    if (hasError) existing.errorCount++;

    this.metrics.set(name, existing);
  }

  getMetrics(): Record<string, PerformanceMetrics> {
    return Object.fromEntries(this.metrics);
  }

  report() {
    console.log('Performance Report:');
    for (const [name, metrics] of this.metrics) {
      console.log(`  ${name}:`);
      console.log(`    Requests: ${metrics.requestCount}`);
      console.log(`    Avg: ${metrics.averageDuration.toFixed(2)}ms`);
      console.log(`    Slowest: ${metrics.slowestRequest.toFixed(2)}ms`);
      console.log(`    Errors: ${metrics.errorCount}`);
    }
  }
}

const monitor = new PerformanceMonitor();

// Track all operations
const categories = await monitor.track('getCategories', () =>
  sdk.products.getParentAll()
);

const balance = await monitor.track('getBalance', () =>
  sdk.finances.getBalance()
);

// View report
monitor.report();
```

## Production Best Practices

1. **Reuse SDK instance** - Create once, use everywhere
2. **Cache static data** - Categories, tariffs, commissions
3. **Deduplicate requests** - Avoid duplicate in-flight requests
4. **Use pagination wisely** - Larger pages = fewer requests
5. **Control concurrency** - Don't overwhelm the API
6. **Monitor performance** - Track slow endpoints
7. **Stream large datasets** - Don't load everything into memory
8. **Batch similar operations** - Combine multiple items into single requests

## Related Materials

- [Rate Limiting](../intermediate/rate-limiting.md)
- [Batch Operations](../intermediate/batch-operations.md)
- [Error Handling](../intermediate/error-handling.md)

---

[Back to Examples](../index.md) | [Previous: Custom Retry Logic](custom-retry.md)
