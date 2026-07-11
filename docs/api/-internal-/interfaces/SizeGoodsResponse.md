[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGoodsResponse

# Interface: SizeGoodsResponse

Defined in: [types/products.types.ts:813](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L813)

Response for size-specific pricing (GET /api/v2/list/goods/size/nm)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`SizeGood`](SizeGood.md)[]; \} | Size-specific pricing data | [types/products.types.ts:815](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L815) |
| `data.listGoods?` | [`SizeGood`](SizeGood.md)[] | - | [types/products.types.ts:816](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L816) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L819) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L821) |
