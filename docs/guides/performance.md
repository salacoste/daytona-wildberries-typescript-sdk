---
title: Performance Tuning Guide
description: Optimize Wildberries SDK performance - rate limiting, caching, batch operations, connection pooling, and memory management
layout: doc
---

# Performance Tuning Guide

Comprehensive guide to optimizing performance when working with the Wildberries TypeScript SDK.

## Table of Contents

- [Overview](#overview)
- [Rate Limiting Optimization](#rate-limiting-optimization)
- [Connection Pooling](#connection-pooling)
- [Caching Strategies](#caching-strategies)
- [Batch Operations](#batch-operations)
- [Memory Management](#memory-management)
- [Monitoring & Profiling](#monitoring--profiling)

## Overview

The Wildberries SDK is designed for high-performance operations with built-in optimizations for rate limiting, retry handling, and efficient data transfer. This guide covers advanced techniques to maximize throughput and minimize latency.

### Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| SDK Overhead | <200ms | Per operation initialization |
| Bundle Size | <100KB | Gzipped core SDK |
| Memory Footprint | <50MB | Average per instance |
| Concurrent Requests | 100+ | With proper rate limiting |

## Rate Limiting Optimization

### Understanding Rate Limits

Different API modules have different rate limits:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  rateLimitConfig: {
    // Global limits (applied to all endpoints)
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  }
});
```

### Module-Specific Limits

```typescript
// Products module: 3 requests per minute
// Analytics module: 6 requests per minute
// Orders module: 10 requests per minute
// Finances module: 1000 requests per minute
```

### Maximizing Throughput

**Strategy 1: Request Batching**

```typescript
// ❌ Bad: Sequential requests
for (const productId of productIds) {
  await sdk.products.getProductCard(productId);
}

// ✅ Good: Parallel requests with rate limiting
const batchSize = 3; // Match module rate limit
const batches = chunk(productIds, batchSize);

for (const batch of batches) {
  await Promise.all(
    batch.map(id => sdk.products.getProductCard(id))
  );
  await sleep(60000); // Wait for rate limit window
}
```

**Strategy 2: Smart Scheduling**

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

// Use for all API calls
const balance = await scheduledOperation(() =>
  sdk.finances.getBalance()
);
```

## Connection Pooling

### HTTP/2 Multiplexing

The SDK uses Axios which supports HTTP/2 multiplexing for improved performance:

```typescript
import axios from 'axios';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpClient: axios.create({
    // Enable HTTP/2
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    // Connection pool size
    maxSockets: 50,
    maxFreeSockets: 10,
  })
});
```

### Keep-Alive Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000, // 30 second timeout
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  }
});
```

## Caching Strategies

### In-Memory Caching

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minute TTL

async function getCachedCategories() {
  const cacheKey = 'categories';

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from API
  const categories = await sdk.products.getParentCategories();

  // Store in cache
  cache.set(cacheKey, categories);

  return categories;
}
```

### Redis Caching

```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

async function getCachedBalance(): Promise<BalanceResponse> {
  const cacheKey = 'wb:balance';

  // Try cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from API
  const balance = await sdk.finances.getBalance();

  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(balance));

  return balance;
}
```

### Smart Cache Invalidation

```typescript
class CachedSDK {
  private cache = new Map<string, { data: any; expiry: number }>();

  async getWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300000 // 5 minutes
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

## Batch Operations

### Bulk Product Updates

```typescript
async function bulkUpdatePricing(
  updates: Array<{ nmId: number; price: number }>
) {
  // Group updates into batches
  const batchSize = 100;
  const batches = chunk(updates, batchSize);

  const results = [];

  for (const batch of batches) {
    // Process batch in parallel
    const batchResults = await Promise.allSettled(
      batch.map(({ nmId, price }) =>
        sdk.products.updatePricing([{ nmId, price }])
      )
    );

    results.push(...batchResults);

    // Respect rate limits
    if (batches.indexOf(batch) < batches.length - 1) {
      await sleep(20000); // 20s between batches
    }
  }

  return results;
}
```

### Parallel Report Generation

```typescript
async function generateMultipleReports(
  reports: Array<{ type: ReportType; params: any }>
) {
  // Start all reports in parallel
  const taskIds = await Promise.all(
    reports.map(r => sdk.reports.generateReport(r.type, r.params))
  );

  // Poll for completion in parallel
  const completed = await Promise.all(
    taskIds.map(taskId =>
      pollUntilComplete(() => sdk.reports.getReportStatus(taskId))
    )
  );

  // Download all reports
  return Promise.all(
    completed.map(task => sdk.reports.downloadReport(task.taskId))
  );
}
```

## Memory Management

### Streaming Large Responses

```typescript
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

async function downloadLargeReport(taskId: string, outputPath: string) {
  const response = await sdk.reports.downloadReportStream(taskId);
  const writeStream = createWriteStream(outputPath);

  await pipeline(response.data, writeStream);
}
```

### Pagination Best Practices

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

    // Allow garbage collection
    if (cursor) {
      await sleep(100);
    }
  } while (cursor);
}

// Usage with memory-efficient processing
for await (const order of iterateAllOrders()) {
  await processOrder(order);
  // Each order is processed and can be GC'd
}
```

### Memory Leak Prevention

```typescript
class SDKManager {
  private sdk: WildberriesSDK;

  constructor(apiKey: string) {
    this.sdk = new WildberriesSDK({ apiKey });
  }

  async cleanup() {
    // Clear any caches
    this.sdk = null as any;

    // Force garbage collection (if --expose-gc flag)
    if (global.gc) {
      global.gc();
    }
  }
}
```

## Monitoring & Profiling

### Request Timing

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

### Memory Profiling

```typescript
import v8 from 'v8';
import { writeFileSync } from 'fs';

function takeHeapSnapshot(filename: string) {
  const snapshot = v8.writeHeapSnapshot();
  writeFileSync(filename, snapshot);
  console.log(`Heap snapshot saved to ${filename}`);
}

// Take snapshot before/after operations
takeHeapSnapshot('before.heapsnapshot');
await processLargeDataset();
takeHeapSnapshot('after.heapsnapshot');
```

### Performance Benchmarking

```typescript
import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite
  .add('Sequential requests', {
    defer: true,
    fn: async (deferred: any) => {
      for (let i = 0; i < 10; i++) {
        await sdk.products.getProductCard(12345);
      }
      deferred.resolve();
    }
  })
  .add('Parallel requests', {
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
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
```

## Best Practices Summary

### ✅ Do

- Use rate limiting to maximize throughput without hitting limits
- Implement caching for frequently accessed data
- Process large datasets with pagination and streaming
- Monitor performance metrics in production
- Use connection pooling for better resource utilization
- Batch operations when possible
- Profile memory usage for long-running processes

### ❌ Don't

- Make sequential requests when parallel is possible
- Ignore rate limits (causes API blocks)
- Load entire large datasets into memory
- Skip error handling in performance-critical paths
- Use blocking operations in async code
- Create new SDK instances for each request
- Disable retry logic to "improve speed"

## Performance Optimization Checklist

- [ ] Rate limiting configured appropriately
- [ ] Caching implemented for read-heavy operations
- [ ] Batch operations for bulk updates
- [ ] Pagination used for large datasets
- [ ] Connection pooling enabled
- [ ] Request timing monitored
- [ ] Memory usage profiled
- [ ] Error handling doesn't impact performance
- [ ] Concurrent request limits respected
- [ ] SDK instances reused across requests

## Related Documentation

- [Best Practices Guide](./best-practices.md)
- [Troubleshooting Guide](./troubleshooting.md)
- [API Reference](../api/)
- [Examples](../../examples/)

## Support

For performance-related issues:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Wildberries API Documentation](https://dev.wildberries.ru/)
