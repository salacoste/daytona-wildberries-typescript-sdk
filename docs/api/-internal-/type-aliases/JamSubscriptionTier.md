[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionTier

# Type Alias: JamSubscriptionTier

```ts
type JamSubscriptionTier = "none" | "standard" | "advanced";
```

Defined in: [types/general.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L263)

Jam (Джем) subscription tier

Wildberries offers tiered "Jam" subscriptions that unlock higher limits
on analytics endpoints (e.g., search-texts limit field).

- `'none'` — No Jam subscription (analytics search-texts unavailable)
- `'standard'` — Standard tier (limit ≤ 30)
- `'advanced'` — Advanced tier (limit ≤ 50)
