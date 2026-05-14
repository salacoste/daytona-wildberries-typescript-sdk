[Wildberries API TypeScript SDK](../modules.md) / ReconciliationAnomaly

# Interface: ReconciliationAnomaly

Defined in: [utils/reconcileBuyoutsAndReturns.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/reconcileBuyoutsAndReturns.ts#L24)

Anomaly detected during reconciliation.

## Since

v3.9.3

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type"></a> `type` | `"return_without_buyout"` \| `"return_quantity_mismatch"` \| `"orphan_buyout"` | [utils/reconcileBuyoutsAndReturns.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/reconcileBuyoutsAndReturns.ts#L25) |
| <a id="nmid"></a> `nmId` | `number` | [utils/reconcileBuyoutsAndReturns.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/reconcileBuyoutsAndReturns.ts#L26) |
| <a id="orderid"></a> `orderId?` | `number` | [utils/reconcileBuyoutsAndReturns.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/reconcileBuyoutsAndReturns.ts#L27) |
| <a id="details"></a> `details` | `string` | [utils/reconcileBuyoutsAndReturns.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/reconcileBuyoutsAndReturns.ts#L28) |
