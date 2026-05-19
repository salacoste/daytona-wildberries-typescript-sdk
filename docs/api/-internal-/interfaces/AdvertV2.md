[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AdvertV2

# Interface: AdvertV2

Defined in: [types/promotion.types.ts:1218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1218)

Информация о кампании из V2 API.
Использует bid_type: 'auto' | 'manual' и ставки в копейках.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="bid_type"></a> `bid_type` | [`BidType`](../type-aliases/BidType.md) | Тип ставки: - `auto` — автоматическая ставка (Type 8) - `manual` — ручная ставка (Type 9) | [types/promotion.types.ts:1224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1224) |
| <a id="id"></a> `id` | `number` | ID кампании | [types/promotion.types.ts:1226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1226) |
| <a id="nm_settings"></a> `nm_settings` | [`NmSettingV2`](NmSettingV2.md)[] | Настройки артикулов (с ставками в копейках) | [types/promotion.types.ts:1228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1228) |
| <a id="settings"></a> `settings` | [`AdvertSettings`](AdvertSettings.md) | Настройки кампании | [types/promotion.types.ts:1230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1230) |
| <a id="status"></a> `status` | `-1` \| `4` \| `7` \| `8` \| `9` \| `11` | Статус кампании: - `-1` — удалена - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе | [types/promotion.types.ts:1240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1240) |
| <a id="timestamps"></a> `timestamps` | [`AdvertTimestamps`](AdvertTimestamps.md) | Временные метки | [types/promotion.types.ts:1242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1242) |
