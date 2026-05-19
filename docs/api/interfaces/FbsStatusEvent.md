[Wildberries API TypeScript SDK](../modules.md) / FbsStatusEvent

# Interface: FbsStatusEvent

Defined in: [utils/classifyFbsReturnCategory.ts:9](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/classifyFbsReturnCategory.ts#L9)

Single FBS status event from order status history.
Consumer shapes this from their `order_wb_status_history` table or SDK call.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status` | `string` | Status code (e.g., 'new', 'confirmed', 'assembled', 'delivered', 'cancelled', 'defected', 'returned', 'canceled_by_client'/'cancelled_by_client') | [utils/classifyFbsReturnCategory.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/classifyFbsReturnCategory.ts#L11) |
| <a id="date"></a> `date` | `string` | ISO 8601 timestamp when status was set | [utils/classifyFbsReturnCategory.ts:13](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/classifyFbsReturnCategory.ts#L13) |
