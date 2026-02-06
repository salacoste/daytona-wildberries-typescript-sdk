[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsFilterResponse

# Interface: GoodsFilterResponse

Defined in: [types/products.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L708)

Response for goods list with prices (GET /api/v2/list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | Goods list with pricing | [types/products.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L710) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | Cursor for next offset | [types/products.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L712) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:715](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L715) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:717](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L717) |
