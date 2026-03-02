[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProduct

# Interface: SalesFunnelProduct

Defined in: [types/analytics.types.ts:1483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1483)

Карточка товара v3 (Swagger: Product)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/analytics.types.ts:1485](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1485) |
| <a id="title"></a> `title` | `string` | Название карточки товара | [types/analytics.types.ts:1487](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1487) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1489](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1489) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1491) |
| <a id="subjectid"></a> `subjectId` | `number` | ID предмета | [types/analytics.types.ts:1493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1493) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1495) |
| <a id="tags"></a> `tags` | [`SalesFunnelTag`](SalesFunnelTag.md)[] | Ярлыки | [types/analytics.types.ts:1497](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1497) |
| <a id="productrating"></a> `productRating` | `number` | Оценка карточки | [types/analytics.types.ts:1499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1499) |
| <a id="feedbackrating"></a> `feedbackRating` | `number` | Оценка пользователей | [types/analytics.types.ts:1501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1501) |
| <a id="stocks"></a> `stocks` | \{ `wb`: `number`; `mp`: `number`; `balanceSum`: `number`; \} | Остатки | [types/analytics.types.ts:1503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1503) |
| `stocks.wb` | `number` | Общее количество остатков на складах WB на текущий день, шт. | [types/analytics.types.ts:1505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1505) |
| `stocks.mp` | `number` | Общее количество остатков на складах продавца на текущий день, шт. | [types/analytics.types.ts:1507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1507) |
| `stocks.balanceSum` | `number` | Сумма остатков на складах | [types/analytics.types.ts:1509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1509) |
