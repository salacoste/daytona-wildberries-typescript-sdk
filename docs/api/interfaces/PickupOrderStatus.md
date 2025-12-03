[Wildberries API TypeScript SDK](../modules.md) / PickupOrderStatus

# Interface: PickupOrderStatus

Defined in: [types/in-store-pickup.types.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L123)

Order status information

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Order ID | [types/in-store-pickup.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L125) |
| <a id="supplierstatus"></a> `supplierStatus` | `string` | Seller's status: new, confirm, prepare, receive, reject, cancel, cancel_shelf_life | [types/in-store-pickup.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L127) |
| <a id="wbstatus"></a> `wbStatus` | `string` | WB system status: waiting, sold, canceled, canceled_by_client, declined_by_client, defect, ready_for_pickup | [types/in-store-pickup.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L129) |
