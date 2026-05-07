[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicInput

# Interface: CardCharacteristicInput

Defined in: [types/products.types.ts:959](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/products.types.ts#L959)

Characteristic value for card create/update requests.
Used in `createCardsUpload()`, `createUploadAdd()`, `createCardsUpdate()`.

## Since

v3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Characteristic ID (from [SubjectCharacteristic.charcID](SubjectCharacteristic.md#charcid)) | [types/products.types.ts:961](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/products.types.ts#L961) |
| <a id="value"></a> `value` | `string` \| `number` \| `string`[] | Characteristic value. Expected type depends on `charcType`: - `0` → `string` (text value) - `1` → `number` (numeric value) - `4` → `string[]` (array of text values) Typed as union for DX; WB API accepts any JSON-serializable value. | [types/products.types.ts:970](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/products.types.ts#L970) |
