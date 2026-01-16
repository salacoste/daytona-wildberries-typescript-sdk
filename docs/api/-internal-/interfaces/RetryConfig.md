[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RetryConfig

# Interface: RetryConfig

Defined in: [client/retry-handler.ts:38](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/client/retry-handler.ts#L38)

Configuration options for retry behavior

Controls how the RetryHandler responds to failures, including
maximum retry attempts, delay timing, and backoff strategy.

## Example

```typescript
// Default behavior (3 retries with exponential backoff)
const defaultConfig = {};

// Custom: More aggressive retries
const aggressive: RetryConfig = {
  maxRetries: 5,
  retryDelay: 500,
  exponentialBackoff: true
};

// Custom: Linear backoff (no exponential)
const linear: RetryConfig = {
  maxRetries: 3,
  retryDelay: 2000,
  exponentialBackoff: false
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="maxretries"></a> `maxRetries?` | `number` | Maximum number of retry attempts after initial failure **Default** `3` **Minimum** 0 **Example** `maxRetries: 3 // Initial attempt + 3 retries = 4 total attempts maxRetries: 0 // Disable retries completely` | [client/retry-handler.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/client/retry-handler.ts#L50) |
| <a id="retrydelay"></a> `retryDelay?` | `number` | Initial delay in milliseconds before first retry With exponential backoff, subsequent delays are calculated as: `retryDelay * 2^attempt * jitter` **Default** `1000 (1 second)` **Minimum** 0 **Example** `retryDelay: 1000 // 1s, 2s, 4s, 8s with exponential backoff retryDelay: 500 // 500ms, 1s, 2s, 4s with exponential backoff` | [client/retry-handler.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/client/retry-handler.ts#L66) |
| <a id="exponentialbackoff"></a> `exponentialBackoff?` | `boolean` | Whether to use exponential backoff for retry delays - `true`: Delays increase exponentially (1s, 2s, 4s, 8s...) - `false`: Delays remain constant (1s, 1s, 1s, 1s...) Exponential backoff gives APIs time to recover from overload and reduces load during incidents. **Default** `true` **Example** `exponentialBackoff: true // 1s → 2s → 4s → 8s exponentialBackoff: false // 1s → 1s → 1s → 1s` | [client/retry-handler.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/client/retry-handler.ts#L84) |
