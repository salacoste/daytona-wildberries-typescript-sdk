[Wildberries API TypeScript SDK](../modules.md) / ReconciliationResult

# Interface: ReconciliationResult

Defined in: [utils/reconcileBuyoutsAndReturns.ts:36](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L36)

Per-nmId reconciliation summary.

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | - | [utils/reconcileBuyoutsAndReturns.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L37) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | - | [utils/reconcileBuyoutsAndReturns.ts:38](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L38) |
| <a id="returncount"></a> `returnCount` | `number` | Total returns across both FBO and FBS | [utils/reconcileBuyoutsAndReturns.ts:40](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L40) |
| <a id="fboreturncount"></a> `fboReturnCount` | `number` | - | [utils/reconcileBuyoutsAndReturns.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L41) |
| <a id="fbsreturncount"></a> `fbsReturnCount` | `number` | - | [utils/reconcileBuyoutsAndReturns.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L42) |
| <a id="netrevenue"></a> `netRevenue?` | `number` | Net revenue = buyoutRevenue - return penalties (negative if returns dominate) | [utils/reconcileBuyoutsAndReturns.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L44) |
| <a id="anomalies"></a> `anomalies` | [`ReconciliationAnomaly`](ReconciliationAnomaly.md)[] | Anomalies for this nmId | [utils/reconcileBuyoutsAndReturns.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/utils/reconcileBuyoutsAndReturns.ts#L46) |
