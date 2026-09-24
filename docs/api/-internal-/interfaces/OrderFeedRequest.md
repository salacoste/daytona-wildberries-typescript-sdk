[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedRequest

# Interface: OrderFeedRequest

Defined in: [types/analytics.types.ts:2155](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2155)

Request body for POST /api/analytics/v1/order-feed.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`OrderFeedSelectedPeriod`](OrderFeedSelectedPeriod.md) | Requested period — by date of the current order status (max 31 days back). | [types/analytics.types.ts:2157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2157) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 1000, empty = all seller orders). | [types/analytics.types.ts:2159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2159) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:2161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2161) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:2163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2163) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:2165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2165) |
| <a id="pagination"></a> `pagination?` | [`OrderFeedPagination`](OrderFeedPagination.md) | Pagination within a single `snapshotTime` data snapshot. | [types/analytics.types.ts:2167](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2167) |
