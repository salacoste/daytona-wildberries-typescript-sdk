[Wildberries API TypeScript SDK](../modules.md) / extractBidRange

# Function: extractBidRange()

```ts
function extractBidRange(recommendations: BidsRecommendationsResponse): BidRange | null;
```

Defined in: [utils/bid-validation.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/bid-validation.ts#L43)

Compute the effective bid range for an article from a recommendations response.

Aggregates across all returned search clusters (`normQueries`):
`min = min(reachMin.bidKopecks)`, `max = max(reachMax.bidKopecks)`.

Pure and network-free. Returns `null` when the response carries no cluster data
(e.g. a paused campaign) — treat `null` as "unknown range" and skip pre-validation
rather than fabricating bounds.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `recommendations` | [`BidsRecommendationsResponse`](../-internal-/interfaces/BidsRecommendationsResponse.md) | A `getBidsRecommendations` response (one advertId + nmId) |

## Returns

[`BidRange`](../interfaces/BidRange.md) \| `null`

The `{ min, max }` envelope in kopecks, or `null` if no cluster data

## Example

```typescript
const reco = await sdk.promotion.getBidsRecommendations({ advertId: 1, nmId: 2 });
const range = extractBidRange(reco);
if (range) console.log(`valid range: ${range.min}–${range.max} kopecks`);
```

## Since

3.16.0
