[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignPlacementType

# Type Alias: CampaignPlacementType

```ts
type CampaignPlacementType = "combined" | "search" | "recommendation";
```

Defined in: [types/promotion.types.ts:1629](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L1629)

Campaign placement types (per WB OpenAPI etalon `PlacementType` enum).
- `combined` — search and recommendation
- `search` — search only
- `recommendation` — recommendation only (singular)

Note: this is distinct from the bid `placement` field
(`UpdateBidsArticle.placement` = `'search' | 'recommendations' | 'combined'`,
plural `'recommendations'`), which is used by `updateBids`.
