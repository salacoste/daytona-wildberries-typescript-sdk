[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0PutDailyLimitsAdvertResult

# Interface: V0PutDailyLimitsAdvertResult

Defined in: [types/promotion.types.ts:2462](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2462)

Элемент ответа метода PUT /api/advert/v0/daily-limits — результат
установки дневного лимита одной кампании.

## Since

task-186

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:2464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2464) |
| <a id="belowminlimit"></a> `belowMinLimit` | `boolean` | Установленный дневной лимит ниже рекомендованного минимума по текущим ставкам (`requiredLimit`): - `true` — да - `false` — нет | [types/promotion.types.ts:2471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2471) |
| <a id="requiredlimit"></a> `requiredLimit` | `number` | Рекомендуемый минимальный дневной лимит по текущим ставкам кампании, в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). При меньшем лимите бюджет может расходоваться неравномерно и возможны ошибки в кампании. | [types/promotion.types.ts:2479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2479) |
