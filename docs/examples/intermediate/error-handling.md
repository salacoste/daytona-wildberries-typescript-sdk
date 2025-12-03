# Error Handling

Gracefully handle API errors with the SDK's typed error hierarchy.

## Description

The SDK provides a comprehensive error hierarchy for different types of failures. This example shows how to catch and handle specific error types appropriately.

## Error Types

| Error Class | HTTP Status | Description |
|------------|-------------|-------------|
| `AuthenticationError` | 401 | Invalid or missing API key |
| `ValidationError` | 400 | Invalid request parameters |
| `RateLimitError` | 429 | Rate limit exceeded |
| `NetworkError` | 5xx | Server or network failures |
| `WBAPIError` | Any | Base class for all API errors |

## Basic Error Handling

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  ValidationError,
  RateLimitError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

async function safeApiCall() {
  try {
    const categories = await sdk.products.getParentAll();
    return categories;

  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
      console.error('Please check your API key');
      // Redirect to login or refresh token

    } else if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded');
      console.error(`Retry after: ${error.retryAfter}ms`);
      // Wait and retry
      await sleep(error.retryAfter);
      return safeApiCall(); // Retry

    } else if (error instanceof ValidationError) {
      console.error('Invalid request:', error.message);
      console.error('Validation details:', error.response);
      // Fix request parameters

    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      console.error('Status code:', error.statusCode);
      // Retry with exponential backoff

    } else if (error instanceof WBAPIError) {
      console.error('API error:', error.message);
      console.error('Status:', error.statusCode);
      // Generic API error handling

    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Error Properties

```typescript
try {
  await sdk.products.getParentAll();
} catch (error) {
  if (error instanceof WBAPIError) {
    // Common properties for all API errors
    console.log('Error name:', error.name);       // 'RateLimitError'
    console.log('Message:', error.message);       // Human-readable message
    console.log('Status code:', error.statusCode); // HTTP status (429)
    console.log('Response:', error.response);     // Raw API response
  }

  if (error instanceof RateLimitError) {
    // Rate limit specific
    console.log('Retry after (ms):', error.retryAfter);
  }
}
```

## Handling Promotion Module Errors

```typescript
import {
  CampaignNotFoundError,
  InvalidBidError,
  BudgetExceededError,
  InvalidCampaignStateError
} from 'daytona-wildberries-typescript-sdk';

async function manageCampaign(campaignId: number) {
  try {
    await sdk.promotion.pauseAdv(campaignId);
  } catch (error) {
    if (error instanceof CampaignNotFoundError) {
      console.error(`Campaign ${campaignId} not found`);

    } else if (error instanceof InvalidBidError) {
      console.error('Invalid bid amount:', error.message);

    } else if (error instanceof BudgetExceededError) {
      console.error('Insufficient budget');

    } else if (error instanceof InvalidCampaignStateError) {
      console.error('Cannot pause campaign in current state');
    }
  }
}
```

## Handling In-Store Pickup Errors

```typescript
import {
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError
} from 'daytona-wildberries-typescript-sdk';

async function processPickupOrder(orderId: number) {
  try {
    await sdk.inStorePickup.confirmOrder(orderId);
  } catch (error) {
    if (error instanceof PickupOrderNotFoundError) {
      console.error(`Order ${orderId} not found`);

    } else if (error instanceof InvalidOrderStateError) {
      console.error('Order cannot be confirmed in current state');

    } else if (error instanceof CustomerVerificationError) {
      console.error('Customer identity verification failed');

    } else if (error instanceof MetadataValidationError) {
      console.error('Invalid metadata format:', error.message);
    }
  }
}
```

## Retry Pattern with Exponential Backoff

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();

    } catch (error) {
      lastError = error as Error;

      // Don't retry auth or validation errors
      if (error instanceof AuthenticationError ||
          error instanceof ValidationError) {
        throw error;
      }

      // Handle rate limits
      if (error instanceof RateLimitError) {
        await sleep(error.retryAfter);
        continue;
      }

      // Exponential backoff for network errors
      if (error instanceof NetworkError && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retry ${attempt + 1}/${maxRetries} in ${delay}ms`);
        await sleep(delay);
        continue;
      }
    }
  }

  throw lastError!;
}

// Usage
const categories = await withRetry(() =>
  sdk.products.getParentAll()
);
```

## Error Logging Best Practices

```typescript
async function loggedApiCall<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T | null> {
  const startTime = Date.now();

  try {
    const result = await operation();
    console.log(`[${name}] Success in ${Date.now() - startTime}ms`);
    return result;

  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof WBAPIError) {
      console.error(`[${name}] Failed after ${duration}ms:`, {
        type: error.name,
        message: error.message,
        status: error.statusCode,
        // Don't log full response in production (may contain sensitive data)
      });
    }

    return null;
  }
}

// Usage
const balance = await loggedApiCall('getBalance', () =>
  sdk.finances.getBalance()
);
```

## Related Materials

- [API Reference: WBAPIError](/api/classes/WBAPIError)
- [Rate Limiting](rate-limiting.md)
- [Best Practices](/guides/best-practices)

---

[Back to Examples](../index.md) | [Previous: Single API Call](../basic/single-call.md) | [Next: Rate Limiting](rate-limiting.md)
