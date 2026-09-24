[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedPagination

# Interface: OrderFeedPagination

Defined in: [types/analytics.types.ts:2137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2137)

Pagination within a single Order Feed data snapshot.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="snapshottime"></a> `snapshotTime?` | `string` | Data snapshot timestamp within which pagination is performed (cursor). The report data is updated asynchronously — to avoid skipping or duplicating orders, requests for the same data selection must share the same `snapshotTime`. Omit on the first request (`offset: 0`); for every subsequent request (`offset` > 0) pass the `snapshotTime` value from the first response. When changing the period or filters, start again with `offset: 0` and without `snapshotTime`. | [types/analytics.types.ts:2147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2147) |
| <a id="offset"></a> `offset?` | `number` | How many results to skip (e.g. `10` starts the response at the 11th element). Default 0. | [types/analytics.types.ts:2149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2149) |
| <a id="limit"></a> `limit?` | `number` | Number of orders in the response (max 10000, default 50). | [types/analytics.types.ts:2151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2151) |
