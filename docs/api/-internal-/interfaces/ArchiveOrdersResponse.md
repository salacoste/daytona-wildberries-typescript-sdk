[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrdersResponse

# Interface: ArchiveOrdersResponse

Defined in: [types/orders-fbs.types.ts:943](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L943)

Response for GET /api/marketplace/v3/fbs/orders/archive
Maps to swagger schema: v3.ArchiveOrdersResponse

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next` | `number` \| `null` | Pagination cursor for the next page, or null when the archive is exhausted | [types/orders-fbs.types.ts:945](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L945) |
| <a id="orders"></a> `orders` | [`ArchiveOrder`](ArchiveOrder.md)[] | List of archived FBS orders for the current page | [types/orders-fbs.types.ts:947](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L947) |
