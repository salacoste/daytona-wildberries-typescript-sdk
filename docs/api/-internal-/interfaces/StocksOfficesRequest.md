[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksOfficesRequest

# Interface: StocksOfficesRequest

Defined in: [types/analytics.types.ts:868](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L868)

Request for stocks by offices/warehouses

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | \{ `start`: `string`; `end`: `string`; \} | Period for stock history | [types/analytics.types.ts:870](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L870) |
| `period.start` | `string` | - | [types/analytics.types.ts:871](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L871) |
| `period.end` | `string` | - | [types/analytics.types.ts:872](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L872) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Filter by product IDs | [types/analytics.types.ts:875](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L875) |
| <a id="subjectid"></a> `subjectId?` | `number` | Filter by subject ID | [types/analytics.types.ts:877](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L877) |
| <a id="brandname"></a> `brandName?` | `string` | Filter by brand name | [types/analytics.types.ts:879](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L879) |
| <a id="tagid"></a> `tagId?` | `number` | Filter by tag ID | [types/analytics.types.ts:881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L881) |
