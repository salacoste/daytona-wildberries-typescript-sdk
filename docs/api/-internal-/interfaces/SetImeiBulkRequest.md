[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetImeiBulkRequest

# Interface: SetImeiBulkRequest

Defined in: [types/in-store-pickup.types.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L379)

Request body for [InStorePickupModule.setImeiBulk](../../classes/InStorePickupModule.md#setimeibulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `imei`: `string`; \}[] | Orders with IMEI values (max 1000). | [types/in-store-pickup.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L381) |
