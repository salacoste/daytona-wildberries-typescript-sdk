[Wildberries API TypeScript SDK](../modules.md) / BuyoutInput

# Interface: BuyoutInput

Defined in: utils/reconcileBuyoutsAndReturns.ts:9

Buyout record input — minimal shape derived from sdk.analytics getStocksReportProducts() output.
Consumers shape their data into this before calling reconcileBuyoutsAndReturns().

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | - | utils/reconcileBuyoutsAndReturns.ts:10 |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Number of buyout transactions | utils/reconcileBuyoutsAndReturns.ts:12 |
| <a id="buyoutdate"></a> `buyoutDate?` | `string` | Buyout date (used for temporal alignment) — ISO 8601 | utils/reconcileBuyoutsAndReturns.ts:14 |
| <a id="buyoutrevenue"></a> `buyoutRevenue?` | `number` | Total revenue from buyouts (rubles) | utils/reconcileBuyoutsAndReturns.ts:16 |
