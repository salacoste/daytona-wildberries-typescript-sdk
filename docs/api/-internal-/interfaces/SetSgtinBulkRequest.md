[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetSgtinBulkRequest

# Interface: SetSgtinBulkRequest

Defined in: [types/in-store-pickup.types.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L367)

Request body for [InStorePickupModule.setSgtinBulk](../../classes/InStorePickupModule.md#setsgtinbulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `sgtins`: `string`[]; \}[] | Orders with SGTIN (Data Matrix) codes (max 1000). | [types/in-store-pickup.types.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L369) |
