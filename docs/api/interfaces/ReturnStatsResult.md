[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsResult

# Interface: ReturnStatsResult

Defined in: types/returns.types.ts:208

Aggregated return statistics returned by `sdk.returns.getReturnStats()`.
Surfaces underlying getReturns() telemetry transparently.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="buckets"></a> `buckets` | [`ReturnStatsBucket`](ReturnStatsBucket.md)[] | Aggregated buckets sorted by count descending, key ascending as tiebreaker. | types/returns.types.ts:210 |
| <a id="totalreturns"></a> `totalReturns` | `number` | Total return count across all buckets. | types/returns.types.ts:212 |
| <a id="totalamount"></a> `totalAmount` | `number` | Total amount across all buckets. | types/returns.types.ts:214 |
| <a id="warnings"></a> `warnings` | `string`[] | Surfaces underlying getReturns() telemetry | types/returns.types.ts:216 |
| <a id="partialfailures"></a> `partialFailures` | [`PartialFailure`](PartialFailure.md)[] | - | types/returns.types.ts:217 |
| <a id="_meta"></a> `_meta` | [`ReturnsMeta`](ReturnsMeta.md) | - | types/returns.types.ts:218 |
