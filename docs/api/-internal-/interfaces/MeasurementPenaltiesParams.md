[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / MeasurementPenaltiesParams

# Interface: MeasurementPenaltiesParams

Defined in: [types/reports.types.ts:791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L791)

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
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L795) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L797) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L799) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L801) |
