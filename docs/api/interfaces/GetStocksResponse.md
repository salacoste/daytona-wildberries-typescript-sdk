[Wildberries API TypeScript SDK](../modules.md) / GetStocksResponse

# Interface: GetStocksResponse

Defined in: [types/products.types.ts:1143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1143)

Response from [ProductsModule.getStocks](../classes/ProductsModule.md#getstocks).

WB returns `chrtId` per item (the legacy `sku` identifier was removed in v4.0.0).

## Since

3.12.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="stocks"></a> `stocks?` | [`StockItem`](StockItem.md)[] | [types/products.types.ts:1144](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1144) |
