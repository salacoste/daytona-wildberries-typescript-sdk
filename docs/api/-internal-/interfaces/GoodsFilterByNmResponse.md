[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsFilterByNmResponse

# Interface: GoodsFilterByNmResponse

Defined in: [types/products.types.ts:718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L718)

Response for goods list by article numbers (POST /api/v2/list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | Goods list with pricing | [types/products.types.ts:720](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L720) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | - | [types/products.types.ts:721](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L721) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:724](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L724) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:726](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L726) |
