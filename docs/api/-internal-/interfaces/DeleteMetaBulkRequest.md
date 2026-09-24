[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DeleteMetaBulkRequest

# Interface: DeleteMetaBulkRequest

Defined in: [types/in-store-pickup.types.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L351)

Request body for [InStorePickupModule.deleteMetaBulk](../../classes/InStorePickupModule.md#deletemetabulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key"></a> `key` | [`PickupMetadataKey`](../type-aliases/PickupMetadataKey.md) | Label identifier type to delete (only one per request). | [types/in-store-pickup.types.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L353) |
| <a id="ordersids"></a> `ordersIds` | `number`[] | Assembly order IDs (max 1000). | [types/in-store-pickup.types.ts:355](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L355) |
