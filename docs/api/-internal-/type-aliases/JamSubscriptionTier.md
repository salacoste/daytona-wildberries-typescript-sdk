[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionTier

# Type Alias: JamSubscriptionTier

```ts
type JamSubscriptionTier = "none" | "standard" | "advanced";
```

Defined in: [types/general.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/general.types.ts#L263)

Jam (Джем) subscription tier

Wildberries offers tiered "Jam" subscriptions that unlock higher limits
on analytics endpoints (e.g., search-texts limit field).

- `'none'` — No Jam subscription (analytics search-texts unavailable)
- `'standard'` — Standard tier (limit ≤ 30)
- `'advanced'` — Advanced tier (limit ≤ 50)
