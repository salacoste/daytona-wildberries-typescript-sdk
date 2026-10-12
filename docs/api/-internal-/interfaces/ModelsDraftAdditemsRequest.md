[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsDraftAdditemsRequest

# Interface: ModelsDraftAdditemsRequest

Defined in: [types/orders-fbw.types.ts:702](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-fbw.types.ts#L702)

Тело запроса `addDraftItems()` — добавление товаров в черновик поставки.
Максимум 1000 элементов в массиве `items`.

## Since

task-193

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items` | [`ModelsItem`](ModelsItem.md)[] | Список товаров (максимум 1000) | [types/orders-fbw.types.ts:704](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-fbw.types.ts#L704) |
