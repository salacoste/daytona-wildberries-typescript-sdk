[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsFilterByNmResponse

# Interface: GoodsFilterByNmResponse

Defined in: [types/products.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L799)

Response for goods list by article numbers (POST /api/v2/list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | Goods list with pricing | [types/products.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L801) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | - | [types/products.types.ts:802](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L802) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L805) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L807) |
