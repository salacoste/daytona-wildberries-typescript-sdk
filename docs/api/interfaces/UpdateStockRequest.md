[Wildberries API TypeScript SDK](../modules.md) / UpdateStockRequest

# Interface: UpdateStockRequest

Defined in: [types/products.types.ts:1447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1447)

Request body for [ProductsModule.updateStock](../classes/ProductsModule.md#updatestock).

## Since

3.12.0

## Example

```typescript
const request: UpdateStockRequest = { stocks: [{ chrtId: 12345678, amount: 100 }] };
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stocks"></a> `stocks` | [`StockItem`](StockItem.md)[] | Array of stock items (set `chrtId` per item). | [types/products.types.ts:1449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1449) |
