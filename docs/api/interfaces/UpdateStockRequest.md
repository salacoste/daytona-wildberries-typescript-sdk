[Wildberries API TypeScript SDK](../modules.md) / UpdateStockRequest

# Interface: UpdateStockRequest

Defined in: [types/products.types.ts:1373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1373)

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
| <a id="stocks"></a> `stocks` | [`StockItem`](StockItem.md)[] | Array of stock items (set `chrtId` per item). | [types/products.types.ts:1375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1375) |
