[Wildberries API TypeScript SDK](../modules.md) / GoodsFilterResponse

# Interface: GoodsFilterResponse

Defined in: [types/products.types.ts:1499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1499)

Ответ списка товаров с ценами (list/goods/filter)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `listGoods?`: [`GoodsList`](GoodsList.md)[]; \} | - | [types/products.types.ts:1500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1500) |
| `data.listGoods?` | [`GoodsList`](GoodsList.md)[] | Информация о товарах | [types/products.types.ts:1502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1502) |
| <a id="error"></a> `error?` | `boolean` | Флаг ошибки | [types/products.types.ts:1505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1505) |
| <a id="errortext"></a> `errorText?` | `string` | Текст ошибки | [types/products.types.ts:1507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1507) |
