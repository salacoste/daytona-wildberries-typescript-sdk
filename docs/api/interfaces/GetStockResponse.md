[Wildberries API TypeScript SDK](../modules.md) / GetStockResponse

# Interface: GetStockResponse

Defined in: [types/products.types.ts:1355](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1355)

Response from get stock operation

## Example

```typescript
const response: GetStockResponse = {
  stocks: [
    { sku: 'BARCODE123', amount: 100 },
    { sku: 'BARCODE456', amount: 50 }
  ]
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stocks"></a> `stocks` | [`StockInfo`](StockInfo.md)[] | Array of stock information | [types/products.types.ts:1357](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1357) |
