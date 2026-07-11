[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PickupMetaDetail

# Interface: PickupMetaDetail

Defined in: [types/in-store-pickup.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L202)

Per-order label-identifier validation detail (meta/details response).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key"></a> `key` | `string` | Identifier name: imei | uin | gtin | sgtin | customsDeclaration | originCountryCode. | [types/in-store-pickup.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L204) |
| <a id="value"></a> `value?` | `string` \| `null` | Identifier value (null when not set). | [types/in-store-pickup.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L206) |
| <a id="decision"></a> `decision` | `string` | Validation status (filled, optional, pending, required, imeiInvalidFormat, sgtinNotFound, …). | [types/in-store-pickup.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L208) |
