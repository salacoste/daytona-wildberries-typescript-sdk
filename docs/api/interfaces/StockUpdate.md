[Wildberries API TypeScript SDK](../modules.md) / StockUpdate

# Interface: StockUpdate

Defined in: [types/products.types.ts:1299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1299)

Single SKU stock update

**Constraints:**
- Amount: 0-100,000 per SKU
- Batch size: 1-1000 SKUs per request

## Example

```typescript
const update: StockUpdate = {
  sku: 'BARCODE123',
  amount: 100
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sku"></a> `sku` | `string` | Product barcode | [types/products.types.ts:1301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1301) |
| <a id="amount"></a> `amount` | `number` | Stock quantity (0-100,000) | [types/products.types.ts:1303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1303) |
