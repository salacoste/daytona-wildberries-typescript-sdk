[Wildberries API TypeScript SDK](../modules.md) / BufferGoodsTaskResponse

# Interface: BufferGoodsTaskResponse

Defined in: [types/products.types.ts:1483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1483)

Ответ детализации необработанной загрузки (buffer/goods/task)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `uploadID?`: `number` \| `null`; `bufferGoods?`: [`GoodBufferHistory`](GoodBufferHistory.md)[] \| `null`; \} | - | [types/products.types.ts:1484](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1484) |
| `data.uploadID?` | `number` \| `null` | ID загрузки | [types/products.types.ts:1486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1486) |
| `data.bufferGoods?` | [`GoodBufferHistory`](GoodBufferHistory.md)[] \| `null` | Информация о товарах в загрузке | [types/products.types.ts:1488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1488) |
| <a id="error"></a> `error?` | `boolean` | Флаг ошибки | [types/products.types.ts:1491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1491) |
| <a id="errortext"></a> `errorText?` | `string` | Текст ошибки | [types/products.types.ts:1493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1493) |
