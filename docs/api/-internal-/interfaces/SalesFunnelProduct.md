[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProduct

# Interface: SalesFunnelProduct

Defined in: [types/analytics.types.ts:1718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1718)

Карточка товара v3 (Swagger: Product)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/analytics.types.ts:1720](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1720) |
| <a id="title"></a> `title` | `string` | Название карточки товара | [types/analytics.types.ts:1722](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1722) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1724](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1724) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1726](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1726) |
| <a id="subjectid"></a> `subjectId` | `number` | ID предмета | [types/analytics.types.ts:1728](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1728) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1730) |
| <a id="tags"></a> `tags` | [`SalesFunnelTag`](SalesFunnelTag.md)[] | Ярлыки | [types/analytics.types.ts:1732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1732) |
| <a id="productrating"></a> `productRating` | `number` | Оценка карточки | [types/analytics.types.ts:1734](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1734) |
| <a id="feedbackrating"></a> `feedbackRating` | `number` | Оценка пользователей | [types/analytics.types.ts:1736](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1736) |
| <a id="stocks"></a> `stocks` | \{ `wb`: `number`; `mp`: `number`; `balanceSum`: `number`; \} | Остатки | [types/analytics.types.ts:1738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1738) |
| `stocks.wb` | `number` | Общее количество остатков на складах WB на текущий день, шт. | [types/analytics.types.ts:1740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1740) |
| `stocks.mp` | `number` | Общее количество остатков на складах продавца на текущий день, шт. | [types/analytics.types.ts:1742](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1742) |
| `stocks.balanceSum` | `number` | Сумма остатков на складах | [types/analytics.types.ts:1744](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1744) |
