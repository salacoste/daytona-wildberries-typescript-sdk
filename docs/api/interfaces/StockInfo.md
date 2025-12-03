[Wildberries API TypeScript SDK](../modules.md) / StockInfo

# Interface: StockInfo

Defined in: [types/products.types.ts:1317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1317)

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
| <a id="sku"></a> `sku` | `string` | Product barcode | [types/products.types.ts:1319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1319) |
| <a id="amount"></a> `amount` | `number` | Current stock quantity | [types/products.types.ts:1321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1321) |
