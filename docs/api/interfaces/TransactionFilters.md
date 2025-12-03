[Wildberries API TypeScript SDK](../modules.md) / TransactionFilters

# Interface: TransactionFilters

Defined in: [types/finances.types.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L44)

Transaction filters for querying transaction history

## Indexable

```ts
[key: string]: string | number | undefined
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Start date in RFC3339 format (e.g., '2024-01-01' or '2024-01-01T00:00:00') | [types/finances.types.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L46) |
| <a id="dateto"></a> `dateTo` | `string` | End date in RFC3339 format | [types/finances.types.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L48) |
| <a id="limit"></a> `limit?` | `number` | Maximum number of results to return (max: 100000) | [types/finances.types.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L50) |
| <a id="rrdid"></a> `rrdid?` | `number` | Unique ID for pagination - use rrd_id from last row of previous response | [types/finances.types.ts:52](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L52) |
| <a id="period"></a> `period?` | [`ReportPeriod`](../type-aliases/ReportPeriod.md) | Report period: weekly or daily | [types/finances.types.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L54) |
