[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksProductsRequest

# Interface: StocksProductsRequest

Defined in: [types/analytics.types.ts:809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L809)

Request for stocks by products

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | \{ `start`: `string`; `end`: `string`; \} | Period for stock history | [types/analytics.types.ts:811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L811) |
| `period.start` | `string` | - | [types/analytics.types.ts:812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L812) |
| `period.end` | `string` | - | [types/analytics.types.ts:813](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L813) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Filter by product IDs | [types/analytics.types.ts:816](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L816) |
| <a id="subjectid"></a> `subjectId?` | `number` | Filter by subject ID | [types/analytics.types.ts:818](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L818) |
| <a id="brandname"></a> `brandName?` | `string` | Filter by brand name | [types/analytics.types.ts:820](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L820) |
| <a id="tagid"></a> `tagId?` | `number` | Filter by tag ID | [types/analytics.types.ts:822](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L822) |
| <a id="page"></a> `page?` | `number` | Pagination page | [types/analytics.types.ts:824](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L824) |
| <a id="limit"></a> `limit?` | `number` | Page size | [types/analytics.types.ts:826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L826) |
