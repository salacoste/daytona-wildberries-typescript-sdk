[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0GetNormQueryListRequest

# Interface: V0GetNormQueryListRequest

Defined in: [types/promotion.types.ts:962](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L962)

Запрос списка активных и неактивных поисковых кластеров (v0)

POST /adv/v0/normquery/list — возвращает списки активных и неактивных
поисковых кластеров с количеством просмотров от 100.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items` | [`V0GetNormQueryListRequestItem`](V0GetNormQueryListRequestItem.md)[] | Массив элементов запроса (макс. 100) | [types/promotion.types.ts:964](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L964) |
