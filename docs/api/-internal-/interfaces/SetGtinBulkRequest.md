[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetGtinBulkRequest

# Interface: SetGtinBulkRequest

Defined in: [types/orders-dbs.types.ts:500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/orders-dbs.types.ts#L500)

Request body for setGtinBulk

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `gtin`: `string`; \}[] | Array of orders with GTIN codes to set | [types/orders-dbs.types.ts:502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/orders-dbs.types.ts#L502) |
