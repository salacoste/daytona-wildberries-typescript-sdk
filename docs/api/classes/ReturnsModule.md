[Wildberries API TypeScript SDK](../modules.md) / ReturnsModule

# Class: ReturnsModule

Defined in: [modules/returns/index.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/modules/returns/index.ts#L199)

Returns aggregator module — combines FBO, FBS, and Finance sources into a
unified `ReturnItem[]` with full partial-failure tolerance.

## Example

```typescript
const result = await sdk.returns.getReturns({
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
});
console.log(result.data);          // ReturnItem[]
console.log(result.partialFailures); // [] or [{ source: 'finance', error: '...' }]
```

## Since

v3.10.0

## Constructors

### Constructor

```ts
new ReturnsModule(
   _client: BaseClient, 
   reports: ReportsModule, 
   _ordersFBS: OrdersFbsModule, 
   finances: FinancesModule): ReturnsModule;
```

Defined in: [modules/returns/index.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/modules/returns/index.ts#L209)

Constructor parameters `_client` and `_ordersFBS` are reserved for
v3.10.1 FBS status history implementation. The `_` prefix satisfies
TypeScript `noUnusedParameters` while preserving the full DI contract
documented in story 13.2.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_client` | [`BaseClient`](BaseClient.md) |
| `reports` | [`ReportsModule`](ReportsModule.md) |
| `_ordersFBS` | [`OrdersFbsModule`](OrdersFbsModule.md) |
| `finances` | [`FinancesModule`](FinancesModule.md) |

#### Returns

`ReturnsModule`

## Methods

### getReturns()

```ts
getReturns(params: ReturnsApiRequest): Promise<ReturnsApiResponse>;
```

Defined in: [modules/returns/index.ts:288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/modules/returns/index.ts#L288)

Unified return analytics aggregator.

Fetches FBO returns from `sdk.reports.getAnalyticsGoodsReturn()`,
optionally FBS returns (reserved — currently skipped), and enriches all
records with financial amounts from `sdk.finances.getSalesReportsDetailed()`.

Parallel execution via `Promise.allSettled` — one source failing does NOT
abort the response; failures are surfaced in `partialFailures`.

**Rate limit note**: FBO source is 1 req/min; Finance source is 1 req/min.
Both are fetched in parallel to minimise wall-clock time.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`ReturnsApiRequest`](../interfaces/ReturnsApiRequest.md) | Date range, optional filters, and pagination |

#### Returns

`Promise`\<[`ReturnsApiResponse`](../interfaces/ReturnsApiResponse.md)\>

Unified `ReturnsApiResponse` with data, warnings, partialFailures, _meta

#### Throws

If `dateFrom > dateTo`, range exceeds 31 days, or date strings are invalid

#### Example

```typescript
const result = await sdk.returns.getReturns({
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
  orderType: 'fbo',
});
result.data.forEach(r => console.log(r.returnReasonCode, r.returnAmount));
```

#### Since

v3.10.0

***

### getReturnByOrderId()

```ts
getReturnByOrderId(orderId: string, params: ReturnByOrderIdParams): Promise<ReturnItem | null>;
```

Defined in: [modules/returns/index.ts:428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/modules/returns/index.ts#L428)

Convenience: fetch a single return record by WB orderId.

Wraps `getReturns()` and filters in-memory. Date range still required because
WB API requires it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `string` | WB order ID (string for BigInt safety) |
| `params` | [`ReturnByOrderIdParams`](../interfaces/ReturnByOrderIdParams.md) | Date window |

#### Returns

`Promise`\<[`ReturnItem`](../interfaces/ReturnItem.md) \| `null`\>

The matching ReturnItem, or `null` if not found

#### Throws

When orderId is empty

#### Example

```typescript
const ret = await sdk.returns.getReturnByOrderId('123456789', {
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
});
if (ret) console.log(ret.returnReason, ret.returnAmount);
```

**Important**: When the underlying `getReturns()` partial-failed (e.g., FBO
source down), this method may return `null` even though the order exists.
If you need failure visibility, call `getReturns()` directly and inspect
the `partialFailures` field.

#### Since

v3.10.0

***

### getReturnStats()

```ts
getReturnStats(params: ReturnStatsParams): Promise<ReturnStatsResult>;
```

Defined in: [modules/returns/index.ts:478](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/modules/returns/index.ts#L478)

Convenience: aggregate return statistics grouped by nmId / category / orderType.

Calls `getReturns()` once with the same filters, then post-processes in-memory.
Buckets sorted by `count` descending (key ascending as tiebreaker).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ReturnStatsParams`](../interfaces/ReturnStatsParams.md) |

#### Returns

`Promise`\<[`ReturnStatsResult`](../interfaces/ReturnStatsResult.md)\>

#### Examples

```typescript
// Top SKUs by return count
const stats = await sdk.returns.getReturnStats({
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
  groupBy: 'nmId',
});
stats.buckets.slice(0, 10).forEach(b => {
  console.log(`nmId=${b.key}: ${b.count} returns, ${b.totalAmount} ₽ ` +
    `(${b.pendingFinanceCount} pending finance)`);
});
```

**Important**: When `partialFailures` is non-empty, the bucket counts may be
understated — one or more underlying sources failed. Always check
`result.partialFailures.length === 0` before trusting zero/low counts.

```typescript
const stats = await sdk.returns.getReturnStats({ ... });
if (stats.partialFailures.length > 0) {
  console.warn('Some sources failed:', stats.partialFailures);
  // Treat zero counts as "unknown", not "no returns"
}
```

#### Since

v3.10.0
