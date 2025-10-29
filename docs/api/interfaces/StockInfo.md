[Wildberries API TypeScript SDK](../modules.md) / StockInfo

# Interface: StockInfo

Defined in: [types/products.types.ts:1317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1317)

Stock information for a product

## Example

```typescript
const stock: StockInfo = {
  sku: 'BARCODE123',
  amount: 100
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sku"></a> `sku` | `string` | Product barcode | [types/products.types.ts:1319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1319) |
| <a id="amount"></a> `amount` | `number` | Current stock quantity | [types/products.types.ts:1321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1321) |
