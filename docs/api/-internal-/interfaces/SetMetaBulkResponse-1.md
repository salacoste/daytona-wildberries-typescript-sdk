[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetMetaBulkResponse

# Interface: SetMetaBulkResponse

Defined in: [types/orders-dbs.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L550)

Response from bulk metadata set operations (setSgtinBulk, setUinBulk, etc.)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | [`BulkMetaResultItem`](BulkMetaResultItem.md)[] | Results for each order | [types/orders-dbs.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L552) |
| <a id="errors"></a> `errors?` | [`BulkMetaError`](BulkMetaError.md)[] | Additional errors if any | [types/orders-dbs.types.ts:554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L554) |
