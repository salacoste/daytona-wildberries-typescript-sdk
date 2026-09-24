[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicInput

# Interface: CardCharacteristicInput

Defined in: [types/products.types.ts:1040](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1040)

Characteristic value for card create/update requests.
Used in `createCardsUpload()`, `createUploadAdd()`, `createCardsUpdate()`.

## Since

3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Characteristic ID (from [SubjectCharacteristic.charcID](SubjectCharacteristic.md#charcid)) | [types/products.types.ts:1042](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1042) |
| <a id="value"></a> `value` | `string` \| `number` \| `string`[] | Characteristic value. Expected type depends on `charcType`: - `0` → `string` (text value) - `1` → `number` (numeric value) - `4` → `string[]` (array of text values) Typed as union for DX; WB API accepts any JSON-serializable value. | [types/products.types.ts:1051](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1051) |
