[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetCustomsDeclarationBulkRequest

# Interface: SetCustomsDeclarationBulkRequest

Defined in: [types/in-store-pickup.types.ts:235](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L235)

Request body for [InStorePickupModule.setCustomsDeclarationBulk](../../classes/InStorePickupModule.md#setcustomsdeclarationbulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | [`PickupCustomsDeclarationItem`](PickupCustomsDeclarationItem.md)[] | Orders with customs declarations + origin country codes (max 1000). | [types/in-store-pickup.types.ts:237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L237) |
