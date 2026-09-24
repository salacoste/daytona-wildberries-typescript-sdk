[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedResponse

# Interface: OrderFeedResponse

Defined in: [types/analytics.types.ts:2225](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2225)

Response payload (the `data` object) for POST /api/analytics/v1/order-feed.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="snapshottime"></a> `snapshotTime` | `string` | Cursor — date and time of the last update of the data. | [types/analytics.types.ts:2227](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2227) |
| <a id="currency"></a> `currency` | `string` | Report currency (e.g. `"RUB"`). | [types/analytics.types.ts:2229](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2229) |
| <a id="orders"></a> `orders` | [`OrderFeedOrder`](OrderFeedOrder.md)[] | Orders matching the request filters. | [types/analytics.types.ts:2231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2231) |
