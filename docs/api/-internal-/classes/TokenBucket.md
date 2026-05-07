[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / \_TokenBucket

# Class: \_TokenBucket

Defined in: [client/rate-limiter.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/client/rate-limiter.ts#L130)

**`Internal`**

Internal token bucket implementation for rate limiting.

Implements the token bucket algorithm where:
1. A bucket holds up to `capacity` tokens
2. Tokens refill at a steady `refillRate` over time
3. Each request consumes 1 token
4. Requests queue when no tokens are available
5. Queued requests are processed FIFO when tokens become available

This class is used internally by RateLimiter and not exported.

## See

[Token Bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket)

## Constructors

### Constructor

```ts
new _TokenBucket(config: RateLimitConfig): _TokenBucket;
```

Defined in: [client/rate-limiter.ts:174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/client/rate-limiter.ts#L174)

Creates a new token bucket with the specified rate limit configuration.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`RateLimitConfig`](../../interfaces/RateLimitConfig.md) | Rate limit configuration for this bucket |

#### Returns

`_TokenBucket`

## Methods

### consume()

```ts
consume(): Promise<void>;
```

Defined in: [client/rate-limiter.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/client/rate-limiter.ts#L224)

Attempts to consume a token for a request.

If tokens are available, consumes one immediately and resolves.
If no tokens are available, queues the request and returns a Promise
that will resolve when a token becomes available.

Queued requests are processed in FIFO order.

#### Returns

`Promise`\<`void`\>

Promise that resolves when a token has been consumed

#### Example

```typescript
const bucket = new TokenBucket({ requestsPerMinute: 6, burstLimit: 1 });

// First request: immediate (token available)
await bucket.consume(); // Resolves immediately

// Second request: queued (no tokens)
await bucket.consume(); // Waits ~10 seconds for token refill
```

***

### getAvailableTokens()

```ts
getAvailableTokens(): number;
```

Defined in: [client/rate-limiter.ts:282](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/client/rate-limiter.ts#L282)

**`Internal`**

Get the current number of available tokens after refilling.

This method triggers a refill and returns the current token count.
Useful for monitoring and debugging.

#### Returns

`number`

Current number of available tokens
