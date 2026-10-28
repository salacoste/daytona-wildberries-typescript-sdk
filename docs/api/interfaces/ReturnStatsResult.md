[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsResult

# Interface: ReturnStatsResult

Defined in: [types/returns.types.ts:210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L210)

Aggregated return statistics returned by `sdk.returns.getReturnStats()`.
Surfaces underlying getReturns() telemetry transparently.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="buckets"></a> `buckets` | [`ReturnStatsBucket`](ReturnStatsBucket.md)[] | Aggregated buckets sorted by count descending, key ascending as tiebreaker. | [types/returns.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L212) |
| <a id="totalreturns"></a> `totalReturns` | `number` | Total return count across all buckets. | [types/returns.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L214) |
| <a id="totalamount"></a> `totalAmount` | `number` | Total amount across all buckets. | [types/returns.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L216) |
| <a id="warnings"></a> `warnings` | `string`[] | Surfaces underlying getReturns() telemetry | [types/returns.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L218) |
| <a id="partialfailures"></a> `partialFailures` | [`PartialFailure`](PartialFailure.md)[] | - | [types/returns.types.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L219) |
| <a id="_meta"></a> `_meta` | [`ReturnsMeta`](ReturnsMeta.md) | - | [types/returns.types.ts:220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L220) |
