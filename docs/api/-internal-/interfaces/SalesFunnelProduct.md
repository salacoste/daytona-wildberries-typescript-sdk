[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProduct

# Interface: SalesFunnelProduct

Defined in: [types/analytics.types.ts:1808](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1808)

Карточка товара v3 (Swagger: Product)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/analytics.types.ts:1810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1810) |
| <a id="title"></a> `title` | `string` | Название карточки товара | [types/analytics.types.ts:1812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1812) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Артикул продавца | [types/analytics.types.ts:1814](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1814) |
| <a id="brandname"></a> `brandName` | `string` | Бренд | [types/analytics.types.ts:1816](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1816) |
| <a id="subjectid"></a> `subjectId` | `number` | ID предмета | [types/analytics.types.ts:1818](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1818) |
| <a id="subjectname"></a> `subjectName` | `string` | Название предмета | [types/analytics.types.ts:1820](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1820) |
| <a id="tags"></a> `tags` | [`SalesFunnelTag`](SalesFunnelTag.md)[] | Ярлыки | [types/analytics.types.ts:1822](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1822) |
| <a id="productrating"></a> `productRating` | `number` | Оценка карточки | [types/analytics.types.ts:1824](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1824) |
| <a id="feedbackrating"></a> `feedbackRating` | `number` | Оценка пользователей | [types/analytics.types.ts:1826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1826) |
| <a id="stocks"></a> `stocks` | \{ `wb`: `number`; `mp`: `number`; `balanceSum`: `number`; \} | Остатки | [types/analytics.types.ts:1828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1828) |
| `stocks.wb` | `number` | Общее количество остатков на складах WB на текущий день, шт. | [types/analytics.types.ts:1830](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1830) |
| `stocks.mp` | `number` | Общее количество остатков на складах продавца на текущий день, шт. | [types/analytics.types.ts:1832](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1832) |
| `stocks.balanceSum` | `number` | Сумма остатков на складах | [types/analytics.types.ts:1834](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1834) |
