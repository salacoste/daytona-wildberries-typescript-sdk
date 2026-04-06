---
title: Configuration Guide
description: Configure the Wildberries SDK for different environments - basic config, token types, rate limiting, retry logic, logging, and custom clients
layout: doc
---

# Configuration Guide

Comprehensive guide to configuring the Wildberries TypeScript SDK for different environments and use cases.

## Table of Contents

- [Overview](#overview)
- [Basic Configuration](#basic-configuration)
- [Token Types and Rate Limits](#token-types-and-rate-limits)
- [Environment-Specific Configuration](#environment-specific-configuration)
- [Advanced Configuration](#advanced-configuration)
- [Timeout Configuration](#timeout-configuration)
- [Rate Limiting Configuration](#rate-limiting-configuration)
- [Retry Configuration](#retry-configuration)
- [Logging Configuration](#logging-configuration)
- [Configuration Best Practices](#configuration-best-practices)

## Overview

The SDK provides flexible configuration options to adapt to different environments, performance requirements, and operational needs.

### Configuration Interface

```typescript
interface SDKConfig {
  // Required
  apiKey: string;

  // Optional overrides
  baseUrls?: Partial<Record<string, string>>;
  timeout?: number;
  tokenType?: 'personal' | 'service' | 'basic' | 'test';
  retryConfig?: RetryConfig;
  rateLimitConfig?: RateLimitConfig;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}
```

**API Reference:** See [SDKConfig](/api/interfaces/SDKConfig) for complete configuration interface documentation with all available options.

## Basic Configuration

### Minimal Setup

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

### Standard Setup

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000, // 30 seconds
  logLevel: 'warn'
});
```

### Full Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Token type (affects rate limits)
  tokenType: 'service',

  // Timeout configuration
  timeout: 30000,

  // Retry configuration
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  },

  // Rate limiting
  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  },

  // Logging
  logLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
});
```

## Token Types and Rate Limits

*Since v3.5.0*

Wildberries issues different types of API tokens with different rate limit allowances. Since March 30, 2026, Basic and Test tokens have significantly reduced rate limits compared to Personal and Service tokens.

### Token Types

| Token Type | Purpose | Rate Limits |
|------------|---------|-------------|
| `'personal'` | Proprietary software, on-premise solutions | **Full limits** |
| `'service'` | Third-party SaaS services from WB Catalog | **Full limits** |
| `'basic'` | Auxiliary token for limited integrations | **Reduced limits** |
| `'test'` | Testing and development | **Reduced limits** |

### Configuring Token Type

Pass the `tokenType` option when creating the SDK instance. The SDK will automatically apply the correct rate limit multipliers:

```typescript
// Personal token (default) -- full rate limits
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_PERSONAL_TOKEN!,
});

// Service token -- full rate limits
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_SERVICE_TOKEN!,
  tokenType: 'service',
});

// Basic token -- reduced rate limits applied automatically
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_BASIC_TOKEN!,
  tokenType: 'basic',
});

// Test token -- reduced rate limits applied automatically
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_TEST_TOKEN!,
  tokenType: 'test',
});
```

::: warning Startup Warning
When you initialize the SDK with `tokenType: 'basic'` or `tokenType: 'test'`, a `console.warn` message is emitted once:

```
[WildberriesSDK] Basic token detected. Reduced rate limits apply.
Consider upgrading to a Personal or Service token.
See https://dev.wildberries.ru/news/281
```

This is informational only and does not affect functionality.
:::

### Category-Level Rate Limit Multipliers

For Basic and Test tokens, the SDK applies category-level multipliers to reduce the standard rate limits. The burst limit is set to 1 for all endpoints.

| Category | Multiplier | Approximate Effective Limit |
|----------|------------|----------------------------|
| `general` | 0.001 | ~1 request per day |
| `products` | 0.01 | ~1-10 requests per hour |
| `orders-fbs` | 0.003 | ~10-50 requests per hour |
| `orders-dbw` | 0.003 | ~10-50 requests per hour |
| `orders-dbs` | 0.003 | ~10-50 requests per hour |
| `click-collect` | 0.003 | ~10-50 requests per hour |
| `in-store-pickup` | 0.003 | ~10-50 requests per hour |
| `orders-fbw` | 0.01 | ~1-10 requests per hour |
| `promotion` | 0.02 | ~1-5 requests per hour |
| `communications` | 0.05 | ~3-10 requests per hour |
| `tariffs` | 0.01 | ~1-10 requests per hour |
| `analytics` | 0.05 | ~1-10 requests per hour |
| `reports` | 0.01 | ~1-10 requests per hour |
| `documents` | 0.01 | ~1-10 requests per hour |
| `finances` | 0.01 | ~1-10 requests per hour |
| `user-management` | 0.01 | ~1-10 requests per hour |

Categories not listed above use a default multiplier of **0.01**.

The "Approximate Effective Limit" column shows the practical throughput after applying the multiplier to each category's standard rate limits. Actual values depend on the specific endpoint's base `requestsPerMinute`.

### How It Works Internally

When `tokenType` is `'basic'` or `'test'`, the SDK calls `applyBasicTokenMultipliers()` on the built-in rate limit configuration. For each endpoint:

1. The endpoint's category is determined from its rate limit key prefix (e.g., `orders-fbs.getOrders` belongs to the `orders-fbs` category)
2. The category multiplier is applied to `requestsPerMinute`: `Math.max(1, Math.ceil(original * multiplier))`
3. The burst limit is set to 1

Personal and Service tokens use the full, unmodified rate limits extracted from the OpenAPI specifications.

### Traffic Identification for Third-Party Services

If you are building a third-party service (SaaS) that integrates with Wildberries, you must use a **Service token** from the WB Catalog. Service tokens identify your application's traffic to Wildberries.

For questions about Service tokens or third-party integration, contact Wildberries at **business-solutions@rwb.ru**.

## Environment-Specific Configuration

### Development Environment

```typescript
// config/development.ts
export const developmentConfig = {
  apiKey: process.env.WB_API_KEY!,
  tokenType: 'test' as const,
  timeout: 60000, // Longer timeout for debugging
  logLevel: 'debug' as const,
  retryConfig: {
    maxRetries: 1, // Fail fast in development
    retryDelay: 500,
    exponentialBackoff: false,
  }
};
```

### Production Environment

```typescript
// config/production.ts
export const productionConfig = {
  apiKey: process.env.WB_API_KEY!,
  tokenType: 'service' as const,
  timeout: 30000,
  logLevel: 'warn' as const,

  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  },

  rateLimitConfig: {
    requestsPerSecond: 8, // Conservative limit
    requestsPerMinute: 80,
  }
};
```

### Testing Environment

```typescript
// config/test.ts
export const testConfig = {
  apiKey: 'test-api-key',
  tokenType: 'test' as const,
  timeout: 5000, // Short timeout for tests
  logLevel: 'error' as const,

  retryConfig: {
    maxRetries: 0, // No retries in tests
    retryDelay: 0,
    exponentialBackoff: false,
  }
};
```

### Configuration Factory

```typescript
// config/index.ts
import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testConfig } from './test';

export function getConfig() {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return developmentConfig;
  }
}

// Usage
import { getConfig } from './config';
const sdk = new WildberriesSDK(getConfig());
```

## Advanced Configuration

### Dynamic Configuration

```typescript
class ConfigurableSDK {
  private sdk: WildberriesSDK;
  private config: SDKConfig;

  constructor(initialConfig: SDKConfig) {
    this.config = initialConfig;
    this.sdk = new WildberriesSDK(this.config);
  }

  updateConfig(updates: Partial<SDKConfig>) {
    this.config = { ...this.config, ...updates };
    this.sdk = new WildberriesSDK(this.config);
  }

  getSDK(): WildberriesSDK {
    return this.sdk;
  }
}

// Usage
const configurableSDK = new ConfigurableSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000
});

// Later, update configuration
configurableSDK.updateConfig({
  timeout: 60000,
  logLevel: 'debug'
});
```

### Feature Flags

```typescript
interface FeatureFlags {
  enableCaching: boolean;
  enableMetrics: boolean;
  enableRetry: boolean;
  enableRateLimiting: boolean;
}

class FeatureFlagSDK {
  private sdk: WildberriesSDK;
  private flags: FeatureFlags;

  constructor(config: SDKConfig, flags: FeatureFlags) {
    this.flags = flags;

    this.sdk = new WildberriesSDK({
      ...config,
      retryConfig: flags.enableRetry ? config.retryConfig : {
        maxRetries: 0,
        retryDelay: 0,
        exponentialBackoff: false,
      }
    });
  }

  async getWithFeatures<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    if (this.flags.enableCaching) {
      // Check cache first
    }

    if (this.flags.enableMetrics) {
      // Track metrics
    }

    return operation();
  }
}
```

### Multi-Tenant Configuration

```typescript
class MultiTenantSDK {
  private sdkInstances = new Map<string, WildberriesSDK>();

  getSDK(tenantId: string): WildberriesSDK {
    if (!this.sdkInstances.has(tenantId)) {
      const config = this.getConfigForTenant(tenantId);
      this.sdkInstances.set(
        tenantId,
        new WildberriesSDK(config)
      );
    }

    return this.sdkInstances.get(tenantId)!;
  }

  private getConfigForTenant(tenantId: string): SDKConfig {
    return {
      apiKey: process.env[`WB_API_KEY_${tenantId}`]!,
      tokenType: (process.env[`WB_TOKEN_TYPE_${tenantId}`] as SDKConfig['tokenType']) ?? 'personal',
      timeout: 30000,
      logLevel: 'warn',
    };
  }
}
```

## Timeout Configuration

### Global Timeout

Set a default timeout for all requests:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000, // 60 seconds for all requests
});
```

The default timeout is **30 seconds** (30000ms). Increase it for environments with slow network or when working with large datasets.

### Per-Request Timeout

Override the global timeout for individual requests that need more (or less) time:

```typescript
// For long-running operations, increase the global timeout:
const sdkForReports = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 120000, // 2 minutes for report generation
});

// Download a generated analytics report file
const reportFile = await sdkForReports.analytics.getDownloadsFile(downloadId);
```

The `timeout` in `SDKConfig` applies to all requests made by that SDK instance. Each retry attempt uses the timeout individually (not cumulative).

### Timeout and Retry Interaction

When a request times out, the SDK automatically retries it (up to `maxRetries` times). Each retry attempt gets the full timeout duration:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000,        // 30s per attempt
  retryConfig: {
    maxRetries: 3,        // Up to 3 retries after initial attempt
    retryDelay: 1000,     // 1s base delay between retries
    exponentialBackoff: true,
  },
});

// Worst case: 30s + 1s + 30s + 2s + 30s + 4s + 30s = ~127 seconds total
```

> **Tip:** If you see `ETIMEDOUT` errors, increase the global timeout or use per-request timeout for specific slow operations. Set `logLevel: 'info'` to see retry attempts in the console.

## Rate Limiting Configuration

The SDK provides flexible rate limiting configuration to prevent API quota exhaustion and ensure reliable operation.

**API Reference:** See [RateLimitConfig](/api/interfaces/RateLimitConfig) for complete rate limiting configuration options.

### Global Rate Limits

The `rateLimitConfig` accepts two flat options that apply globally across all endpoints. Per-endpoint rate limits are automatically enforced by the SDK based on the OpenAPI specifications.

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  }
});
```

> **Note:** Per-endpoint rate limits (e.g., 3 requests/minute for product creation) are extracted from the OpenAPI specs and enforced automatically via `rateLimitKey` in each module method. The global `rateLimitConfig` sets an upper bound across all endpoints. When `tokenType` is `'basic'` or `'test'`, per-endpoint limits are automatically reduced (see [Token Types and Rate Limits](#token-types-and-rate-limits)).

### Custom Rate Limiter

```typescript
import { RateLimiter } from 'daytona-wildberries-typescript-sdk/client';

const customLimiter = new RateLimiter({
  requestsPerMinute: 60,
  intervalSeconds: 10,
  burstLimit: 10,
});

// Use with SDK operations
await customLimiter.waitForSlot('custom');
const result = await sdk.products.getProductList({ limit: 100 });
```

## Retry Configuration

Configure automatic retry behavior for failed API requests with exponential backoff support.

**API Reference:** See [RetryConfig](/api/-internal-/interfaces/RetryConfig) and [RetryHandler](/api/-internal-/classes/RetryHandler) for complete retry mechanism documentation.

### Basic Retry Setup

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000, // 1 second base delay
    exponentialBackoff: true, // 1s, 2s, 4s, 8s...
  }
});
```

### Custom Retry Logic

The SDK's `retryConfig` supports three fields: `maxRetries`, `retryDelay`, and `exponentialBackoff`. The SDK automatically retries on transient failures (network errors, 5xx, 429) and never retries on authentication (401/403) or validation errors (400/422).

```typescript
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  exponentialBackoff: boolean;
}

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  }
});
```

> **Note:** Set `logLevel: 'info'` to see retry attempts in the console, or `logLevel: 'debug'` for full retry context including error type and status code.

### Conditional Retry

```typescript
class SmartRetrySDK {
  private sdk: WildberriesSDK;

  async executeWithSmartRetry<T>(
    operation: () => Promise<T>,
    options: {
      critical: boolean;
      maxRetries?: number;
    }
  ): Promise<T> {
    const maxRetries = options.critical ? 10 : 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;

        // Don't retry on auth errors
        if (error instanceof AuthenticationError) throw error;

        // Longer delay for critical operations
        const delay = options.critical
          ? 5000 * Math.pow(2, attempt)
          : 1000 * Math.pow(2, attempt);

        await sleep(delay);
      }
    }

    throw new Error('Max retries exceeded');
  }
}
```

## Logging Configuration

### Log Levels

```typescript
// debug: All SDK operations, full retry context
// info: Retry attempts, important operations
// warn: Timeouts, retries exhausted, warnings (recommended for production)
// error: Errors only

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error' || 'warn'
});
```

### What Each Log Level Shows

| Event | `debug` | `info` | `warn` | `error` |
|-------|---------|--------|--------|---------|
| Retry attempt (URL, attempt #, delay) | Yes | Yes | -- | -- |
| Full retry context (error type, status code, isTimeout) | Yes | -- | -- | -- |
| Request timed out (URL, timeout duration) | Yes | Yes | Yes | -- |
| All retries exhausted | Yes | Yes | Yes | -- |
| Network errors | Yes | Yes | Yes | Yes |
| Basic/Test token warning (on init) | Yes | Yes | Yes | -- |

> **Tip:** Use `logLevel: 'info'` to see retry attempts and timeout warnings without the noise of debug-level output. Use `logLevel: 'debug'` when troubleshooting `ETIMEDOUT` errors to see the full error context for each retry.

### Logging Integration

The SDK uses its own internal Axios instance managed by `BaseClient`. Use the `logLevel` option to control SDK logging output:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug', // See all requests, responses, and retry context
});
```

> **Note:** The SDK does not support injecting a custom `httpClient`. `BaseClient` manages its own Axios instance internally. Use `logLevel` for observability into SDK operations.

## HTTP Client

The SDK manages its own internal Axios instance via `BaseClient`. There is no `httpClient` option on `SDKConfig` -- the HTTP client is not user-replaceable. The SDK handles connection management, authentication headers, timeout, retry, and rate limiting internally.

> **Note:** If you need proxy support or custom TLS configuration, configure it at the OS/environment level (e.g., `HTTP_PROXY` / `HTTPS_PROXY` environment variables) rather than via the SDK.

## Configuration Best Practices

### ✅ Do

- Store API keys in environment variables
- Set `tokenType` to match your actual token type
- Use different configurations for different environments
- Set appropriate timeouts for your use case
- Enable retry logic for production
- Use conservative rate limits
- Log at appropriate levels (warn/error in production)
- Validate configuration on startup
- Document custom configurations

### ❌ Don't

- Hardcode API keys in configuration
- Use development config in production
- Use `tokenType: 'personal'` with a Basic or Test token (causes rate limit violations)
- Disable retry logic to "improve speed"
- Set timeouts too low (causes false failures)
- Ignore rate limits
- Enable debug logging in production
- Share configuration files containing secrets
- Modify SDK defaults without understanding implications

## Configuration Validation

```typescript
import { z } from 'zod';

const ConfigSchema = z.object({
  apiKey: z.string().min(10),
  tokenType: z.enum(['personal', 'service', 'basic', 'test']).optional(),
  timeout: z.number().min(1000).max(120000),
  retryConfig: z.object({
    maxRetries: z.number().min(0).max(10),
    retryDelay: z.number().min(100).max(10000),
    exponentialBackoff: z.boolean(),
  }).optional(),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).optional(),
});

function createSDK(config: unknown): WildberriesSDK {
  const validatedConfig = ConfigSchema.parse(config);
  return new WildberriesSDK(validatedConfig);
}
```

## Environment Variables Reference

```bash
# Required
WB_API_KEY=your_api_key_here

# Optional
WB_TOKEN_TYPE=personal          # personal | service | basic | test
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3
WB_API_RETRY_DELAY=1000
WB_API_LOG_LEVEL=warn

# Rate Limiting
WB_RATE_LIMIT_PER_SECOND=10
WB_RATE_LIMIT_PER_MINUTE=100
```

## Related Documentation

- **[API Reference](/api/)** - Complete SDK documentation
  - [SDKConfig](/api/interfaces/SDKConfig) - Main configuration interface
  - [RetryConfig](/api/-internal-/interfaces/RetryConfig) - Retry configuration
  - [RateLimitConfig](/api/interfaces/RateLimitConfig) - Rate limiting configuration
  - [WildberriesSDK](/api/classes/WildberriesSDK) - Main SDK class
- **[Jam Subscription Guide](./jam-subscription.md)** - Jam subscription detection (uses Service token)
- **[Best Practices Guide](./best-practices.md)** - Production deployment patterns
- **[Security Guide](./security.md)** - Secure configuration practices
- **[Performance Guide](./performance.md)** - Performance optimization
- **[Getting Started](/getting-started/quickstart)** - Initial setup guide

## Support

For configuration questions:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)
