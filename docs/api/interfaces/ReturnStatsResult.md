[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsResult

# Interface: ReturnStatsResult

Defined in: [types/returns.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L208)

Aggregated return statistics returned by `sdk.returns.getReturnStats()`.
Surfaces underlying getReturns() telemetry transparently.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="buckets"></a> `buckets` | [`ReturnStatsBucket`](ReturnStatsBucket.md)[] | Aggregated buckets sorted by count descending, key ascending as tiebreaker. | [types/returns.types.ts:210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L210) |
| <a id="totalreturns"></a> `totalReturns` | `number` | Total return count across all buckets. | [types/returns.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L212) |
| <a id="totalamount"></a> `totalAmount` | `number` | Total amount across all buckets. | [types/returns.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L214) |
| <a id="warnings"></a> `warnings` | `string`[] | Surfaces underlying getReturns() telemetry | [types/returns.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L216) |
| <a id="partialfailures"></a> `partialFailures` | [`PartialFailure`](PartialFailure.md)[] | - | [types/returns.types.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L217) |
| <a id="_meta"></a> `_meta` | [`ReturnsMeta`](ReturnsMeta.md) | - | [types/returns.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/returns.types.ts#L218) |
