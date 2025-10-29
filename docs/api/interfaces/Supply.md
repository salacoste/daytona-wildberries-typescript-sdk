[Wildberries API TypeScript SDK](../modules.md) / Supply

# Interface: Supply

Defined in: [types/orders-fbs.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L263)

Supply / Shipment

Represents a group of FBS orders being shipped together to WB offices.
Supply workflow:
1. Create supply (empty, no cargoType)
2. Add first order → supply gets cargoType, order: new → confirm
3. Add more orders (must match cargoType) → orders: new → confirm
4. Get order stickers (orders must be in confirm status)
5. Deliver supply → orders: confirm → complete, supply closed
6. Get supply QR code (only available after delivery)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Supply ID (format: WB-GI-1234567) | [types/orders-fbs.types.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L265) |
| <a id="name"></a> `name` | `string` | Supply name (1-128 characters) | [types/orders-fbs.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L267) |
| <a id="done"></a> `done` | `boolean` | Closed flag (true=delivered/closed, false=active) | [types/orders-fbs.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L269) |
| <a id="createdat"></a> `createdAt` | `string` | Creation timestamp (ISO 8601, RFC3339) | [types/orders-fbs.types.ts:271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L271) |
| <a id="closedat"></a> `closedAt?` | `string` | Closed timestamp when delivered (ISO 8601, RFC3339) | [types/orders-fbs.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L273) |
| <a id="scandt"></a> `scanDt?` | `string` | First scan timestamp (ISO 8601, RFC3339) | [types/orders-fbs.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L275) |
