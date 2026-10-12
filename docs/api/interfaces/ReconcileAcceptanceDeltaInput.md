[Wildberries API TypeScript SDK](../modules.md) / ReconcileAcceptanceDeltaInput

# Interface: ReconcileAcceptanceDeltaInput

Defined in: [utils/reconcileAcceptanceDelta.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/utils/reconcileAcceptanceDelta.ts#L23)

Input for [reconcileAcceptanceDelta](../functions/reconcileAcceptanceDelta.md).

## Since

v4.1.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="declared"></a> `declared` | `Record`\<`number`, `number`\> \| `Map`\<`number`, `number`\> | Declared/packed quantity per nmId (from the seller's own supply/order data). | [utils/reconcileAcceptanceDelta.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/utils/reconcileAcceptanceDelta.ts#L25) |
| <a id="accepted"></a> `accepted` | [`AcceptanceReportDownloadItem`](../-internal-/interfaces/AcceptanceReportDownloadItem.md)[] | Accepted rows from sdk.reports.downloadAcceptanceReport() (already filtered to the supply's incomeId by the caller). | [utils/reconcileAcceptanceDelta.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/utils/reconcileAcceptanceDelta.ts#L30) |
