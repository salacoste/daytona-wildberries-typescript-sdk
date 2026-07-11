[Wildberries API TypeScript SDK](../modules.md) / validateBid

# Function: validateBid()

```ts
function validateBid(recommendations: BidsRecommendationsResponse, bidKopecks: number): void;
```

Defined in: [utils/bid-validation.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/bid-validation.ts#L86)

Validate a desired bid against an article's recommendation range.

Throws [BidOutOfRangeError](../classes/BidOutOfRangeError.md) (with parsed `received` / `min` / `max`) when the
bid falls outside `[min, max]`. No-op (no throw) when the range can't be derived
(`extractBidRange` returns `null`) — never fabricates a range from missing data.

Pure and network-free. Use this to fail fast **before** calling
[PromotionModule.updateBids](../classes/PromotionModule.md#updatebids), saving a rate-limit slot and avoiding a 400
round-trip. Strictly opt-in — NOT applied automatically inside `updateBids`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `recommendations` | [`BidsRecommendationsResponse`](../-internal-/interfaces/BidsRecommendationsResponse.md) | A `getBidsRecommendations` response for the article |
| `bidKopecks` | `number` | The desired bid in kopecks (same unit as `updateBids`) |

## Returns

`void`

## Throws

When `bidKopecks` is outside the recommendation range

## Example

```typescript
const reco = await sdk.promotion.getBidsRecommendations({ advertId: 1, nmId: 2 });
try {
  validateBid(reco, 150);
  await sdk.promotion.updateBids({
    bids: [{ advert_id: 1, nm_bids: [{ nm_id: 2, bid_kopecks: 150, placement: 'search' }] }],
  });
} catch (e) {
  if (e instanceof BidOutOfRangeError) console.warn(`floor is ${e.min}`);
}
```

## Since

3.16.0
