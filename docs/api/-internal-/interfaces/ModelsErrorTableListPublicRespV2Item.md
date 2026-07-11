[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsErrorTableListPublicRespV2Item

# Interface: ModelsErrorTableListPublicRespV2Item

Defined in: [types/products.types.ts:580](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L580)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="batchuuid"></a> `batchUUID` | `string` | ID пакета | [types/products.types.ts:582](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L582) |
| <a id="subjects"></a> `subjects` | `Record`\<`string`, [`ModelsErrorSubject`](ModelsErrorSubject.md)\> | Предметы. Разбивка по `vendorCodes` | [types/products.types.ts:584](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L584) |
| <a id="brands"></a> `brands` | `Record`\<`string`, [`ModelsErrorBrand`](ModelsErrorBrand.md)\> | Бренды. Разбивка по `vendorCodes` | [types/products.types.ts:586](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L586) |
| <a id="vendorcodes"></a> `vendorCodes` | `string`[] | Артикулы продавца | [types/products.types.ts:588](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L588) |
| <a id="errors"></a> `errors` | `Record`\<`string`, `string`[]\> | Ошибки. Разбивка по `vendorCodes` | [types/products.types.ts:590](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L590) |
| <a id="updatedat"></a> `updatedAt?` | `string` | Дата и время создания или изменения пакета (когда карточка попала в черновики) | [types/products.types.ts:592](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L592) |
