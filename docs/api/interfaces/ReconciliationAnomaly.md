[Wildberries API TypeScript SDK](../modules.md) / ReconciliationAnomaly

# Interface: ReconciliationAnomaly

Defined in: utils/reconcileBuyoutsAndReturns.ts:24

Anomaly detected during reconciliation.

## Since

v3.9.3

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type"></a> `type` | `"return_without_buyout"` \| `"return_quantity_mismatch"` \| `"orphan_buyout"` | utils/reconcileBuyoutsAndReturns.ts:25 |
| <a id="nmid"></a> `nmId` | `number` | utils/reconcileBuyoutsAndReturns.ts:26 |
| <a id="orderid"></a> `orderId?` | `number` | utils/reconcileBuyoutsAndReturns.ts:27 |
| <a id="details"></a> `details` | `string` | utils/reconcileBuyoutsAndReturns.ts:28 |
