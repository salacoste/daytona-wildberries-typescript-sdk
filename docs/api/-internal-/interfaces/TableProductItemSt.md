[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductItemSt

# Interface: TableProductItemSt

Defined in: [types/analytics.types.ts:1175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1175)

Данные по товару

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/analytics.types.ts:1177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1177) |
| <a id="isdeleted"></a> `isDeleted` | `boolean` | Является ли товар удалённым | [types/analytics.types.ts:1179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1179) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1181) |
| <a id="name"></a> `name` | `string` | Название товара | [types/analytics.types.ts:1183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1183) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1185) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1187) |
| <a id="mainphoto"></a> `mainPhoto` | `string` | Ссылка на главное фото | [types/analytics.types.ts:1189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1189) |
| <a id="hassizes"></a> `hasSizes` | `boolean` | Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"` | [types/analytics.types.ts:1191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1191) |
| <a id="metrics"></a> `metrics` | [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; `availability`: \| `"deficient"` \| `"actual"` \| `"balanced"` \| `"nonActual"` \| `"nonLiquid"` \| `"invalidData"`; \} | Метрики товара | [types/analytics.types.ts:1193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1193) |
