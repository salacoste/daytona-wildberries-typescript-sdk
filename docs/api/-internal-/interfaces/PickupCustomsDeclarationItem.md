[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PickupCustomsDeclarationItem

# Interface: PickupCustomsDeclarationItem

Defined in: [types/in-store-pickup.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L226)

Per-order item in a setCustomsDeclarationBulk request.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | - | [types/in-store-pickup.types.ts:227](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L227) |
| <a id="customsdeclaration"></a> `customsDeclaration` | `string` | Customs declaration number (17–29 chars). | [types/in-store-pickup.types.ts:229](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L229) |
| <a id="origincountrycode"></a> `originCountryCode` | `string` | Numeric country-of-origin code (ОКСМ, https://esnsi.gosuslugi.ru/classifiers/16269). REQUIRED for B2B since 2026-07-08. | [types/in-store-pickup.types.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L231) |
