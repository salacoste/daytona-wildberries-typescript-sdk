[Wildberries API TypeScript SDK](../modules.md) / EndpointLimits

# Type Alias: EndpointLimits

```ts
type EndpointLimits = Record<string, RateLimitConfig>;
```

Defined in: [client/rate-limiter.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/client/rate-limiter.ts#L113)

Mapping of endpoint keys to their rate limit configurations.

Each key represents a unique API endpoint or operation (e.g., 'products.create', 'orders.list').
Keys are arbitrary strings defined by the SDK module implementations.

## Example

```typescript
const limits: EndpointLimits = {
  'products.create': {
    requestsPerMinute: 6,
    intervalSeconds: 10,
    burstLimit: 1
  },
  'products.list': {
    requestsPerMinute: 20,
    burstLimit: 20
  },
  'orders.updateStatus': {
    requestsPerMinute: 10
  }
};
```
