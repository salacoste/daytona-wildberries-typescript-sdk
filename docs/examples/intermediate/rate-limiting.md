# Rate Limiting

Working with Wildberries API rate limits.

## Description

The Wildberries API enforces rate limits per endpoint. This example shows how to work within these limits effectively using the SDK's built-in rate limiting and manual strategies.

## Understanding Rate Limits

Different API endpoints have different rate limits:

| Module | Typical Limits |
|--------|---------------|
| Products | 1-10 req/sec |
| Orders FBS | 3 req/min with 20s intervals |
| Analytics | 1 req/min |
| Promotion | Varies by endpoint |
| Finances | 1 req/min |

## SDK Built-in Rate Limiting

The SDK automatically handles rate limits:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  // Rate limiting is enabled by default
});

// The SDK will automatically queue requests to respect limits
async function fetchMultipleEndpoints() {
  // These calls will be automatically rate-limited
  const [categories, balance, orders] = await Promise.all([
    sdk.products.getParentAll(),
    sdk.finances.getBalance(),
    sdk.ordersFBS.getOrdersNew()
  ]);

  return { categories, balance, orders };
}
```

## Handling Rate Limit Errors

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function withRateLimitHandling<T>(
  operation: () => Promise<T>,
  maxAttempts = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.log(`Rate limited. Waiting ${error.retryAfter}ms...`);
        await sleep(error.retryAfter);
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retry attempts exceeded');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage
const categories = await withRateLimitHandling(() =>
  sdk.products.getParentAll()
);
```

## Sequential Processing with Delays

```typescript
async function processOrdersSequentially(orderIds: number[]) {
  const results = [];
  const DELAY_MS = 20000; // 20 seconds between requests

  for (const orderId of orderIds) {
    try {
      const status = await sdk.ordersFBS.getOrderStatuses([orderId]);
      results.push({ orderId, status, success: true });
    } catch (error) {
      results.push({ orderId, error, success: false });
    }

    // Wait before next request (except for last one)
    if (orderId !== orderIds[orderIds.length - 1]) {
      console.log(`Waiting ${DELAY_MS / 1000}s before next request...`);
      await sleep(DELAY_MS);
    }
  }

  return results;
}
```

## Batch Processing with Rate Limiting

```typescript
async function processBatchWithRateLimit<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: {
    batchSize?: number;
    delayBetweenBatches?: number;
  } = {}
): Promise<R[]> {
  const {
    batchSize = 10,
    delayBetweenBatches = 1000
  } = options;

  const results: R[] = [];
  const batches = chunk(items, batchSize);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    // Process batch in parallel
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);

    // Delay between batches (except last)
    if (i < batches.length - 1) {
      await sleep(delayBetweenBatches);
    }
  }

  return results;
}

function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Usage
const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const prices = await processBatchWithRateLimit(
  productIds,
  async (id) => sdk.products.getNmId(id),
  { batchSize: 3, delayBetweenBatches: 1000 }
);
```

## Rate Limit Aware Queue

```typescript
class RateLimitQueue {
  private queue: (() => Promise<unknown>)[] = [];
  private processing = false;
  private lastRequestTime = 0;
  private minInterval: number;

  constructor(requestsPerSecond: number) {
    this.minInterval = 1000 / requestsPerSecond;
  }

  async add<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await operation();
          resolve(result as T);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const timeSinceLastRequest = Date.now() - this.lastRequestTime;
      const waitTime = Math.max(0, this.minInterval - timeSinceLastRequest);

      if (waitTime > 0) {
        await sleep(waitTime);
      }

      const operation = this.queue.shift();
      if (operation) {
        this.lastRequestTime = Date.now();
        await operation();
      }
    }

    this.processing = false;
  }
}

// Usage: 1 request per second
const queue = new RateLimitQueue(1);

// All requests will be automatically spaced
const results = await Promise.all([
  queue.add(() => sdk.analytics.getSalesFunnel({ period: { begin: '2024-01-01', end: '2024-01-31' } })),
  queue.add(() => sdk.analytics.getSalesFunnel({ period: { begin: '2024-02-01', end: '2024-02-28' } })),
  queue.add(() => sdk.analytics.getSalesFunnel({ period: { begin: '2024-03-01', end: '2024-03-31' } })),
]);
```

## Best Practices

1. **Use SDK built-in rate limiting** - The SDK handles most cases automatically

2. **Batch similar operations** - Group API calls to minimize total requests

3. **Cache responses** - Avoid redundant calls for data that doesn't change often

4. **Use pagination wisely** - Fetch larger pages less frequently rather than small pages often

5. **Monitor rate limit headers** - Log when rate limits are hit to optimize your code

6. **Implement circuit breakers** - Stop making requests temporarily if too many fail

## Related Materials

- [Error Handling](error-handling.md)
- [Batch Operations](batch-operations.md)
- [Performance Optimization](../advanced/performance.md)

---

[Back to Examples](../index.md) | [Previous: Error Handling](error-handling.md) | [Next: Batch Operations](batch-operations.md)
