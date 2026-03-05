[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetGtinBulkRequest

# Interface: SetGtinBulkRequest

Defined in: [types/orders-dbs.types.ts:500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/orders-dbs.types.ts#L500)

Request body for setGtinBulk

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `gtin`: `string`; \}[] | Array of orders with GTIN codes to set | [types/orders-dbs.types.ts:502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/orders-dbs.types.ts#L502) |
