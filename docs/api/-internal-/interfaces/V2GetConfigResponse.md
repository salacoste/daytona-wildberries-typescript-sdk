[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V2GetConfigResponse

# Interface: V2GetConfigResponse

Defined in: [types/promotion.types.ts:1819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1819)

Ответ метода GET /api/advert/v1/config — конфигурация кабинета продвижения.

Возвращает валюту, код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances)
и допустимые шаги ставок для метода POST /api/advert/v1/normquery/bids.

## Since

task-170

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currency"></a> `currency` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). | [types/promotion.types.ts:1823](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1823) |
| <a id="currencycode"></a> `currencyCode` | `number` | Код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (напр. 860 для UZS). | [types/promotion.types.ts:1828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1828) |
| <a id="cpmstep"></a> `cpmStep` | `number` | Шаг ставки в минорных единицах валюты — 0.01 базовой единицы валюты кабинета — для CPM-кампаний (за показы). | [types/promotion.types.ts:1833](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1833) |
| <a id="cpcstep"></a> `cpcStep` | `number` | Шаг ставки в минорных единицах валюты — 0.01 базовой единицы валюты кабинета — для CPC-кампаний (за клики). | [types/promotion.types.ts:1838](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1838) |
| <a id="mintopup"></a> `minTopUp` | `number` | Минимальная сумма пополнения бюджета кампании в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). Например, при `minTopUp: 10000` и `currency: 'UZS'` минимальное пополнение — 100 сум. **Since** task-186 | [types/promotion.types.ts:1846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1846) |
| <a id="mindailylimit"></a> `minDailyLimit` | `number` | Минимально допустимая сумма дневного лимита независимо от ставок кампании, в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). Используется методом PUT /api/advert/v0/daily-limits ([V0PutDailyLimitsRequest](V0PutDailyLimitsRequest.md)). **Since** task-186 | [types/promotion.types.ts:1855](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1855) |
