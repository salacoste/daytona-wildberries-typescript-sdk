[Wildberries API TypeScript SDK](../modules.md) / UpdateStockRequest

# Interface: UpdateStockRequest

Defined in: [types/products.types.ts:1386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1386)

Request to update stock quantities (bulk operation)

**CRITICAL:**
- Parameter names NOT validated! Incorrect names = silent failure with 200 OK
- Correct field names: `stocks` (array), `sku` (string), `amount` (number)

**Constraints:**
- Max 1000 SKUs per request
- Amount: 0-100,000 per SKU

**409 Errors (count as 5 requests!):**
- DBS/FBS warehouse restrictions
- Cargo type warehouse restrictions (LCL, ODC, CD+)
- Warehouse processing in progress

## Example

```typescript
const request: UpdateStockRequest = {
  stocks: [
    { sku: 'BARCODE123', amount: 100 },
    { sku: 'BARCODE456', amount: 50 }
  ]
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stocks"></a> `stocks` | [`StockUpdate`](StockUpdate.md)[] | Array of stock updates (1-1000 items) | [types/products.types.ts:1388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1388) |
