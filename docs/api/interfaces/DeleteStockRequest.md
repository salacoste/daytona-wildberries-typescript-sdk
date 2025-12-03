[Wildberries API TypeScript SDK](../modules.md) / DeleteStockRequest

# Interface: DeleteStockRequest

Defined in: [types/products.types.ts:1411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1411)

Request to delete stock records (bulk operation)

**IRREVERSIBLE:**
- Deleted stock must be re-uploaded to resume sales
- No undo functionality

**Constraints:**
- Batch size: 1-1000 SKUs

**409 Errors (count as 5 requests!):**
- Warehouse processing in progress

## Example

```typescript
const request: DeleteStockRequest = {
  skus: ['BARCODE123', 'BARCODE456']
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="skus"></a> `skus` | `string`[] | Array of barcodes to delete (1-1000 items) | [types/products.types.ts:1413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1413) |
