[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedRequest

# Interface: OrderFeedRequest

Defined in: [types/analytics.types.ts:2172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2172)

Request body for POST /api/analytics/v1/order-feed.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`OrderFeedSelectedPeriod`](OrderFeedSelectedPeriod.md) | Requested period — by date of the current order status (max 31 days back). | [types/analytics.types.ts:2174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2174) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 1000, empty = all seller orders). | [types/analytics.types.ts:2176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2176) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:2178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2178) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:2180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2180) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:2182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2182) |
| <a id="pagination"></a> `pagination?` | [`OrderFeedPagination`](OrderFeedPagination.md) | Pagination within a single `snapshotTime` data snapshot. | [types/analytics.types.ts:2184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2184) |
