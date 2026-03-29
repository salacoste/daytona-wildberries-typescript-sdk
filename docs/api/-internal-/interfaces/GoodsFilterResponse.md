[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsFilterResponse

# Interface: GoodsFilterResponse

Defined in: [types/products.types.ts:701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L701)

Response for goods list with prices (GET /api/v2/list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | Goods list with pricing | [types/products.types.ts:703](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L703) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | Cursor for next offset | [types/products.types.ts:705](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L705) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L708) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L710) |
