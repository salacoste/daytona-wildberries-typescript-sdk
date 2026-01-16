[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductItemSt

# Interface: TableProductItemSt

Defined in: [types/analytics.types.ts:1304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1304)

Данные по товару

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/analytics.types.ts:1306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1306) |
| <a id="isdeleted"></a> `isDeleted` | `boolean` | Является ли товар удалённым | [types/analytics.types.ts:1308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1308) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1310) |
| <a id="name"></a> `name` | `string` | Название товара | [types/analytics.types.ts:1312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1312) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1314) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1316) |
| <a id="mainphoto"></a> `mainPhoto` | `string` | Ссылка на главное фото | [types/analytics.types.ts:1318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1318) |
| <a id="hassizes"></a> `hasSizes` | `boolean` | Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"` | [types/analytics.types.ts:1320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1320) |
| <a id="metrics"></a> `metrics` | [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; `availability`: \| `"deficient"` \| `"actual"` \| `"balanced"` \| `"nonActual"` \| `"nonLiquid"` \| `"invalidData"`; \} | Метрики товара | [types/analytics.types.ts:1322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1322) |
