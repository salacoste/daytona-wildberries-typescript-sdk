[Wildberries API TypeScript SDK](../modules.md) / UpdateStockRequest

# Interface: UpdateStockRequest

Defined in: [types/products.types.ts:1132](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1132)

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
| <a id="stocks"></a> `stocks` | [`StockItem`](StockItem.md)[] | Array of stock items (set `chrtId` per item). | [types/products.types.ts:1134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1134) |
