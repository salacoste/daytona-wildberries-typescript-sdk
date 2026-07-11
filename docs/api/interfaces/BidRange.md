[Wildberries API TypeScript SDK](../modules.md) / BidRange

# Interface: BidRange

Defined in: [utils/bid-validation.ts:14](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/bid-validation.ts#L14)

Effective accepted bid range for an article, in kopecks.

Derived from a [BidsRecommendationsResponse](../-internal-/interfaces/BidsRecommendationsResponse.md):
- `min` — the lowest `reachMin.bidKopecks` across the returned search clusters.
  This is the floor WB enforces: a bid below it is rejected with HTTP 400
  `wrong bid value: <X>; min: <Y>` (parsed into [BidOutOfRangeError](../classes/BidOutOfRangeError.md)).
- `max` — the highest `reachMax.bidKopecks` across clusters. An advisory ceiling
  (the top-reach bid); bidding above it is not rejected by WB, only wasteful.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="min"></a> `min` | `number` | Minimum accepted bid in kopecks (the WB 400 floor). | [utils/bid-validation.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/bid-validation.ts#L16) |
| <a id="max"></a> `max` | `number` | Maximum recommended bid in kopecks (advisory reachMax ceiling). | [utils/bid-validation.ts:18](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/bid-validation.ts#L18) |
