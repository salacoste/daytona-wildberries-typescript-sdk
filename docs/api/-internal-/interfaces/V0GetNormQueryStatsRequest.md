[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0GetNormQueryStatsRequest

# Interface: V0GetNormQueryStatsRequest

Defined in: [types/promotion.types.ts:884](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L884)

Запрос статистики по поисковым кластерам

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="from"></a> `from` | `string` | Дата начала периода | [types/promotion.types.ts:886](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L886) |
| <a id="to"></a> `to` | `string` | Дата окончания периода | [types/promotion.types.ts:888](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L888) |
| <a id="items"></a> `items` | [`V0GetNormQueryStatsRequestItem`](V0GetNormQueryStatsRequestItem.md)[] | Массив элементов запроса (макс. 100) | [types/promotion.types.ts:890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L890) |
