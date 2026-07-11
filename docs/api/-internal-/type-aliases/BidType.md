[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BidType

# Type Alias: BidType

```ts
type BidType = "manual" | "unified";
```

Defined in: [types/promotion.types.ts:1617](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1617)

Bid type for campaign (per WB OpenAPI etalon `08-promotion.yaml` enum).
- `unified` — единая ставка (Type 8; ставкой управляет WB).
- `manual` — ручная ставка (Type 9; ставку задаёт продавец).

NOTE: an earlier SDK version used `'auto'` for the unified/Type-8 value — that
was incorrect. WB's spec and the live API use `'unified'` (and never `'auto'`):
a prod probe returned 118 `unified` + 154 `manual` campaigns, 0 `auto`.

[PromotionModule.updateBids](../../classes/PromotionModule.md#updatebids) применяется к кампаниям `unified` (единая) и
`manual` (ручная).
