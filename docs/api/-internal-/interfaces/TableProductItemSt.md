[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductItemSt

# Interface: TableProductItemSt

Defined in: [types/analytics.types.ts:1441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1441)

Данные по товару

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/analytics.types.ts:1443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1443) |
| <a id="isdeleted"></a> `isDeleted` | `boolean` | Является ли товар удалённым | [types/analytics.types.ts:1445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1445) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1447) |
| <a id="name"></a> `name` | `string` | Название товара | [types/analytics.types.ts:1449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1449) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1451) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1453) |
| <a id="mainphoto"></a> `mainPhoto` | `string` | Ссылка на главное фото | [types/analytics.types.ts:1455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1455) |
| <a id="hassizes"></a> `hasSizes` | `boolean` | Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"` | [types/analytics.types.ts:1457](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1457) |
| <a id="metrics"></a> `metrics` | [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; `availability`: \| `"deficient"` \| `"actual"` \| `"balanced"` \| `"nonActual"` \| `"nonLiquid"` \| `"invalidData"`; \} | Метрики товара | [types/analytics.types.ts:1459](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1459) |
