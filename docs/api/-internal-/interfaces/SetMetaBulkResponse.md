[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetMetaBulkResponse

# Interface: SetMetaBulkResponse

Defined in: [types/orders-dbs.types.ts:540](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/orders-dbs.types.ts#L540)

Response from bulk metadata set operations (setSgtinBulk, setUinBulk, etc.)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | [`BulkMetaResultItem`](BulkMetaResultItem.md)[] | Results for each order | [types/orders-dbs.types.ts:542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/orders-dbs.types.ts#L542) |
| <a id="errors"></a> `errors?` | [`BulkMetaError`](BulkMetaError.md)[] | Additional errors if any | [types/orders-dbs.types.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/orders-dbs.types.ts#L544) |
