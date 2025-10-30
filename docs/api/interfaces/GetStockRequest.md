[Wildberries API TypeScript SDK](../modules.md) / GetStockRequest

# Interface: GetStockRequest

Defined in: [types/products.types.ts:1337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1337)

Request to get stock levels

**Constraints:**
- Batch size: 1-1000 SKUs

## Example

```typescript
const request: GetStockRequest = {
  skus: ['BARCODE123', 'BARCODE456', 'BARCODE789']
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="skus"></a> `skus` | `string`[] | Array of product barcodes (1-1000 items) | [types/products.types.ts:1339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1339) |
