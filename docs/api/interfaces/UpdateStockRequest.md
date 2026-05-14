[Wildberries API TypeScript SDK](../modules.md) / UpdateStockRequest

# Interface: UpdateStockRequest

Defined in: [types/products.types.ts:1076](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/products.types.ts#L1076)

Request body for [ProductsModule.updateStock](../classes/ProductsModule.md#updatestock).

## Since

3.12.0

## Example

```typescript
// New v3.12.0+ pattern (preferred)
const request: UpdateStockRequest = { stocks: [{ chrtId: 12345678, amount: 100 }] };

// Legacy pattern (deprecated)
const legacyRequest: UpdateStockRequest = { stocks: [{ sku: '1234567890123', amount: 100 }] };
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stocks"></a> `stocks` | [`StockItem`](StockItem.md)[] | Array of stock items. Use `chrtId` per item (not `sku`) after 2026-05-20. | [types/products.types.ts:1078](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/products.types.ts#L1078) |
