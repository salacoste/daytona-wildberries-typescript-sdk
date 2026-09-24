[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V1SetNormQueryBidsRequestItem

# Interface: V1SetNormQueryBidsRequestItem

Defined in: [types/promotion.types.ts:1863](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1863)

Элемент запроса на установку ставки для поискового кластера (V1, валюта кабинета).

## Since

task-170

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:1865](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1865) |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB | [types/promotion.types.ts:1867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1867) |
| <a id="normquery"></a> `normQuery` | `string` | Поисковый кластер — группа похожих поисковых запросов | [types/promotion.types.ts:1869](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1869) |
| <a id="bidminorunits"></a> `bidMinorUnits` | `number` | Ставка в минорных единицах валюты — 0.01 базовой единицы [валюты кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). Допустимый шаг ставки возвращается методом GET /api/advert/v1/config. | [types/promotion.types.ts:1875](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1875) |
