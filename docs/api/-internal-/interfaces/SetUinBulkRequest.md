[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetUinBulkRequest

# Interface: SetUinBulkRequest

Defined in: [types/in-store-pickup.types.ts:373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/in-store-pickup.types.ts#L373)

Request body for [InStorePickupModule.setUinBulk](../../classes/InStorePickupModule.md#setuinbulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `uin`: `string`; \}[] | Orders with UIN values (max 1000). | [types/in-store-pickup.types.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/in-store-pickup.types.ts#L375) |
