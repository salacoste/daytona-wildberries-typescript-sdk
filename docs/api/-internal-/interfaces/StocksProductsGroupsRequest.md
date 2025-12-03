[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksProductsGroupsRequest

# Interface: StocksProductsGroupsRequest

Defined in: [types/analytics.types.ts:1197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1197)

Request for stocks products groups (POST /api/v2/stocks-report/products/groups)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | \{ `start`: `string`; `end`: `string`; \} | Period for stock history | [types/analytics.types.ts:1199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1199) |
| `period.start` | `string` | - | [types/analytics.types.ts:1200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1200) |
| `period.end` | `string` | - | [types/analytics.types.ts:1201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1201) |
| <a id="nmids"></a> `nmIDs?` | `number`[] | Filter by product IDs | [types/analytics.types.ts:1204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1204) |
| <a id="subjectid"></a> `subjectID?` | `number` | Filter by subject ID | [types/analytics.types.ts:1206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1206) |
| <a id="brandname"></a> `brandName?` | `string` | Filter by brand name | [types/analytics.types.ts:1208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1208) |
| <a id="tagid"></a> `tagID?` | `number` | Filter by tag ID | [types/analytics.types.ts:1210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1210) |
| <a id="stocktype"></a> `stockType?` | `"all"` \| `"wb"` \| `"mp"` | Stock type: 'wb' (Wildberries), 'mp' (Marketplace/FBS), or 'all' | [types/analytics.types.ts:1212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1212) |
| <a id="availabilityfilters"></a> `availabilityFilters?` | (`"deficient"` \| `"balanced"` \| `"surplus"` \| `"absent"`)[] | Availability filters | [types/analytics.types.ts:1214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1214) |
| <a id="orderby"></a> `orderBy?` | \{ `field`: `"avgOrders"` \| `"stockCount"` \| `"lostOrdersCount"`; `mode`: `"asc"` \| `"desc"`; \} | Order by configuration | [types/analytics.types.ts:1216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1216) |
| `orderBy.field` | `"avgOrders"` \| `"stockCount"` \| `"lostOrdersCount"` | - | [types/analytics.types.ts:1217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1217) |
| `orderBy.mode` | `"asc"` \| `"desc"` | - | [types/analytics.types.ts:1218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1218) |
| <a id="limit"></a> `limit?` | `number` | Page size (limit) | [types/analytics.types.ts:1221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1221) |
| <a id="offset"></a> `offset?` | `number` | Page offset | [types/analytics.types.ts:1223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1223) |
