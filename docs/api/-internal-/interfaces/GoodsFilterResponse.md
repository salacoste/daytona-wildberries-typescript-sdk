[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsFilterResponse

# Interface: GoodsFilterResponse

Defined in: [types/products.types.ts:703](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L703)

Response for goods list with prices (GET /api/v2/list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | Goods list with pricing | [types/products.types.ts:705](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L705) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | Cursor for next offset | [types/products.types.ts:707](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L707) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L710) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L712) |
