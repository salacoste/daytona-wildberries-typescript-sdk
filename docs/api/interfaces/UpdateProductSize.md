[Wildberries API TypeScript SDK](../modules.md) / UpdateProductSize

# Interface: UpdateProductSize

Defined in: [types/products.types.ts:640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L640)

Product size with chrtID for updates

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chrtid"></a> `chrtID?` | `number` | Required for existing sizes, omit for new sizes | [types/products.types.ts:642](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L642) |
| <a id="techsize"></a> `techSize?` | `string` | Size label (e.g., "XL", "45") | [types/products.types.ts:644](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L644) |
| <a id="wbsize"></a> `wbSize?` | `string` | Russian size | [types/products.types.ts:646](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L646) |
| <a id="skus"></a> `skus?` | `string`[] | Barcodes (auto-generated if not provided) | [types/products.types.ts:648](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L648) |
