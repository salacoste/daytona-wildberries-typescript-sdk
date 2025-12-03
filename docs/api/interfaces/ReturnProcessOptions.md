[Wildberries API TypeScript SDK](../modules.md) / ReturnProcessOptions

# Interface: ReturnProcessOptions

Defined in: [types/communications.types.ts:2333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2333)

Options for return request processing

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="refundamount"></a> `refundAmount?` | `number` | Refund amount (for approve action) | [types/communications.types.ts:2337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2337) |
| <a id="reason"></a> `reason?` | `string` | Rejection reason (required for reject action) | [types/communications.types.ts:2342](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2342) |
| <a id="notes"></a> `notes?` | `string` | Processing notes (optional) | [types/communications.types.ts:2347](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2347) |
| <a id="flags"></a> `flags?` | \{ `notifyCustomer?`: `boolean`; `updateInventory?`: `boolean`; `trackQuality?`: `boolean`; \} | Internal flags for processing | [types/communications.types.ts:2352](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2352) |
| `flags.notifyCustomer?` | `boolean` | Whether to notify customer | [types/communications.types.ts:2356](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2356) |
| `flags.updateInventory?` | `boolean` | Whether to update inventory | [types/communications.types.ts:2361](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2361) |
| `flags.trackQuality?` | `boolean` | Whether to track as quality issue | [types/communications.types.ts:2366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2366) |
| <a id="metadata"></a> `metadata?` | `Record`\<`string`, `unknown`\> | Additional metadata | [types/communications.types.ts:2372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2372) |
