[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailRequest

# ~~Interface: NmReportDetailRequest~~

Defined in: [types/analytics.types.ts:536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L536)

## Deprecated

Use SalesFunnelProductsRequest instead. v2 endpoint /api/v2/nm-report/detail is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brandnames"></a> ~~`brandNames?`~~ | `string`[] | Бренды | [types/analytics.types.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L538) |
| <a id="objectids"></a> ~~`objectIDs?`~~ | `number`[] | ID предметов | [types/analytics.types.ts:540](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L540) |
| <a id="tagids"></a> ~~`tagIDs?`~~ | `number`[] | ID ярлыков | [types/analytics.types.ts:542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L542) |
| <a id="nmids"></a> ~~`nmIDs?`~~ | `number`[] | Артикулы WB | [types/analytics.types.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L544) |
| <a id="timezone"></a> ~~`timezone?`~~ | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L546) |
| <a id="period"></a> ~~`period`~~ | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L548) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L550) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L552) |
| <a id="orderby"></a> ~~`orderBy?`~~ | \{ `field?`: `string`; `mode?`: `string`; \} | Параметры сортировки. Если не указано, то по умолчанию используется значение "openCard" и сортировка по убыванию. Все виды сортировки `field`: - `openCard` — по открытию карточки (переход на страницу товара) - `addToCart` — по добавлениям в корзину - `orders` — по кол-ву заказов - `avgRubPrice` — по средней цене в рублях - `ordersSumRub` — по сумме заказов в рублях - `stockMpQty` — по кол-ву остатков маркетплейса шт. - `stockWbQty` — по кол-ву остатков на складе шт. - `cancelSumRub` — сумме возвратов в рублях - `cancelCount` — по кол-ву возвратов - `buyoutCount` — по кол-ву выкупов - `buyoutSumRub` — по сумме выкупов | [types/analytics.types.ts:555](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L555) |
| `orderBy.field?` | `string` | Вид сортировки | [types/analytics.types.ts:557](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L557) |
| `orderBy.mode?` | `string` | `asc` — по возрастанию, `desc` — по убыванию | [types/analytics.types.ts:559](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L559) |
| <a id="page"></a> ~~`page`~~ | `number` | Страница | [types/analytics.types.ts:562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L562) |
