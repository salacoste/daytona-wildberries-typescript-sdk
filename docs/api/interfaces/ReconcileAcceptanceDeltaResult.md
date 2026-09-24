[Wildberries API TypeScript SDK](../modules.md) / ReconcileAcceptanceDeltaResult

# Interface: ReconcileAcceptanceDeltaResult

Defined in: [utils/reconcileAcceptanceDelta.ts:38](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L38)

Aggregated acceptance reconciliation result.

## Since

v4.1.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items` | [`AcceptanceDeltaItem`](AcceptanceDeltaItem.md)[] | Sorted by nmId ascending. | [utils/reconcileAcceptanceDelta.ts:40](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L40) |
| <a id="totaldeclared"></a> `totalDeclared` | `number` | - | [utils/reconcileAcceptanceDelta.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L41) |
| <a id="totalaccepted"></a> `totalAccepted` | `number` | - | [utils/reconcileAcceptanceDelta.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L42) |
| <a id="totaldelta"></a> `totalDelta` | `number` | - | [utils/reconcileAcceptanceDelta.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L43) |
| <a id="discrepancycount"></a> `discrepancyCount` | `number` | Number of items where hasDiscrepancy === true. | [utils/reconcileAcceptanceDelta.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L45) |
