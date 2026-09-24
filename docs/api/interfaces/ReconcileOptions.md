[Wildberries API TypeScript SDK](../modules.md) / ReconcileOptions

# Interface: ReconcileOptions

Defined in: [utils/reconcileBuyoutsAndReturns.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileBuyoutsAndReturns.ts#L54)

Optional configuration for reconciliation.

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stricttemporalalignment"></a> `strictTemporalAlignment?` | `boolean` | If true, flag returns whose returnDate is outside the buyout date window as 'return_without_buyout' anomalies. Default: false (date alignment is approximate). | [utils/reconcileBuyoutsAndReturns.ts:59](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileBuyoutsAndReturns.ts#L59) |
| <a id="alignmentwindowdays"></a> `alignmentWindowDays?` | `number` | Window (in days) to consider a return temporally aligned with a buyout. Only used when strictTemporalAlignment = true. Default: 60. | [utils/reconcileBuyoutsAndReturns.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileBuyoutsAndReturns.ts#L64) |
