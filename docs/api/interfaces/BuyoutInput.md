[Wildberries API TypeScript SDK](../modules.md) / BuyoutInput

# Interface: BuyoutInput

Defined in: [utils/reconcileBuyoutsAndReturns.ts:9](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/reconcileBuyoutsAndReturns.ts#L9)

Buyout record input — minimal shape derived from sdk.analytics getStocksReportProducts() output.
Consumers shape their data into this before calling reconcileBuyoutsAndReturns().

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | - | [utils/reconcileBuyoutsAndReturns.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/reconcileBuyoutsAndReturns.ts#L10) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Number of buyout transactions | [utils/reconcileBuyoutsAndReturns.ts:12](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/reconcileBuyoutsAndReturns.ts#L12) |
| <a id="buyoutdate"></a> `buyoutDate?` | `string` | Buyout date (used for temporal alignment) — ISO 8601 | [utils/reconcileBuyoutsAndReturns.ts:14](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/reconcileBuyoutsAndReturns.ts#L14) |
| <a id="buyoutrevenue"></a> `buyoutRevenue?` | `number` | Total revenue from buyouts (rubles) | [utils/reconcileBuyoutsAndReturns.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/reconcileBuyoutsAndReturns.ts#L16) |
