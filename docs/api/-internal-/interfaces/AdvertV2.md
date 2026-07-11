[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AdvertV2

# Interface: AdvertV2

Defined in: [types/promotion.types.ts:1310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1310)

Информация о кампании из V2 API.
Использует bid_type: 'unified' | 'manual' и ставки в копейках.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="bid_type"></a> `bid_type` | [`BidType`](../type-aliases/BidType.md) | Тип ставки: - `unified` — единая ставка (Type 8; ставкой управляет WB) - `manual` — ручная ставка (Type 9) | [types/promotion.types.ts:1316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1316) |
| <a id="id"></a> `id` | `number` | ID кампании | [types/promotion.types.ts:1318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1318) |
| <a id="nm_settings"></a> `nm_settings` | [`NmSettingV2`](NmSettingV2.md)[] | Настройки артикулов (с ставками в копейках) | [types/promotion.types.ts:1320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1320) |
| <a id="settings"></a> `settings` | [`AdvertSettings`](AdvertSettings.md) | Настройки кампании | [types/promotion.types.ts:1322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1322) |
| <a id="status"></a> `status` | `-1` \| `4` \| `7` \| `8` \| `9` \| `11` | Статус кампании: - `-1` — удалена - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе | [types/promotion.types.ts:1332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1332) |
| <a id="timestamps"></a> `timestamps` | [`AdvertTimestamps`](AdvertTimestamps.md) | Временные метки | [types/promotion.types.ts:1334](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1334) |
| <a id="currency"></a> `currency?` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). **Since** task-170 | [types/promotion.types.ts:1339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1339) |
