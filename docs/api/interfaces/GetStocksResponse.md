[Wildberries API TypeScript SDK](../modules.md) / GetStocksResponse

# Interface: GetStocksResponse

Defined in: [types/products.types.ts:1384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1384)

Response from [ProductsModule.getStocks](../classes/ProductsModule.md#getstocks).

WB returns `chrtId` per item (the legacy `sku` identifier was removed in v4.0.0).

## Since

3.12.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="stocks"></a> `stocks?` | [`StockItem`](StockItem.md)[] | [types/products.types.ts:1385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1385) |
