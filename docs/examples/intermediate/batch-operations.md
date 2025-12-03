# Batch Operations

Processing multiple items efficiently.

## Description

This example demonstrates how to efficiently process multiple items using batch operations, parallel execution, and pagination.

## Batch Product Updates

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Batch price update for multiple products
async function batchUpdatePrices(
  updates: Array<{ nmId: number; price: number }>
) {
  // The API accepts batch updates
  const result = await sdk.products.updatePrices(updates);

  console.log('Updated prices for', updates.length, 'products');
  return result;
}

// Usage
await batchUpdatePrices([
  { nmId: 12345, price: 1000 },
  { nmId: 67890, price: 2000 },
  { nmId: 11111, price: 1500 }
]);
```

## Parallel API Calls

```typescript
async function fetchAllData() {
  // Execute independent calls in parallel
  const [
    categories,
    balance,
    orders,
    commissions
  ] = await Promise.all([
    sdk.products.getParentAll(),
    sdk.finances.getBalance(),
    sdk.ordersFBS.getNewOrders(),
    sdk.tariffs.getTariffsCommission()
  ]);

  return {
    categories: categories.data,
    balance: balance.for_withdraw,
    orderCount: orders.orders?.length ?? 0,
    commissionRates: commissions.report
  };
}
```

## Paginated Data Retrieval

```typescript
async function getAllOrders(dateFrom: number): Promise<Order[]> {
  const allOrders: Order[] = [];
  let next = 0;
  const pageSize = 1000;

  while (true) {
    const response = await sdk.ordersFBS.getOrders({
      dateFrom,
      limit: pageSize,
      next
    });

    if (!response.orders?.length) break;

    allOrders.push(...response.orders);
    next = response.next ?? 0;

    console.log(`Fetched ${allOrders.length} orders...`);

    if (response.orders.length < pageSize) break;
  }

  console.log(`Total orders: ${allOrders.length}`);
  return allOrders;
}

// Usage: Get all orders from last 30 days
const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60);
const orders = await getAllOrders(thirtyDaysAgo);
```

## Get All Products with Helper

```typescript
// The SDK provides a helper for paginated product retrieval
async function getAllProductCards() {
  const allProducts = await sdk.products.getAllProducts({
    locale: 'ru',
    withPhoto: 1
  });

  console.log(`Retrieved ${allProducts.length} products`);
  return allProducts;
}
```

## Chunked Processing

```typescript
function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function processInChunks<T, R>(
  items: T[],
  processor: (chunk: T[]) => Promise<R[]>,
  chunkSize = 100
): Promise<R[]> {
  const chunks = chunk(items, chunkSize);
  const results: R[] = [];

  for (const [index, chunkItems] of chunks.entries()) {
    console.log(`Processing chunk ${index + 1}/${chunks.length}...`);
    const chunkResults = await processor(chunkItems);
    results.push(...chunkResults);
  }

  return results;
}

// Usage: Get order statuses in chunks
const orderIds = [1, 2, 3, /* ... many more */];
const statuses = await processInChunks(
  orderIds,
  async (chunk) => {
    const response = await sdk.ordersFBS.getOrderStatuses(chunk);
    return response.orders;
  },
  100
);
```

## Concurrent with Limit

```typescript
async function mapConcurrent<T, R>(
  items: T[],
  mapper: (item: T) => Promise<R>,
  concurrencyLimit = 5
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      results[index] = await mapper(items[index]);
    }
  }

  // Create workers up to concurrency limit
  const workers = Array.from(
    { length: Math.min(concurrencyLimit, items.length) },
    () => worker()
  );

  await Promise.all(workers);
  return results;
}

// Usage: Fetch product details with max 5 concurrent requests
const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const products = await mapConcurrent(
  productIds,
  async (id) => sdk.products.getNmId(id),
  5
);
```

## Error Handling in Batches

```typescript
interface BatchResult<T> {
  success: T[];
  failed: Array<{ item: unknown; error: Error }>;
}

async function batchWithErrorHandling<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>
): Promise<BatchResult<R>> {
  const results: BatchResult<R> = {
    success: [],
    failed: []
  };

  await Promise.all(
    items.map(async (item) => {
      try {
        const result = await processor(item);
        results.success.push(result);
      } catch (error) {
        results.failed.push({
          item,
          error: error as Error
        });
      }
    })
  );

  console.log(`Success: ${results.success.length}, Failed: ${results.failed.length}`);
  return results;
}

// Usage
const productIds = [1, 2, 3, 4, 5];
const results = await batchWithErrorHandling(
  productIds,
  async (id) => sdk.products.getNmId(id)
);

// Handle failures
if (results.failed.length > 0) {
  console.error('Failed items:', results.failed);
}
```

## Progress Tracking

```typescript
async function batchWithProgress<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  onProgress?: (completed: number, total: number) => void
): Promise<R[]> {
  const results: R[] = [];
  const total = items.length;

  for (const [index, item] of items.entries()) {
    const result = await processor(item);
    results.push(result);

    if (onProgress) {
      onProgress(index + 1, total);
    }
  }

  return results;
}

// Usage with progress callback
await batchWithProgress(
  productIds,
  async (id) => sdk.products.getNmId(id),
  (completed, total) => {
    const percent = Math.round((completed / total) * 100);
    console.log(`Progress: ${completed}/${total} (${percent}%)`);
  }
);
```

## Related Materials

- [Rate Limiting](rate-limiting.md)
- [Performance Optimization](../advanced/performance.md)
- [Multi-Module Workflow](../advanced/multi-module.md)

---

[Back to Examples](../index.md) | [Previous: Rate Limiting](rate-limiting.md) | [Next: Multi-Module Workflow](../advanced/multi-module.md)
