/**
 * Error Handling Examples
 *
 * Demonstrates comprehensive error handling strategies when working
 * with the Wildberries TypeScript SDK.
 */

import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
});

// ============================================================================
// Basic Error Handling
// ============================================================================

async function basicErrorHandling() {
  console.log('\n📋 Basic Error Handling\n');

  try {
    const products = await sdk.products.getProductList({ limit: 10 });
    console.log(`✅ Successfully fetched ${products.data.length} products`);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
  }
}

// ============================================================================
// Typed Error Handling
// ============================================================================

async function typedErrorHandling() {
  console.log('\n📋 Typed Error Handling\n');

  try {
    const products = await sdk.products.getProductList({ limit: 10 });
    console.log(`✅ Successfully fetched ${products.data.length} products`);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('❌ Authentication failed:', error.message);
      console.error('   → Check your API key');
    } else if (error instanceof RateLimitError) {
      console.error('❌ Rate limit exceeded:', error.message);
      console.error(`   → Retry after ${error.retryAfter}ms`);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation error:', error.message);
      console.error('   → Details:', error.fieldErrors);
    } else if (error instanceof NetworkError) {
      console.error('❌ Network error:', error.message);
      console.error('   → Check your internet connection');
    } else if (error instanceof WBAPIError) {
      console.error('❌ API error:', error.message);
      console.error('   → Status code:', error.statusCode);
    } else {
      console.error('❌ Unknown error:', error);
    }
  }
}

// ============================================================================
// Retry on Rate Limit
// ============================================================================

async function retryOnRateLimit<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (error instanceof RateLimitError) {
        console.log(
          `⏳ Rate limited, waiting ${error.retryAfter}ms (attempt ${attempt + 1}/${maxRetries})`
        );
        await sleep(error.retryAfter);
        continue;
      }

      // Don't retry on other errors
      throw error;
    }
  }

  throw lastError!;
}

async function rateLimitRetryExample() {
  console.log('\n📋 Rate Limit Retry Example\n');

  try {
    const products = await retryOnRateLimit(() => sdk.products.getProductList({ limit: 100 }), 5);
    console.log(`✅ Fetched ${products.data.length} products after retry logic`);
  } catch (error) {
    console.error('❌ Failed after all retries:', error);
  }
}

// ============================================================================
// Error Recovery Strategies
// ============================================================================

class ErrorRecoveryManager {
  async executeWithRecovery<T>(
    operation: () => Promise<T>,
    recoveryStrategies: {
      onAuthError?: () => Promise<T>;
      onRateLimit?: (retryAfter: number) => Promise<T>;
      onNetworkError?: () => Promise<T>;
      onValidationError?: (details: any) => Promise<T>;
      onOtherError?: (error: Error) => Promise<T>;
    }
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof AuthenticationError && recoveryStrategies.onAuthError) {
        console.log('🔄 Attempting recovery from authentication error...');
        return await recoveryStrategies.onAuthError();
      }

      if (error instanceof RateLimitError && recoveryStrategies.onRateLimit) {
        console.log('🔄 Attempting recovery from rate limit...');
        return await recoveryStrategies.onRateLimit(error.retryAfter);
      }

      if (error instanceof NetworkError && recoveryStrategies.onNetworkError) {
        console.log('🔄 Attempting recovery from network error...');
        return await recoveryStrategies.onNetworkError();
      }

      if (error instanceof ValidationError && recoveryStrategies.onValidationError) {
        console.log('🔄 Attempting recovery from validation error...');
        return await recoveryStrategies.onValidationError(error.fieldErrors);
      }

      if (recoveryStrategies.onOtherError) {
        console.log('🔄 Attempting recovery from unknown error...');
        return await recoveryStrategies.onOtherError(error as Error);
      }

      throw error;
    }
  }
}

async function errorRecoveryExample() {
  console.log('\n📋 Error Recovery Example\n');

  const recovery = new ErrorRecoveryManager();

  const result = await recovery.executeWithRecovery(
    () => sdk.products.getProductList({ limit: 10 }),
    {
      onAuthError: async () => {
        console.log('   → Refreshing API key...');
        // Implement API key refresh logic
        return sdk.products.getProductList({ limit: 10 });
      },
      onRateLimit: async (retryAfter) => {
        console.log(`   → Waiting ${retryAfter}ms before retry...`);
        await sleep(retryAfter);
        return sdk.products.getProductList({ limit: 10 });
      },
      onNetworkError: async () => {
        console.log('   → Retrying with exponential backoff...');
        await sleep(5000);
        return sdk.products.getProductList({ limit: 10 });
      },
    }
  );

  console.log(`✅ Successfully recovered and fetched ${result.data.length} products`);
}

// ============================================================================
// Graceful Degradation
// ============================================================================

async function gracefulDegradation() {
  console.log('\n📋 Graceful Degradation Example\n');

  // Try to fetch products, fall back to cache on error
  let products;

  try {
    products = await sdk.products.getProductList({ limit: 10 });
    console.log(`✅ Fetched ${products.data.length} products from API`);

    // Cache the result
    await cache.set('products', products, 300);
  } catch (error) {
    console.warn('⚠️  API error, falling back to cache...');

    products = await cache.get('products');

    if (products) {
      console.log(`✅ Using cached products (${products.data.length} items)`);
    } else {
      console.error('❌ No cached data available');

      // Use default/empty data as last resort
      products = { data: [], cursor: { total: 0, limit: 10 } };
      console.log('⚠️  Using empty default data');
    }
  }

  return products;
}

// ============================================================================
// Circuit Breaker Pattern
// ============================================================================

class CircuitBreaker {
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        console.log('🔄 Circuit breaker: Transitioning to HALF_OPEN');
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN - refusing to execute');
      }
    }

    try {
      const result = await operation();

      // Success - reset if we were in HALF_OPEN
      if (this.state === 'HALF_OPEN') {
        console.log('✅ Circuit breaker: Transitioning to CLOSED');
        this.state = 'CLOSED';
        this.failureCount = 0;
      }

      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      console.error(`❌ Circuit breaker: Failure ${this.failureCount}/${this.threshold}`);

      if (this.failureCount >= this.threshold) {
        console.error('🚨 Circuit breaker: OPEN - Too many failures');
        this.state = 'OPEN';
      }

      throw error;
    }
  }

  reset() {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = 0;
  }
}

async function circuitBreakerExample() {
  console.log('\n📋 Circuit Breaker Example\n');

  const breaker = new CircuitBreaker(3, 30000); // 3 failures, 30s timeout

  for (let i = 0; i < 5; i++) {
    try {
      const products = await breaker.execute(() => sdk.products.getProductList({ limit: 10 }));
      console.log(`✅ Request ${i + 1}: Fetched ${products.data.length} products`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Circuit breaker is OPEN')) {
        console.log(`⚠️  Request ${i + 1}: Circuit breaker prevented execution`);
      } else {
        console.error(`❌ Request ${i + 1}: ${error}`);
      }
    }

    await sleep(1000);
  }
}

// ============================================================================
// Error Logging & Monitoring
// ============================================================================

interface ErrorLog {
  timestamp: Date;
  errorType: string;
  message: string;
  statusCode?: number;
  details?: any;
  stack?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];

  log(error: unknown) {
    const log: ErrorLog = {
      timestamp: new Date(),
      errorType: 'Unknown',
      message: 'An error occurred',
    };

    if (error instanceof WBAPIError) {
      log.errorType = error.constructor.name;
      log.message = error.message;
      log.statusCode = error.statusCode;
      log.details = error.response;
    } else if (error instanceof Error) {
      log.errorType = error.constructor.name;
      log.message = error.message;
      log.stack = error.stack;
    }

    this.logs.push(log);

    // Log to console
    console.error(`[${log.timestamp.toISOString()}] ${log.errorType}: ${log.message}`);

    // In production, send to monitoring service
    // this.sendToMonitoring(log);
  }

  getLogs() {
    return this.logs;
  }

  getErrorStats() {
    const stats = new Map<string, number>();

    for (const log of this.logs) {
      const count = stats.get(log.errorType) || 0;
      stats.set(log.errorType, count + 1);
    }

    return Object.fromEntries(stats);
  }
}

async function errorLoggingExample() {
  console.log('\n📋 Error Logging Example\n');

  const logger = new ErrorLogger();

  // Simulate multiple operations with errors
  const operations = [
    () => sdk.products.getProductList({ limit: 10 }),
    () => sdk.finances.getBalance(),
    () => sdk.ordersFBS.getOrders({ limit: 10 }),
  ];

  for (const operation of operations) {
    try {
      await operation();
    } catch (error) {
      logger.log(error);
    }
  }

  // Display error statistics
  console.log('\n📊 Error Statistics:');
  console.log(logger.getErrorStats());
}

// ============================================================================
// Utility Functions
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simple in-memory cache for examples
const cache = {
  storage: new Map<string, any>(),

  async set(key: string, value: any, ttl: number) {
    this.storage.set(key, value);

    setTimeout(() => {
      this.storage.delete(key);
    }, ttl * 1000);
  },

  async get(key: string) {
    return this.storage.get(key);
  },
};

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  console.log('🚀 Wildberries SDK - Error Handling Examples\n');
  console.log('='.repeat(60));

  try {
    // Run examples
    await basicErrorHandling();
    await typedErrorHandling();
    await rateLimitRetryExample();
    await errorRecoveryExample();
    await gracefulDegradation();
    await circuitBreakerExample();
    await errorLoggingExample();

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ All error handling examples completed\n');
  } catch (error) {
    console.error('\n❌ Example execution failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

// Export for use in other modules
export {
  basicErrorHandling,
  typedErrorHandling,
  retryOnRateLimit,
  ErrorRecoveryManager,
  gracefulDegradation,
  CircuitBreaker,
  ErrorLogger,
};
