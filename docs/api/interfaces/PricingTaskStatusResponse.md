[Wildberries API TypeScript SDK](../modules.md) / PricingTaskStatusResponse

# Interface: PricingTaskStatusResponse

Defined in: [types/products.types.ts:1209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1209)

Pricing task status response

Use to check if pricing update completed successfully.

**Status Values:**
- `pending` - Task queued, not started
- `processing` - Task in progress
- `completed` - All prices updated successfully
- `failed` - Task failed, check error details

## Example

```typescript
const status: PricingTaskStatusResponse = {
  uploadID: 'abc123-def456',
  status: 'completed',
  createdAt: '2025-01-01T00:00:00Z',
  completedAt: '2025-01-01T00:00:05Z'
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="uploadid"></a> `uploadID` | `string` | Task ID from updatePricing() | [types/products.types.ts:1211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1211) |
| <a id="status"></a> `status` | `"pending"` \| `"processing"` \| `"completed"` \| `"failed"` | Current task status | [types/products.types.ts:1213](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1213) |
| <a id="createdat"></a> `createdAt` | `string` | Task creation timestamp (ISO 8601) | [types/products.types.ts:1215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1215) |
| <a id="completedat"></a> `completedAt?` | `string` | Task completion timestamp (ISO 8601, if completed) | [types/products.types.ts:1217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1217) |
