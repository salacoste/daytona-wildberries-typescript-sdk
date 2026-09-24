[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0PutDailyLimitsRequest

# Interface: V0PutDailyLimitsRequest

Defined in: [types/promotion.types.ts:2429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2429)

Запрос метода PUT /api/advert/v0/daily-limits — включение, обновление
или отключение дневного лимита бюджета CPC-кампаний.

Поля `dailyLimit` и `carryOverEnabled` обязательны при `enabled: true`.

## Since

task-186

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertids"></a> `advertIds` | `number`[] | ID кампаний. От 1 до 100 элементов, каждый >= 1 | [types/promotion.types.ts:2431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2431) |
| <a id="enabled"></a> `enabled` | `boolean` | Включить лимит: - `true` — да - `false` — нет (выключить) | [types/promotion.types.ts:2437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2437) |
| <a id="dailylimit"></a> `dailyLimit?` | `number` | Сумма дневного лимита в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). Обязателен при `enabled: true`. Минимально допустимая сумма возвращается полем `minDailyLimit` метода [V2GetConfigResponse](V2GetConfigResponse.md) (GET /api/advert/v1/config). | [types/promotion.types.ts:2445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2445) |
| <a id="carryoverenabled"></a> `carryOverEnabled?` | `boolean` | Переносить неиспользованный остаток лимита на следующий день: - `true` — да - `false` — нет Обязателен при `enabled: true`. | [types/promotion.types.ts:2453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2453) |
