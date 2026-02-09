[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RetryHandler

# Class: RetryHandler

Defined in: [client/retry-handler.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/client/retry-handler.ts#L200)

RetryHandler - Automatic retry with exponential backoff

Provides resilience against transient failures by automatically retrying
failed operations with configurable delays and backoff strategies.

**Retry Policy:**
- ✅ Retries: 5xx errors, 429 rate limits, network timeouts, connection failures
- ❌ NO Retry: 401/403 auth errors, 400/422 validation errors, other 4xx errors

**Exponential Backoff:**
- Formula: `delay = retryDelay * 2^attempt * jitter`
- Jitter: Random ±10% to prevent thundering herd
- Max delay: Capped at 30 seconds

## Example

```typescript
const handler = new RetryHandler({
  maxRetries: 3,
  retryDelay: 1000,
  exponentialBackoff: true
});

const result = await handler.executeWithRetry(
  async () => await fetchData(),
  'fetchData'
);
```

## Constructors

### Constructor

```ts
new RetryHandler(config?: RetryConfig): RetryHandler;
```

Defined in: [client/retry-handler.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/client/retry-handler.ts#L221)

Creates a new RetryHandler instance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`RetryConfig`](../interfaces/RetryConfig.md) | Optional retry configuration (uses defaults if not provided) |

#### Returns

`RetryHandler`

#### Example

```typescript
// Use defaults (3 retries, 1s delay, exponential backoff)
const handler = new RetryHandler();

// Custom configuration
const handler = new RetryHandler({
  maxRetries: 5,
  retryDelay: 500,
  exponentialBackoff: true
});
```

## Methods

### executeWithRetry()

```ts
executeWithRetry<T>(
   operation: () => Promise<T>, 
   operationName: string, 
options?: RetryOptions): Promise<T>;
```

Defined in: [client/retry-handler.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/client/retry-handler.ts#L276)

Executes an async operation with automatic retry on transient failures

Wraps the provided operation and automatically retries on failures that
are likely to be transient (network errors, server errors, rate limits).

**Retry Behavior:**
- Retries on: NetworkError (5xx, timeout, no status), RateLimitError (429)
- NO retry on: AuthenticationError, ValidationError, other 4xx errors
- Uses exponential backoff with jitter (if configured)
- Preserves and re-throws final error after max retries exhausted

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The return type of the operation |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `operation` | () => `Promise`\<`T`\> | `undefined` | Async function to execute (and retry on failure) |
| `operationName` | `string` | `'operation'` | Description of operation for logging (optional) |
| `options?` | [`RetryOptions`](../interfaces/RetryOptions.md) | `undefined` | - |

#### Returns

`Promise`\<`T`\>

The result of the successful operation

#### Throws

The final error if all retry attempts are exhausted

#### Example

```typescript
// Basic usage
const data = await handler.executeWithRetry(
  async () => await api.getData(),
  'getData'
);

// With arrow function
const result = await handler.executeWithRetry(
  () => fetch('https://api.example.com/data').then(r => r.json()),
  'fetch data'
);

// With readonly-aware retry (recommended for SDK operations)
const products = await handler.executeWithRetry(
  () => api.getProducts(),
  'getProducts',
  { operationKey: 'products.getCardsList' }
);

// Force retry for write operation (use with caution)
const created = await handler.executeWithRetry(
  () => api.createProduct(data),
  'createProduct',
  { operationKey: 'products.createCardsUpload', forceRetry: true }
);
```
