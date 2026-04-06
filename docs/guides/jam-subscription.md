---
title: Jam Subscription Detection
description: Detect Wildberries Jam subscription tier using the direct API or the legacy probe method
layout: doc
---

# Jam Subscription Detection

This guide explains how to detect your Wildberries Jam subscription tier using the SDK. Knowing your tier is essential for setting correct `limit` values when calling analytics endpoints.

## Table of Contents

- [What is Jam?](#what-is-jam)
- [Why Detection Matters](#why-detection-matters)
- [Direct API (Recommended)](#direct-api-recommended)
- [Probe-Based Detection (Legacy)](#probe-based-detection-legacy)
- [Usage Examples](#usage-examples)
- [Rate Limits](#rate-limits)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Related Resources](#related-resources)

## What is Jam?

Jam (Russian: **Джем**) is Wildberries' tiered subscription program for sellers. Different tiers unlock higher limits on analytics endpoints, particularly for search-text queries.

### Subscription Tiers

| Tier | Russian Name | Search Text Limit | Analytics Access |
|------|-------------|-------------------|-----------------|
| **None** | — | Unavailable | Search-text endpoints return 400 |
| **Standard** | Стандартный | Up to 30 per query | Basic analytics |
| **Advanced** | Продвинутый | Up to 50 per query | Full analytics |

The tier directly affects the maximum `limit` parameter you can pass to analytics methods like `createProductSearchText()`. Exceeding the allowed limit for your tier results in a 400 error.

## Why Detection Matters

If you call an analytics endpoint with a `limit` value that exceeds your tier's allowance, the request fails with a 400 error.

Without knowing your tier, you have two undesirable options:

1. **Always use the lowest limit** (conservative) -- wastes your subscription's capacity
2. **Guess and handle errors** (reactive) -- leads to unnecessary failed requests

The SDK provides two methods to determine your tier: a direct API call (recommended) and a probe-based fallback.

## Direct API (Recommended)

*Since v3.5.0*

The `getJamSubscription()` method calls the dedicated `GET /api/common/v1/subscriptions` endpoint. This is the preferred approach because it returns complete subscription details in a single request and does not consume any analytics quota.

### Requirements

- **Token type:** Service token (any category)
- **Rate limit:** 1 request per minute, burst 10

### Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_SERVICE_TOKEN!,
  tokenType: 'service',
});

const jam = await sdk.general.getJamSubscription();

if (jam.state === 'active') {
  console.log(`Jam ${jam.level} active until ${jam.till}`);
  console.log(`Source: ${jam.activationSource}, since: ${jam.since}`);
} else if (jam.state) {
  console.log(`Jam inactive (state: ${jam.state})`);
} else {
  console.log('Never subscribed to Jam');
}
```

### Method Reference

```typescript
async getJamSubscription(): Promise<JamSubscriptionDetails>
```

**Module:** `sdk.general`

### Response: JamSubscriptionDetails

```typescript
interface JamSubscriptionDetails {
  /** Subscription state: 'active' or other values when inactive */
  state?: string;
  /** How the subscription was activated (e.g., 'jam') */
  activationSource?: string;
  /** Subscription level (e.g., 'premium', 'standard') */
  level?: string;
  /** Date of first subscription activation (ISO 8601) */
  since?: string;
  /** End date of current/last paid period (ISO 8601) */
  till?: string;
}
```

| Field | Description |
|-------|-------------|
| `state` | Subscription state. `'active'` when subscription is current. Other values indicate inactive/expired. `undefined` if never subscribed. |
| `activationSource` | How the subscription was activated (e.g., `'jam'`). `undefined` if never subscribed. |
| `level` | Subscription level (e.g., `'premium'`, `'standard'`). `undefined` if never subscribed. |
| `since` | ISO 8601 date of first subscription activation. Persists across re-subscriptions. |
| `till` | ISO 8601 end date of current or last paid period. |

::: tip Empty Response
If the seller has never subscribed to Jam, the API returns a 200 with an empty object. All fields will be `undefined`.
:::

### Conditional Limit Selection

```typescript
const jam = await sdk.general.getJamSubscription();

if (!jam.state || jam.state !== 'active') {
  console.warn('No active Jam subscription. Search-text analytics unavailable.');
  return;
}

// Set limit based on subscription level
const searchTextLimit = jam.level === 'premium' ? 50 : 30;

const report = await sdk.analytics.createProductSearchText({
  nmIds: [123456789],
  limit: searchTextLimit,
  dateFrom: '2025-01-01',
  dateTo: '2025-01-31',
});

console.log(`Retrieved ${report.data?.length ?? 0} search texts`);
```

## Probe-Based Detection (Legacy)

::: warning Legacy Method
`getJamSubscriptionStatus()` is deprecated in favor of `getJamSubscription()`. Use this method only as a fallback when you do not have a Service token (e.g., when using a Personal token that lacks access to the subscriptions endpoint).
:::

The probe method determines the subscription tier by making up to two targeted requests to the analytics search-text endpoint. It does not require a Service token but consumes analytics rate limit quota.

### How It Works

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

### Quick Start (Probe)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// nmIds must contain valid product IDs from your account
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [123456789],
});

console.log(`Jam tier: ${status.tier}`);
console.log(`Checked at: ${status.checkedAt}`);
console.log(`Probe calls made: ${status.probeCallsMade}`);
```

### Method Reference (Probe)

```typescript
async getJamSubscriptionStatus(
  params: GetJamSubscriptionStatusParams
): Promise<JamSubscriptionStatus>
```

**Module:** `sdk.general`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `nmIds` | `number[]` | Yes | WB article IDs to use in probe requests. Must be valid products belonging to your seller account. |

### Response: JamSubscriptionStatus

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

### Probe Usage Example

```typescript
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [123456789],
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

## Usage Examples

### Choosing Between Direct API and Probe

```typescript
import { WildberriesSDK, AuthenticationError } from 'daytona-wildberries-typescript-sdk';

async function detectJamTier(sdk: WildberriesSDK, productIds: number[]) {
  // Try direct API first (requires Service token)
  try {
    const jam = await sdk.general.getJamSubscription();
    if (jam.state === 'active') {
      return jam.level === 'premium' ? 'advanced' : 'standard';
    }
    return 'none';
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // Likely not a Service token -- fall back to probe
      console.warn('Direct API requires Service token. Falling back to probe.');
      const status = await sdk.general.getJamSubscriptionStatus({
        nmIds: productIds,
      });
      return status.tier;
    }
    throw error;
  }
}
```

### Caching the Result

The subscription tier does not change frequently. Cache the result to avoid unnecessary calls:

```typescript
let cachedTier: string | null = null;
let cacheExpiry = 0;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getJamTier(sdk: WildberriesSDK) {
  const now = Date.now();

  if (cachedTier !== null && now < cacheExpiry) {
    return cachedTier;
  }

  const jam = await sdk.general.getJamSubscription();
  cachedTier = jam.state === 'active' ? (jam.level ?? 'standard') : 'none';
  cacheExpiry = now + CACHE_TTL_MS;

  return cachedTier;
}
```

### Detect at Startup

```typescript
class MyApp {
  private jamActive = false;
  private jamLevel: string | undefined;

  async initialize(sdk: WildberriesSDK) {
    const jam = await sdk.general.getJamSubscription();
    this.jamActive = jam.state === 'active';
    this.jamLevel = jam.level;
    console.log(`Jam: ${this.jamActive ? this.jamLevel : 'inactive'}`);
  }

  getSearchTextLimit(): number {
    if (!this.jamActive) return 0;
    return this.jamLevel === 'premium' ? 50 : 30;
  }
}
```

## Rate Limits

### Direct API (getJamSubscription)

| Parameter | Value |
|-----------|-------|
| Requests per minute | 1 |
| Burst limit | 10 |
| Calls per detection | 1 |

### Probe Method (getJamSubscriptionStatus)

The probe method calls `POST /api/v2/search-report/product/search-texts` under the hood. It shares the same rate limit quota as `sdk.analytics.createProductSearchText()`:

| Parameter | Value |
|-----------|-------|
| Requests per minute | 3 |
| Interval | 20 seconds |
| Burst limit | 3 |
| Probe calls per detection | 1-2 |

::: warning Rate Limit Impact
The probe method consumes 1-2 requests from the analytics search-text quota. The direct API has its own separate quota. Prefer the direct API when possible.
:::

## Error Handling

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from 'daytona-wildberries-typescript-sdk';

// Direct API
async function detectJamDirect(sdk: WildberriesSDK) {
  try {
    return await sdk.general.getJamSubscription();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // Not a Service token, or token is invalid
      console.error('Auth failed (Service token required):', error.message);
    } else if (error instanceof RateLimitError) {
      console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
    }
    throw error;
  }
}

// Probe method
async function detectJamProbe(sdk: WildberriesSDK, nmIds: number[]) {
  try {
    return await sdk.general.getJamSubscriptionStatus({ nmIds });
  } catch (error) {
    if (error instanceof ValidationError) {
      // nmIds array is empty or invalid
      console.error('Invalid parameters:', error.message);
    } else if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
    } else if (error instanceof RateLimitError) {
      console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
    } else if (error instanceof WBAPIError) {
      // 403: nmIds do not belong to your seller account
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
    throw error;
  }
}
```

## Best Practices

### 1. Prefer the Direct API

Use `getJamSubscription()` whenever you have a Service token. It returns richer data, does not consume analytics quota, and does not require product IDs:

```typescript
// Preferred: direct API with Service token
const jam = await sdk.general.getJamSubscription();

// Fallback: probe with any token (requires product IDs)
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [yourProductId],
});
```

### 2. Cache Detection Results

Jam subscription tiers do not change frequently. Check once at application startup or once per hour, not on every analytics request.

### 3. Use Valid Product IDs (Probe Only)

When using the probe method, the `nmIds` parameter must contain product IDs that belong to your seller account. Using IDs from other sellers or non-existent IDs will result in a 403 Forbidden error.

### 4. Handle the "None" / Inactive State Gracefully

If the seller has no Jam subscription, search-text analytics endpoints are unavailable. Design your application to degrade gracefully:

```typescript
const jam = await sdk.general.getJamSubscription();

if (!jam.state || jam.state !== 'active') {
  // Fall back to other analytics methods that don't require Jam
  const basicAnalytics = await sdk.analytics.getNmReport({ ... });
  return basicAnalytics;
}

// Proceed with search-text analytics
const report = await sdk.analytics.createProductSearchText({ ... });
```

## Related Resources

- [General Module Reference](/modules/general) -- Full reference for all General module methods
- [Analytics Module Reference](/modules/analytics) -- Analytics endpoints including search-text methods
- [Configuration Guide](/guides/configuration) -- SDK configuration including token types and rate limits
- [Best Practices](/guides/best-practices) -- General error handling and production patterns
- [Troubleshooting](/guides/troubleshooting) -- Common issues and solutions
