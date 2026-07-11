[Wildberries API TypeScript SDK](../modules.md) / clampBid

# Function: clampBid()

```ts
function clampBid(recommendations: BidsRecommendationsResponse, bidKopecks: number): number;
```

Defined in: [utils/bid-validation.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/bid-validation.ts#L126)

Clamp a desired bid into an article's recommendation range.

Returns `bidKopecks` adjusted to lie within `[min, max]` (floored on the low end,
ceilinged on the high end). Returns the bid unchanged when the range can't be
derived (`extractBidRange` returns `null`). Never throws.

Pure and network-free. Use this when you want a best-effort in-range bid rather than
a hard failure (contrast with [validateBid](validateBid.md)). Strictly opt-in.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `recommendations` | [`BidsRecommendationsResponse`](../-internal-/interfaces/BidsRecommendationsResponse.md) | A `getBidsRecommendations` response for the article |
| `bidKopecks` | `number` | The desired bid in kopecks |

## Returns

`number`

The clamped bid in kopecks (within `[min, max]`, or unchanged if no range)

## Example

```typescript
const reco = await sdk.promotion.getBidsRecommendations({ advertId: 1, nmId: 2 });
const safe = clampBid(reco, 5); // -> range.min (the floor)
await sdk.promotion.updateBids({
  bids: [{ advert_id: 1, nm_bids: [{ nm_id: 2, bid_kopecks: safe, placement: 'search' }] }],
});
```

## Since

3.16.0
