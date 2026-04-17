[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductItemSt

# Interface: TableProductItemSt

Defined in: [types/analytics.types.ts:1116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1116)

Данные по товару

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/analytics.types.ts:1118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1118) |
| <a id="isdeleted"></a> `isDeleted` | `boolean` | Является ли товар удалённым | [types/analytics.types.ts:1120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1120) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1122) |
| <a id="name"></a> `name` | `string` | Название товара | [types/analytics.types.ts:1124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1124) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1126) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1128) |
| <a id="mainphoto"></a> `mainPhoto` | `string` | Ссылка на главное фото | [types/analytics.types.ts:1130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1130) |
| <a id="hassizes"></a> `hasSizes` | `boolean` | Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"` | [types/analytics.types.ts:1132](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1132) |
| <a id="metrics"></a> `metrics` | [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; `availability`: \| `"deficient"` \| `"actual"` \| `"balanced"` \| `"nonActual"` \| `"nonLiquid"` \| `"invalidData"`; \} | Метрики товара | [types/analytics.types.ts:1134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L1134) |
