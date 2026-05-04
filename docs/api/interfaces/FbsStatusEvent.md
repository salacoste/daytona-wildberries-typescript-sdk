[Wildberries API TypeScript SDK](../modules.md) / FbsStatusEvent

# Interface: FbsStatusEvent

Defined in: utils/classifyFbsReturnCategory.ts:9

Single FBS status event from order status history.
Consumer shapes this from their `order_wb_status_history` table or SDK call.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status` | `string` | Status code (e.g., 'new', 'confirmed', 'assembled', 'delivered', 'cancelled', 'defected', 'returned', 'canceled_by_client'/'cancelled_by_client') | utils/classifyFbsReturnCategory.ts:11 |
| <a id="date"></a> `date` | `string` | ISO 8601 timestamp when status was set | utils/classifyFbsReturnCategory.ts:13 |
