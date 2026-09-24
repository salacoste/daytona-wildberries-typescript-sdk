[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0DailyLimitAdvert

# Interface: V0DailyLimitAdvert

Defined in: [types/promotion.types.ts:2366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2366)

Элемент ответа метода GET /api/advert/v0/daily-limits — настройки
дневного лимита одной CPC-кампании.

## Since

task-186

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:2368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2368) |
| <a id="enabled"></a> `enabled` | `boolean` | Включён ли дневной лимит: - `true` — включён - `false` — выключен | [types/promotion.types.ts:2374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2374) |
| <a id="dailylimit"></a> `dailyLimit` | `number` | Сумма дневного лимита в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). | [types/promotion.types.ts:2379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2379) |
| <a id="spenttoday"></a> `spentToday` | `number` | Потрачено сегодня в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). | [types/promotion.types.ts:2384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2384) |
| <a id="currency"></a> `currency` | `string` | Код валюты (ISO 4217, напр. 'RUB') | [types/promotion.types.ts:2386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2386) |
| <a id="carryoverenabled"></a> `carryOverEnabled` | `boolean` | Перенос остатка дневного лимита на следующий день. Если лимит не израсходован за сутки, остаток добавляется к лимиту следующего дня; расходы на продвижение при этом не увеличиваются: - `true` — перенос включён - `false` — перенос выключен | [types/promotion.types.ts:2394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2394) |
| <a id="valid"></a> `valid` | `boolean` | Достаточен ли текущий дневной лимит для ставок кампании: - `true` — да - `false` — нет, рекомендуется повысить лимит, иначе бюджет кампании может расходоваться неравномерно | [types/promotion.types.ts:2401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2401) |
| <a id="requiredlimit"></a> `requiredLimit` | `number` | Рекомендуемый минимальный дневной лимит по текущим ставкам кампании, в минорных единицах валюты — 0.01 базовой единицы валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances). | [types/promotion.types.ts:2407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2407) |
