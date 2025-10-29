[Wildberries API TypeScript SDK](../modules.md) / PricingTaskResponse

# Interface: PricingTaskResponse

Defined in: [types/products.types.ts:1126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1126)

Response from pricing update operation

**Important:** Async processing - use uploadID to check status.

## Example

```typescript
const response: PricingTaskResponse = {
  uploadID: 'abc123-def456'
};

// Poll for status
const status = await getPricingTaskStatus(response.uploadID);
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="uploadid"></a> `uploadID` | `string` | Task ID for status polling | [types/products.types.ts:1128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1128) |
