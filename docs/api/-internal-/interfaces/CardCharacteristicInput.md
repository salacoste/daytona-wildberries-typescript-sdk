[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicInput

# Interface: CardCharacteristicInput

Defined in: [types/products.types.ts:917](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L917)

Characteristic value for card create/update requests.
Used in `createCardsUpload()`, `createUploadAdd()`, `createCardsUpdate()`.

## Since

v3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Characteristic ID (from [SubjectCharacteristic.charcID](SubjectCharacteristic.md#charcid)) | [types/products.types.ts:919](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L919) |
| <a id="value"></a> `value` | `string` \| `number` \| `string`[] | Characteristic value. Expected type depends on `charcType`: - `0` → `string` (text value) - `1` → `number` (numeric value) - `4` → `string[]` (array of text values) Typed as union for DX; WB API accepts any JSON-serializable value. | [types/products.types.ts:928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L928) |
