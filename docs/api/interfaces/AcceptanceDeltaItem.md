[Wildberries API TypeScript SDK](../modules.md) / AcceptanceDeltaItem

# Interface: AcceptanceDeltaItem

Defined in: [utils/reconcileAcceptanceDelta.ts:8](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L8)

Per-nmId acceptance delta (declared vs accepted).

## Since

v4.1.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | - | [utils/reconcileAcceptanceDelta.ts:9](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L9) |
| <a id="declared"></a> `declared` | `number` | - | [utils/reconcileAcceptanceDelta.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L10) |
| <a id="accepted"></a> `accepted` | `number` | - | [utils/reconcileAcceptanceDelta.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L11) |
| <a id="delta"></a> `delta` | `number` | declared - accepted (negative = over-accepted). | [utils/reconcileAcceptanceDelta.ts:13](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L13) |
| <a id="hasdiscrepancy"></a> `hasDiscrepancy` | `boolean` | true when delta !== 0. | [utils/reconcileAcceptanceDelta.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/utils/reconcileAcceptanceDelta.ts#L15) |
