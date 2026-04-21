[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsSuppliesFiltersRequest

# Interface: ModelsSuppliesFiltersRequest

Defined in: [types/orders-fbw.types.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/orders-fbw.types.ts#L63)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="dates"></a> `dates?` | [`ModelsDateFilterRequest`](ModelsDateFilterRequest.md)[] | Фильтр по датам | [types/orders-fbw.types.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/orders-fbw.types.ts#L65) |
| <a id="statusids"></a> `statusIDs?` | [`ModelsHandySupplyStatus`](../type-aliases/ModelsHandySupplyStatus.md)[] | Фильтр поставок по статусам. Возможные значения: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах | [types/orders-fbw.types.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/orders-fbw.types.ts#L67) |
