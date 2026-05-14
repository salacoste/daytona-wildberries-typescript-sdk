[Wildberries API TypeScript SDK](../modules.md) / enrichReturnsWithType

# Function: enrichReturnsWithType()

```ts
function enrichReturnsWithType(fboReturns: GoodsReturnItem[], fbsReturns: FbsReturnInput[]): WbReturn[];
```

Defined in: [utils/enrichReturnsWithType.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/utils/enrichReturnsWithType.ts#L73)

Builds a unified WbReturn[] from FBO returns (sdk.reports.getAnalyticsGoodsReturn)
and optional FBS returns (derived from sdk.ordersFBS status history).

Records missing required fields (nmId, orderId, return date) are silently skipped.

Pure function — no network calls.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fboReturns` | [`GoodsReturnItem`](../-internal-/interfaces/GoodsReturnItem.md)[] | `undefined` | FBO returns from getAnalyticsGoodsReturn().report |
| `fbsReturns` | [`FbsReturnInput`](../interfaces/FbsReturnInput.md)[] | `[]` | Optional FBS return records (consumer-shaped from order status history) |

## Returns

[`WbReturn`](../interfaces/WbReturn.md)[]

Unified array sorted by returnDate descending

## Example

```typescript
const fbo = await sdk.reports.getAnalyticsGoodsReturn({ dateFrom, dateTo });
const unified = enrichReturnsWithType(fbo.report ?? [], myFbsReturns);
console.log(`Total: ${unified.length}, FBO: ${unified.filter(r => r.orderType === 'fbo').length}`);
```

## Since

v3.9.3
