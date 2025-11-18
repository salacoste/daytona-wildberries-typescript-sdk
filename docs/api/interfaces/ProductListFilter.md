[Wildberries API TypeScript SDK](../modules.md) / ProductListFilter

# Interface: ProductListFilter

Defined in: [types/products.types.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L793)

Filters for product list

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="withphoto"></a> `withPhoto?` | `0` \| `1` \| `-1` | Photo filter: -1=all, 0=without photo, 1=with photo | [types/products.types.ts:795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L795) |
| <a id="textsearch"></a> `textSearch?` | `string` | Search by vendorCode, nmID, or barcode | [types/products.types.ts:797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L797) |
| <a id="tagids"></a> `tagIDs?` | `number`[] | Filter by label IDs | [types/products.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L799) |
| <a id="allowedcategoriesonly"></a> `allowedCategoriesOnly?` | `boolean` | Only allowed categories | [types/products.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L801) |
| <a id="objectids"></a> `objectIDs?` | `number`[] | Filter by subject IDs | [types/products.types.ts:803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L803) |
| <a id="brands"></a> `brands?` | `string`[] | Filter by brands | [types/products.types.ts:805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L805) |
| <a id="imtid"></a> `imtID?` | `number` | Filter by unified card ID | [types/products.types.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L807) |
