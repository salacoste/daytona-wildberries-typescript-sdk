[Wildberries API TypeScript SDK](../modules.md) / reconcileBuyoutsAndReturns

# Function: reconcileBuyoutsAndReturns()

```ts
function reconcileBuyoutsAndReturns(
   buyouts: BuyoutInput[], 
   returns: WbReturn[], 
   options: ReconcileOptions): ReconciliationResult[];
```

Defined in: [utils/reconcileBuyoutsAndReturns.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/reconcileBuyoutsAndReturns.ts#L94)

Reconciles buyouts and returns per nmId for unified analytics.

Combines:
- Buyout data from sdk.analytics.getStocksReportProducts() (consumer-shaped)
- Unified returns from enrichReturnsWithType() (FBO + FBS)

Detects anomalies:
- return_without_buyout: more returns than buyouts for an nmId
- orphan_buyout: nmId has buyouts but no record at all in returns array (informational)
- return_quantity_mismatch: future-reserved

Pure function — no network calls.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `buyouts` | [`BuyoutInput`](../interfaces/BuyoutInput.md)[] |
| `returns` | [`WbReturn`](../interfaces/WbReturn.md)[] |
| `options` | [`ReconcileOptions`](../interfaces/ReconcileOptions.md) |

## Returns

[`ReconciliationResult`](../interfaces/ReconciliationResult.md)[]

## Example

```typescript
const buyouts: BuyoutInput[] = [{ nmId: 12345, buyoutCount: 10, buyoutRevenue: 50000 }];
const returns = enrichReturnsWithType(fboData, fbsData);
const summary = reconcileBuyoutsAndReturns(buyouts, returns);

for (const r of summary) {
  if (r.anomalies.length > 0) console.warn(`nmId=${r.nmId}:`, r.anomalies);
}
```

## Since

v3.9.3
