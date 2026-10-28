[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V2BudgetResponse

# Interface: V2BudgetResponse

Defined in: [types/promotion.types.ts:2348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L2348)

Ответ метода POST /api/advert/v2/budget — бюджеты кампаний.

Бюджет возвращается только для кампаний в статусах `4` (готова к запуску),
`9` (активна) и `11` (на паузе). Если по запрошенной кампании нет данных
(не тот статус или кампания не принадлежит продавцу), соответствующий
элемент массива — `null`.

## Since

task-191

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="adverts"></a> `adverts` | ([`V2BudgetAdvert`](V2BudgetAdvert.md) \| `null`)[] | Данные кампаний; элементы могут быть `null` | [types/promotion.types.ts:2350](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L2350) |
