[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V2GetConfigResponse

# Interface: V2GetConfigResponse

Defined in: [types/promotion.types.ts:1819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1819)

Ответ метода GET /api/advert/v1/config — конфигурация кабинета продвижения.

Возвращает валюту, код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances)
и допустимые шаги ставок для метода POST /api/advert/v1/normquery/bids.

## Since

task-170

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currency"></a> `currency` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). | [types/promotion.types.ts:1823](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1823) |
| <a id="currencycode"></a> `currencyCode` | `number` | Код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (напр. 860 для UZS). | [types/promotion.types.ts:1828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1828) |
| <a id="cpmstep"></a> `cpmStep` | `number` | Шаг ставки в минорных единицах валюты — 0.01 базовой единицы валюты кабинета — для CPM-кампаний (за показы). | [types/promotion.types.ts:1833](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1833) |
| <a id="cpcstep"></a> `cpcStep` | `number` | Шаг ставки в минорных единицах валюты — 0.01 базовой единицы валюты кабинета — для CPC-кампаний (за клики). | [types/promotion.types.ts:1838](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1838) |
