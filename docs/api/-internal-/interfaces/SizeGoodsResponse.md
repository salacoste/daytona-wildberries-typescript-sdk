[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGoodsResponse

# Interface: SizeGoodsResponse

Defined in: [types/products.types.ts:730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L730)

Response for size-specific pricing (GET /api/v2/list/goods/size/nm)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`SizeGood`](SizeGood.md)[]; \} | Size-specific pricing data | [types/products.types.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L732) |
| `data.listGoods?` | [`SizeGood`](SizeGood.md)[] | - | [types/products.types.ts:733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L733) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:736](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L736) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L738) |
