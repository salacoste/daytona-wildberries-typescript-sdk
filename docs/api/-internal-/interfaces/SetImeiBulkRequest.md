[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetImeiBulkRequest

# Interface: SetImeiBulkRequest

Defined in: [types/in-store-pickup.types.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/in-store-pickup.types.ts#L379)

Request body for [InStorePickupModule.setImeiBulk](../../classes/InStorePickupModule.md#setimeibulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `imei`: `string`; \}[] | Orders with IMEI values (max 1000). | [types/in-store-pickup.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/in-store-pickup.types.ts#L381) |
