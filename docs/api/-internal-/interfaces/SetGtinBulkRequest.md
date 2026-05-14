[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetGtinBulkRequest

# Interface: SetGtinBulkRequest

Defined in: [types/orders-dbs.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L522)

Request body for setGtinBulk

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `gtin`: `string`; \}[] | Array of orders with GTIN codes to set | [types/orders-dbs.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L524) |
