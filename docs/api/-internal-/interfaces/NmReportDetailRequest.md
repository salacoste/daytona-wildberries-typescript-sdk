[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailRequest

# ~~Interface: NmReportDetailRequest~~

Defined in: [types/analytics.types.ts:633](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L633)

## Deprecated

Use SalesFunnelProductsRequest instead. v2 endpoint /api/v2/nm-report/detail is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brandnames"></a> ~~`brandNames?`~~ | `string`[] | Бренды | [types/analytics.types.ts:635](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L635) |
| <a id="objectids"></a> ~~`objectIDs?`~~ | `number`[] | ID предметов | [types/analytics.types.ts:637](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L637) |
| <a id="tagids"></a> ~~`tagIDs?`~~ | `number`[] | ID ярлыков | [types/analytics.types.ts:639](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L639) |
| <a id="nmids"></a> ~~`nmIDs?`~~ | `number`[] | Артикулы WB | [types/analytics.types.ts:641](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L641) |
| <a id="timezone"></a> ~~`timezone?`~~ | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L643) |
| <a id="period"></a> ~~`period`~~ | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:645](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L645) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:647](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L647) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L649) |
| <a id="orderby"></a> ~~`orderBy?`~~ | \{ `field?`: `string`; `mode?`: `string`; \} | Параметры сортировки. Если не указано, то по умолчанию используется значение "openCard" и сортировка по убыванию. Все виды сортировки `field`: - `openCard` — по открытию карточки (переход на страницу товара) - `addToCart` — по добавлениям в корзину - `orders` — по кол-ву заказов - `avgRubPrice` — по средней цене в рублях - `ordersSumRub` — по сумме заказов в рублях - `stockMpQty` — по кол-ву остатков маркетплейса шт. - `stockWbQty` — по кол-ву остатков на складе шт. - `cancelSumRub` — сумме возвратов в рублях - `cancelCount` — по кол-ву возвратов - `buyoutCount` — по кол-ву выкупов - `buyoutSumRub` — по сумме выкупов | [types/analytics.types.ts:652](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L652) |
| `orderBy.field?` | `string` | Вид сортировки | [types/analytics.types.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L654) |
| `orderBy.mode?` | `string` | `asc` — по возрастанию, `desc` — по убыванию | [types/analytics.types.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L656) |
| <a id="page"></a> ~~`page`~~ | `number` | Страница | [types/analytics.types.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L659) |
