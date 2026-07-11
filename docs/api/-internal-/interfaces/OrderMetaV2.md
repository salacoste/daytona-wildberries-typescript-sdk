[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderMetaV2

# Interface: OrderMetaV2

Defined in: [types/in-store-pickup.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L325)

Single order's label identifiers (meta/details response item).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `string` | Error message (`""` = no errors, `NotFound` = order not found). | [types/in-store-pickup.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L327) |
| <a id="gtin"></a> `gtin?` | `string` \| `null` | GTIN. | [types/in-store-pickup.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L329) |
| <a id="imei"></a> `imei?` | `string` \| `null` | IMEI. | [types/in-store-pickup.types.ts:331](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L331) |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID. | [types/in-store-pickup.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L333) |
| <a id="sgtin"></a> `sgtin?` | `string`[] \| `null` | Chestny ZNAK labeling codes. | [types/in-store-pickup.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L335) |
| <a id="uin"></a> `uin?` | `string` \| `null` | UIN. | [types/in-store-pickup.types.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L337) |
| <a id="customsdeclaration"></a> `customsDeclaration?` | `string` \| `null` | Customs declaration number. | [types/in-store-pickup.types.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L339) |
