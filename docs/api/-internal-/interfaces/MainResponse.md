[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / MainResponse

# Interface: MainResponse

Defined in: [types/analytics.types.ts:38](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L38)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="commoninfo"></a> `commonInfo` | [`CommonInfo`](CommonInfo.md) | - | [types/analytics.types.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L39) |
| <a id="positioninfo"></a> `positionInfo` | [`PositionInfo`](PositionInfo.md) | - | [types/analytics.types.ts:40](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L40) |
| <a id="visibilityinfo"></a> `visibilityInfo` | [`VisibilityInfo`](VisibilityInfo.md) | - | [types/analytics.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L41) |
| <a id="currency"></a> `currency?` | `string` | Валюта отчёта (ISO 4217, например "RUB"). Spec marks `currency` as required; kept optional `?` per codebase convention (WB omits empty fields). | [types/analytics.types.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L47) |
| <a id="groups"></a> `groups?` | [`TableGroupItem`](TableGroupItem.md)[] | Список элементов таблицы | [types/analytics.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L49) |
