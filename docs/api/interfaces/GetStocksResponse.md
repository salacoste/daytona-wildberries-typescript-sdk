[Wildberries API TypeScript SDK](../modules.md) / GetStocksResponse

# Interface: GetStocksResponse

Defined in: [types/products.types.ts:1088](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/products.types.ts#L1088)

Response from [ProductsModule.getStocks](../classes/ProductsModule.md#getstocks).

WB returns one of `sku` or `chrtId` per item, matching whichever identifier the
request used. After 2026-05-20 13:00 MSK, only `chrtId` will be populated.

## Since

3.12.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="stocks"></a> `stocks?` | [`StockItem`](StockItem.md)[] | [types/products.types.ts:1089](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/products.types.ts#L1089) |
