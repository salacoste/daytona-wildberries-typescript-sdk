[Wildberries API TypeScript SDK](../modules.md) / enrichReturnsWithType

# Function: enrichReturnsWithType()

```ts
function enrichReturnsWithType(fboReturns: FboReturnInput[], fbsReturns: FbsReturnInput[]): WbReturn[];
```

Defined in: [utils/enrichReturnsWithType.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L100)

Builds a unified WbReturn[] from FBO returns and optional FBS returns
(derived from sdk.ordersFBS status history).

Records missing required fields (nmId, orderId, return date) are silently skipped.

Pure function — no network calls.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fboReturns` | [`FboReturnInput`](../-internal-/interfaces/FboReturnInput.md)[] | `undefined` | FBO returns — pass `getAnalyticsV1GoodsReturn().report` items mapped to `FboReturnInput` (the v1 field for the reason is `returnReason`) |
| `fbsReturns` | [`FbsReturnInput`](../interfaces/FbsReturnInput.md)[] | `[]` | Optional FBS return records (consumer-shaped from order status history) |

## Returns

[`WbReturn`](../interfaces/WbReturn.md)[]

Unified array sorted by returnDate descending

## Example

```typescript
const page = await sdk.reports.getAnalyticsV1GoodsReturn({
  dateFrom, dateTo, status: 'active', limit: 1000, offset: 0,
});
const fbo = page.report.map(r => ({ ...r, reason: r.returnReason }));
const unified = enrichReturnsWithType(fbo, myFbsReturns);
console.log(`Total: ${unified.length}, FBO: ${unified.filter(r => r.orderType === 'fbo').length}`);
```

## Since

v3.9.3
