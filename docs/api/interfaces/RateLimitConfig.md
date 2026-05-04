[Wildberries API TypeScript SDK](../modules.md) / RateLimitConfig

# Interface: RateLimitConfig

Defined in: [client/rate-limiter.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/client/rate-limiter.ts#L41)

Configuration for rate limiting a specific endpoint.

Rate limits follow the token bucket algorithm where:
- Each request consumes 1 token from the bucket
- Tokens refill at a steady rate based on `requestsPerMinute`
- The bucket can hold up to `burstLimit` tokens maximum
- Requests wait in queue when no tokens are available

## Example

```typescript
// Strict limit: 1 request every 10 seconds
const strictLimit: RateLimitConfig = {
  requestsPerMinute: 6,      // 60s / 10s = 6 requests/minute
  intervalSeconds: 10,       // Minimum 10s between requests
  burstLimit: 1              // Cannot burst multiple requests
};

// Burst-friendly: 20 requests/minute, can burst 10 initially
const burstLimit: RateLimitConfig = {
  requestsPerMinute: 20,
  burstLimit: 10             // Can send 10 rapid requests, then throttled
};

// Simple rate limit: 5 requests/minute
const simpleLimit: RateLimitConfig = {
  requestsPerMinute: 5       // burstLimit defaults to 5
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="requestsperminute"></a> `requestsPerMinute` | `number` | Maximum number of requests allowed per 1-minute window. This determines the token refill rate: - refillRate = requestsPerMinute / 60000 (tokens per millisecond) **Examples** `6 // Allows 6 requests per minute (1 request every 10 seconds)` `20 // Allows 20 requests per minute (3 requests every second)` | [client/rate-limiter.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/client/rate-limiter.ts#L51) |
| <a id="intervalseconds"></a> `intervalSeconds?` | `number` | Optional minimum interval in seconds between requests. When specified, enforces a strict minimum time gap between consecutive requests. This is useful for endpoints with explicit interval requirements (e.g., "20 seconds between requests"). **Example** `10 // Enforces 10-second minimum interval between requests` **Default** `undefined // No interval enforcement, only per-minute limit` | [client/rate-limiter.ts:62](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/client/rate-limiter.ts#L62) |
| <a id="burstlimit"></a> `burstLimit?` | `number` | Optional maximum number of tokens the bucket can hold (burst capacity). Allows sending multiple requests rapidly up to this limit before rate limiting kicks in. After consuming all burst tokens, requests are throttled to the `requestsPerMinute` rate. **Example** `10 // Can send 10 rapid requests, then limited to requestsPerMinute` **Default** `requestsPerMinute // Burst limit equals per-minute limit` | [client/rate-limiter.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/client/rate-limiter.ts#L73) |
| <a id="penaltymultiplier"></a> `penaltyMultiplier?` | `number` | Optional penalty multiplier for 409 (Conflict) responses. When a request receives a 409 response, this many tokens are consumed from the bucket instead of the default 1. This accounts for API-level penalties where conflict responses count as multiple requests toward the rate limit. **Examples** `10 // In-store pickup: one 409 counts as 10 requests` `10 // FBS/FBW: one 409 counts as 10 requests` **Default** `undefined // No penalty (409 counts as 1 request like any other)` | [client/rate-limiter.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/client/rate-limiter.ts#L86) |
