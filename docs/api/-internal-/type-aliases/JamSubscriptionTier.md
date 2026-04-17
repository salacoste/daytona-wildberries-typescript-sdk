[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionTier

# Type Alias: JamSubscriptionTier

```ts
type JamSubscriptionTier = "none" | "standard" | "advanced";
```

Defined in: [types/general.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/general.types.ts#L263)

Jam (Джем) subscription tier

Wildberries offers tiered "Jam" subscriptions that unlock higher limits
on analytics endpoints (e.g., search-texts limit field).

- `'none'` — No Jam subscription (analytics search-texts unavailable)
- `'standard'` — Standard tier (limit ≤ 30)
- `'advanced'` — Advanced tier (limit ≤ 50)
