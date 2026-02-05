[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetMetaBulkResponse

# Interface: SetMetaBulkResponse

Defined in: [types/orders-dbs.types.ts:566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/orders-dbs.types.ts#L566)

Response from bulk metadata set operations (setSgtinBulk, setUinBulk, etc.)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | [`BulkMetaResultItem`](BulkMetaResultItem.md)[] | Results for each order | [types/orders-dbs.types.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/orders-dbs.types.ts#L568) |
| <a id="errors"></a> `errors?` | [`BulkMetaError`](BulkMetaError.md)[] | Additional errors if any | [types/orders-dbs.types.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/orders-dbs.types.ts#L570) |
