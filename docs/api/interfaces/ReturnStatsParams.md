[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsParams

# Interface: ReturnStatsParams

Defined in: types/returns.types.ts:175

Parameters for `sdk.returns.getReturnStats()`.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | - | types/returns.types.ts:176 |
| <a id="dateto"></a> `dateTo` | `string` | - | types/returns.types.ts:177 |
| <a id="groupby"></a> `groupBy` | `"category"` \| `"nmId"` \| `"orderType"` | Field to group by | types/returns.types.ts:179 |
| <a id="nmids"></a> `nmIds?` | `number`[] | Optional pre-filter passed through to getReturns() | types/returns.types.ts:181 |
| <a id="ordertype"></a> `orderType?` | `"fbo"` \| `"fbs"` | Optional pre-filter passed through to getReturns() | types/returns.types.ts:183 |
