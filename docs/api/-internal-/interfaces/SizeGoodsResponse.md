[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGoodsResponse

# Interface: SizeGoodsResponse

Defined in: [types/products.types.ts:737](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L737)

Response for size-specific pricing (GET /api/v2/list/goods/size/nm)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`SizeGood`](SizeGood.md)[]; \} | Size-specific pricing data | [types/products.types.ts:739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L739) |
| `data.listGoods?` | [`SizeGood`](SizeGood.md)[] | - | [types/products.types.ts:740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L740) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L743) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/products.types.ts#L745) |
