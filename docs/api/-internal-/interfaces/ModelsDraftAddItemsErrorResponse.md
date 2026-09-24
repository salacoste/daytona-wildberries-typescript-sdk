[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsDraftAddItemsErrorResponse

# Interface: ModelsDraftAddItemsErrorResponse

Defined in: [types/orders-fbw.types.ts:737](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L737)

Ответ на добавление товаров в черновик поставки.

**Атомарность:** пустой `results` (`[]`) означает, что все SKU прошли
валидацию и товары добавлены в черновик. Непустой `results` содержит список
невалидных SKU — в этом случае **ни один** товар не добавлен.

## Since

task-193

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="results"></a> `results` | [`ModelsDraftAddItemsResultItem`](ModelsDraftAddItemsResultItem.md)[] | Список невалидных SKU с ошибками. `[]` — все товары добавлены | [types/orders-fbw.types.ts:739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L739) |
