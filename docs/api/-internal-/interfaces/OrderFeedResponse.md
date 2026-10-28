[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedResponse

# Interface: OrderFeedResponse

Defined in: [types/analytics.types.ts:2242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2242)

Response payload (the `data` object) for POST /api/analytics/v1/order-feed.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="snapshottime"></a> `snapshotTime` | `string` | Cursor — date and time of the last update of the data. | [types/analytics.types.ts:2244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2244) |
| <a id="currency"></a> `currency` | `string` | Report currency (e.g. `"RUB"`). | [types/analytics.types.ts:2246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2246) |
| <a id="orders"></a> `orders` | [`OrderFeedOrder`](OrderFeedOrder.md)[] | Orders matching the request filters. | [types/analytics.types.ts:2248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2248) |
