---
title: Configuration Guide
description: Configure the Wildberries SDK for different environments - basic config, rate limiting, retry logic, logging, and custom clients
layout: doc
---

# Configuration Guide

Comprehensive guide to configuring the Wildberries TypeScript SDK for different environments and use cases.

## Table of Contents

- [Overview](#overview)
- [Basic Configuration](#basic-configuration)
- [Environment-Specific Configuration](#environment-specific-configuration)
- [Advanced Configuration](#advanced-configuration)
- [Rate Limiting Configuration](#rate-limiting-configuration)
- [Retry Configuration](#retry-configuration)
- [Logging Configuration](#logging-configuration)
- [Custom HTTP Client](#custom-http-client)
- [Configuration Best Practices](#configuration-best-practices)

## Overview

The SDK provides flexible configuration options to adapt to different environments, performance requirements, and operational needs.

### Configuration Interface

```typescript
interface SDKConfig {
  // Required
  apiKey: string;

  // Optional overrides
  baseUrls?: Partial<Record<APIModule, string>>;
  timeout?: number;
  retryConfig?: RetryConfig;
  rateLimitConfig?: RateLimitConfig;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  httpClient?: AxiosInstance;
}
```

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

## Environment-Specific Configuration

### Development Environment

```typescript
// config/development.ts
export const developmentConfig = {
  apiKey: process.env.WB_API_KEY!,
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
      timeout: 30000,
      logLevel: 'warn',
    };
  }
}
```

## Rate Limiting Configuration

### Module-Specific Limits

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  rateLimitConfig: {
    // Global limits
    requestsPerSecond: 10,
    requestsPerMinute: 100,

    // Module-specific overrides (if supported)
    products: {
      requestsPerMinute: 3, // Products module is more restrictive
      intervalSeconds: 20,
    },
    finances: {
      requestsPerMinute: 1000, // Finances module allows more
    }
  }
});
```

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

```typescript
interface CustomRetryConfig {
  maxRetries: number;
  retryDelay: number;
  exponentialBackoff: boolean;
  retryableStatusCodes?: number[];
  onRetry?: (attempt: number, error: Error) => void;
}

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,

    // Only retry on specific errors
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],

    // Log retry attempts
    onRetry: (attempt, error) => {
      console.warn(`Retry attempt ${attempt}:`, error.message);
    }
  }
});
```

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
// debug: All SDK operations
// info: Important operations only
// warn: Warnings and errors (recommended for production)
// error: Errors only

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error' || 'warn'
});
```

### Custom Logger Integration

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

class LoggingSDK {
  private sdk: WildberriesSDK;

  constructor(config: SDKConfig) {
    this.sdk = new WildberriesSDK({
      ...config,
      // Custom logging interceptor
      httpClient: axios.create({
        interceptors: {
          request: (config) => {
            logger.info('API Request', {
              method: config.method,
              url: config.url,
            });
            return config;
          },
          response: (response) => {
            logger.info('API Response', {
              status: response.status,
              duration: response.config.metadata?.duration,
            });
            return response;
          }
        }
      })
    });
  }
}
```

## Custom HTTP Client

### Axios Configuration

```typescript
import axios from 'axios';
import https from 'https';

const customHttpClient = axios.create({
  // Timeout
  timeout: 30000,

  // HTTP/2 support
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({
    keepAlive: true,
    rejectUnauthorized: true,
  }),

  // Connection pooling
  maxSockets: 50,
  maxFreeSockets: 10,

  // Headers
  headers: {
    'User-Agent': 'WildberriesSDK/1.0.0',
    'Accept': 'application/json',
  }
});

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpClient: customHttpClient
});
```

### Proxy Configuration

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyAgent = new HttpsProxyAgent(process.env.HTTP_PROXY!);

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpClient: axios.create({
    httpsAgent: proxyAgent,
    proxy: false, // Disable axios proxy to use agent
  })
});
```

## Configuration Best Practices

### ✅ Do

- Store API keys in environment variables
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
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3
WB_API_RETRY_DELAY=1000
WB_API_LOG_LEVEL=warn

# Rate Limiting
WB_RATE_LIMIT_PER_SECOND=10
WB_RATE_LIMIT_PER_MINUTE=100

# HTTP Configuration
HTTP_PROXY=http://proxy.example.com:8080
HTTPS_PROXY=https://proxy.example.com:8080
```

## Related Documentation

- [Best Practices Guide](./best-practices.md)
- [Security Guide](./security.md)
- [Performance Guide](./performance.md)
- [API Reference](../api/)

## Support

For configuration questions:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)
