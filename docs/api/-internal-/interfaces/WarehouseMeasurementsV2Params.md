[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WarehouseMeasurementsV2Params

# Interface: WarehouseMeasurementsV2Params

Defined in: [types/reports.types.ts:818](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/reports.types.ts#L818)

Parameters for getWarehouseMeasurementsV2

## See

EPIC 44 - Request params for new warehouse-measurements endpoint

## Indexable

```ts
[key: string]: string | number | undefined
```

Index signature for Record<string, unknown> compatibility

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:822](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/reports.types.ts#L822) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:824](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/reports.types.ts#L824) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/reports.types.ts#L826) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/reports.types.ts#L828) |
