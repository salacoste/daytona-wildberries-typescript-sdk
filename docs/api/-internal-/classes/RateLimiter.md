[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RateLimiter

# Class: RateLimiter

Defined in: [client/rate-limiter.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L340)

Rate limiter for API endpoints using the token bucket algorithm.

Manages per-endpoint rate limiting to prevent exceeding API quotas.
Each endpoint key (e.g., 'products.create', 'orders.list') can have
independent rate limit configurations.

Features:
- Automatic request queueing when rate limit reached
- FIFO queue processing
- Per-endpoint configuration
- Dynamic configuration updates
- Zero external dependencies (in-memory state)

## Examples

```typescript
import { RateLimiter } from './rate-limiter';

// Create rate limiter with predefined limits
const limiter = new RateLimiter({
  'products.create': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 1
  },
  'orders.list': {
    requestsPerMinute: 5
  }
});

// Wait for rate limit slot before making request
await limiter.waitForSlot('products.create');
// Request proceeds when token available

// Endpoints without configured limits are unlimited
await limiter.waitForSlot('general.ping'); // Returns immediately
```

```typescript
// Create empty rate limiter and configure dynamically
const limiter = new RateLimiter();

// Add rate limit for specific endpoint
limiter.configure('products.update', {
  requestsPerMinute: 10,
  burstLimit: 5
});

await limiter.waitForSlot('products.update');
```

## Constructors

### Constructor

```ts
new RateLimiter(config?: EndpointLimits): RateLimiter;
```

Defined in: [client/rate-limiter.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L371)

Creates a new RateLimiter instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`EndpointLimits`](../../type-aliases/EndpointLimits.md) | Optional initial rate limit configuration. Can be empty and configured dynamically via configure(). Defaults to empty object (no limits). |

#### Returns

`RateLimiter`

#### Example

```typescript
// With predefined limits
const limiter = new RateLimiter({
  'api.operation': { requestsPerMinute: 10 }
});

// Empty (configure later)
const limiter = new RateLimiter();
```

## Methods

### waitForSlot()

```ts
waitForSlot(key: string): Promise<void>;
```

Defined in: [client/rate-limiter.ts:423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L423)

Waits for a rate limit slot to become available for the specified endpoint.

This method should be called before making an API request to ensure
the request doesn't exceed the endpoint's rate limit.

Behavior:
- If no rate limit is configured for the endpoint key, returns immediately (unlimited)
- If tokens are available, consumes one and returns immediately
- If no tokens available, queues the request and waits until a token is available
- Queued requests are processed in FIFO order

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Endpoint identifier (e.g., 'products.create', 'orders.list') |

#### Returns

`Promise`\<`void`\>

Promise that resolves when a rate limit slot is available

#### Examples

```typescript
const limiter = new RateLimiter({
  'products.create': { requestsPerMinute: 6, burstLimit: 1 }
});

// First request: immediate (token available)
await limiter.waitForSlot('products.create');
console.log('Request 1 can proceed');

// Second request: queued (no tokens, waits ~10 seconds)
await limiter.waitForSlot('products.create');
console.log('Request 2 can proceed');

// Unlimited endpoint: always immediate
await limiter.waitForSlot('general.ping');
console.log('Unlimited request proceeds immediately');
```

```typescript
// Multiple concurrent requests are queued in FIFO order
const promises = [
  limiter.waitForSlot('api.operation'),
  limiter.waitForSlot('api.operation'),
  limiter.waitForSlot('api.operation')
];

// First request proceeds immediately (token available)
// Second and third queue and wait in order
await Promise.all(promises);
```

***

### configure()

```ts
configure(key: string, config: RateLimitConfig): void;
```

Defined in: [client/rate-limiter.ts:484](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L484)

Dynamically configure or update rate limit for an endpoint.

If a bucket already exists for this endpoint, it will be reset
with the new configuration. Existing queued requests will continue
with the old bucket until completed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Endpoint identifier |
| `config` | [`RateLimitConfig`](../../interfaces/RateLimitConfig.md) | Rate limit configuration |

#### Returns

`void`

#### Example

```typescript
const limiter = new RateLimiter();

// Add rate limit for endpoint
limiter.configure('products.create', {
  requestsPerMinute: 6,
  intervalSeconds: 10,
  burstLimit: 1
});

// Update existing rate limit
limiter.configure('products.create', {
  requestsPerMinute: 10  // Increase limit
});
```

***

### getConfiguration()

```ts
getConfiguration(key: string): RateLimitConfig | undefined;
```

Defined in: [client/rate-limiter.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L504)

Get the current rate limit configuration for an endpoint.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Endpoint identifier |

#### Returns

[`RateLimitConfig`](../../interfaces/RateLimitConfig.md) \| `undefined`

Rate limit configuration or undefined if no limit configured

#### Example

```typescript
const config = limiter.getConfiguration('products.create');
if (config) {
  console.log(`Limit: ${config.requestsPerMinute} req/min`);
}
```

***

### canProceed()

```ts
canProceed(key: string): boolean;
```

Defined in: [client/rate-limiter.ts:529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L529)

Check if a request can proceed immediately without queueing.

This is a non-blocking check useful for monitoring or debugging.
Does NOT consume a token.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Endpoint identifier |

#### Returns

`boolean`

true if request can proceed immediately, false if would queue

#### Example

```typescript
if (limiter.canProceed('products.create')) {
  console.log('Request will execute immediately');
} else {
  console.log('Request will be queued');
}

// Still need to call waitForSlot before making request
await limiter.waitForSlot('products.create');
```

***

### getRemainingTokens()

```ts
getRemainingTokens(key: string): number;
```

Defined in: [client/rate-limiter.ts:554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L554)

Get the number of tokens currently available for an endpoint.

This is a monitoring/debugging method. The value can change rapidly
as tokens are consumed and refilled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Endpoint identifier |

#### Returns

`number`

Number of available tokens, or Infinity if unlimited

#### Example

```typescript
const remaining = limiter.getRemainingTokens('products.create');
console.log(`${remaining} requests can execute immediately`);
```

***

### reset()

```ts
reset(key?: string): void;
```

Defined in: [client/rate-limiter.ts:583](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/client/rate-limiter.ts#L583)

Reset rate limiting state for an endpoint or all endpoints.

Clears token buckets and queued requests. Use with caution as
queued requests will never resolve (they'll hang indefinitely).

This is primarily a testing utility.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key?` | `string` | Optional endpoint identifier. If omitted, resets all endpoints. |

#### Returns

`void`

#### Example

```typescript
// Reset specific endpoint
limiter.reset('products.create');

// Reset all endpoints
limiter.reset();
```
