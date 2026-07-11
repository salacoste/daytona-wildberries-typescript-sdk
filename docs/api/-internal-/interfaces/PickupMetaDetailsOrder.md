[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PickupMetaDetailsOrder

# Interface: PickupMetaDetailsOrder

Defined in: [types/in-store-pickup.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L212)

Per-order result in the meta/details response.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | [types/in-store-pickup.types.ts:213](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L213) |
| <a id="iserror"></a> `isError` | `boolean` | [types/in-store-pickup.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L214) |
| <a id="errors"></a> `errors?` | \{ `code`: `number`; `detail`: `string`; \}[] | [types/in-store-pickup.types.ts:215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L215) |
| <a id="metadetails"></a> `metaDetails` | [`PickupMetaDetail`](PickupMetaDetail.md)[] | [types/in-store-pickup.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L216) |
