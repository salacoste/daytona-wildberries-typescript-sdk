[Wildberries API TypeScript SDK](../modules.md) / ReturnProcessResponse

# Interface: ReturnProcessResponse

Defined in: [types/communications.types.ts:2378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2378)

Response from processReturnRequest()

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="return"></a> `return` | [`ReturnRequest`](ReturnRequest.md) | Updated return request | [types/communications.types.ts:2382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2382) |
| <a id="result"></a> `result` | \{ `action`: `"approve"` \| `"reject"`; `processedAt`: `string`; `success`: `boolean`; `message`: `string`; `refundAmount?`: `number`; `refundStatus?`: `"pending"` \| `"processing"` \| `"completed"` \| `"failed"`; `rejectionReason?`: `string`; \} | Processing result details | [types/communications.types.ts:2387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2387) |
| `result.action` | `"approve"` \| `"reject"` | Action performed | [types/communications.types.ts:2391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2391) |
| `result.processedAt` | `string` | Processing timestamp (ISO 8601) | [types/communications.types.ts:2396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2396) |
| `result.success` | `boolean` | Whether processing was successful | [types/communications.types.ts:2401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2401) |
| `result.message` | `string` | Processing message | [types/communications.types.ts:2406](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2406) |
| `result.refundAmount?` | `number` | Refund amount (if approved) | [types/communications.types.ts:2411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2411) |
| `result.refundStatus?` | `"pending"` \| `"processing"` \| `"completed"` \| `"failed"` | Refund status | [types/communications.types.ts:2416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2416) |
| `result.rejectionReason?` | `string` | Rejection reason (if rejected) | [types/communications.types.ts:2421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2421) |
| <a id="additional"></a> `additional?` | \{ `customerNotified?`: `boolean`; `inventoryUpdated?`: `boolean`; `nextSteps?`: `string`[]; `transactionIds?`: `string`[]; \} | Additional information | [types/communications.types.ts:2427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2427) |
| `additional.customerNotified?` | `boolean` | Customer notification status | [types/communications.types.ts:2431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2431) |
| `additional.inventoryUpdated?` | `boolean` | Inventory update status | [types/communications.types.ts:2436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2436) |
| `additional.nextSteps?` | `string`[] | Next steps or required actions | [types/communications.types.ts:2441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2441) |
| `additional.transactionIds?` | `string`[] | Related transaction IDs | [types/communications.types.ts:2446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2446) |
