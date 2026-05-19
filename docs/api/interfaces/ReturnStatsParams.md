[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsParams

# Interface: ReturnStatsParams

Defined in: [types/returns.types.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L175)

Parameters for `sdk.returns.getReturnStats()`.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | - | [types/returns.types.ts:176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L176) |
| <a id="dateto"></a> `dateTo` | `string` | - | [types/returns.types.ts:177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L177) |
| <a id="groupby"></a> `groupBy` | `"category"` \| `"nmId"` \| `"orderType"` | Field to group by | [types/returns.types.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L179) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Optional pre-filter passed through to getReturns() | [types/returns.types.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L181) |
| <a id="ordertype"></a> `orderType?` | `"fbo"` \| `"fbs"` | Optional pre-filter passed through to getReturns() | [types/returns.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L183) |
