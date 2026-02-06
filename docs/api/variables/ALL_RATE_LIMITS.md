[Wildberries API TypeScript SDK](../modules.md) / ALL\_RATE\_LIMITS

# Variable: ALL\_RATE\_LIMITS

```ts
const ALL_RATE_LIMITS: {
[key: string]: RateLimitConfig;
};
```

Defined in: [config/rate-limits.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/config/rate-limits.ts#L72)

Aggregated rate limit configuration for all SDK modules.

Combines rate limits from all generated modules into a single object.
Endpoint keys follow the format: `{moduleName}.{methodName}`

**Current Modules:**
- general: General API endpoints (ping, news, seller info)
- products: Product management endpoints (categories, CRUD, media, pricing, stock)
- ordersFBS: FBS order retrieval and status management endpoints
- ordersFBW: FBW warehouse supply and acceptance endpoints

**Future Modules (will be added as generated):**
- finances: Financial reporting endpoints
- analytics: Sales analytics endpoints
- reports: Async report generation endpoints
- communications: Chat, Q&A, reviews endpoints
- promotion: Marketing campaigns endpoints
- tariffs: Commission and fee endpoints
- inStorePickup: Pickup point management endpoints

## Index Signature

```ts
[key: string]: RateLimitConfig
```

## Examples

```typescript
import { ALL_RATE_LIMITS } from './config/rate-limits';
import { RateLimiter } from './client/rate-limiter';

const limiter = new RateLimiter(ALL_RATE_LIMITS);
await limiter.waitForSlot('general.ping');
```

```typescript
// Access individual module limits
import { generalRateLimits } from './config/general-rate-limits';
console.log(generalRateLimits['general.ping']);
```
