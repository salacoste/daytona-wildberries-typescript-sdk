[Wildberries API TypeScript SDK](../modules.md) / FBWSupplyFilters

# Interface: FBWSupplyFilters

Defined in: [types/orders-fbw.types.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbw.types.ts#L63)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="dates"></a> `dates?` | [`FBWDateFilter`](FBWDateFilter.md)[] | Фильтр по датам | [types/orders-fbw.types.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbw.types.ts#L65) |
| <a id="statusids"></a> `statusIDs?` | [`FBWSupplyStatus`](../type-aliases/FBWSupplyStatus.md)[] | Фильтр поставок по статусам. Возможные значения: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах | [types/orders-fbw.types.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbw.types.ts#L67) |
