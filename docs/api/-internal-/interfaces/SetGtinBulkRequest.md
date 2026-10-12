[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetGtinBulkRequest

# Interface: SetGtinBulkRequest

Defined in: [types/in-store-pickup.types.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/in-store-pickup.types.ts#L385)

Request body for [InStorePickupModule.setGtinBulk](../../classes/InStorePickupModule.md#setgtinbulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `gtin`: `string`; \}[] | Orders with GTIN values (max 1000). | [types/in-store-pickup.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/in-store-pickup.types.ts#L387) |
