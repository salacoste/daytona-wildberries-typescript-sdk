[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BidsRecommendationsResponse

# Interface: BidsRecommendationsResponse

Defined in: [types/promotion.types.ts:2209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2209)

Response from GET /api/advert/v0/bids/recommendations

The response shape depends on the campaign payment type (discriminated by
`paymentType`, WB news 2026-09):
- `cpm` (pay per impression): `base` + `normQueries` are populated;
- `cpc` (pay per click): `levels` is populated (recommended bids per
  listing position range) — `base`/`normQueries` are absent.

## Since

3.4.0; CPC variant since task-200 (WB news 2026-09)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | Campaign ID | [types/promotion.types.ts:2211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2211) |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/promotion.types.ts:2213](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2213) |
| <a id="paymenttype"></a> `paymentType?` | `"cpm"` \| `"cpc"` | Payment type: `cpm` — for impressions; `cpc` — for clicks. **Since** task-200 (WB news 2026-09) | [types/promotion.types.ts:2219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2219) |
| <a id="base"></a> `base?` | [`BaseBidRecommendation`](BaseBidRecommendation.md) | Recommended base bids for the product card (CPM campaigns) | [types/promotion.types.ts:2221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2221) |
| <a id="normqueries"></a> `normQueries?` | [`NormQueryBidRecommendation`](NormQueryBidRecommendation.md)[] | Recommended bids per search cluster (CPM campaigns) | [types/promotion.types.ts:2223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2223) |
| <a id="levels"></a> `levels?` | [`CpcBidRecommendationLevel`](CpcBidRecommendationLevel.md)[] | Recommended bids per listing position range (CPC campaigns). **Since** task-200 (WB news 2026-09) | [types/promotion.types.ts:2229](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2229) |
