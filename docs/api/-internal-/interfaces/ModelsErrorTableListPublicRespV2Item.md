[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsErrorTableListPublicRespV2Item

# Interface: ModelsErrorTableListPublicRespV2Item

Defined in: [types/products.types.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L516)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="batchuuid"></a> `batchUUID` | `string` | ID пакета | [types/products.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L518) |
| <a id="subjects"></a> `subjects` | `Record`\<`string`, [`ModelsErrorSubject`](ModelsErrorSubject.md)\> | Предметы. Разбивка по `vendorCodes` | [types/products.types.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L520) |
| <a id="brands"></a> `brands` | `Record`\<`string`, [`ModelsErrorBrand`](ModelsErrorBrand.md)\> | Бренды. Разбивка по `vendorCodes` | [types/products.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L522) |
| <a id="vendorcodes"></a> `vendorCodes` | `string`[] | Артикулы продавца | [types/products.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L524) |
| <a id="errors"></a> `errors` | `Record`\<`string`, `string`[]\> | Ошибки. Разбивка по `vendorCodes` | [types/products.types.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L526) |
| <a id="updatedat"></a> `updatedAt?` | `string` | Дата и время создания или изменения пакета (когда карточка попала в черновики) | [types/products.types.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L528) |
