# Production Best Practices

Comprehensive guide for deploying the Wildberries SDK in production environments.

**Target Audience**: Developers deploying SDK-based applications to production
**Prerequisites**: Familiarity with SDK basics, TypeScript, and Node.js production deployments
**Estimated Reading Time**: 45 minutes

---

## Table of Contents

1. [Error Handling](#error-handling)
2. [Rate Limiting](#rate-limiting)
3. [Retry Logic](#retry-logic)
4. [Logging & Monitoring](#logging--monitoring)
5. [Security Hardening](#security-hardening)
6. [Testing Strategies](#testing-strategies)
7. [Production Deployment](#production-deployment)
8. [Performance Optimization](#performance-optimization)

---

## Error Handling

### SDK Error Hierarchy

The SDK provides a comprehensive error hierarchy for precise error handling:

```typescript
import {
  WBAPIError,           // Base error class
  AuthenticationError,  // 401/403 errors
  RateLimitError,      // 429 errors
  ValidationError,     // 400/422 errors
  NetworkError         // Network failures
} from 'wb-api-sdk';
```

**Error Hierarchy:**
```
Error (JavaScript base)
  └─ WBAPIError (SDK base error)
      ├─ AuthenticationError
      ├─ RateLimitError
      ├─ ValidationError
      └─ NetworkError
```

### Error Handling Pattern

**Recommended Pattern** for all SDK operations:

```typescript
async function robustAPICall() {
  try {
    const result = await sdk.products.getParentAll();
    return { success: true, data: result };

  } catch (error) {
    // Handle specific SDK errors
    if (error instanceof RateLimitError) {
      // SDK automatically retries, but you can add custom logic
      logger.warn('Rate limit hit', {
        retryAfter: error.retryAfter,
        endpoint: 'getParentAll'
      });
      // Option 1: Let SDK handle retry (automatic)
      // Option 2: Implement backpressure mechanism
      // Option 3: Queue request for later

    } else if (error instanceof AuthenticationError) {
      // DON'T retry authentication errors
      logger.error('Authentication failed', { error });
      // Alert ops team - invalid API key
      throw new Error('Invalid API credentials - check WB_API_KEY');

    } else if (error instanceof ValidationError) {
      // Log validation details for debugging
      logger.error('Validation error', {
        message: error.message,
        statusCode: error.statusCode,
        response: error.response
      });
      // Fix the request data and retry
      throw error;

    } else if (error instanceof NetworkError) {
      // Implement retry with exponential backoff
      logger.error('Network error', { error });
      // SDK retries network errors automatically
      // Consider implementing circuit breaker for sustained failures

    } else if (error instanceof WBAPIError) {
      // Other API errors (5xx, etc.)
      logger.error('API error', {
        statusCode: error.statusCode,
        message: error.message
      });
      throw error;

    } else {
      // Unexpected error
      logger.error('Unexpected error', { error });
      throw error;
    }
  }
}
```

### Graceful Degradation

When API calls fail, provide fallback behavior:

```typescript
async function getCategories() {
  try {
    return await sdk.products.getParentAll();
  } catch (error) {
    logger.warn('Failed to fetch categories, using cache', { error });
    return getCategoriesFromCache();
  }
}

// Cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 3600000; // 1 hour

function getCategoriesFromCache(): any {
  const cached = cache.get('categories');
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  // Return empty result if cache miss
  return { data: [] };
}
```

### When to Retry vs Fail Fast

**DO Retry:**
- ✅ NetworkError (temporary network issues)
- ✅ 5xx errors (server errors)
- ✅ 429 Rate Limit (with exponential backoff)
- ✅ Timeout errors

**DON'T Retry:**
- ❌ AuthenticationError (fix API key first)
- ❌ ValidationError (fix request data first)
- ❌ 4xx errors (except 429)
- ❌ After max retry attempts exhausted

### Error Logging Best Practices

```typescript
// ✅ GOOD: Structured logging with context
logger.error('Order processing failed', {
  orderId: 12345,
  error: error.message,
  statusCode: error.statusCode,
  timestamp: new Date().toISOString(),
  userId: 'seller-123'
});

// ❌ BAD: No context
logger.error(error.message);
```

**@see** [`examples/tariffs-pricing-calculator.ts`](../../examples/tariffs-pricing-calculator.ts) - Comprehensive error handling example

---

## Rate Limiting

### Understanding SDK Rate Limits

The SDK implements per-endpoint rate limiting based on Wildberries API specifications:

| Module | Operation | Limit | Notes |
|--------|-----------|-------|-------|
| Products | Create product | 1 req/10s | 10 req/min |
| Products | List products | 100 req/min | Pagination recommended |
| Orders (FBS) | Get new orders | 5 req/sec | 200ms intervals |
| Orders (FBS) | Get order statuses | 3 req/min | 20s intervals |
| Analytics | Sales statistics | 5 req/min | 12s intervals |
| Promotion | Campaign info | 5 req/sec | 200ms intervals |
| Finances | Transactions | 60 req/min | 1s intervals |
| Tariffs | Commission | 1 req/min | 60s intervals |

### Rate Limit Handling

**Built-in SDK Behavior:**
- ✅ Automatic request queuing
- ✅ Exponential backoff on 429 errors
- ✅ Transparent retry mechanism
- ✅ Per-endpoint limit tracking

**SDK automatically handles rate limits** - you don't need to implement manual delays in most cases.

### Handling Rate Limit Errors

```typescript
try {
  const result = await sdk.tariffs.getTariffsCommission();
} catch (error) {
  if (error instanceof RateLimitError) {
    // SDK already retried automatically
    console.log(`Rate limit hit, SDK retried after ${error.retryAfter}ms`);

    // Optional: Add additional delay before next operation
    await new Promise(resolve => setTimeout(resolve, error.retryAfter));
  }
}
```

### Batch Operation Strategy

For high-volume operations, implement batching:

```typescript
async function batchUpdatePrices(updates: PriceUpdate[]) {
  const batchSize = 10;
  const delayMs = 1000; // 1 second between batches
  const results = [];

  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);

    // Process batch in parallel
    const batchResults = await Promise.allSettled(
      batch.map(update => sdk.products.updatePricing(update))
    );

    results.push(...batchResults);

    // Respect rate limits between batches
    if (i + batchSize < updates.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    // Log progress
    logger.info(`Processed ${Math.min(i + batchSize, updates.length)}/${updates.length} updates`);
  }

  return results;
}
```

### Monitoring Rate Limits

Track rate limit events to optimize performance:

```typescript
let rateLimitCount = 0;

async function monitoredAPICall() {
  try {
    return await sdk.products.getParentAll();
  } catch (error) {
    if (error instanceof RateLimitError) {
      rateLimitCount++;
      // Alert if hitting rate limits frequently
      if (rateLimitCount > 10) {
        logger.warn('Frequent rate limit hits', {
          count: rateLimitCount,
          recommendation: 'Reduce request frequency or implement caching'
        });
      }
    }
    throw error;
  }
}
```

**@see** [`examples/promotion-campaign-automation.ts`](../../examples/promotion-campaign-automation.ts) - Rate limit handling example

---

## Retry Logic

### SDK's Automatic Retry

The SDK implements exponential backoff for transient errors:

```typescript
// Default retry configuration
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  retryConfig: {
    maxRetries: 3,              // Max retry attempts
    retryDelay: 1000,           // Initial delay: 1s
    exponentialBackoff: true    // Enable exponential backoff
  }
});
```

**Backoff Algorithm:**
- Attempt 1: Wait 1s (1000ms)
- Attempt 2: Wait 2s (2000ms)
- Attempt 3: Wait 4s (4000ms)

### Custom Retry Implementation

For advanced use cases requiring custom retry logic:

```typescript
async function retryWithJitter<T>(
  operation: () => Promise<T>,
  options = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 32000
  }
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await operation();

    } catch (error) {
      lastError = error;

      // Don't retry on last attempt
      if (attempt === options.maxRetries) {
        throw error;
      }

      // Don't retry non-retryable errors
      if (error instanceof AuthenticationError ||
          error instanceof ValidationError) {
        throw error;
      }

      // Exponential backoff with jitter
      const exponentialDelay = options.baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 1000; // 0-1000ms random jitter
      const delay = Math.min(exponentialDelay + jitter, options.maxDelay);

      logger.info(`Retry attempt ${attempt + 1}/${options.maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Usage
const result = await retryWithJitter(
  () => sdk.products.getParentAll(),
  { maxRetries: 5, baseDelay: 2000 }
);
```

### Circuit Breaker Pattern

Prevent cascading failures in distributed systems:

```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private threshold = 5;
  private timeout = 60000; // 1 minute
  private lastFailureTime = 0;

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    // If circuit is open and timeout hasn't passed, fail fast
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker is OPEN - failing fast');
      } else {
        // Timeout passed, move to half-open state
        this.state = 'half-open';
        logger.info('Circuit breaker moving to HALF-OPEN state');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;

    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    if (this.state === 'half-open') {
      this.state = 'closed';
      logger.info('Circuit breaker CLOSED - service recovered');
    }
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'open';
      logger.error('Circuit breaker OPEN - too many failures', {
        failures: this.failures,
        threshold: this.threshold
      });
    }
  }

  getState() {
    return {
      state: this.state,
      failures: this.failures,
      threshold: this.threshold
    };
  }
}

// Usage
const breaker = new CircuitBreaker();

async function protectedAPICall() {
  return breaker.execute(() => sdk.products.getParentAll());
}
```

---

## Logging & Monitoring

### Structured Logging

Use structured logging for better observability:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'wb-sdk-app',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Error logs
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Combined logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5
    }),
    // Console for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Export logger
export { logger };
```

### What to Log

#### ✅ DO Log

**API Calls:**
```typescript
logger.info('API call started', {
  module: 'products',
  method: 'getParentAll',
  timestamp: Date.now(),
  requestId: generateRequestId()
});
```

**Errors with Context:**
```typescript
logger.error('Order processing failed', {
  orderId: 12345,
  error: error.message,
  stack: error.stack,
  statusCode: error.statusCode,
  userId: 'seller-123'
});
```

**Performance Metrics:**
```typescript
const start = Date.now();
const result = await sdk.products.getParentAll();
const duration = Date.now() - start;

logger.info('API call completed', {
  module: 'products',
  method: 'getParentAll',
  duration,
  resultCount: result.data.length
});
```

**Business Events:**
```typescript
logger.info('Order fulfilled', {
  orderId: 12345,
  productId: 67890,
  revenue: 1500,
  fulfillmentType: 'FBS'
});
```

#### ❌ DON'T Log

- ❌ API keys or tokens
- ❌ Customer personal data (PII)
- ❌ Payment information
- ❌ Passwords or credentials
- ❌ Full request/response bodies in production (use debug mode sparingly)

### Log Levels

Use appropriate log levels:

```typescript
logger.error('Critical failure');  // Production issues requiring immediate action
logger.warn('Degraded performance'); // Non-critical issues worth investigating
logger.info('Order processed');   // Important business events
logger.debug('Cache hit');        // Development/debugging information
```

### Monitoring Setup

**Key Metrics to Track:**

1. **API Call Metrics:**
   - Request rate (requests/second)
   - Success rate (%)
   - Error rate by type (%)
   - Latency (p50, p95, p99)

2. **Error Metrics:**
   - Error count by type
   - Rate limit hits/hour
   - Retry attempts/hour
   - Failed operations

3. **Business Metrics:**
   - Orders processed/hour
   - Products synced/hour
   - Revenue tracked
   - Stock updates/hour

**Prometheus Example:**

```typescript
import { Counter, Histogram, register } from 'prom-client';

// Counters
const apiCallCounter = new Counter({
  name: 'wb_sdk_api_calls_total',
  help: 'Total API calls made',
  labelNames: ['module', 'method', 'status']
});

const errorCounter = new Counter({
  name: 'wb_sdk_errors_total',
  help: 'Total errors encountered',
  labelNames: ['type', 'module', 'method']
});

// Histograms
const apiCallDuration = new Histogram({
  name: 'wb_sdk_api_call_duration_seconds',
  help: 'API call duration in seconds',
  labelNames: ['module', 'method'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Instrument SDK calls
async function instrumentedAPICall() {
  const start = Date.now();
  const timer = apiCallDuration.startTimer({ module: 'products', method: 'getParentAll' });

  try {
    const result = await sdk.products.getParentAll();

    apiCallCounter.inc({ module: 'products', method: 'getParentAll', status: 'success' });
    timer();

    return result;

  } catch (error) {
    apiCallCounter.inc({ module: 'products', method: 'getParentAll', status: 'error' });

    if (error instanceof RateLimitError) {
      errorCounter.inc({ type: 'RateLimitError', module: 'products', method: 'getParentAll' });
    }

    timer();
    throw error;
  }
}

// Expose metrics endpoint
import express from 'express';
const app = express();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

**@see** SDK source: `src/client/base-client.ts` - HTTP client with built-in instrumentation

---

## Security Hardening

### API Key Management

#### Development: Environment Variables

```bash
# .env (NEVER commit this file!)
WB_API_KEY=your_api_key_here
NODE_ENV=development
```

```typescript
// Load from environment
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.WB_API_KEY) {
  throw new Error('WB_API_KEY environment variable is required');
}

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});
```

#### Production: Secret Management

**AWS Secrets Manager Example:**

```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

async function getAPIKey(): Promise<string> {
  const client = new SecretsManagerClient({ region: process.env.AWS_REGION });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: 'wb-api-key-prod'
      })
    );

    const secret = JSON.parse(response.SecretString!);
    return secret.apiKey;

  } catch (error) {
    logger.error('Failed to retrieve API key from Secrets Manager', { error });
    throw new Error('Could not load API credentials');
  }
}

// Initialize SDK with secret
const apiKey = await getAPIKey();
const sdk = new WildberriesSDK({ apiKey });
```

**HashiCorp Vault Example:**

```typescript
import vault from 'node-vault';

async function getAPIKeyFromVault(): Promise<string> {
  const client = vault({
    apiVersion: 'v1',
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN
  });

  const result = await client.read('secret/data/wb-api');
  return result.data.data.apiKey;
}
```

### Security Checklist

#### 🔑 API Keys

- [ ] Never hardcode API keys in source code
- [ ] Use environment variables or secret management services
- [ ] Rotate keys regularly (quarterly recommended)
- [ ] Revoke old keys immediately after rotation
- [ ] Use different keys for development and production
- [ ] Restrict API key permissions to minimum required
- [ ] Monitor API key usage for anomalies

#### 🌐 Network Security

- [ ] Enforce HTTPS for all API calls (SDK default)
- [ ] Validate TLS certificates
- [ ] Use latest TLS version (1.3 preferred, 1.2 minimum)
- [ ] Implement IP whitelisting if possible
- [ ] Use VPN for sensitive operations
- [ ] Enable firewall rules for outbound connections

#### 🔒 Data Protection

- [ ] Never log API keys or tokens
- [ ] Sanitize error messages before logging
- [ ] Encrypt sensitive data at rest
- [ ] Use secure credential storage (OS keychain, KMS)
- [ ] Implement data retention policies
- [ ] Anonymize logs containing user data

#### 📦 Dependency Security

- [ ] Run `npm audit` before every deployment
- [ ] Enable Dependabot or similar automated scanning
- [ ] Keep SDK updated to latest version
- [ ] Review security advisories regularly
- [ ] Use `npm ci` in CI/CD for reproducible builds
- [ ] Lock dependency versions in package-lock.json

#### 🛡️ Application Security

- [ ] Validate all user inputs
- [ ] Implement rate limiting on your API endpoints
- [ ] Use parameterized queries to prevent injection
- [ ] Enable CORS restrictions
- [ ] Implement request signing/authentication
- [ ] Use security headers (Helmet.js for Express)

### Key Rotation Procedure

```typescript
// 1. Generate new API key in Wildberries seller dashboard
// 2. Add new key to secret manager
// 3. Deploy application with new key
// 4. Monitor for 24 hours
// 5. Revoke old key

async function rotateAPIKey() {
  const oldKey = process.env.WB_API_KEY_OLD;
  const newKey = process.env.WB_API_KEY_NEW;

  // Initialize SDK with new key
  const sdk = new WildberriesSDK({ apiKey: newKey });

  try {
    // Test new key
    await sdk.general.ping();
    logger.info('New API key validated successfully');

    // Update environment/secrets
    await updateSecret('WB_API_KEY', newKey);

    // Schedule old key revocation
    scheduleKeyRevocation(oldKey, 24 * 60 * 60 * 1000); // 24 hours

  } catch (error) {
    logger.error('New API key validation failed', { error });
    // Rollback to old key
    throw error;
  }
}
```

---

## Testing Strategies

### Unit Testing

**Test SDK Integration with Mocking:**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WildberriesSDK, RateLimitError } from 'wb-api-sdk';
import { ProductService } from './product-service';

describe('ProductService', () => {
  let mockSDK: any;
  let service: ProductService;

  beforeEach(() => {
    mockSDK = {
      products: {
        getParentAll: vi.fn(),
        createProduct: vi.fn(),
        updatePricing: vi.fn()
      }
    };
    service = new ProductService(mockSDK);
  });

  it('should handle API errors gracefully', async () => {
    // Arrange
    const error = new Error('Network error');
    mockSDK.products.getParentAll.mockRejectedValue(error);

    // Act
    const result = await service.getCategories();

    // Assert
    expect(result).toEqual([]);  // Fallback to empty array
    expect(mockSDK.products.getParentAll).toHaveBeenCalledTimes(1);
  });

  it('should retry on rate limit errors', async () => {
    // Arrange
    const rateLimitError = new RateLimitError('Rate limit exceeded', 1000);
    mockSDK.products.getParentAll
      .mockRejectedValueOnce(rateLimitError)
      .mockResolvedValueOnce({ data: [{ id: 1 }] });

    // Act
    const result = await service.getCategories();

    // Assert
    expect(result.data).toHaveLength(1);
    expect(mockSDK.products.getParentAll).toHaveBeenCalledTimes(2);
  });
});
```

### Integration Testing

**Use MSW (Mock Service Worker) for API Mocking:**

```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from 'wb-api-sdk';

// Setup MSW server
const server = setupServer(
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' }
      ]
    });
  }),

  http.post('https://content-api.wildberries.ru/content/v2/cards', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 'created',
      vendorCode: body.variants[0].vendorCode
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Products Integration', () => {
  it('should successfully fetch and create products', async () => {
    const sdk = new WildberriesSDK({ apiKey: 'test-key' });

    // Fetch categories
    const categories = await sdk.products.getParentAll();
    expect(categories.data).toHaveLength(2);

    // Create product
    const product = await sdk.products.createProduct({
      subjectID: 1,
      variants: [{
        vendorCode: 'TEST-001',
        brand: 'Test Brand',
        title: 'Test Product'
      }]
    });

    expect(product.data.id).toBe('created');
  });
});
```

### E2E Testing

**Test Critical Business Flows:**

```typescript
import { describe, it, expect } from 'vitest';
import { WildberriesSDK } from 'wb-api-sdk';

describe('Product Lifecycle E2E', () => {
  // Use test API key or dedicated test environment
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_TEST_API_KEY!
  });

  it('should complete full product lifecycle', async () => {
    // 1. Create product
    const vendorCode = `E2E-${Date.now()}`;
    const product = await sdk.products.createProduct({
      subjectID: 123,
      variants: [{
        vendorCode,
        brand: 'E2E Test Brand',
        title: 'E2E Test Product',
        dimensions: {
          length: 10,
          width: 10,
          height: 5,
          weightBrutto: 0.5
        }
      }]
    });

    expect(product).toBeDefined();

    // 2. Fetch product to verify
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for indexing

    const products = await sdk.products.listProducts({
      limit: 1,
      vendorCodes: [vendorCode]
    });

    expect(products.data.cursor.total).toBeGreaterThan(0);

    // 3. Update pricing
    const nmId = products.data.cards[0].nmID;
    await sdk.products.updatePricing({
      nmId,
      price: 1500,
      discount: 10
    });

    // 4. Delete product (cleanup)
    await sdk.products.deleteProduct(vendorCode);
  }, 60000); // 60 second timeout for E2E
});
```

### Performance Testing

**Load Testing with k6:**

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate under 1%
  },
};

export default function () {
  const response = http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', {
    headers: { 'Authorization': `Bearer ${__ENV.WB_API_KEY}` }
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

### Coverage Targets

Set and enforce coverage targets:

```json
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/types/**'
      ]
    }
  }
});
```

**Coverage Goals:**
- Core infrastructure (BaseClient, RateLimiter): ≥90%
- API modules: ≥80%
- Critical business paths: 100%
- Error handlers: ≥85%

**@see** [`examples/`](../../examples/) - All examples include test patterns

---

## Production Deployment

### Pre-Deployment Checklist

#### Code Quality
- [ ] All tests passing (unit + integration + E2E)
- [ ] Test coverage meets targets (≥80%)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] No compiler warnings

#### Security
- [ ] Security scan completed (`npm audit`)
- [ ] No high/critical vulnerabilities
- [ ] Dependencies up to date
- [ ] API keys rotated (if scheduled)
- [ ] Secrets configured in production

#### Performance
- [ ] Performance benchmarks run
- [ ] Load testing completed
- [ ] Memory leaks checked
- [ ] Bundle size optimized
- [ ] Response times within SLA

#### Documentation
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] API docs regenerated
- [ ] Deployment guide reviewed
- [ ] Rollback procedure documented

### Deployment Checklist

#### Environment Configuration
- [ ] Environment variables configured
- [ ] API keys loaded from secret manager
- [ ] Database connections verified
- [ ] External service URLs configured
- [ ] Feature flags set correctly

#### Monitoring & Logging
- [ ] Monitoring enabled (Prometheus/Grafana/Datadog)
- [ ] Logging configured (Winston/Pino/CloudWatch)
- [ ] Error tracking enabled (Sentry/Rollbar)
- [ ] Health checks implemented
- [ ] Rate limit monitoring active
- [ ] Alerting rules configured

#### Infrastructure
- [ ] Load balancer configured
- [ ] Auto-scaling rules set
- [ ] Database backups enabled
- [ ] Redis/cache layer ready
- [ ] CDN configured (if applicable)

### Post-Deployment Checklist

#### Smoke Tests
- [ ] Health check endpoint responding
- [ ] Critical API calls successful
- [ ] Authentication working
- [ ] Database connectivity verified
- [ ] External services reachable

#### Monitoring Verification
- [ ] Dashboards showing data
- [ ] Logs flowing correctly
- [ ] Metrics being collected
- [ ] No error spikes
- [ ] Performance within SLA

#### Business Validation
- [ ] Key business operations working
- [ ] No customer complaints
- [ ] Revenue tracking accurate
- [ ] Order processing normal
- [ ] Stock updates functioning

#### Team Communication
- [ ] Deployment announcement sent
- [ ] On-call engineer notified
- [ ] Rollback plan communicated
- [ ] Monitoring dashboard shared

### Rollback Plan

```bash
# Quick rollback procedure
# 1. Identify issue
# 2. Execute rollback
npm run deploy:rollback

# 3. Verify rollback
npm run smoke-test

# 4. Notify team
# 5. Post-mortem scheduled
```

**Automated Rollback Triggers:**
- Error rate > 5% for 5 minutes
- Response time p95 > 2x baseline
- Health check failures > 3
- Manual trigger by on-call engineer

---

## Performance Optimization

### Response Caching

Implement caching for frequently accessed data:

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 3600,      // 1 hour default TTL
  checkperiod: 120,   // Check for expired entries every 2 minutes
  useClones: false    // Return references (faster)
});

async function getCategoriesWithCache() {
  const cacheKey = 'categories:all';

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit', { key: cacheKey });
    return cached;
  }

  // Fetch from API
  logger.debug('Cache miss', { key: cacheKey });
  const result = await sdk.products.getParentAll();

  // Store in cache
  cache.set(cacheKey, result);

  return result;
}
```

### Connection Pooling

For high-throughput applications:

```typescript
import { Agent } from 'https';

// Create persistent connection pool
const httpsAgent = new Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 30000
});

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  // Pass agent to Axios config (if SDK supports)
  httpAgent: httpsAgent
});
```

### Request Deduplication

Prevent duplicate concurrent requests:

```typescript
const pendingRequests = new Map<string, Promise<any>>();

async function deduplicatedRequest<T>(
  key: string,
  operation: () => Promise<T>
): Promise<T> {
  // Return existing promise if request in progress
  if (pendingRequests.has(key)) {
    logger.debug('Deduplicating request', { key });
    return pendingRequests.get(key)!;
  }

  // Execute new request
  const promise = operation().finally(() => {
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, promise);
  return promise;
}

// Usage
const categories = await deduplicatedRequest(
  'categories:all',
  () => sdk.products.getParentAll()
);
```

### Performance Monitoring

Track key performance metrics:

```typescript
// Track operation timing
async function timedOperation<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  try {
    const result = await operation();
    const duration = Date.now() - start;

    logger.info('Operation completed', {
      operation: name,
      duration,
      success: true
    });

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    logger.error('Operation failed', {
      operation: name,
      duration,
      success: false,
      error
    });

    throw error;
  }
}
```

**Performance Targets:**
- API call response time p95: < 500ms
- API call response time p99: < 1000ms
- Error rate: < 1%
- Cache hit rate: > 80% (for cacheable operations)
- Memory usage: Stable (no leaks)

**@see** [Performance Tuning Guide](performance.md) - Detailed optimization strategies

---

## Related Documentation

- **[API Reference](../api/)** - Complete SDK method documentation
- **[Examples](../../examples/)** - Working code examples
  - [Tariffs Pricing Calculator](../../examples/tariffs-pricing-calculator.ts) - Error handling
  - [Promotion Campaign Automation](../../examples/promotion-campaign-automation.ts) - Rate limiting
  - [Multi-Module Integration](../../examples/integration-product-order-finance.ts) - Cross-module patterns
- **[Getting Started](../getting-started/)** - Initial SDK setup
- **[Performance Tuning](performance.md)** - Advanced performance optimization
- **[Troubleshooting](troubleshooting.md)** - Common issues and solutions
- **[FAQ](faq.md)** - Frequently asked questions

---

## Quick Reference

### Error Handling Checklist
- ✅ Use try-catch for all SDK operations
- ✅ Handle specific error types (instanceof checks)
- ✅ Don't retry AuthenticationError or ValidationError
- ✅ Log errors with context
- ✅ Implement graceful degradation

### Rate Limiting Checklist
- ✅ Let SDK handle rate limits automatically
- ✅ Implement batching for bulk operations
- ✅ Monitor rate limit events
- ✅ Add delays between batch operations
- ✅ Use caching to reduce API calls

### Security Checklist
- ✅ Never hardcode API keys
- ✅ Use secret management in production
- ✅ Rotate keys quarterly
- ✅ Run npm audit before deployment
- ✅ Never log sensitive data

### Deployment Checklist
- ✅ All tests passing
- ✅ Security scan clean
- ✅ Monitoring configured
- ✅ Rollback plan ready
- ✅ Team notified

---

**Need Help?**

- 📧 Support: Check [Troubleshooting Guide](troubleshooting.md)
- 📚 More Examples: See [examples/](../../examples/)
- 🐛 Report Issues: Check repository issues
- 💬 Community: Check documentation discussions

---

[← Back to Guides](index.md) | [Documentation Home](../index.md)
