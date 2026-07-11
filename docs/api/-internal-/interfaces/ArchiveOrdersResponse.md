[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrdersResponse

# Interface: ArchiveOrdersResponse

Defined in: [types/orders-fbs.types.ts:941](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L941)

Response for GET /api/marketplace/v3/fbs/orders/archive
Maps to swagger schema: v3.ArchiveOrdersResponse

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next` | `number` \| `null` | Pagination cursor for the next page, or null when the archive is exhausted | [types/orders-fbs.types.ts:943](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L943) |
| <a id="orders"></a> `orders` | [`ArchiveOrder`](ArchiveOrder.md)[] | List of archived FBS orders for the current page | [types/orders-fbs.types.ts:945](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L945) |
