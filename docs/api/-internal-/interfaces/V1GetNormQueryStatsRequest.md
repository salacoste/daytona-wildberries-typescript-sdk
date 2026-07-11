[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V1GetNormQueryStatsRequest

# Interface: V1GetNormQueryStatsRequest

Defined in: [types/promotion.types.ts:1017](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1017)

Запрос ежедневной статистики по поисковым кластерам (v1)

POST /adv/v1/normquery/stats — возвращает статистику (просмотры, клики,
добавления в корзину, заказы, CTR, CPC, CPM и т.д.) по поисковым кластерам
за указанный период с детализацией по дням. Применимо для кампаний с моделью
оплаты `cpm` (за показы) и `cpc` (за клики).

V1-преемник метода [V0GetNormQueryStatsRequest](V0GetNormQueryStatsRequest.md) (`/adv/v0/normquery/stats`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="from"></a> `from` | `string` | Дата начала периода (YYYY-MM-DD) | [types/promotion.types.ts:1019](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1019) |
| <a id="to"></a> `to` | `string` | Дата окончания периода (YYYY-MM-DD) | [types/promotion.types.ts:1021](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1021) |
| <a id="items"></a> `items` | [`V1GetNormQueryStatsRequestItem`](V1GetNormQueryStatsRequestItem.md)[] | Массив элементов запроса (макс. 100) | [types/promotion.types.ts:1023](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1023) |
