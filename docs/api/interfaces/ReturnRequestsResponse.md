[Wildberries API TypeScript SDK](../modules.md) / ReturnRequestsResponse

# Interface: ReturnRequestsResponse

Defined in: [types/communications.types.ts:2283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2283)

Response from getReturnRequests()

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`ReturnRequest`](ReturnRequest.md)[] | Array of return requests | [types/communications.types.ts:2287](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2287) |
| <a id="total"></a> `total` | `number` | Total number of returns matching filters | [types/communications.types.ts:2292](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2292) |
| <a id="offset"></a> `offset` | `number` | Current page offset | [types/communications.types.ts:2297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2297) |
| <a id="limit"></a> `limit` | `number` | Limit applied to this request | [types/communications.types.ts:2302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2302) |
| <a id="hasmore"></a> `hasMore` | `boolean` | Whether more results are available | [types/communications.types.ts:2307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2307) |
| <a id="metadata"></a> `metadata?` | \{ `processingTime?`: `number`; `filters?`: [`ReturnRequestFilters`](ReturnRequestFilters.md); `statusCounts?`: `Record`\<[`ReturnStatus`](../type-aliases/ReturnStatus.md), `number`\>; \} | Response metadata | [types/communications.types.ts:2312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2312) |
| `metadata.processingTime?` | `number` | Processing time in milliseconds | [types/communications.types.ts:2316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2316) |
| `metadata.filters?` | [`ReturnRequestFilters`](ReturnRequestFilters.md) | Filters applied (echoed back) | [types/communications.types.ts:2321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2321) |
| `metadata.statusCounts?` | `Record`\<[`ReturnStatus`](../type-aliases/ReturnStatus.md), `number`\> | Available status counts | [types/communications.types.ts:2326](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2326) |
