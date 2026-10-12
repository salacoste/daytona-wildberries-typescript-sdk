[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsParams

# Interface: ReturnStatsParams

Defined in: [types/returns.types.ts:177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L177)

Parameters for `sdk.returns.getReturnStats()`.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | - | [types/returns.types.ts:178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L178) |
| <a id="dateto"></a> `dateTo` | `string` | - | [types/returns.types.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L179) |
| <a id="groupby"></a> `groupBy` | `"category"` \| `"nmId"` \| `"orderType"` | Field to group by | [types/returns.types.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L181) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Optional pre-filter passed through to getReturns() | [types/returns.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L183) |
| <a id="ordertype"></a> `orderType?` | `"fbo"` \| `"fbs"` | Optional pre-filter passed through to getReturns() | [types/returns.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L185) |
