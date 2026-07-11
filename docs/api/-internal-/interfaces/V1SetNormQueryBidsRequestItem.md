[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V1SetNormQueryBidsRequestItem

# Interface: V1SetNormQueryBidsRequestItem

Defined in: [types/promotion.types.ts:1846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1846)

Элемент запроса на установку ставки для поискового кластера (V1, валюта кабинета).

## Since

task-170

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:1848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1848) |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/promotion.types.ts:1850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1850) |
| <a id="normquery"></a> `normQuery` | `string` | Поисковый кластер — группа похожих поисковых запросов | [types/promotion.types.ts:1852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1852) |
| <a id="bidminorunits"></a> `bidMinorUnits` | `number` | Ставка в минорных единицах валюты — 0.01 базовой единицы [валюты кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). Допустимый шаг ставки возвращается методом GET /api/advert/v1/config. | [types/promotion.types.ts:1858](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1858) |
