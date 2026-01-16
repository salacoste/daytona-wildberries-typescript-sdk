[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailRequest

# Interface: NmReportDetailRequest

Defined in: [types/analytics.types.ts:519](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L519)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Бренды | [types/analytics.types.ts:521](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L521) |
| <a id="objectids"></a> `objectIDs?` | `number`[] | ID предметов | [types/analytics.types.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L523) |
| <a id="tagids"></a> `tagIDs?` | `number`[] | ID ярлыков | [types/analytics.types.ts:525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L525) |
| <a id="nmids"></a> `nmIDs?` | `number`[] | Артикулы WB | [types/analytics.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L527) |
| <a id="timezone"></a> `timezone?` | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L529) |
| <a id="period"></a> `period` | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L531) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:533](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L533) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:535](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L535) |
| <a id="orderby"></a> `orderBy?` | \{ `field?`: `string`; `mode?`: `string`; \} | Параметры сортировки. Если не указано, то по умолчанию используется значение "openCard" и сортировка по убыванию. Все виды сортировки `field`: - `openCard` — по открытию карточки (переход на страницу товара) - `addToCart` — по добавлениям в корзину - `orders` — по кол-ву заказов - `avgRubPrice` — по средней цене в рублях - `ordersSumRub` — по сумме заказов в рублях - `stockMpQty` — по кол-ву остатков маркетплейса шт. - `stockWbQty` — по кол-ву остатков на складе шт. - `cancelSumRub` — сумме возвратов в рублях - `cancelCount` — по кол-ву возвратов - `buyoutCount` — по кол-ву выкупов - `buyoutSumRub` — по сумме выкупов | [types/analytics.types.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L538) |
| `orderBy.field?` | `string` | Вид сортировки | [types/analytics.types.ts:540](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L540) |
| `orderBy.mode?` | `string` | `asc` — по возрастанию, `desc` — по убыванию | [types/analytics.types.ts:542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L542) |
| <a id="page"></a> `page` | `number` | Страница | [types/analytics.types.ts:545](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L545) |
