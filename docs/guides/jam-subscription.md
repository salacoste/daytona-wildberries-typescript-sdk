---
title: Jam Subscription Detection
description: Detect Wildberries Jam subscription tier using SDK probe method
layout: doc
---

# Jam Subscription Detection

This guide explains how to detect your Wildberries Jam subscription tier using the SDK's probe-based detection method. Knowing your tier is essential for setting correct `limit` values when calling analytics endpoints.

## Table of Contents

- [What is Jam?](#what-is-jam)
- [Why Detection Matters](#why-detection-matters)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start)
- [Method Reference](#method-reference)
- [Usage Examples](#usage-examples)
- [Rate Limits](#rate-limits)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Related Resources](#related-resources)

## What is Jam?

Jam (Russian: **\u0414\u0436\u0435\u043c**) is Wildberries' tiered subscription program for sellers. Different tiers unlock higher limits on analytics endpoints, particularly for search-text queries.

### Subscription Tiers

| Tier | Russian Name | Search Text Limit | Analytics Access |
|------|-------------|-------------------|-----------------|
| **None** | \u2014 | Unavailable | Search-text endpoints return 400 |
| **Standard** | \u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0439 | Up to 30 per query | Basic analytics |
| **Advanced** | \u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439 | Up to 50 per query | Full analytics |

The tier directly affects the maximum `limit` parameter you can pass to analytics methods like `createProductSearchText()`. Exceeding the allowed limit for your tier results in a 400 error.

## Why Detection Matters

Wildberries does not provide a dedicated API endpoint to query your Jam subscription status. This creates a practical problem: if you call an analytics endpoint with a `limit` value that exceeds your tier's allowance, the request fails with a 400 error.

Without knowing your tier, you have two undesirable options:

1. **Always use the lowest limit** (conservative) -- wastes your subscription's capacity
2. **Guess and handle errors** (reactive) -- leads to unnecessary failed requests

The SDK solves this by providing `getJamSubscriptionStatus()`, which probes the analytics API to determine your tier programmatically.

## How It Works

The method uses a probe-based detection strategy, making up to two targeted API calls to determine your subscription tier:

```
Step 1: Call search-texts endpoint with limit: 31
        (above Standard max of 30)

   200 OK       --> Advanced tier (done, 1 probe call)
   400 Error    --> Not Advanced, continue to Step 2

Step 2: Call search-texts endpoint with limit: 1
        (minimum valid limit)

   200 OK       --> Standard tier (done, 2 probe calls)
   400 Error    --> No Jam subscription (done, 2 probe calls)
```

Authentication errors (401/403), rate limit errors (429), and network errors are never caught by the probe logic -- they are re-thrown immediately so your application can handle them.

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // Detect Jam subscription tier
  // nmIds must contain valid product IDs from your account
  const status = await sdk.general.getJamSubscriptionStatus({
    nmIds: [123456789]
  });

  console.log(`Jam tier: ${status.tier}`);
  console.log(`Checked at: ${status.checkedAt}`);
  console.log(`Probe calls made: ${status.probeCallsMade}`);
}

main();
```

## Method Reference

### getJamSubscriptionStatus(params)

Detects the seller's Jam subscription tier by probing the analytics search-text endpoint.

**Module:** `sdk.general`

```typescript
async getJamSubscriptionStatus(
  params: GetJamSubscriptionStatusParams
): Promise<JamSubscriptionStatus>
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `nmIds` | `number[]` | Yes | WB article IDs to use in probe requests. Must be valid products belonging to your seller account. |

### Response

```typescript
interface JamSubscriptionStatus {
  tier: JamSubscriptionTier;    // 'none' | 'standard' | 'advanced'
  checkedAt: string;            // ISO 8601 timestamp
  probeCallsMade: number;       // 1 for advanced, 2 for standard/none
}

type JamSubscriptionTier = 'none' | 'standard' | 'advanced';
```

| Field | Description |
|-------|-------------|
| `tier` | Detected subscription tier |
| `checkedAt` | ISO 8601 timestamp of when the check was performed |
| `probeCallsMade` | Number of probe requests made (1 if Advanced detected immediately, 2 otherwise) |

## Usage Examples

### Basic Usage -- Detect and Log

```typescript
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [123456789]
});

switch (status.tier) {
  case 'advanced':
    console.log('Advanced tier: up to 50 search texts per query');
    break;
  case 'standard':
    console.log('Standard tier: up to 30 search texts per query');
    break;
  case 'none':
    console.log('No Jam subscription: search-text endpoints unavailable');
    break;
}
```

### Conditional Limit Selection for Analytics

Use the detected tier to set the correct `limit` when calling analytics endpoints:

```typescript
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [123456789]
});

if (status.tier === 'none') {
  console.warn('Jam subscription required for search-text analytics');
  return;
}

// Set limit based on tier
const searchTextLimit = status.tier === 'advanced' ? 50 : 30;

const report = await sdk.analytics.createProductSearchText({
  nmIds: [123456789],
  limit: searchTextLimit,
  dateFrom: '2025-01-01',
  dateTo: '2025-01-31'
});

console.log(`Retrieved ${report.data?.length ?? 0} search texts`);
```

### Caching the Result

The subscription tier does not change frequently. Cache the result to avoid unnecessary probe calls:

```typescript
let cachedStatus: JamSubscriptionStatus | null = null;
let cacheExpiry = 0;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getJamTier(sdk: WildberriesSDK, nmIds: number[]) {
  const now = Date.now();

  if (cachedStatus && now < cacheExpiry) {
    return cachedStatus;
  }

  cachedStatus = await sdk.general.getJamSubscriptionStatus({ nmIds });
  cacheExpiry = now + CACHE_TTL_MS;

  return cachedStatus;
}

// Usage
const status = await getJamTier(sdk, [123456789]);
console.log(`Jam tier (cached): ${status.tier}`);
```

### Error Handling

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function detectJamSafely(sdk: WildberriesSDK, nmIds: number[]) {
  try {
    const status = await sdk.general.getJamSubscriptionStatus({ nmIds });
    return status;
  } catch (error) {
    if (error instanceof ValidationError) {
      // nmIds array is empty or invalid
      console.error('Invalid parameters:', error.message);
    } else if (error instanceof AuthenticationError) {
      // API key is invalid or missing required permissions
      console.error('Authentication failed:', error.message);
    } else if (error instanceof RateLimitError) {
      // Analytics rate limit exceeded (shared quota)
      console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
    } else if (error instanceof NetworkError) {
      // Network connectivity issue
      console.error('Network error:', error.message);
    } else if (error instanceof WBAPIError) {
      // 403: nmIds do not belong to your seller account
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
    throw error;
  }
}
```

## Rate Limits

The probe method calls `POST /api/v2/search-report/product/search-texts` under the hood. It shares the same rate limit quota as `sdk.analytics.createProductSearchText()`:

| Parameter | Value |
|-----------|-------|
| Requests per minute | 3 |
| Interval | 20 seconds |
| Burst limit | 3 |
| Probe calls per detection | 1-2 |

::: warning Rate Limit Impact
Each call to `getJamSubscriptionStatus()` consumes 1-2 requests from the analytics search-text quota. Plan your detection calls accordingly, and cache results to minimize rate limit consumption.
:::

## Best Practices

### 1. Cache Detection Results

Jam subscription tiers do not change frequently. Check once at application startup or once per hour, not on every analytics request:

```typescript
// Good: detect once, reuse
const jamStatus = await sdk.general.getJamSubscriptionStatus({
  nmIds: [yourProductId]
});
const limit = jamStatus.tier === 'advanced' ? 50 : 30;

// Then use `limit` for all subsequent analytics calls
```

### 2. Use Valid Product IDs

The `nmIds` parameter must contain product IDs (article numbers) that belong to your seller account. Using IDs from other sellers or non-existent IDs will result in a 403 Forbidden error:

```typescript
// Good: use your own product IDs
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [yourRealProductId]
});

// Bad: arbitrary or other seller's IDs will fail with 403
```

### 3. Handle the "None" Tier Gracefully

If the seller has no Jam subscription, search-text analytics endpoints are unavailable. Design your application to degrade gracefully:

```typescript
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [123456789]
});

if (status.tier === 'none') {
  // Fall back to other analytics methods that don't require Jam
  const basicAnalytics = await sdk.analytics.getNmReport({ ... });
  return basicAnalytics;
}

// Proceed with search-text analytics
const report = await sdk.analytics.createProductSearchText({ ... });
```

### 4. Detect at Startup, Not Per-Request

Avoid calling `getJamSubscriptionStatus()` before every analytics request. Instead, detect once and store the result:

```typescript
class MyApp {
  private jamTier: JamSubscriptionTier = 'none';

  async initialize(sdk: WildberriesSDK, nmIds: number[]) {
    const status = await sdk.general.getJamSubscriptionStatus({ nmIds });
    this.jamTier = status.tier;
    console.log(`Initialized with Jam tier: ${this.jamTier}`);
  }

  getSearchTextLimit(): number {
    switch (this.jamTier) {
      case 'advanced': return 50;
      case 'standard': return 30;
      default: return 0;
    }
  }
}
```

## Related Resources

- [General Module Reference](/modules/general) -- Full reference for all General module methods
- [Analytics Module Reference](/modules/analytics) -- Analytics endpoints including search-text methods
- [Configuration Guide](/guides/configuration) -- SDK configuration and caching strategies
- [Best Practices](/guides/best-practices) -- General error handling and production patterns
- [Troubleshooting](/guides/troubleshooting) -- Common issues and solutions
