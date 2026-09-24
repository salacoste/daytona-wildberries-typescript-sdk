[Wildberries API TypeScript SDK](../modules.md) / reconcileAcceptanceDelta

# Function: reconcileAcceptanceDelta()

```ts
function reconcileAcceptanceDelta(input: ReconcileAcceptanceDeltaInput): ReconcileAcceptanceDeltaResult;
```

Defined in: [utils/reconcileAcceptanceDelta.ts:89](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L89)

Reconciles declared vs accepted quantity per nmId for FBO acceptance.

Since 2026-09 WB exposes a dedicated server-side API for this:
`sdk.ordersFBW.getSupplyDiscrepancies(supplyId)` (GET
/api/supplies/v1/discrepancies/{supplyId} — supplies accepted within the last
year, includes the acceptance video and per-scan detail). This helper remains
useful for client-side reconciliation from acceptance reports: declared
quantity (from their own supply/order data) vs accepted quantity (from the
acceptance report). This helper is the pure diff — no
network calls, no WB ID-mapping assumptions.

Behaviour:
- `declared` may be a `Record<number, number>` or a `Map<number, number>`.
- `accepted` rows are aggregated by `nmID`, summing `count`.
- Rows without an `nmID` are skipped; missing `count` is treated as 0.
- The result unions every nmId present in either input.
- `delta = declared - accepted` (negative means over-accepted).

Pure function — no side effects, no network calls.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`ReconcileAcceptanceDeltaInput`](../interfaces/ReconcileAcceptanceDeltaInput.md) |

## Returns

[`ReconcileAcceptanceDeltaResult`](../interfaces/ReconcileAcceptanceDeltaResult.md)

## Example

```typescript
// Declared quantities from your own packing list for one supply (incomeId=500).
const declared: Record<number, number> = { 12345: 10, 67890: 5 };

// Accepted rows pulled from the SDK, pre-filtered to this supply's incomeId.
const allAccepted = await sdk.reports.downloadAcceptanceReport({ /* ... */ });
const accepted = allAccepted.filter((row) => row.incomeId === 500);

const result = reconcileAcceptanceDelta({ declared, accepted });
for (const item of result.items) {
  if (item.hasDiscrepancy) {
    console.warn(`nmId=${item.nmId} short by ${item.delta}`);
  }
}
console.log(`Total discrepancy: ${result.totalDelta} (across ${result.discrepancyCount} items)`);
```

## Since

v4.1.0
