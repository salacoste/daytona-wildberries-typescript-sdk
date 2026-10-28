[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductItemSt

# Interface: TableProductItemSt

Defined in: [types/analytics.types.ts:1192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1192)

Данные по товару

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/analytics.types.ts:1194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1194) |
| <a id="isdeleted"></a> `isDeleted` | `boolean` | Является ли товар удалённым | [types/analytics.types.ts:1196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1196) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1198) |
| <a id="name"></a> `name` | `string` | Название товара | [types/analytics.types.ts:1200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1200) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1202) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1204) |
| <a id="mainphoto"></a> `mainPhoto` | `string` | Ссылка на главное фото | [types/analytics.types.ts:1206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1206) |
| <a id="hassizes"></a> `hasSizes` | `boolean` | Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"` | [types/analytics.types.ts:1208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1208) |
| <a id="metrics"></a> `metrics` | [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; `availability`: \| `"deficient"` \| `"actual"` \| `"balanced"` \| `"nonActual"` \| `"nonLiquid"` \| `"invalidData"`; \} | Метрики товара | [types/analytics.types.ts:1210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1210) |
