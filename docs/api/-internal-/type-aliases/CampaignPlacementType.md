[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignPlacementType

# Type Alias: CampaignPlacementType

```ts
type CampaignPlacementType = "combined" | "search" | "recommendation";
```

Defined in: [types/promotion.types.ts:1629](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1629)

Campaign placement types (per WB OpenAPI etalon `PlacementType` enum).
- `combined` — search and recommendation
- `search` — search only
- `recommendation` — recommendation only (singular)

Note: this is distinct from the bid `placement` field
(`UpdateBidsArticle.placement` = `'search' | 'recommendations' | 'combined'`,
plural `'recommendations'`), which is used by `updateBids`.
