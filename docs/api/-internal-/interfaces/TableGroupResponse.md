[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableGroupResponse

# Interface: TableGroupResponse

Defined in: [types/analytics.types.ts:362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L362)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="groups"></a> `groups` | [`TableGroupItem`](TableGroupItem.md)[] | Список групп товаров для таблицы | [types/analytics.types.ts:364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L364) |
| <a id="currency"></a> `currency?` | `string` | Валюта отчёта (ISO 4217, например "RUB"). Spec marks `currency` as required; kept optional `?` per codebase convention (WB omits empty fields). | [types/analytics.types.ts:370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L370) |
