[Wildberries API TypeScript SDK](../modules.md) / GoodsTaskResponse

# Interface: GoodsTaskResponse

Defined in: [types/products.types.ts:1460](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1460)

Ответ детализации обработанной загрузки (history/goods/task)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `uploadID?`: `number`; `historyGoods?`: [`GoodHistory`](GoodHistory.md)[]; \} | - | [types/products.types.ts:1461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1461) |
| `data.uploadID?` | `number` | ID загрузки | [types/products.types.ts:1463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1463) |
| `data.historyGoods?` | [`GoodHistory`](GoodHistory.md)[] | Информация о товарах в загрузке | [types/products.types.ts:1465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1465) |
