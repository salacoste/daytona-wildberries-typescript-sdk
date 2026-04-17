[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / MeasurementPenaltiesParams

# Interface: MeasurementPenaltiesParams

Defined in: [types/reports.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/reports.types.ts#L801)

Parameters for getMeasurementPenalties

## See

EPIC 44 - Request params for new measurement-penalties endpoint

## Indexable

```ts
[key: string]: string | number | undefined
```

Index signature for Record<string, unknown> compatibility

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/reports.types.ts#L805) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/reports.types.ts#L807) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/reports.types.ts#L809) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/reports.types.ts#L811) |
