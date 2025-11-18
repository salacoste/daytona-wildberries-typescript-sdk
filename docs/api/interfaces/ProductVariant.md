[Wildberries API TypeScript SDK](../modules.md) / ProductVariant

# Interface: ProductVariant

Defined in: [types/products.types.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L654)

Individual product variant within a product card

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brand"></a> `brand?` | `string` | Brand name | [types/products.types.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L656) |
| <a id="title"></a> `title?` | `string` | Product title (max 60 characters) | [types/products.types.ts:658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L658) |
| <a id="description"></a> `description?` | `string` | Product description (1000-5000 characters, category-dependent) | [types/products.types.ts:660](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L660) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Required: Seller's article ID (max 72 characters) | [types/products.types.ts:662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L662) |
| <a id="wholesale"></a> `wholesale?` | \{ `enabled`: `boolean`; `quantum`: `number`; \} | Wholesale settings | [types/products.types.ts:664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L664) |
| `wholesale.enabled` | `boolean` | Enable wholesale | [types/products.types.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L666) |
| `wholesale.quantum` | `number` | Units per package | [types/products.types.ts:668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L668) |
| <a id="dimensions"></a> `dimensions?` | [`ProductDimensions`](ProductDimensions.md) | Product dimensions and weight | [types/products.types.ts:671](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L671) |
| <a id="sizes"></a> `sizes?` | [`ProductSize`](ProductSize.md)[] | Product sizes | [types/products.types.ts:673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L673) |
| <a id="characteristics"></a> `characteristics?` | [`ProductCharacteristic`](ProductCharacteristic.md)[] | Product characteristics/attributes | [types/products.types.ts:675](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L675) |
