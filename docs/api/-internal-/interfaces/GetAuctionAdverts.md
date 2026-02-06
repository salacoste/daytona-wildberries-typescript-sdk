[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetAuctionAdverts

# Interface: GetAuctionAdverts

Defined in: [types/promotion.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L270)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="adverts"></a> `adverts` | \{ `id`: `number`; `nm_settings`: [`AuctionAdvertNMsSettings`](AuctionAdvertNMsSettings.md)[]; `settings`: [`AuctionAdvertSettings`](AuctionAdvertSettings.md); `status`: `-1` \| `4` \| `7` \| `8` \| `9` \| `11`; `timestamps`: [`Timestamps`](Timestamps.md); `bid_type`: `string`; \} | Кампании | [types/promotion.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L272) |
| `adverts.id` | `number` | ID кампании | [types/promotion.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L274) |
| `adverts.nm_settings` | [`AuctionAdvertNMsSettings`](AuctionAdvertNMsSettings.md)[] | Настройки товаров | [types/promotion.types.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L276) |
| `adverts.settings` | [`AuctionAdvertSettings`](AuctionAdvertSettings.md) | - | [types/promotion.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L277) |
| `adverts.status` | `-1` \| `4` \| `7` \| `8` \| `9` \| `11` | Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе | [types/promotion.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L279) |
| `adverts.timestamps` | [`Timestamps`](Timestamps.md) | - | [types/promotion.types.ts:280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L280) |
| `adverts.bid_type` | `string` | Тип ставки: - `unified` — единая ставка - `manual` — ручная ставка | [types/promotion.types.ts:282](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L282) |
