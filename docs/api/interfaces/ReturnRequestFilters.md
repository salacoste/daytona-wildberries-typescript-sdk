[Wildberries API TypeScript SDK](../modules.md) / ReturnRequestFilters

# Interface: ReturnRequestFilters

Defined in: [types/communications.types.ts:2228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2228)

Return request filters for getReturnRequests()

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status?` | [`ReturnStatus`](../type-aliases/ReturnStatus.md)[] | Filter by return status | [types/communications.types.ts:2232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2232) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Filter by date from (YYYY-MM-DD format) | [types/communications.types.ts:2237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2237) |
| <a id="dateto"></a> `dateTo?` | `string` | Filter by date to (YYYY-MM-DD format) | [types/communications.types.ts:2242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2242) |
| <a id="orderid"></a> `orderId?` | `string` | Filter by specific order ID | [types/communications.types.ts:2247](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2247) |
| <a id="nmid"></a> `nmId?` | `number` | Filter by product ID (nmId) | [types/communications.types.ts:2252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2252) |
| <a id="supplierarticle"></a> `supplierArticle?` | `string` | Filter by supplier article number | [types/communications.types.ts:2257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2257) |
| <a id="sortby"></a> `sortBy?` | `"createdAt"` \| `"updatedAt"` \| `"orderId"` \| `"amount"` \| `"status"` | Sort results by field | [types/communications.types.ts:2262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2262) |
| <a id="sortorder"></a> `sortOrder?` | `"asc"` \| `"desc"` | Sort order direction | [types/communications.types.ts:2267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2267) |
| <a id="limit"></a> `limit?` | `number` | Limit number of results (1-1000) | [types/communications.types.ts:2272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2272) |
| <a id="offset"></a> `offset?` | `number` | Offset for pagination | [types/communications.types.ts:2277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2277) |
