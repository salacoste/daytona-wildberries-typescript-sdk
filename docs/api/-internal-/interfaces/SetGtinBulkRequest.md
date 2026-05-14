[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetGtinBulkRequest

# Interface: SetGtinBulkRequest

Defined in: [types/orders-dbs.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/orders-dbs.types.ts#L522)

Request body for setGtinBulk

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `gtin`: `string`; \}[] | Array of orders with GTIN codes to set | [types/orders-dbs.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/orders-dbs.types.ts#L524) |
