[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksProductsSizesRequest

# Interface: StocksProductsSizesRequest

Defined in: [types/analytics.types.ts:1271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1271)

Request for stocks products sizes (POST /api/v2/stocks-report/products/sizes)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | \{ `start`: `string`; `end`: `string`; \} | Period for stock history | [types/analytics.types.ts:1273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1273) |
| `period.start` | `string` | - | [types/analytics.types.ts:1274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1274) |
| `period.end` | `string` | - | [types/analytics.types.ts:1275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1275) |
| <a id="nmid"></a> `nmID` | `number` | Product article number | [types/analytics.types.ts:1278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1278) |
| <a id="includeoffice"></a> `includeOffice?` | `boolean` | Include office/warehouse details | [types/analytics.types.ts:1280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1280) |
