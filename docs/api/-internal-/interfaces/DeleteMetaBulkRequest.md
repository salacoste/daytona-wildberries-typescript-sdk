[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DeleteMetaBulkRequest

# Interface: DeleteMetaBulkRequest

Defined in: [types/in-store-pickup.types.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L351)

Request body for [InStorePickupModule.deleteMetaBulk](../../classes/InStorePickupModule.md#deletemetabulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key"></a> `key` | [`PickupMetadataKey`](../type-aliases/PickupMetadataKey.md) | Label identifier type to delete (only one per request). | [types/in-store-pickup.types.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L353) |
| <a id="ordersids"></a> `ordersIds` | `number`[] | Assembly order IDs (max 1000). | [types/in-store-pickup.types.ts:355](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L355) |
