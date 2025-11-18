[Wildberries API TypeScript SDK](../modules.md) / StockInfo

# Interface: StockInfo

Defined in: [types/products.types.ts:1317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1317)

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
| <a id="sku"></a> `sku` | `string` | Product barcode | [types/products.types.ts:1319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1319) |
| <a id="amount"></a> `amount` | `number` | Current stock quantity | [types/products.types.ts:1321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1321) |
