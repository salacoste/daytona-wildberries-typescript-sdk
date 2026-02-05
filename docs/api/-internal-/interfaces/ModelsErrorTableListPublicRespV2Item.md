[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsErrorTableListPublicRespV2Item

# Interface: ModelsErrorTableListPublicRespV2Item

Defined in: [types/products.types.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/products.types.ts#L523)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="batchuuid"></a> `batchUUID` | `string` | ID пакета | [types/products.types.ts:525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/products.types.ts#L525) |
| <a id="subjects"></a> `subjects` | `Record`\<`string`, [`ModelsErrorSubject`](ModelsErrorSubject.md)\> | Предметы. Разбивка по `vendorCodes` | [types/products.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/products.types.ts#L527) |
| <a id="brands"></a> `brands` | `Record`\<`string`, [`ModelsErrorBrand`](ModelsErrorBrand.md)\> | Бренды. Разбивка по `vendorCodes` | [types/products.types.ts:529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/products.types.ts#L529) |
| <a id="vendorcodes"></a> `vendorCodes` | `string`[] | Артикулы продавца | [types/products.types.ts:531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/products.types.ts#L531) |
| <a id="errors"></a> `errors` | `Record`\<`string`, `string`[]\> | Ошибки. Разбивка по `vendorCodes` | [types/products.types.ts:533](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/products.types.ts#L533) |
