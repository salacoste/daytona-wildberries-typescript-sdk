[Wildberries API TypeScript SDK](../modules.md) / PricingTaskResponse

# Interface: PricingTaskResponse

Defined in: [types/products.types.ts:1126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1126)

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
| <a id="uploadid"></a> `uploadID` | `string` | Task ID for status polling | [types/products.types.ts:1128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1128) |
