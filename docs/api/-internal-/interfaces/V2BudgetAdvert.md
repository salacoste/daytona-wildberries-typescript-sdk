[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V2BudgetAdvert

# Interface: V2BudgetAdvert

Defined in: [types/promotion.types.ts:2323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2323)

Элемент ответа метода POST /api/advert/v2/budget — бюджет одной кампании.

## Since

task-191

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:2325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2325) |
| <a id="currency"></a> `currency` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). | [types/promotion.types.ts:2329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2329) |
| <a id="total"></a> `total` | `number` | Бюджет кампании в БАЗОВЫХ единицах валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) — НЕ в минорных (не в копейках). | [types/promotion.types.ts:2335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2335) |
