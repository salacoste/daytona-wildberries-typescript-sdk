[Wildberries API TypeScript SDK](../modules.md) / ReconciliationResult

# Interface: ReconciliationResult

Defined in: utils/reconcileBuyoutsAndReturns.ts:36

Per-nmId reconciliation summary.

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | - | utils/reconcileBuyoutsAndReturns.ts:37 |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | - | utils/reconcileBuyoutsAndReturns.ts:38 |
| <a id="returncount"></a> `returnCount` | `number` | Total returns across both FBO and FBS | utils/reconcileBuyoutsAndReturns.ts:40 |
| <a id="fboreturncount"></a> `fboReturnCount` | `number` | - | utils/reconcileBuyoutsAndReturns.ts:41 |
| <a id="fbsreturncount"></a> `fbsReturnCount` | `number` | - | utils/reconcileBuyoutsAndReturns.ts:42 |
| <a id="netrevenue"></a> `netRevenue?` | `number` | Net revenue = buyoutRevenue - return penalties (negative if returns dominate) | utils/reconcileBuyoutsAndReturns.ts:44 |
| <a id="anomalies"></a> `anomalies` | [`ReconciliationAnomaly`](ReconciliationAnomaly.md)[] | Anomalies for this nmId | utils/reconcileBuyoutsAndReturns.ts:46 |
