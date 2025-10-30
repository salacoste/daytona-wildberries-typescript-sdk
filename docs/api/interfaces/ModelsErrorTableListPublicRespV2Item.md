[Wildberries API TypeScript SDK](../modules.md) / ModelsErrorTableListPublicRespV2Item

# Interface: ModelsErrorTableListPublicRespV2Item

Defined in: [types/products.types.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L520)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="batchuuid"></a> `batchUUID` | `string` | ID пакета | [types/products.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L522) |
| <a id="subjects"></a> `subjects` | `Record`\<`string`, [`ModelsErrorSubject`](ModelsErrorSubject.md)\> | Предметы. Разбивка по `vendorCodes` | [types/products.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L524) |
| <a id="brands"></a> `brands` | `Record`\<`string`, [`ModelsErrorBrand`](ModelsErrorBrand.md)\> | Бренды. Разбивка по `vendorCodes` | [types/products.types.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L526) |
| <a id="vendorcodes"></a> `vendorCodes` | `string`[] | Артикулы продавца | [types/products.types.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L528) |
| <a id="errors"></a> `errors` | `Record`\<`string`, `string`[]\> | Ошибки. Разбивка по `vendorCodes` | [types/products.types.ts:530](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L530) |
