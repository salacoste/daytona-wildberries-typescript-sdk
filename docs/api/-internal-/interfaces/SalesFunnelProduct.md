[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProduct

# Interface: SalesFunnelProduct

Defined in: [types/analytics.types.ts:1559](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1559)

Карточка товара v3 (Swagger: Product)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/analytics.types.ts:1561](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1561) |
| <a id="title"></a> `title` | `string` | Название карточки товара | [types/analytics.types.ts:1563](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1563) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1565](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1565) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1567](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1567) |
| <a id="subjectid"></a> `subjectId` | `number` | ID предмета | [types/analytics.types.ts:1569](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1569) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1571](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1571) |
| <a id="tags"></a> `tags` | [`SalesFunnelTag`](SalesFunnelTag.md)[] | Ярлыки | [types/analytics.types.ts:1573](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1573) |
| <a id="productrating"></a> `productRating` | `number` | Оценка карточки | [types/analytics.types.ts:1575](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1575) |
| <a id="feedbackrating"></a> `feedbackRating` | `number` | Оценка пользователей | [types/analytics.types.ts:1577](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1577) |
| <a id="stocks"></a> `stocks` | \{ `wb`: `number`; `mp`: `number`; `balanceSum`: `number`; \} | Остатки | [types/analytics.types.ts:1579](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1579) |
| `stocks.wb` | `number` | Общее количество остатков на складах WB на текущий день, шт. | [types/analytics.types.ts:1581](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1581) |
| `stocks.mp` | `number` | Общее количество остатков на складах продавца на текущий день, шт. | [types/analytics.types.ts:1583](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1583) |
| `stocks.balanceSum` | `number` | Сумма остатков на складах | [types/analytics.types.ts:1585](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1585) |
