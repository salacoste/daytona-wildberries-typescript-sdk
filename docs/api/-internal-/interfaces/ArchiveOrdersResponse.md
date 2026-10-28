[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrdersResponse

# Interface: ArchiveOrdersResponse

Defined in: [types/orders-fbs.types.ts:1015](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1015)

Response for GET /api/marketplace/v3/fbs/orders/archive
Maps to swagger schema: v3.ArchiveOrdersResponse

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next` | `number` \| `null` | Pagination cursor for the next page, or null when the archive is exhausted | [types/orders-fbs.types.ts:1017](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1017) |
| <a id="orders"></a> `orders` | [`ArchiveOrder`](ArchiveOrder.md)[] | List of archived FBS orders for the current page | [types/orders-fbs.types.ts:1019](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1019) |
