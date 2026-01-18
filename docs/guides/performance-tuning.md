---
title: Performance Tuning Guide
description: Comprehensive performance optimization guide for production deployments - rate limits, caching, monitoring, and benchmarking
layout: doc
---

# Performance Tuning Guide

Comprehensive guide to optimizing Wildberries SDK performance for production deployments.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Performance Philosophy](#performance-philosophy)
3. [Baseline Performance Metrics](#baseline-performance-metrics)
4. [Rate Limit Optimization](#rate-limit-optimization)
5. [Batch Operation Patterns](#batch-operation-patterns)
6. [Caching Strategies](#caching-strategies)
7. [Connection Pooling](#connection-pooling)
8. [Memory Management](#memory-management)
9. [Performance Monitoring](#performance-monitoring)
10. [Benchmarking Scripts](#benchmarking-scripts)
11. [Performance Checklist](#performance-checklist)
12. [Troubleshooting Performance Issues](#troubleshooting-performance-issues)

---

## Introduction

This guide provides comprehensive strategies for optimizing Wildberries SDK performance in production environments. It covers benchmarking, optimization techniques, monitoring, and troubleshooting.

**Target Audience**: Backend developers, DevOps engineers, performance engineers

**Prerequisites**:
- Wildberries SDK installed and configured
- Node.js ≥ 20.0.0
- Basic understanding of async/await patterns
- Access to monitoring tools (Prometheus, Grafana) for production

**What You'll Learn**:
- How to measure and improve SDK performance
- Strategies to maximize API throughput within rate limits
- Caching and connection pooling best practices
- Memory management and leak prevention
- Performance monitoring and alerting setup

---

## Performance Philosophy

### Core Principles

**1. Measure First, Optimize Later**
- Always establish baseline metrics before optimization
- Use data-driven decisions, not assumptions
- Profile before and after changes to validate improvements

**2. Optimize for Real-World Constraints**
- API rate limits are the primary bottleneck (not CPU/memory)
- Network latency varies (50-300ms typical)
- Focus on throughput optimization within rate limit constraints

**3. Progressive Enhancement**
- Start with simple, working implementation
- Add optimizations incrementally
- Validate each optimization's impact with metrics

**4. Balance Performance with Maintainability**
- Don't sacrifice code clarity for micro-optimizations
- Focus on high-impact optimizations (80/20 rule)
- Document trade-offs and performance-critical sections

### Performance Targets

| Metric | Target | Critical Threshold | Notes |
|--------|--------|-------------------|--------|
| **API Call Latency (p50)** | <200ms | <500ms | Median response time |
| **API Call Latency (p95)** | <500ms | <1000ms | 95th percentile |
| **API Call Latency (p99)** | <1000ms | <2000ms | 99th percentile (spike tolerance) |
| **Throughput** | >100 req/s | >50 req/s | Requests per second |
| **Memory Usage (idle)** | <50MB | <100MB | Resident set size |
| **Memory Usage (load)** | <200MB | <500MB | Under 100 concurrent requests |
| **Error Rate** | <0.1% | <1% | Failed requests / total requests |
| **Cache Hit Rate** | >80% | >50% | For cacheable endpoints |

**Understanding Performance Metrics**:

- **p50 (median)**: Half of requests complete faster than this
- **p95**: 95% of requests complete faster (filters out outliers)
- **p99**: 99% of requests complete faster (catches tail latency)
- **Throughput**: Total requests processed per second
- **Error Rate**: Percentage of failed requests (excluding rate limits)

---

## Baseline Performance Metrics

Before optimization, establish performance baselines to measure improvements.

### SDK Overhead Benchmarking

The SDK introduces minimal overhead (<10ms) for:
- Request/response serialization
- Type validation
- Error handling
- Rate limit checking

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import { performance } from 'perf_hooks';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Measure SDK initialization time
const initStart = performance.now();
const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
const initEnd = performance.now();
console.log(`SDK initialization: ${(initEnd - initStart).toFixed(2)}ms`);

// Expected: <20ms
```

### API Call Latency Benchmarking

Measure end-to-end latency including network, API processing, and SDK overhead:

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

// Benchmark Products module
const productsMetrics = await benchmarkLatency(
  () => sdk.products.getParentAll(),
  100
);

console.log('Products.getParentAll() metrics:');
console.log(`  p50: ${productsMetrics.p50.toFixed(2)}ms`);
console.log(`  p95: ${productsMetrics.p95.toFixed(2)}ms`);
console.log(`  p99: ${productsMetrics.p99.toFixed(2)}ms`);
console.log(`  avg: ${productsMetrics.avg.toFixed(2)}ms`);
console.log(`  error rate: ${productsMetrics.errorRate.toFixed(2)}%`);

// Expected results (example):
// p50: 180ms, p95: 450ms, p99: 850ms, avg: 220ms
```

### Throughput Benchmarking

Measure maximum sustainable throughput within rate limits:

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

// Benchmark sustained throughput
const throughput = await benchmarkThroughput(
  () => sdk.general.ping(),
  10000 // 10 seconds
);

console.log('Sustained throughput:');
console.log(`  ${throughput.requestsPerSecond.toFixed(2)} req/s`);
console.log(`  ${throughput.totalRequests} total requests`);
console.log(`  ${throughput.errorRate.toFixed(2)}% error rate`);
console.log(`  ${throughput.avgLatency.toFixed(2)}ms avg latency`);

// Expected: 50-150 req/s depending on endpoint rate limits
```

### Memory Usage Benchmarking

Monitor memory consumption under different load patterns:

```typescript
function getMemoryStats() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024), // Resident set size (MB)
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024)
  };
}

async function benchmarkMemory(
  operation: () => Promise<any>,
  iterations: number = 1000
) {
  // Force GC before test (requires --expose-gc flag)
  if (global.gc) global.gc();

  const memBefore = getMemoryStats();
  console.log('Memory before:', memBefore);

  // Run operations
  for (let i = 0; i < iterations; i++) {
    await operation();
  }

  const memAfter = getMemoryStats();
  console.log('Memory after:', memAfter);

  const memDelta = {
    rss: memAfter.rss - memBefore.rss,
    heapUsed: memAfter.heapUsed - memBefore.heapUsed
  };

  console.log('Memory delta:', memDelta);
  console.log(`Per-request overhead: ${(memDelta.heapUsed / iterations).toFixed(2)}KB`);

  // Force GC after test
  if (global.gc) global.gc();

  const memAfterGC = getMemoryStats();
  console.log('Memory after GC:', memAfterGC);

  return {
    before: memBefore,
    after: memAfter,
    delta: memDelta,
    afterGC: memAfterGC,
    perRequest: memDelta.heapUsed / iterations
  };
}

// Run with: node --expose-gc benchmark-memory.js
const memMetrics = await benchmarkMemory(
  () => sdk.products.getParentAll(),
  1000
);

// Expected: <1KB per request overhead, no memory leaks after GC
```

### Concurrent Request Benchmarking

Test performance under concurrent load:

```typescript
async function benchmarkConcurrency(
  operation: () => Promise<any>,
  concurrency: number,
  totalRequests: number
): Promise<ConcurrencyMetrics> {
  const results: Array<{ latency: number; error: boolean }> = [];
  const startTime = performance.now();

  // Create batches of concurrent requests
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
  const totalTime = (endTime - startTime) / 1000; // seconds

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

// Test different concurrency levels
const concurrencyLevels = [1, 5, 10, 25, 50, 100];

for (const concurrency of concurrencyLevels) {
  const metrics = await benchmarkConcurrency(
    () => sdk.general.ping(),
    concurrency,
    1000 // 1000 total requests
  );

  console.log(`\nConcurrency: ${concurrency}`);
  console.log(`  Throughput: ${metrics.throughput.toFixed(2)} req/s`);
  console.log(`  p95 latency: ${metrics.p95.toFixed(2)}ms`);
  console.log(`  Error rate: ${metrics.errorRate.toFixed(2)}%`);
}

// Find optimal concurrency level (highest throughput with <1% errors)
```

### Baseline Report Template

After running benchmarks, document baseline metrics:

```markdown
# SDK Performance Baseline Report

**Date**: 2025-10-26
**SDK Version**: 1.0.0
**Node.js Version**: 20.10.0
**Environment**: Production
**Test Duration**: 10 minutes per module

## Summary

| Module | p50 Latency | p95 Latency | Throughput | Error Rate |
|--------|-------------|-------------|------------|------------|
| General | 150ms | 380ms | 125 req/s | 0.05% |
| Products | 220ms | 510ms | 95 req/s | 0.08% |
| Orders | 280ms | 650ms | 75 req/s | 0.12% |
| Finances | 310ms | 720ms | 60 req/s | 0.15% |

## Memory Usage

- **Idle**: 42MB RSS, 25MB heap
- **Under Load (100 concurrent)**: 185MB RSS, 140MB heap
- **Per-request Overhead**: ~0.8KB
- **Memory Leaks**: None detected after 10,000 requests

## Rate Limit Observations

- Products endpoints: 3-5 req/min typical limits
- Orders endpoints: 10 req/min typical limits
- General endpoints: 20 req/min typical limits
- Rate limit errors: <0.01% (SDK retry mechanism working)

## Recommendations

1. **Products module**: Implement caching (5-minute TTL) for getParentAll()
2. **Orders module**: Use batch operations for processing >10 orders
3. **Memory**: Current usage well within limits, no optimization needed
4. **Throughput**: Bottleneck is API rate limits, not SDK performance
```

---

## Rate Limit Optimization

API rate limits are the primary performance constraint. This section covers strategies to maximize throughput within those limits.

### Understanding Rate Limits

Each Wildberries API endpoint has specific rate limits defined as:

```
Limit: X requests per Period with Y second intervals
Burst: Z requests
```

Example from Products API:
```
Limit: 3 requests per 1 minute with 20 second intervals
Burst: 3 requests
```

**Interpretation**:
- Maximum 3 requests per minute
- Minimum 20 seconds between requests
- Can send 3 requests immediately (burst), then wait 20s between subsequent requests

### Strategy 1: Parallel Requests to Different Endpoints

**Principle**: Rate limits apply per endpoint, not globally. Call different endpoints in parallel to maximize throughput.

```typescript
// ❌ BAD: Sequential requests (slow)
async function getProductDataSlow(productId: string) {
  const details = await sdk.products.getCardByIMT({ imtID: productId });
  const pricing = await sdk.products.getPriceInfo({ nmID: productId });
  const stock = await sdk.products.getStockByWarehouse({ nmID: productId });

  return { details, pricing, stock };
}
// Total time: ~600ms (200ms × 3 sequential)

// ✅ GOOD: Parallel requests (fast)
async function getProductDataFast(productId: string) {
  const [details, pricing, stock] = await Promise.all([
    sdk.products.getCardByIMT({ imtID: productId }),  // Different rate limit
    sdk.products.getPriceInfo({ nmID: productId }),   // Different rate limit
    sdk.products.getStockByWarehouse({ nmID: productId }) // Different rate limit
  ]);

  return { details, pricing, stock };
}
// Total time: ~200ms (all parallel, limited by slowest)

// Performance gain: 3x faster
```

**When to Use**:
- Fetching related data from multiple endpoints
- Initial data loading (dashboard, reports)
- Batch processing where each item needs multiple API calls

**Limitations**:
- Only works for endpoints with independent rate limits
- Need error handling for partial failures

```typescript
// Enhanced parallel fetching with error handling
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

### Strategy 2: Request Batching

**Principle**: Some endpoints accept arrays of items, reducing API calls from N to N/batchSize.

```typescript
// ❌ BAD: Individual updates (slow, hits rate limits)
async function updateProductsSlow(products: ProductUpdate[]) {
  const results = [];
  for (const product of products) {
    const result = await sdk.products.updateCard(product);
    results.push(result);
  }
  return results;
}
// 100 products = 100 API calls = rate limit errors

// ✅ GOOD: Batch updates (fast, efficient)
async function updateProductsBatch(products: ProductUpdate[]) {
  const batchSize = 50; // API supports 50 items per request
  const batches = [];

  for (let i = 0; i < products.length; i += batchSize) {
    batches.push(products.slice(i, i + batchSize));
  }

  const results = await Promise.all(
    batches.map(batch => sdk.products.updateCards(batch))
  );

  return results.flat();
}
// 100 products = 2 API calls = no rate limit issues

// Performance gain: 50x fewer API calls
```

**Batch-Capable Endpoints**:

| Module | Endpoint | Batch Size | Rate Limit |
|--------|----------|------------|------------|
| Products | `updateCards` | 50 items | 3 req/min |
| Orders | `cancelOrders` | 100 items | 10 req/min |
| Finances | `getTransactions` | 1000 items | 5 req/min |

**Batch Processing Pattern**:

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

// Usage
const processor = new BatchProcessor(
  50, // batch size
  (batch) => sdk.products.updateCards(batch),
  (processed, total) => {
    console.log(`Progress: ${processed}/${total} (${((processed/total)*100).toFixed(0)}%)`);
  }
);

const results = await processor.process(allProducts);
```

### Strategy 3: Intelligent Request Queueing

**Principle**: Queue requests and process them at optimal rate to avoid rate limit errors while maximizing throughput.

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

      // Ensure minimum interval between requests
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

// Usage: Create queue per endpoint with specific rate limit
const productsQueue = new RateLimitedQueue<any>(3 / 60); // 3 req per 60 seconds

// Queue requests (non-blocking)
const promises = products.map(product =>
  productsQueue.enqueue(() => sdk.products.updateCard(product))
);

console.log(`Queued ${promises.length} requests`);

// Wait for all to complete
const results = await Promise.all(promises);

console.log(`Completed ${results.length} requests`);
```

**Advanced: Priority Queue with Rate Limiting**

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
      // Sort by priority (higher priority first)
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
        // Handle rate limit errors with exponential backoff
        if (error instanceof RateLimitError) {
          const waitMs = error.retryAfter || 5000;
          console.log(`Rate limited, waiting ${waitMs}ms`);
          await this.sleep(waitMs);
          // Re-queue the request
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

// Usage with priorities
const queue = new PriorityRateLimitQueue<any>(5 / 60); // 5 req per minute

// High priority: urgent order updates
await queue.enqueue(
  () => sdk.orders.updateStatus({ orderId: '123', status: 'shipped' }),
  10
);

// Normal priority: product updates
await queue.enqueue(
  () => sdk.products.updateCard(product),
  5
);

// Low priority: analytics
await queue.enqueue(
  () => sdk.analytics.getSales({ from: '2025-01-01', to: '2025-12-31' }),
  1
);
```

### Strategy 4: Request Deduplication

**Principle**: Avoid redundant API calls for identical requests within a short time window.

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
    // Check if request is already in flight
    if (this.cache.has(key)) {
      console.log(`Deduplicating request: ${key}`);
      return this.cache.get(key)!;
    }

    // Execute request
    const promise = fn();
    this.cache.set(key, promise);

    // Clear cache after TTL
    setTimeout(() => {
      this.cache.delete(key);
    }, this.ttlMs);

    return promise;
  }
}

// Usage
const dedup = new RequestDeduplicator<any>(1000); // 1 second TTL

// Multiple simultaneous requests for same product
const requests = Array(10).fill(null).map(() =>
  dedup.deduplicate(
    'products:details:12345',
    () => sdk.products.getCardByIMT({ imtID: '12345' })
  )
);

const results = await Promise.all(requests);
// Only 1 actual API call made, 9 requests deduplicated
```

### Rate Limit Monitoring

Track rate limit usage to optimize request patterns:

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

    // Remove requests older than 1 minute
    data.requests = data.requests.filter(ts => now - ts < 60000);

    // Add current request
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

// Usage
const monitor = new RateLimitMonitor();

// Wrap SDK calls to track usage
async function trackedCall<T>(
  endpoint: string,
  limit: number,
  fn: () => Promise<T>
): Promise<T> {
  monitor.trackRequest(endpoint, limit);
  return fn();
}

// Make tracked calls
await trackedCall('products.getParentAll', 3, () =>
  sdk.products.getParentAll()
);

// Get utilization report
console.log('Rate Limit Utilization:');
console.log(monitor.getReport());
// Output: { 'products.getParentAll': { used: 2, limit: 3, utilization: '66.7%' } }
```

---

## Batch Operation Patterns

Batch operations dramatically reduce API calls and improve throughput for bulk processing.

### Identifying Batch-Capable Operations

**Check API Documentation**: Look for endpoints that accept arrays:

```typescript
// Single update (1 API call per item)
await sdk.products.updateCard(product);

// Batch update (1 API call per 50 items)
await sdk.products.updateCards(products); // Array of up to 50 items
```

**Common Batch Operations**:

| Module | Operation | Batch Size | Use Case |
|--------|-----------|------------|----------|
| Products | Update cards | 50 | Bulk price/stock updates |
| Products | Delete cards | 100 | Bulk product removal |
| Orders | Cancel orders | 100 | Bulk order cancellation |
| Orders | Ship orders | 50 | Bulk shipping updates |
| Finances | Get transactions | 1000 | Bulk transaction retrieval |

### Batch Size Optimization

**Finding Optimal Batch Size**:

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

// Test different batch sizes
const testItems = Array(500).fill({}).map((_, i) => ({ id: i, price: 1000 + i }));
const batchSizes = [10, 25, 50, 100];

const optimization = await findOptimalBatchSize(
  testItems,
  batchSizes,
  (batch) => sdk.products.updateCards(batch)
);

console.log('Batch Size Optimization Results:');
optimization.forEach(({ batchSize, totalTime, throughput, errorRate }) => {
  console.log(`  Size ${batchSize}: ${throughput.toFixed(2)} items/s, ` +
              `${totalTime.toFixed(2)}s total, ${errorRate.toFixed(2)}% errors`);
});

// Expected output:
// Size 10: 45 items/s, 11.1s total, 0% errors
// Size 25: 78 items/s, 6.4s total, 0% errors
// Size 50: 95 items/s, 5.3s total, 0% errors   ← Optimal
// Size 100: 85 items/s, 5.9s total, 2.5% errors (too large, causes errors)
```

### Bulk Product Updates Example

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

  console.log(`Processing ${updates.length} updates in ${batches.length} batches`);

  const results: Array<{ success: boolean; batch: number; error?: any }> = [];
  let processed = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    try {
      await sdk.products.updatePrices(batch);
      results.push({ success: true, batch: i });
      processed += batch.length;

      console.log(`Batch ${i + 1}/${batches.length}: ${processed}/${updates.length} items ` +
                  `(${((processed / updates.length) * 100).toFixed(1)}%)`);
    } catch (error) {
      console.error(`Batch ${i + 1} failed:`, error);
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

// Usage
const priceUpdates: ProductPriceUpdate[] = [
  { nmID: 12345, price: 1500 },
  { nmID: 67890, price: 2000 },
  // ... 500 more items
];

const result = await bulkUpdatePrices(priceUpdates);

console.log(`\nBulk Update Complete:`);
console.log(`  Total: ${result.total}`);
console.log(`  Successful: ${result.successful}`);
console.log(`  Failed: ${result.failed}`);
console.log(`  Success Rate: ${result.successRate.toFixed(2)}%`);
```

### Batch Error Handling

Handle partial failures gracefully:

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

  // Split into batches
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  // Process each batch
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
          console.error(`Batch ${i + 1} failed after ${maxRetries} retries:`, error);
        } else if (retryFailedBatches) {
          console.log(`Retrying batch ${i + 1} (attempt ${retries}/${maxRetries})`);
          await sleep(1000 * retries); // Exponential backoff
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

// Usage with progress tracking
const result = await robustBatchProcess(
  allProducts,
  50,
  (batch) => sdk.products.updateCards(batch),
  {
    retryFailedBatches: true,
    maxRetries: 3,
    onProgress: (processed, total, errors) => {
      const progress = ((processed / total) * 100).toFixed(1);
      console.log(`Progress: ${processed}/${total} (${progress}%) - Errors: ${errors}`);
    }
  }
);

console.log(`\nBatch Processing Complete:`);
console.log(`  Successful: ${result.totalProcessed}`);
console.log(`  Failed: ${result.totalFailed}`);
console.log(`  Success Rate: ${result.successRate.toFixed(2)}%`);

// Retry failed items individually
if (result.failed.length > 0) {
  console.log(`\nRetrying ${result.failed.length} failed items individually...`);
  // Process failed items one by one with more aggressive retry
}
```

### Performance Comparison: Batch vs Sequential

```typescript
async function comparePerformance(items: any[], batchSize: number) {
  console.log(`Comparing performance for ${items.length} items:\n`);

  // Sequential processing
  const seqStart = performance.now();
  for (const item of items) {
    await sdk.products.updateCard(item);
  }
  const seqEnd = performance.now();
  const seqTime = (seqEnd - seqStart) / 1000;

  console.log(`Sequential Processing:`);
  console.log(`  Time: ${seqTime.toFixed(2)}s`);
  console.log(`  Throughput: ${(items.length / seqTime).toFixed(2)} items/s`);
  console.log(`  API Calls: ${items.length}`);

  // Batch processing
  const batchStart = performance.now();
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await sdk.products.updateCards(batch);
  }
  const batchEnd = performance.now();
  const batchTime = (batchEnd - batchStart) / 1000;

  console.log(`\nBatch Processing (size=${batchSize}):`);
  console.log(`  Time: ${batchTime.toFixed(2)}s`);
  console.log(`  Throughput: ${(items.length / batchTime).toFixed(2)} items/s`);
  console.log(`  API Calls: ${Math.ceil(items.length / batchSize)}`);

  const speedup = seqTime / batchTime;
  console.log(`\nSpeedup: ${speedup.toFixed(2)}x faster`);
  console.log(`Time Saved: ${(seqTime - batchTime).toFixed(2)}s`);
  console.log(`API Calls Reduced: ${items.length - Math.ceil(items.length / batchSize)} ` +
              `(${(((items.length - Math.ceil(items.length / batchSize)) / items.length) * 100).toFixed(1)}%)`);
}

// Run comparison
const testProducts = Array(100).fill({}).map((_, i) => ({
  nmID: 10000 + i,
  price: 1000 + i * 10
}));

await comparePerformance(testProducts, 50);

// Expected output:
// Sequential: 25.3s, 3.95 items/s, 100 API calls
// Batch: 1.2s, 83.33 items/s, 2 API calls
// Speedup: 21.08x faster, Time Saved: 24.1s, API Calls Reduced: 98 (98%)
```

---

## Caching Strategies

Caching reduces API calls, improves response times, and decreases load on Wildberries servers.

### Identifying Cacheable Responses

**Good Candidates for Caching**:
- ✅ **Reference data**: Categories, tariffs, warehouse lists (changes infrequently)
- ✅ **Product details**: Product cards, descriptions (changes daily at most)
- ✅ **Configuration**: API settings, rate limits (static)

**Poor Candidates for Caching**:
- ❌ **Real-time data**: Order statuses, stock levels (changes frequently)
- ❌ **User-specific data**: Balances, transactions (requires fresh data)
- ❌ **Time-sensitive**: Analytics, reports (may be stale)

**Cache TTL Recommendations**:

| Data Type | TTL | Reasoning |
|-----------|-----|-----------|
| **Categories** | 24 hours | Rarely changes |
| **Product Cards** | 1 hour | Updated periodically |
| **Pricing** | 15 minutes | May change for promotions |
| **Stock Levels** | 5 minutes | Real-time inventory |
| **Order Status** | 30 seconds | Frequently updated |
| **Tariffs** | 7 days | Very stable |

### In-Memory Caching

Best for single-server deployments with moderate data volume.

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 300, // Default 5 minutes
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false // Return references (faster, but be careful with mutations)
});

// Basic caching wrapper
async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check cache first
  const cached = cache.get<T>(key);
  if (cached !== undefined) {
    console.log(`Cache HIT: ${key}`);
    return cached;
  }

  // Cache miss - fetch from API
  console.log(`Cache MISS: ${key}`);
  const data = await fetcher();
  cache.set(key, data, ttl);
  return data;
}

// Usage examples
async function getCategories() {
  return withCache(
    'categories:all',
    () => sdk.products.getParentAll(),
    86400 // 24 hours
  );
}

async function getProductDetails(nmID: string) {
  return withCache(
    `product:${nmID}`,
    () => sdk.products.getCardByNM({ nmID }),
    3600 // 1 hour
  );
}

async function getProductPrice(nmID: string) {
  return withCache(
    `price:${nmID}`,
    () => sdk.products.getPriceInfo({ nmID }),
    900 // 15 minutes
  );
}
```

### Redis Caching

Best for distributed systems, multiple servers, or high data volume.

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

// Redis cache wrapper with JSON serialization
async function withRedisCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number
): Promise<T> {
  // Check Redis cache
  const cached = await redis.get(key);
  if (cached) {
    console.log(`Redis HIT: ${key}`);
    return JSON.parse(cached);
  }

  // Cache miss - fetch from API
  console.log(`Redis MISS: ${key}`);
  const data = await fetcher();

  // Store in Redis with TTL
  await redis.setex(key, ttlSeconds, JSON.stringify(data));

  return data;
}

// Usage with namespacing
const CACHE_PREFIX = 'wb:sdk:v1';

async function getCategoriesRedis() {
  return withRedisCache(
    `${CACHE_PREFIX}:categories:all`,
    () => sdk.products.getParentAll(),
    86400 // 24 hours
  );
}

async function getProductDetailsRedis(nmID: string) {
  return withRedisCache(
    `${CACHE_PREFIX}:product:${nmID}`,
    () => sdk.products.getCardByNM({ nmID }),
    3600 // 1 hour
  );
}
```

### Cache Invalidation Strategies

**Time-Based Expiration (TTL)**:
- Simplest approach: cache expires after TTL
- No manual invalidation needed
- May serve stale data until TTL expires

**Event-Based Invalidation**:
- Invalidate cache when data changes
- Requires tracking mutations

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

  // Invalidate specific key
  invalidate(key: string): void {
    this.cache.del(key);
  }

  // Invalidate by pattern (prefix matching)
  invalidatePattern(pattern: string): void {
    const keys = this.cache.keys();
    const matchingKeys = keys.filter(k => k.includes(pattern));
    matchingKeys.forEach(k => this.cache.del(k));
  }

  // Clear all cache
  clear(): void {
    this.cache.flushAll();
  }
}

const smartCache = new SmartCache();

// Get product (with caching)
const product = await smartCache.get(
  `product:${nmID}`,
  () => sdk.products.getCardByNM({ nmID }),
  3600
);

// Update product (invalidate cache)
await sdk.products.updateCard({ nmID, price: newPrice });
smartCache.invalidate(`product:${nmID}`);
smartCache.invalidate(`price:${nmID}`); // Also invalidate price cache

// Bulk update (invalidate all products)
await sdk.products.updateCards(products);
smartCache.invalidatePattern('product:'); // Invalidate all product caches
```

### Cache Warming

Preload frequently accessed data to avoid cache misses:

```typescript
async function warmCache() {
  console.log('Warming cache...');

  // Preload categories
  await smartCache.get(
    'categories:all',
    () => sdk.products.getParentAll(),
    86400
  );

  // Preload top 100 products
  const topProductIds = await getTopProductIds(); // From analytics
  await Promise.all(
    topProductIds.map(nmID =>
      smartCache.get(
        `product:${nmID}`,
        () => sdk.products.getCardByNM({ nmID }),
        3600
      )
    )
  );

  // Preload tariffs
  await smartCache.get(
    'tariffs:box',
    () => sdk.tariffs.getBoxTariffs(),
    604800 // 7 days
  );

  console.log('Cache warming complete');
}

// Run on application startup
warmCache().catch(console.error);

// Schedule periodic cache warming
setInterval(() => {
  warmCache().catch(console.error);
}, 3600000); // Every hour
```

### Cache Hit Rate Monitoring

Track cache effectiveness:

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

// Use cache
await monitoredCache.get('key1', fetcher1, 300);
await monitoredCache.get('key2', fetcher2, 300);
await monitoredCache.get('key1', fetcher1, 300); // Cache hit

// Get stats
const stats = monitoredCache.getStats();
console.log('Cache Statistics:');
console.log(`  Hits: ${stats.hits}`);
console.log(`  Misses: ${stats.misses}`);
console.log(`  Hit Rate: ${stats.hitRate.toFixed(2)}%`);
console.log(`  Cache Size: ${stats.cacheSize} keys`);

// Target: >80% hit rate for production workloads
```

### HTTP Cache Headers

Some endpoints support HTTP caching via `Cache-Control` headers:

```typescript
// Configure SDK to respect cache headers
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  cacheOptions: {
    respectCacheHeaders: true,
    defaultTTL: 300
  }
});

// SDK will automatically cache responses with appropriate Cache-Control headers
const categories = await sdk.products.getParentAll();
// Response headers: Cache-Control: public, max-age=86400

// Subsequent calls within 24 hours will use cached response
const categoriesAgain = await sdk.products.getParentAll(); // Cached
```

---

## Connection Pooling

HTTP connection pooling reduces latency by reusing TCP connections instead of creating new ones for each request.

### Understanding Connection Overhead

**Without Keep-Alive** (new connection per request):
- TCP handshake: ~50-100ms
- TLS handshake: ~100-200ms
- Total overhead: ~150-300ms per request

**With Keep-Alive** (connection reuse):
- First request: ~150-300ms (establish connection)
- Subsequent requests: ~50-100ms (reuse connection)
- **Savings**: ~100-200ms per request (50-67% faster)

### HTTP Agent Configuration

```typescript
import http from 'http';
import https from 'https';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Create custom agents with optimized settings
const httpAgent = new http.Agent({
  keepAlive: true, // Reuse connections
  keepAliveMsecs: 30000, // Keep connection alive for 30 seconds
  maxSockets: 50, // Max concurrent connections
  maxFreeSockets: 10, // Max idle connections to keep
  timeout: 60000, // Connection timeout (60 seconds)
  scheduling: 'fifo' // First-in-first-out socket scheduling
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 60000,
  scheduling: 'fifo'
});

// Configure SDK with custom agents
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpAgent,
  httpsAgent
});

// Now all SDK requests will use connection pooling
```

### Connection Pool Sizing

**Formula**:
```
maxSockets = (expected concurrent requests) × (safety factor)
maxFreeSockets = maxSockets / 5
```

**Examples**:

| Use Case | Concurrent Requests | maxSockets | maxFreeSockets |
|----------|-------------------|------------|----------------|
| **Light** (single user) | 5-10 | 20 | 4 |
| **Medium** (API integration) | 20-50 | 100 | 20 |
| **Heavy** (bulk processing) | 100-200 | 300 | 60 |
| **Very Heavy** (data sync) | 500+ | 1000 | 200 |

```typescript
// Light usage configuration
const lightAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 20,
  maxFreeSockets: 4
});

// Heavy usage configuration
const heavyAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 300,
  maxFreeSockets: 60,
  keepAliveMsecs: 60000 // Keep connections longer
});

// Choose based on your workload
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpsAgent: heavyAgent // For bulk processing
});
```

### Connection Monitoring

Track connection pool usage:

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

// Wrap SDK client to track connections
const originalRequest = sdk.client.request;
sdk.client.request = async function(...args) {
  const socket = this.getActiveSocket(); // Check if reusing existing connection
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

// Check stats periodically
setInterval(() => {
  const stats = monitor.getStats();
  console.log(`Connections: ${stats.active} active, ` +
              `${stats.totalRequests} total requests, ` +
              `${stats.reuseRate.toFixed(1)}% reuse rate`);

  // Target: >90% reuse rate for steady workloads
}, 60000); // Every minute
```

### Connection Leak Detection

Detect and fix connection leaks:

```typescript
class ConnectionLeakDetector {
  private sockets = new Map<any, { createdAt: number; stack: string }>();
  private maxAge = 300000; // 5 minutes

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
        console.warn(`Potential connection leak detected: ${age}ms old`);
      }
    }

    return leaks;
  }
}

const detector = new ConnectionLeakDetector();

// Monitor for leaks every minute
setInterval(() => {
  const leaks = detector.detectLeaks();
  if (leaks.length > 0) {
    console.error(`⚠️  Detected ${leaks.length} connection leaks!`);
    leaks.forEach((leak, i) => {
      console.error(`  Leak ${i + 1}: ${leak.age}ms old`);
      console.error(`  Stack trace:\n${leak.stack}`);
    });
  }
}, 60000);
```

---

## Memory Management

Proper memory management prevents leaks, reduces garbage collection pressure, and ensures stable long-term performance.

### Memory Profiling

Monitor memory usage in production:

```typescript
function getMemoryStats() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024), // Resident set size (MB)
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024),
    arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024)
  };
}

// Log memory usage periodically
setInterval(() => {
  const stats = getMemoryStats();
  console.log(`Memory: RSS=${stats.rss}MB, Heap=${stats.heapUsed}/${stats.heapTotal}MB`);

  // Alert if memory usage is high
  if (stats.heapUsed > 400) {
    console.warn('⚠️  High memory usage detected!');
  }
}, 60000); // Every minute
```

### Garbage Collection Tuning

Optimize garbage collection for your workload:

```bash
# Increase heap size for high-memory applications
node --max-old-space-size=4096 app.js  # 4GB heap

# Optimize GC for low latency (more frequent, shorter pauses)
node --optimize-for-size --max-old-space-size=2048 app.js

# Enable GC logging to analyze behavior
node --trace-gc app.js

# Advanced: Tune GC parameters
node --max-old-space-size=4096 \
     --initial-old-space-size=2048 \
     --max-semi-space-size=128 \
     app.js
```

**GC Monitoring**:

```typescript
// Expose GC stats (requires --expose-gc flag)
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
                `(total: ${gcTime.toFixed(2)}ms)`);
  };
}

// Trigger manual GC after heavy operations
async function processBulkData() {
  // ... heavy processing ...

  if (global.gc) {
    console.log('Triggering manual GC after bulk processing');
    global.gc();
  }
}
```

### Memory Leak Prevention

Common memory leak patterns and fixes:

#### 1. Event Listener Leaks

```typescript
// ❌ BAD: Event listeners never removed
class BadService {
  constructor(private sdk: WildberriesSDK) {
    // Leak: listener never removed
    sdk.on('request', () => {
      console.log('Request made');
    });
  }
}

// ✅ GOOD: Clean up event listeners
class GoodService {
  private listener: () => void;

  constructor(private sdk: WildberriesSDK) {
    this.listener = () => console.log('Request made');
    sdk.on('request', this.listener);
  }

  destroy() {
    this.sdk.off('request', this.listener);
  }
}
```

#### 2. Timer Leaks

```typescript
// ❌ BAD: Timers never cleared
function badPolling() {
  const data = new Array(1000000).fill('leak');
  setInterval(() => {
    console.log(data.length); // Holds `data` in memory forever
  }, 1000);
}

// ✅ GOOD: Clear timers when done
class GoodPolling {
  private interval: NodeJS.Timeout | null = null;

  start() {
    this.interval = setInterval(() => {
      // ... polling logic ...
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

#### 3. Closure Leaks

```typescript
// ❌ BAD: Closure holds large data
function badClosure() {
  const largeData = new Array(1000000).fill('data');

  return function() {
    console.log(largeData.length); // Holds largeData forever
  };
}

// ✅ GOOD: Only close over what you need
function goodClosure() {
  const largeData = new Array(1000000).fill('data');
  const length = largeData.length; // Extract only what's needed

  return function() {
    console.log(length); // Only holds `length`, not entire array
  };
}
```

#### 4. Cache Leaks

```typescript
// ❌ BAD: Unbounded cache growth
const badCache = new Map();

async function badGetData(key: string) {
  if (!badCache.has(key)) {
    const data = await fetchData(key);
    badCache.set(key, data); // Never evicted!
  }
  return badCache.get(key);
}

// ✅ GOOD: LRU cache with size limit
import LRU from 'lru-cache';

const goodCache = new LRU({
  max: 500, // Max 500 items
  maxSize: 100 * 1024 * 1024, // Max 100MB
  sizeCalculation: (value) => JSON.stringify(value).length,
  ttl: 1000 * 60 * 5 // 5 minutes
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

### Memory Leak Detection

Use heap snapshots to detect leaks:

```typescript
import v8 from 'v8';
import fs from 'fs';

function takeHeapSnapshot(filename: string) {
  const snapshotStream = v8.writeHeapSnapshot(filename);
  console.log(`Heap snapshot written to ${filename}`);
  return snapshotStream;
}

// Take snapshots before and after operations
takeHeapSnapshot('before.heapsnapshot');

// ... run your code ...

takeHeapSnapshot('after.heapsnapshot');

// Compare snapshots in Chrome DevTools:
// 1. Open Chrome DevTools
// 2. Go to Memory tab
// 3. Load both snapshots
// 4. Compare to find retained objects
```

### Best Practices

1. **Use Streams for Large Data**
```typescript
// ❌ BAD: Load entire response into memory
const data = await sdk.reports.downloadLarge();
processData(data); // May cause OOM

// ✅ GOOD: Stream large responses
const stream = await sdk.reports.downloadLargeStream();
stream.pipe(processStream);
```

2. **Limit Concurrent Operations**
```typescript
// ❌ BAD: Process all items concurrently (memory spike)
await Promise.all(
  items.map(item => processItem(item))
);

// ✅ GOOD: Process in batches (controlled memory usage)
for (let i = 0; i < items.length; i += 10) {
  const batch = items.slice(i, i + 10);
  await Promise.all(batch.map(item => processItem(item)));
}
```

3. **Clear References When Done**
```typescript
// ❌ BAD: Keep references after use
let cachedData = await fetchLargeData();
// ... use data ...
// cachedData still in memory

// ✅ GOOD: Clear references
let cachedData = await fetchLargeData();
// ... use data ...
cachedData = null; // Allow GC to collect
```

---

## Performance Monitoring

Comprehensive monitoring setup for production deployments.

### Prometheus Metrics

Expose SDK metrics for Prometheus scraping:

```typescript
import { Registry, Histogram, Counter, Gauge } from 'prom-client';
import express from 'express';

// Create Prometheus registry
const register = new Registry();

// Define metrics
const httpRequestDuration = new Histogram({
  name: 'wb_sdk_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'endpoint', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Custom buckets
  registers: [register]
});

const httpRequestTotal = new Counter({
  name: 'wb_sdk_http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'endpoint', 'status'],
  registers: [register]
});

const httpRequestErrors = new Counter({
  name: 'wb_sdk_http_request_errors_total',
  help: 'Total HTTP request errors',
  labelNames: ['method', 'endpoint', 'error_type'],
  registers: [register]
});

const activeConnections = new Gauge({
  name: 'wb_sdk_active_connections',
  help: 'Number of active HTTP connections',
  registers: [register]
});

const cacheHitRate = new Gauge({
  name: 'wb_sdk_cache_hit_rate',
  help: 'Cache hit rate percentage',
  labelNames: ['cache_type'],
  registers: [register]
});

const rateLimitUtilization = new Gauge({
  name: 'wb_sdk_rate_limit_utilization',
  help: 'Rate limit utilization percentage',
  labelNames: ['endpoint'],
  registers: [register]
});

// Instrument SDK requests
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

// Expose metrics endpoint
const app = express();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(9090, () => {
  console.log('Metrics server listening on port 9090');
  console.log('Metrics available at http://localhost:9090/metrics');
});
```

### Grafana Dashboard

Create a Grafana dashboard for SDK metrics:

```json
{
  "dashboard": {
    "title": "Wildberries SDK Performance",
    "tags": ["wildberries", "sdk", "performance"],
    "timezone": "browser",
    "panels": [
      {
        "title": "API Request Latency (p95)",
        "type": "graph",
        "gridPos": { "x": 0, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum(rate(wb_sdk_http_request_duration_seconds_bucket[5m])) by (le, endpoint))",
            "legendFormat": "{{endpoint}} p95"
          }
        ],
        "yaxes": [
          { "format": "s", "label": "Latency" }
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
          "message": "API latency p95 exceeded 1 second",
          "name": "High API Latency"
        }
      },
      {
        "title": "Request Rate",
        "type": "graph",
        "gridPos": { "x": 12, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "sum(rate(wb_sdk_http_requests_total[5m])) by (endpoint)",
            "legendFormat": "{{endpoint}}"
          }
        ],
        "yaxes": [
          { "format": "reqps", "label": "Requests/sec" }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "gridPos": { "x": 0, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "sum(rate(wb_sdk_http_request_errors_total[5m])) by (error_type)",
            "legendFormat": "{{error_type}}"
          }
        ],
        "yaxes": [
          { "format": "short", "label": "Errors/sec" }
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
          "message": "High error rate detected",
          "name": "High Error Rate"
        }
      },
      {
        "title": "Cache Hit Rate",
        "type": "graph",
        "gridPos": { "x": 12, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "wb_sdk_cache_hit_rate",
            "legendFormat": "{{cache_type}}"
          }
        ],
        "yaxes": [
          { "format": "percent", "label": "Hit Rate %" }
        ]
      },
      {
        "title": "Active Connections",
        "type": "graph",
        "gridPos": { "x": 0, "y": 16, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "wb_sdk_active_connections",
            "legendFormat": "Active"
          }
        ],
        "yaxes": [
          { "format": "short", "label": "Connections" }
        ]
      },
      {
        "title": "Rate Limit Utilization",
        "type": "graph",
        "gridPos": { "x": 12, "y": 16, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "wb_sdk_rate_limit_utilization",
            "legendFormat": "{{endpoint}}"
          }
        ],
        "yaxes": [
          { "format": "percent", "label": "Utilization %" }
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
          "message": "Rate limit utilization above 90%",
          "name": "High Rate Limit Usage"
        }
      }
    ]
  }
}
```

### Alerting Rules

Define Prometheus alerting rules:

```yaml
# prometheus-alerts.yml
groups:
  - name: wildberries_sdk
    interval: 1m
    rules:
      # High latency alert
      - alert: HighAPILatency
        expr: histogram_quantile(0.95, rate(wb_sdk_http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High API latency detected"
          description: "p95 latency is {{ $value }}s (threshold: 1s)"

      # High error rate alert
      - alert: HighErrorRate
        expr: rate(wb_sdk_http_request_errors_total[5m]) > 10
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors/sec (threshold: 10/sec)"

      # Low cache hit rate
      - alert: LowCacheHitRate
        expr: wb_sdk_cache_hit_rate < 50
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Low cache hit rate"
          description: "Cache hit rate is {{ $value }}% (threshold: 50%)"

      # High rate limit utilization
      - alert: HighRateLimitUsage
        expr: wb_sdk_rate_limit_utilization > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High rate limit utilization"
          description: "Rate limit usage at {{ $value }}% for {{ $labels.endpoint }}"

      # Memory usage alert
      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes > 500 * 1024 * 1024
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value | humanize }}B (threshold: 500MB)"
```

### Application Performance Monitoring (APM)

Integrate with APM tools for detailed insights:

```typescript
// New Relic integration
import newrelic from 'newrelic';

sdk.on('request', ({ method, url }) => {
  newrelic.startWebTransaction(url, async () => {
    // Transaction automatically tracked
  });
});

// DataDog integration
import tracer from 'dd-trace';
tracer.init();

const span = tracer.startSpan('wb.sdk.request');
span.setTag('method', method);
span.setTag('endpoint', url);

// ... make request ...

span.finish();

// Sentry integration for error tracking
import * as Sentry from '@sentry/node';

sdk.on('error', ({ error, context }) => {
  Sentry.captureException(error, {
    extra: context
  });
});
```

---

## Benchmarking Scripts

Comprehensive benchmarking suite for testing SDK performance.

### Installation

Create benchmarking scripts in `scripts/` directory:

```bash
# Install dependencies
npm install --save-dev autocannon clinic
```

### Basic Latency Benchmark

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
  console.log(`\n📊 Benchmarking: ${name}`);
  console.log(`   Iterations: ${iterations}`);

  const latencies: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await operation();
    const end = performance.now();
    latencies.push(end - start);

    if ((i + 1) % 10 === 0) {
      process.stdout.write(`\r   Progress: ${i + 1}/${iterations}`);
    }
  }

  console.log(); // New line

  latencies.sort((a, b) => a - b);

  const result = {
    p50: latencies[Math.floor(iterations * 0.5)],
    p95: latencies[Math.floor(iterations * 0.95)],
    p99: latencies[Math.floor(iterations * 0.99)],
    avg: latencies.reduce((a, b) => a + b, 0) / iterations,
    min: latencies[0],
    max: latencies[latencies.length - 1]
  };

  console.log(`   Results:`);
  console.log(`     p50: ${result.p50.toFixed(2)}ms`);
  console.log(`     p95: ${result.p95.toFixed(2)}ms`);
  console.log(`     p99: ${result.p99.toFixed(2)}ms`);
  console.log(`     avg: ${result.avg.toFixed(2)}ms`);
  console.log(`     min: ${result.min.toFixed(2)}ms`);
  console.log(`     max: ${result.max.toFixed(2)}ms`);

  return result;
}

async function main() {
  console.log('🚀 SDK Latency Benchmarks\n');
  console.log(`SDK Version: ${sdk.version}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);

  const results: Record<string, LatencyResult> = {};

  // Benchmark General module
  results.ping = await benchmarkLatency(
    'General.ping()',
    () => sdk.general.ping(),
    100
  );

  // Benchmark Products module
  results.getCategories = await benchmarkLatency(
    'Products.getParentAll()',
    () => sdk.products.getParentAll(),
    50
  );

  // Benchmark Orders module
  results.getNewOrders = await benchmarkLatency(
    'OrdersFBS.getNewOrders()',
    () => sdk.ordersFBS.getNewOrders(),
    50
  );

  console.log('\n📈 Summary:');
  console.log('\n| Endpoint | p50 | p95 | p99 | avg |');
  console.log('|----------|-----|-----|-----|-----|');
  Object.entries(results).forEach(([name, result]) => {
    console.log(`| ${name} | ${result.p50.toFixed(0)}ms | ${result.p95.toFixed(0)}ms | ${result.p99.toFixed(0)}ms | ${result.avg.toFixed(0)}ms |`);
  });

  console.log('\n✅ Benchmarks complete!');
}

main().catch(console.error);
```

### Throughput Benchmark

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
  console.log(`\n📊 Throughput Benchmark: ${name}`);
  console.log(`   Duration: ${durationMs / 1000}s`);

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
      process.stdout.write(`\r   Elapsed: ${elapsed}s, Requests: ${successful + failed}`);
    }
  }

  console.log(); // New line

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

  console.log(`   Results:`);
  console.log(`     Throughput: ${result.requestsPerSecond.toFixed(2)} req/s`);
  console.log(`     Total Requests: ${result.totalRequests}`);
  console.log(`     Successful: ${result.successfulRequests}`);
  console.log(`     Failed: ${result.failedRequests}`);
  console.log(`     Error Rate: ${((failed / totalRequests) * 100).toFixed(2)}%`);
  console.log(`     Avg Latency: ${result.avgLatency.toFixed(2)}ms`);
  console.log(`     p95 Latency: ${result.p95Latency.toFixed(2)}ms`);

  return result;
}

async function main() {
  console.log('🚀 SDK Throughput Benchmarks\n');

  const results: Record<string, ThroughputResult> = {};

  // Benchmark sustained throughput
  results.ping = await benchmarkThroughput(
    'General.ping()',
    () => sdk.general.ping(),
    10000 // 10 seconds
  );

  console.log('\n✅ Throughput benchmarks complete!');
}

main().catch(console.error);
```

### Memory Benchmark

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
  console.log(`\n📊 Memory Benchmark: ${name}`);
  console.log(`   Iterations: ${iterations}`);

  // Force GC before test (requires --expose-gc flag)
  if (global.gc) {
    console.log('   Forcing GC before test...');
    global.gc();
  }

  const memBefore = getMemoryMB();
  console.log(`   Memory before: ${memBefore.heapUsed}MB heap, ${memBefore.rss}MB RSS`);

  // Run operations
  for (let i = 0; i < iterations; i++) {
    await operation();

    if ((i + 1) % 100 === 0) {
      process.stdout.write(`\r   Progress: ${i + 1}/${iterations}`);
    }
  }

  console.log(); // New line

  const memAfter = getMemoryMB();
  console.log(`   Memory after: ${memAfter.heapUsed}MB heap, ${memAfter.rss}MB RSS`);

  const memDelta = {
    heapUsed: memAfter.heapUsed - memBefore.heapUsed,
    rss: memAfter.rss - memBefore.rss
  };

  console.log(`   Memory delta: ${memDelta.heapUsed}MB heap, ${memDelta.rss}MB RSS`);
  console.log(`   Per-request overhead: ${((memDelta.heapUsed * 1024) / iterations).toFixed(2)}KB`);

  // Force GC after test
  if (global.gc) {
    console.log('   Forcing GC after test...');
    global.gc();
  }

  const memAfterGC = getMemoryMB();
  console.log(`   Memory after GC: ${memAfterGC.heapUsed}MB heap, ${memAfterGC.rss}MB RSS`);

  const recovered = memAfter.heapUsed - memAfterGC.heapUsed;
  console.log(`   Recovered by GC: ${recovered}MB (${((recovered / memAfter.heapUsed) * 100).toFixed(1)}%)`);

  if (memAfterGC.heapUsed > memBefore.heapUsed + 10) {
    console.warn(`   ⚠️  Potential memory leak detected! ${memAfterGC.heapUsed - memBefore.heapUsed}MB not recovered`);
  }
}

async function main() {
  console.log('🚀 SDK Memory Benchmarks\n');
  console.log('⚠️  Run with: node --expose-gc scripts/benchmark-memory.js\n');

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

  console.log('\n✅ Memory benchmarks complete!');
}

main().catch(console.error);
```

### Running Benchmarks

```bash
# Latency benchmarks
npm run benchmark:latency

# Throughput benchmarks
npm run benchmark:throughput

# Memory benchmarks (requires --expose-gc)
npm run benchmark:memory

# Run all benchmarks
npm run benchmark:all
```

Add to `package.json`:

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

## Performance Checklist

Use this checklist to ensure optimal SDK performance in production.

### Pre-Deployment Performance Validation

- [ ] **Baseline Benchmarks Completed**
  - [ ] Latency benchmarks run for all critical modules
  - [ ] Throughput benchmarks completed
  - [ ] Memory profiling performed
  - [ ] No memory leaks detected
  - [ ] Results documented and reviewed

- [ ] **Performance Targets Defined**
  - [ ] p50 latency target: `__________ms`
  - [ ] p95 latency target: `__________ms`
  - [ ] Throughput target: `__________req/s`
  - [ ] Memory usage target: `__________MB`
  - [ ] Error rate target: `__________%`

- [ ] **Load Testing Performed**
  - [ ] Sustained load test (10+ minutes)
  - [ ] Spike load test (sudden traffic increase)
  - [ ] Stress test (beyond normal capacity)
  - [ ] Soak test (extended duration, 24+ hours)
  - [ ] Results meet performance targets

### Production Configuration

- [ ] **Connection Pooling Enabled**
  - [ ] HTTP/HTTPS agents configured with keep-alive
  - [ ] `maxSockets` sized for expected load
  - [ ] `maxFreeSockets` configured appropriately
  - [ ] Connection timeout set (60s recommended)

- [ ] **Caching Strategy Implemented**
  - [ ] Cacheable endpoints identified
  - [ ] Cache TTLs configured per endpoint type
  - [ ] Cache invalidation strategy defined
  - [ ] Cache hit rate monitored (target: >80%)
  - [ ] Cache warming implemented for critical data

- [ ] **Rate Limit Optimization Applied**
  - [ ] Rate limits documented per endpoint
  - [ ] Request queueing implemented where appropriate
  - [ ] Batch operations used for bulk processing
  - [ ] Parallel requests to different endpoints
  - [ ] Rate limit monitoring active

- [ ] **Memory Management Configured**
  - [ ] Heap size appropriate for workload
  - [ ] GC tuning applied if needed
  - [ ] Memory leak detection enabled
  - [ ] Memory monitoring active
  - [ ] Automatic cleanup mechanisms in place

### Monitoring Setup

- [ ] **Metrics Collection Active**
  - [ ] Prometheus metrics exposed
  - [ ] Request latency tracked (p50, p95, p99)
  - [ ] Throughput monitored
  - [ ] Error rate tracked
  - [ ] Memory usage monitored
  - [ ] Cache hit rate tracked
  - [ ] Rate limit utilization monitored

- [ ] **Dashboards Configured**
  - [ ] Grafana dashboard created
  - [ ] Real-time metrics visible
  - [ ] Historical trends available
  - [ ] Team has access to dashboards

- [ ] **Alerting Rules Defined**
  - [ ] High latency alert (p95 > 1s)
  - [ ] High error rate alert (>1%)
  - [ ] Low cache hit rate alert (<50%)
  - [ ] High rate limit usage alert (>90%)
  - [ ] High memory usage alert (>500MB)
  - [ ] Alert routing configured (email, Slack, PagerDuty)

### Ongoing Optimization

- [ ] **Regular Performance Reviews**
  - [ ] Monthly performance reports
  - [ ] Benchmark comparisons (version to version)
  - [ ] Identify performance regressions
  - [ ] Document optimization opportunities

- [ ] **Cache Optimization**
  - [ ] Cache hit rate trending
  - [ ] TTL adjustments as needed
  - [ ] Cache size monitoring
  - [ ] Invalidation strategy effectiveness

- [ ] **Rate Limit Optimization**
  - [ ] Rate limit utilization tracking
  - [ ] Identify bottleneck endpoints
  - [ ] Optimize request patterns
  - [ ] Consider rate limit upgrades if needed

- [ ] **Memory Management**
  - [ ] Regular memory profiling
  - [ ] Leak detection checks
  - [ ] GC tuning adjustments
  - [ ] Memory trend analysis

---

## Troubleshooting Performance Issues

Common performance problems and solutions.

### Issue: High API Latency

**Symptoms**:
- p95 latency > 1000ms
- Slow response times
- User complaints about performance

**Diagnosis**:
```typescript
// 1. Measure per-endpoint latency
const metrics = await measureEndpointLatency();
console.log(metrics);

// 2. Check network latency
const ping = await sdk.general.ping();
// If ping is slow, network may be the issue

// 3. Check for rate limiting
// Look for 429 errors in logs
```

**Solutions**:
1. **Enable caching** for frequently accessed endpoints
2. **Use connection pooling** to reduce connection overhead
3. **Implement parallel requests** for independent data
4. **Optimize batch sizes** for bulk operations
5. **Check network connectivity** and DNS resolution
6. **Review API rate limits** - may need higher tier

### Issue: Low Throughput

**Symptoms**:
- Requests per second below target
- Slow batch processing
- Long queue times

**Diagnosis**:
```typescript
// Check rate limit utilization
const utilization = rateLimitMonitor.getReport();
console.log(utilization);

// If >90%, rate limits are the bottleneck
```

**Solutions**:
1. **Optimize rate limit usage**:
   - Use batch operations
   - Parallel requests to different endpoints
   - Implement intelligent queueing

2. **Increase concurrency**:
   - Adjust `maxSockets` in HTTP agent
   - Process more items in parallel

3. **Reduce per-request overhead**:
   - Enable connection pooling
   - Implement caching
   - Use request deduplication

### Issue: Memory Leaks

**Symptoms**:
- Memory usage grows over time
- Application crashes (OOM)
- GC taking increasing time

**Diagnosis**:
```typescript
// Take heap snapshots
import v8 from 'v8';
v8.writeHeapSnapshot('before.heapsnapshot');
// ... run operations ...
v8.writeHeapSnapshot('after.heapsnapshot');
// Compare in Chrome DevTools
```

**Solutions**:
1. **Check for common leak patterns**:
   - Event listeners not removed
   - Timers not cleared
   - Closures holding large objects
   - Unbounded cache growth

2. **Implement cleanup**:
```typescript
// Clean up resources
process.on('exit', () => {
  sdk.destroy(); // Close connections, clear caches
});
```

3. **Use bounded caches**:
```typescript
import LRU from 'lru-cache';
const cache = new LRU({ max: 500 }); // Limit size
```

### Issue: High Error Rate

**Symptoms**:
- Error rate > 1%
- Frequent rate limit errors (429)
- Authentication failures (401)

**Diagnosis**:
```typescript
// Analyze error types
const errorStats = await getErrorStatistics();
console.log(errorStats);

// Check logs for patterns
```

**Solutions**:
1. **Rate limit errors (429)**:
   - Implement request queueing
   - Reduce request rate
   - Use batch operations
   - Check rate limit monitoring

2. **Authentication errors (401)**:
   - Verify API key is valid
   - Check key permissions
   - Rotate keys if compromised

3. **Network errors**:
   - Implement retry logic
   - Check network connectivity
   - Increase timeout values

---

## Additional Resources

- **SDK Documentation**: [/docs/api/README.md](../api/README.md)
- **Best Practices Guide**: [/docs/guides/best-practices.md](./best-practices.md)
- **Examples**: [/examples/](../../examples/)
- **Wildberries API Docs**: https://dev.wildberries.ru/

---

**Last Updated**: 2025-10-26
**Version**: 1.0.0
**Maintainers**: SDK Team
