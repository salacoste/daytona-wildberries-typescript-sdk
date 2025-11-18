[Wildberries API TypeScript SDK](../modules.md) / AuctionAdvertSettings

# Interface: AuctionAdvertSettings

Defined in: [types/promotion.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/promotion.types.ts#L316)

Настройки кампании

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="payment_type"></a> `payment_type` | `"cpm"` \| `"cpc"` | Тип оплаты: - `cpm` — за показы - `cpc` — за клик | [types/promotion.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/promotion.types.ts#L318) |
| <a id="name"></a> `name` | `string` | Имя кампании | [types/promotion.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/promotion.types.ts#L320) |
| <a id="placements"></a> `placements` | \{ `search`: `boolean`; `recommendations`: `boolean`; \} | Места размещения | [types/promotion.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/promotion.types.ts#L322) |
| `placements.search` | `boolean` | Размещение в поиске: - `false` — да - `true` — нет | [types/promotion.types.ts:324](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/promotion.types.ts#L324) |
| `placements.recommendations` | `boolean` | Размещение в рекомендациях: - `false` — отключено - `true` — включено | [types/promotion.types.ts:326](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/promotion.types.ts#L326) |
