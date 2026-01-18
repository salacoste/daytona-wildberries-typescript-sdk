# Custom Retry Logic

Implementing advanced retry strategies.

## Description

While the SDK provides built-in retry logic, sometimes you need custom retry strategies for specific use cases. This example shows various retry patterns for different scenarios.

## Basic Retry with Exponential Backoff

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  NetworkError,
  AuthenticationError,
  ValidationError
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  exponentialBase: number;
}

const defaultRetryConfig: RetryConfig = {
  maxAttempts: 5,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  exponentialBase: 2
};

async function withExponentialBackoff<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const cfg = { ...defaultRetryConfig, ...config };
  let lastError: Error;

  for (let attempt = 1; attempt <= cfg.maxAttempts; attempt++) {
    try {
      return await operation();

    } catch (error) {
      lastError = error as Error;

      // Don't retry on permanent errors
      if (error instanceof AuthenticationError ||
          error instanceof ValidationError) {
        throw error;
      }

      // Special handling for rate limits
      if (error instanceof RateLimitError) {
        console.log(`Rate limited. Waiting ${error.retryAfter}ms...`);
        await sleep(error.retryAfter);
        continue;
      }

      // Calculate delay with exponential backoff + jitter
      if (attempt < cfg.maxAttempts) {
        const delay = Math.min(
          cfg.baseDelayMs * Math.pow(cfg.exponentialBase, attempt - 1),
          cfg.maxDelayMs
        );
        const jitter = delay * 0.2 * Math.random();
        const totalDelay = delay + jitter;

        console.log(`Attempt ${attempt} failed. Retrying in ${Math.round(totalDelay)}ms...`);
        await sleep(totalDelay);
      }
    }
  }

  throw lastError!;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Circuit Breaker Pattern

```typescript
enum CircuitState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Failing, reject requests
  HALF_OPEN = 'HALF_OPEN' // Testing if service recovered
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures = 0;
  private lastFailureTime = 0;
  private successesInHalfOpen = 0;

  constructor(
    private readonly failureThreshold = 5,
    private readonly recoveryTimeMs = 30000,
    private readonly successThreshold = 3
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    // Check if circuit should transition from OPEN to HALF_OPEN
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime >= this.recoveryTimeMs) {
        this.state = CircuitState.HALF_OPEN;
        this.successesInHalfOpen = 0;
        console.log('Circuit: OPEN -> HALF_OPEN');
      } else {
        throw new Error('Circuit breaker is OPEN');
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
    if (this.state === CircuitState.HALF_OPEN) {
      this.successesInHalfOpen++;
      if (this.successesInHalfOpen >= this.successThreshold) {
        this.state = CircuitState.CLOSED;
        this.failures = 0;
        console.log('Circuit: HALF_OPEN -> CLOSED');
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === CircuitState.HALF_OPEN) {
      this.state = CircuitState.OPEN;
      console.log('Circuit: HALF_OPEN -> OPEN');
    } else if (this.failures >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
      console.log('Circuit: CLOSED -> OPEN');
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}

// Usage
const circuitBreaker = new CircuitBreaker(5, 30000, 3);

async function safeApiCall<T>(operation: () => Promise<T>): Promise<T> {
  return circuitBreaker.execute(operation);
}

const categories = await safeApiCall(() =>
  sdk.products.getParentAll()
);
```

## Retry with Timeout

```typescript
async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    operation(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    )
  ]);
}

async function retryWithTimeout<T>(
  operation: () => Promise<T>,
  options: {
    maxAttempts?: number;
    timeoutMs?: number;
    delayMs?: number;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    timeoutMs = 10000,
    delayMs = 1000
  } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await withTimeout(operation, timeoutMs);

    } catch (error) {
      if (attempt === maxAttempts) throw error;

      console.log(`Attempt ${attempt} failed: ${(error as Error).message}`);
      await sleep(delayMs);
    }
  }

  throw new Error('All attempts failed');
}

// Usage
const balance = await retryWithTimeout(
  () => sdk.finances.getBalance(),
  { timeoutMs: 5000, maxAttempts: 3 }
);
```

## Selective Retry Based on Error Type

```typescript
type RetryDecision = {
  shouldRetry: boolean;
  delayMs?: number;
};

function makeRetryDecision(error: Error, attempt: number): RetryDecision {
  // Rate limits: always retry with specified delay
  if (error instanceof RateLimitError) {
    return { shouldRetry: true, delayMs: error.retryAfter };
  }

  // Network errors: retry with exponential backoff
  if (error instanceof NetworkError) {
    if (attempt < 5) {
      return {
        shouldRetry: true,
        delayMs: Math.min(1000 * Math.pow(2, attempt), 30000)
      };
    }
  }

  // 5xx errors: retry up to 3 times
  if (error.message.includes('5')) {
    if (attempt < 3) {
      return { shouldRetry: true, delayMs: 2000 };
    }
  }

  // Auth and validation: never retry
  if (error instanceof AuthenticationError ||
      error instanceof ValidationError) {
    return { shouldRetry: false };
  }

  // Unknown errors: retry once
  if (attempt < 2) {
    return { shouldRetry: true, delayMs: 1000 };
  }

  return { shouldRetry: false };
}

async function smartRetry<T>(
  operation: () => Promise<T>
): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await operation();

    } catch (error) {
      attempt++;
      const decision = makeRetryDecision(error as Error, attempt);

      if (!decision.shouldRetry) {
        throw error;
      }

      console.log(`Retrying in ${decision.delayMs}ms (attempt ${attempt})`);
      await sleep(decision.delayMs!);
    }
  }
}
```

## Retry with Fallback

```typescript
async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  options: { maxPrimaryAttempts?: number } = {}
): Promise<T> {
  const { maxPrimaryAttempts = 3 } = options;

  try {
    return await withExponentialBackoff(primary, {
      maxAttempts: maxPrimaryAttempts
    });
  } catch (primaryError) {
    console.log('Primary failed, trying fallback...');

    try {
      return await fallback();
    } catch (fallbackError) {
      // Throw primary error as it's usually more informative
      throw primaryError;
    }
  }
}

// Usage: Try real-time data, fall back to cached
const orders = await withFallback(
  () => sdk.ordersFBS.getOrdersNew(),
  () => getCachedOrders() // Your caching implementation
);
```

## Retry Queue with Persistence

```typescript
interface QueuedOperation {
  id: string;
  operation: () => Promise<unknown>;
  attempts: number;
  lastAttempt: number;
  maxAttempts: number;
}

class RetryQueue {
  private queue: Map<string, QueuedOperation> = new Map();
  private processing = false;

  add(
    id: string,
    operation: () => Promise<unknown>,
    maxAttempts = 5
  ) {
    this.queue.set(id, {
      id,
      operation,
      attempts: 0,
      lastAttempt: 0,
      maxAttempts
    });
    this.process();
  }

  private async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.size > 0) {
      for (const [id, op] of this.queue) {
        // Check if enough time has passed since last attempt
        const delay = Math.pow(2, op.attempts) * 1000;
        if (Date.now() - op.lastAttempt < delay) continue;

        try {
          await op.operation();
          this.queue.delete(id);
          console.log(`Operation ${id} succeeded`);

        } catch (error) {
          op.attempts++;
          op.lastAttempt = Date.now();

          if (op.attempts >= op.maxAttempts) {
            this.queue.delete(id);
            console.error(`Operation ${id} failed permanently:`, error);
          } else {
            console.log(`Operation ${id} failed, will retry (${op.attempts}/${op.maxAttempts})`);
          }
        }
      }

      await sleep(1000);
    }

    this.processing = false;
  }
}

// Usage
const retryQueue = new RetryQueue();

retryQueue.add('update-price-123', async () => {
  await sdk.products.updatePrices([{ nmId: 123, price: 1000 }]);
});
```

## Related Materials

- [Error Handling](../intermediate/error-handling.md)
- [Rate Limiting](../intermediate/rate-limiting.md)
- [Performance Optimization](performance.md)

---

[Back to Examples](../index.md) | [Previous: Multi-Module Workflow](multi-module.md) | [Next: Performance Optimization](performance.md)
