[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0GetNormQueryBidsItem

# Interface: V0GetNormQueryBidsItem

Defined in: [types/promotion.types.ts:1145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1145)

Элемент ставки поискового кластера

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | ID кампании | [types/promotion.types.ts:1147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1147) |
| <a id="nm_id"></a> `nm_id` | `number` | Артикул WB | [types/promotion.types.ts:1149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1149) |
| <a id="norm_query"></a> `norm_query` | `string` | Поисковый кластер | [types/promotion.types.ts:1151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1151) |
| <a id="bid"></a> `bid` | `number` | Текущая ставка за тысячу показов, ₽ | [types/promotion.types.ts:1153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1153) |
| <a id="bid_kopecks"></a> `bid_kopecks?` | `number` | Текущая ставка в минорных единцах валюты — 0.01 базовой единицы [валюты кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) за тысячу показов. **Since** task-170 | [types/promotion.types.ts:1159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1159) |
| <a id="id_kopecks"></a> `id_kopecks?` | `number` | Идентификатор ставки в минорных единицах валюты (0.01 базовой единицы за тысячу показов). Отличается от `bid_kopecks` — это отдельное поле идентификатора ставки. **Since** task-170 | [types/promotion.types.ts:1165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1165) |
| <a id="currency"></a> `currency?` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). **Since** task-170 | [types/promotion.types.ts:1170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1170) |
