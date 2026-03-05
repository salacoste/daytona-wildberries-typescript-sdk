[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsFilterByNmResponse

# Interface: GoodsFilterByNmResponse

Defined in: [types/products.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/products.types.ts#L723)

Response for goods list by article numbers (POST /api/v2/list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | Goods list with pricing | [types/products.types.ts:725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/products.types.ts#L725) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | - | [types/products.types.ts:726](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/products.types.ts#L726) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:729](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/products.types.ts#L729) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/products.types.ts#L731) |
