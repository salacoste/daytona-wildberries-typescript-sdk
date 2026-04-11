[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGoodsResponse

# Interface: SizeGoodsResponse

Defined in: [types/products.types.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/products.types.ts#L732)

Response for size-specific pricing (GET /api/v2/list/goods/size/nm)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`SizeGood`](SizeGood.md)[]; \} | Size-specific pricing data | [types/products.types.ts:734](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/products.types.ts#L734) |
| `data.listGoods?` | [`SizeGood`](SizeGood.md)[] | - | [types/products.types.ts:735](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/products.types.ts#L735) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/products.types.ts#L738) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/products.types.ts#L740) |
