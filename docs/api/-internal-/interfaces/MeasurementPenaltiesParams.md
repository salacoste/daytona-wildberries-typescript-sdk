[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / MeasurementPenaltiesParams

# Interface: MeasurementPenaltiesParams

Defined in: [types/reports.types.ts:804](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L804)

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
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:808](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L808) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L810) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L812) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:814](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L814) |
