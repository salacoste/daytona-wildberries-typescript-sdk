[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsErrorTableListPublicRespV2Item

# Interface: ModelsErrorTableListPublicRespV2Item

Defined in: [types/products.types.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L516)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="batchuuid"></a> `batchUUID` | `string` | ID пакета | [types/products.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L518) |
| <a id="subjects"></a> `subjects` | `Record`\<`string`, [`ModelsErrorSubject`](ModelsErrorSubject.md)\> | Предметы. Разбивка по `vendorCodes` | [types/products.types.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L520) |
| <a id="brands"></a> `brands` | `Record`\<`string`, [`ModelsErrorBrand`](ModelsErrorBrand.md)\> | Бренды. Разбивка по `vendorCodes` | [types/products.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L522) |
| <a id="vendorcodes"></a> `vendorCodes` | `string`[] | Артикулы продавца | [types/products.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L524) |
| <a id="errors"></a> `errors` | `Record`\<`string`, `string`[]\> | Ошибки. Разбивка по `vendorCodes` | [types/products.types.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L526) |
