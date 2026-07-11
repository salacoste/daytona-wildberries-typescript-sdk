[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProduct

# Interface: SalesFunnelProduct

Defined in: [types/analytics.types.ts:1542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1542)

Карточка товара v3 (Swagger: Product)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/analytics.types.ts:1544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1544) |
| <a id="title"></a> `title` | `string` | Название карточки товара | [types/analytics.types.ts:1546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1546) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1548) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1550) |
| <a id="subjectid"></a> `subjectId` | `number` | ID предмета | [types/analytics.types.ts:1552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1552) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1554) |
| <a id="tags"></a> `tags` | [`SalesFunnelTag`](SalesFunnelTag.md)[] | Ярлыки | [types/analytics.types.ts:1556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1556) |
| <a id="productrating"></a> `productRating` | `number` | Оценка карточки | [types/analytics.types.ts:1558](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1558) |
| <a id="feedbackrating"></a> `feedbackRating` | `number` | Оценка пользователей | [types/analytics.types.ts:1560](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1560) |
| <a id="stocks"></a> `stocks` | \{ `wb`: `number`; `mp`: `number`; `balanceSum`: `number`; \} | Остатки | [types/analytics.types.ts:1562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1562) |
| `stocks.wb` | `number` | Общее количество остатков на складах WB на текущий день, шт. | [types/analytics.types.ts:1564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1564) |
| `stocks.mp` | `number` | Общее количество остатков на складах продавца на текущий день, шт. | [types/analytics.types.ts:1566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1566) |
| `stocks.balanceSum` | `number` | Сумма остатков на складах | [types/analytics.types.ts:1568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1568) |
